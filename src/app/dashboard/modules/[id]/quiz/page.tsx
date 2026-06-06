"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { quizzes } from "@/data/quizzes";
import { useProgress } from "@/context/ProgressContext";
import { ClientModuleLock } from "@/components/ClientModuleLock";

export default function QuizPage() {
  const params = useParams();
  const moduleId = parseInt(params.id as string, 10);
  const { completeModule } = useProgress();
  
  const quizData = quizzes.find(q => q.moduleId === moduleId);
  
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!quizData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Quiz Not Found</h1>
        <p className="text-zinc-500 dark:text-zinc-400">There is no quiz available for this module yet.</p>
        <Link href="/dashboard/modules">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Return</button>
        </Link>
      </div>
    );
  }

  const questions = quizData.questions;
  const currentQuestion = questions[currentQuestionIdx];

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({ ...selectedAnswers, [currentQuestionIdx]: optIdx });
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) correct++;
    });
    return Math.round((correct / questions.length) * 100);
  };

  const handleNext = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      const finalScore = calculateScore();
      if (finalScore >= 70) { // 70% passing grade
        completeModule(moduleId.toString(), finalScore);
      }
      setIsSubmitted(true);
    }
  };

  return (
    <ClientModuleLock moduleId={moduleId.toString()}>
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center gap-4">
        <Link href={`/dashboard/modules/${moduleId}`}>
          <div className="h-10 w-10 bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 rounded-xl flex items-center justify-center border border-zinc-200 dark:border-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
          </div>
        </Link>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400">Knowledge Check</Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">{quizData.title}</h1>
        </div>
      </div>

      {!isSubmitted ? (
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/10 overflow-hidden shadow-sm">
          <div className="h-1 w-full bg-zinc-100 dark:bg-zinc-800">
            <div 
              className="h-full bg-purple-500 transition-all duration-300" 
              style={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
            />
          </div>
          <CardContent className="p-8">
            <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 font-medium">Question {currentQuestionIdx + 1} of {questions.length}</div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8 leading-tight">{currentQuestion.question}</h2>
            
            <div className="space-y-3">
              {currentQuestion.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedAnswers[currentQuestionIdx] === idx 
                      ? 'bg-purple-50 dark:bg-purple-600/20 border-purple-500 text-purple-900 dark:text-white shadow-sm' 
                      : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 hover:border-zinc-300 dark:hover:border-zinc-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedAnswers[currentQuestionIdx] === idx ? 'border-purple-500 bg-purple-500' : 'border-zinc-300 dark:border-zinc-500'}`}>
                      {selectedAnswers[currentQuestionIdx] === idx && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    {opt}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                disabled={selectedAnswers[currentQuestionIdx] === undefined}
                onClick={handleNext}
                className="px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black font-medium rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {currentQuestionIdx === questions.length - 1 ? 'Submit Quiz' : 'Next Question'}
              </button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/10 text-center py-12 shadow-sm">
          <CardContent className="space-y-6">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-zinc-100 dark:bg-zinc-800 border-4 border-zinc-200 dark:border-zinc-700 shadow-inner">
              <span className="text-4xl font-bold text-zinc-900 dark:text-white">{calculateScore()}%</span>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Quiz Completed!</h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                You got {Object.values(selectedAnswers).filter((ans, idx) => ans === questions[idx].correctAnswer).length} out of {questions.length} correct.
              </p>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <Link href="/dashboard/modules">
                <button className="px-6 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-transparent font-medium rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors shadow-sm dark:shadow-none">
                  Back to Modules
                </button>
              </Link>
              {calculateScore() >= 80 && (
                <Link href={moduleId === 13 ? "/dashboard/exam" : `/dashboard/modules/${moduleId + 1}`}>
                  <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-500 transition-colors">
                    {moduleId === 13 ? "Take Final Exam" : "Next Module"}
                  </button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
    </ClientModuleLock>
  );
}
