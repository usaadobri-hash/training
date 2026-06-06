"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock, AlertTriangle, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { finalExamQuestions } from "@/data/exam";
import { useProgress } from "@/context/ProgressContext";
import { useRouter } from "next/navigation";

export default function FinalExamPage() {
  const { completedModules, passExam, isLoaded } = useProgress();
  const router = useRouter();
  
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  // Password state
  const [examPassword, setExamPassword] = useState("");
  const [isPasswordUnlocked, setIsPasswordUnlocked] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const questions = finalExamQuestions;
  const currentQ = questions[currentIdx];

  const handleSelect = (optIdx: number) => {
    setAnswers({ ...answers, [currentIdx]: optIdx });
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      const finalScore = Math.round((Object.values({ ...answers, [currentIdx]: answers[currentIdx] }).filter((ans, i) => ans === questions[i].correctAnswer).length / questions.length) * 100);
      if (finalScore >= 80) {
        passExam();
      }
      setIsFinished(true);
    }
  };

  const score = Math.round((Object.values(answers).filter((ans, i) => ans === questions[i].correctAnswer).length / questions.length) * 100);
  const passed = score >= 80;

  if (!isLoaded) return null;

  if (!isPasswordUnlocked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Exam Locked</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mb-4">Please enter the password to access the final exam.</p>
        <div className="flex items-center gap-2">
          <input 
            type="password"
            value={examPassword}
            onChange={(e) => {
              setExamPassword(e.target.value);
              setPasswordError(false);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (examPassword.toLowerCase() === 'train') setIsPasswordUnlocked(true);
                else setPasswordError(true);
              }
            }}
            placeholder="Enter password"
            className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-transparent text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={() => {
              if (examPassword.toLowerCase() === 'train') setIsPasswordUnlocked(true);
              else setPasswordError(true);
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Unlock
          </button>
        </div>
        {passwordError && <p className="text-red-500 text-sm mt-2">Incorrect password. Please try again.</p>}
        <Link href="/dashboard/modules" className="mt-8 text-sm text-blue-500 hover:underline">
          Return to Curriculum
        </Link>
      </div>
    );
  }

  if (!hasStarted) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500 pb-20">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard">
            <div className="h-10 w-10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-xl flex items-center justify-center border border-black/10 dark:border-white/10 transition-colors">
              <ArrowLeft className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
            </div>
          </Link>
          <div>
            <Badge className="bg-red-500/20 text-red-400 mb-1">Final Assessment</Badge>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Dispatcher Final Exam</h1>
          </div>
        </div>

        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/10 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-zinc-900 dark:text-white">Are you ready?</CardTitle>
            <CardDescription className="text-zinc-500 dark:text-zinc-400 text-lg mt-2">
              This exam consists of {questions.length} questions covering all 13 modules. You must score an 80% or higher to pass and claim your certificate.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-white/5 flex items-center gap-3">
                <Clock className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                <div>
                  <div className="text-sm text-zinc-500">Estimated Time</div>
                  <div className="text-lg font-bold text-zinc-900 dark:text-white">45-60 Mins</div>
                </div>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-white/5 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-green-500 dark:text-green-400" />
                <div>
                  <div className="text-sm text-zinc-500">Passing Score</div>
                  <div className="text-lg font-bold text-zinc-900 dark:text-white">80%</div>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 p-4 rounded-xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 dark:text-amber-200">Once you start, you cannot pause the exam. Please ensure you have a stable internet connection and enough time to complete it.</p>
            </div>

            <button 
              onClick={() => setHasStarted(true)}
              className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)]"
            >
              Start Final Exam
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-in zoom-in-95 duration-500 pb-20 mt-10">
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/10 text-center py-16 px-4 shadow-sm">
          <CardContent className="space-y-8 flex flex-col items-center">
            
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 rounded-full"></div>
              <div className={`inline-flex items-center justify-center w-40 h-40 rounded-full border-8 relative z-10 ${passed ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}`}>
                <span className="text-6xl font-black text-white">{score}%</span>
              </div>
            </div>
            
            <div className="max-w-md mx-auto">
              <h2 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
                {passed ? 'Congratulations!' : 'Almost there!'}
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-lg">
                {passed 
                  ? `You passed the Final Exam! You scored ${score}%, demonstrating your comprehensive knowledge of freight dispatching.`
                  : `You scored ${score}%. You need an 80% to pass. Don't worry, review the material and try again!`
                }
              </p>
            </div>

            <div className="flex justify-center gap-4 pt-8 w-full max-w-sm">
              {!passed ? (
                <button 
                  onClick={() => { setHasStarted(false); setIsFinished(false); setCurrentIdx(0); setAnswers({}); }}
                  className="w-full py-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  Retake Exam
                </button>
              ) : (
                <Link href="/dashboard/certificate" className="w-full">
                  <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2">
                    <Award className="w-6 h-6" /> Claim Certificate
                  </button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-zinc-900 dark:text-white">Final Exam</h1>
        <div className="font-mono text-zinc-400">
          Question {currentIdx + 1} of {questions.length}
        </div>
      </div>

      <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/10 overflow-hidden shadow-xl">
        <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800">
          <div 
            className="h-full bg-blue-500 transition-all duration-300" 
            style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
          />
        </div>
        <CardContent className="p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-10 leading-tight">
            {currentQ.question}
          </h2>
          
          <div className="space-y-4">
            {currentQ.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left p-5 rounded-xl border-2 transition-all ${
                  answers[currentIdx] === idx 
                    ? 'bg-blue-50 dark:bg-blue-600/20 border-blue-500 text-blue-900 dark:text-white scale-[1.01]' 
                    : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600'
                }`}
              >
                <div className="flex items-center gap-4 text-lg">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${answers[currentIdx] === idx ? 'border-blue-500 bg-blue-500' : 'border-zinc-600'}`}>
                    {answers[currentIdx] === idx && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                  </div>
                  {opt}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-12 flex justify-between items-center border-t border-zinc-200 dark:border-white/5 pt-6">
            <button
              onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
              disabled={currentIdx === 0}
              className="px-6 py-3 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30 transition-colors"
            >
              Previous
            </button>
            
            <button
              disabled={answers[currentIdx] === undefined}
              onClick={handleNext}
              className="px-8 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentIdx === questions.length - 1 ? 'Submit Exam' : 'Next Question'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
