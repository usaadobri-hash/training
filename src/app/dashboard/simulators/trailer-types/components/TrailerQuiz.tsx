"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, XCircle, RefreshCw } from "lucide-react";

type Question = {
  id: number;
  image: string;
  options: string[];
  correct: string;
};

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    image: "/trailers/conestoga_hero.png",
    options: ["Dry Van", "Conestoga", "Step Deck", "Reefer"],
    correct: "Conestoga"
  },
  {
    id: 2,
    image: "/trailers/step_deck_loaded.png",
    options: ["RGN", "Flatbed", "Step Deck", "Lowboy"],
    correct: "Step Deck"
  },
  {
    id: 3,
    image: "/trailers/reefer_hero.png",
    options: ["Reefer", "Dry Van", "Tanker", "Hopper Bottom"],
    correct: "Reefer"
  },
  {
    id: 4,
    image: "/trailers/lowboy_loaded.png",
    options: ["Step Deck", "Flatbed", "Conestoga", "Lowboy"],
    correct: "Lowboy"
  }
];

export default function TrailerQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (option: string) => {
    if (selected) return; // Prevent double click
    setSelected(option);
    
    if (option === QUIZ_QUESTIONS[currentQ].correct) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      if (currentQ < QUIZ_QUESTIONS.length - 1) {
        setCurrentQ(q => q + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 text-center animate-in zoom-in duration-300">
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Quiz Complete!</h3>
        <p className="text-zinc-500 dark:text-zinc-400 mb-6">You scored {score} out of {QUIZ_QUESTIONS.length}.</p>
        
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-8">
          <span className="text-3xl font-black text-blue-600 dark:text-blue-400">{Math.round((score/QUIZ_QUESTIONS.length)*100)}%</span>
        </div>

        <div>
          <button 
            onClick={resetQuiz}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium mx-auto"
          >
            <RefreshCw className="w-4 h-4" /> Try Again
          </button>
        </div>
      </div>
    );
  }

  const question = QUIZ_QUESTIONS[currentQ];

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-950">
        <h3 className="font-bold text-zinc-900 dark:text-white">Trailer Identification Quiz</h3>
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Question {currentQ + 1} of {QUIZ_QUESTIONS.length}</span>
      </div>

      <div className="p-6">
        <div className="mb-6 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 relative aspect-video bg-zinc-100 dark:bg-zinc-800">
           <Image src={question.image} alt="Identify this trailer" fill className="object-cover" unoptimized />
        </div>

        <h4 className="text-lg font-medium text-zinc-900 dark:text-white mb-4 text-center">Identify the trailer type shown above:</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {question.options.map((opt, i) => {
            const isSelected = selected === opt;
            const isCorrect = opt === question.correct;
            const showStatus = selected !== null;
            
            let btnClass = "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300";
            
            if (showStatus) {
              if (isCorrect) {
                btnClass = "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400";
              } else if (isSelected && !isCorrect) {
                btnClass = "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400";
              } else {
                btnClass = "opacity-50 border-zinc-200 dark:border-zinc-700";
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(opt)}
                disabled={selected !== null}
                className={`p-4 rounded-xl border-2 text-left font-medium transition-all flex justify-between items-center ${btnClass}`}
              >
                {opt}
                {showStatus && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                {showStatus && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  );
}
