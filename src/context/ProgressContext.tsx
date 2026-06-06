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
      
      const loadLocal = () => {
        const savedCompleted = localStorage.getItem("da_completedModules");
        const savedScores = localStorage.getItem("da_quizScores");
        const savedExam = localStorage.getItem("da_examPassed");
        if (savedCompleted) {
          try { setCompletedModules(JSON.parse(savedCompleted)); } catch(e){}
        }
        if (savedScores) {
          try { setQuizScores(JSON.parse(savedScores)); } catch(e){}
        }
        if (savedExam === "true") {
          setExamPassed(true);
        }
      };

      if (user) {
        try {
          const { data, error } = await supabase
            .from('user_progress')
            .select('*')
            .eq('user_id', user.id)
            .single();
          
          if (data) {
            setCompletedModules(data.completed_modules || []);
            setQuizScores(data.quiz_scores || []);
            setExamPassed(data.exam_passed || false);
          } else if (error && error.code === 'PGRST116') {
            // No row exists, insert one
            await supabase.from('user_progress').insert({
              user_id: user.id,
              completed_modules: [],
              quiz_scores: [],
              exam_passed: false
            });
          } else {
            console.error("Supabase fetch error, falling back to local storage:", error);
            loadLocal();
          }
        } catch (err) {
          console.error("Supabase connection error:", err);
          loadLocal();
        }
      } else {
        loadLocal();
      }
      setIsLoaded(true);
    };

    loadData();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("da_completedModules", JSON.stringify(completedModules));
      localStorage.setItem("da_quizScores", JSON.stringify(quizScores));
      localStorage.setItem("da_examPassed", examPassed ? "true" : "false");

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
    localStorage.removeItem("da_completedModules");
    localStorage.removeItem("da_quizScores");
    localStorage.removeItem("da_examPassed");
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
