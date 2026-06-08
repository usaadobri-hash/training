"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Scaling, CheckSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { trailersData } from "@/data/trailers";

import TrailerCard from "./components/TrailerCard";
import ComparisonTables from "./components/ComparisonTables";
import TrailerQuiz from "./components/TrailerQuiz";

export default function TrailerTypesModule() {
  const [activeTab, setActiveTab] = useState<"library" | "compare" | "quiz">("library");

  return (
    <div className="max-w-7xl mx-auto pb-24 animate-in fade-in duration-500">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-zinc-900 mb-10 border border-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-transparent z-10" />
        <div 
          className="absolute inset-0 z-0 opacity-40 bg-cover bg-center" 
          style={{ backgroundImage: "url('/trailers/flatbed_hero.png')" }} 
        />
        <div className="relative z-20 p-8 md:p-12">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/dashboard">
              <div className="h-10 w-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 transition-colors">
                <ArrowLeft className="w-5 h-5 text-white" />
              </div>
            </Link>
            <Badge className="bg-blue-500/20 text-blue-300 border border-blue-500/30 backdrop-blur-md">Premium Module</Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">Trailer Types Masterclass</h1>
          <p className="text-lg text-zinc-300 max-w-3xl leading-relaxed font-light">
            As a professional freight dispatcher, your success depends entirely on understanding equipment capabilities. Booking the wrong freight for a trailer leads to rejected loads, massive fines, or catastrophic accidents. Master these 11 trailer configurations to become an elite dispatcher.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-10 p-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 max-w-fit">
        <button 
          onClick={() => setActiveTab("library")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all ${activeTab === 'library' ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm border border-zinc-200 dark:border-zinc-700' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'}`}
        >
          <BookOpen className="w-4 h-4" /> Equipment Library
        </button>
        <button 
          onClick={() => setActiveTab("compare")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all ${activeTab === 'compare' ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm border border-zinc-200 dark:border-zinc-700' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'}`}
        >
          <Scaling className="w-4 h-4" /> Compare Specs
        </button>
        <button 
          onClick={() => setActiveTab("quiz")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all ${activeTab === 'quiz' ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm border border-zinc-200 dark:border-zinc-700' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'}`}
        >
          <CheckSquare className="w-4 h-4" /> Identification Quiz
        </button>
      </div>

      {/* Content Areas */}
      <div className="animate-in slide-in-from-bottom-4 duration-500">
        
        {activeTab === "library" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Equipment Library</h2>
            {trailersData.map(trailer => (
              <TrailerCard key={trailer.id} trailer={trailer} />
            ))}
          </div>
        )}

        {activeTab === "compare" && (
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Spec Comparisons</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8">Quick reference tables for when brokers ask specific dimension questions.</p>
            <ComparisonTables />
          </div>
        )}

        {activeTab === "quiz" && (
          <div className="max-w-3xl mx-auto pt-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-3">Test Your Knowledge</h2>
              <p className="text-zinc-500 dark:text-zinc-400">Can you identify these trailers just by looking at them? This is a critical skill for any dispatcher.</p>
            </div>
            <TrailerQuiz />
          </div>
        )}

      </div>
    </div>
  );
}
