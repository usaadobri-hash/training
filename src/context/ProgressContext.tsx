"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { createClient } from '@/utils/supabase/client';

type QuizScore = {
  moduleId: string;
  score: number;
  date: string;
};

type ProgressContextType = {
  completedModules: string[];
  quizScores: QuizScore[];
  completeModule: (moduleId: string, score: number) => void;
  isModuleUnlocked: (moduleId: string) => boolean;
  overallProgress: number;
  examPassed: boolean;
  passExam: () => void;
  resetProgress: () => void;
  isLoaded: boolean;
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

// 13 modules mapped by ID
const moduleOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [quizScores, setQuizScores] = useState<QuizScore[]>([]);
  const [examPassed, setExamPassed] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const supabase = createClient();

  useEffect(() => {
      const loadData = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        try {
          const { data, error } = await supabase
            .from('user_progress')
            .select('*')
            .eq('user_id', user.id)
            .single();
          
          let finalCompleted: string[] = [];
          let finalScores: QuizScore[] = [];
          let finalExam = false;

          if (data) {
            finalCompleted = data.completed_modules || [];
            finalScores = data.quiz_scores || [];
            finalExam = data.exam_passed || false;
          } else if (error && error.code !== 'PGRST116') {
            console.error("Supabase fetch error:", error);
          }

          // LOCAL STORAGE MIGRATION
          let needsMigration = false;
          const savedCompleted = localStorage.getItem("da_completedModules");
          if (savedCompleted) {
            try {
              const parsed = JSON.parse(savedCompleted);
              if (Array.isArray(parsed) && parsed.length > 0) {
                finalCompleted = Array.from(new Set([...finalCompleted, ...parsed]));
                needsMigration = true;
              }
            } catch (e) {}
            localStorage.removeItem("da_completedModules");
          }

          const savedScores = localStorage.getItem("da_quizScores");
          if (savedScores) {
            try {
              const parsed = JSON.parse(savedScores);
              if (Array.isArray(parsed) && parsed.length > 0) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                parsed.forEach((localScore: any) => {
                  const existing = finalScores.find((s) => s.moduleId === localScore.moduleId);
                  if (existing) {
                    if (localScore.score > existing.score) {
                      existing.score = localScore.score;
                      existing.date = localScore.date || existing.date;
                      needsMigration = true;
                    }
                  } else {
                    finalScores.push(localScore);
                    needsMigration = true;
                  }
                });
              }
            } catch (e) {}
            localStorage.removeItem("da_quizScores");
          }

          const savedExam = localStorage.getItem("da_examPassed");
          if (savedExam === "true" && !finalExam) {
            finalExam = true;
            needsMigration = true;
            localStorage.removeItem("da_examPassed");
          }

          if (needsMigration || (!data && error?.code === 'PGRST116')) {
            await supabase.from('user_progress').upsert({
              user_id: user.id,
              completed_modules: finalCompleted,
              quiz_scores: finalScores,
              exam_passed: finalExam
            });
          }

          setCompletedModules(finalCompleted);
          setQuizScores(finalScores);
          setExamPassed(finalExam);
        } catch (err) {
          console.error("Supabase connection error:", err);
        }
      }
      setIsLoaded(true);
    };

    loadData();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const syncSupabase = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          try {
            await supabase.from('user_progress').update({
              completed_modules: completedModules,
              quiz_scores: quizScores,
              exam_passed: examPassed
            }).eq('user_id', user.id);
          } catch (e) {
            console.error("Failed to sync progress to Supabase:", e);
          }
        }
      };
      syncSupabase();
    }
  }, [completedModules, quizScores, examPassed, isLoaded]);

  const completeModule = (moduleId: string, score: number) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules(prev => [...prev, moduleId]);
    }
    
    setQuizScores(prev => {
      const existingIndex = prev.findIndex(s => s.moduleId === moduleId);
      const newScore = { 
        moduleId, 
        score, 
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) 
      };
      
      if (existingIndex >= 0) {
        if (score > prev[existingIndex].score) {
          const newArray = [...prev];
          newArray[existingIndex] = newScore;
          return newArray;
        }
        return prev;
      } else {
        return [...prev, newScore];
      }
    });
  };

  const isModuleUnlocked = (moduleId: string) => {
    if (moduleId === "1") return true;
    const prevModuleId = (parseInt(moduleId) - 1).toString();
    return completedModules.includes(prevModuleId);
  };

  const overallProgress = Math.round((completedModules.length / moduleOrder.length) * 100);

  const passExam = () => {
    setExamPassed(true);
  };

  const resetProgress = () => {
    setCompletedModules([]);
    setQuizScores([]);
    setExamPassed(false);
  };

  return (
    <ProgressContext.Provider value={{ 
      completedModules, 
      quizScores, 
      completeModule, 
      isModuleUnlocked, 
      overallProgress,
      examPassed,
      passExam,
      resetProgress,
      isLoaded
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}
