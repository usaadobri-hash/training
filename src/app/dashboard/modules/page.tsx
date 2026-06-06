"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, CheckCircle2, PlayCircle, Lock } from "lucide-react";
import Link from "next/link";
import { useProgress } from "@/context/ProgressContext";

export default function ModulesPage() {
  const { isModuleUnlocked, completedModules, quizScores } = useProgress();

  const weeks = [
    {
      title: "Week 1 - Foundations",
      modules: [
        { id: 1, title: "Truck Drivers & Operations" },
        { id: 2, title: "Stakeholders in Trucking" },
        { id: 3, title: "Truck Types & Parts" },
        { id: 4, title: "Freight Types" },
      ]
    },
    {
      title: "Week 2 - Dispatcher Core",
      modules: [
        { id: 5, title: "Documents & Requirements" },
        { id: 6, title: "Safety & FMCSA" },
        { id: 7, title: "ELD & HOS" },
        { id: 8, title: "Load Securement" },
      ]
    },
    {
      title: "Week 3 - Real Dispatching",
      modules: [
        { id: 9, title: "Load Boards" },
        { id: 10, title: "Broker Communication" },
        { id: 11, title: "Dispatch Workflow" },
        { id: 12, title: "Update Department" },
        { id: 13, title: "Final Dispatcher Simulation" },
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">Curriculum</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Master the art of dispatching in three comprehensive weeks.</p>
      </div>

      <div className="space-y-12">
        {weeks.map((week, weekIdx) => (
          <div key={weekIdx} className="space-y-6">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-white/10 pb-4">{week.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {week.modules.map((module) => {
                const moduleIdStr = module.id.toString();
                const unlocked = isModuleUnlocked(moduleIdStr);
                const completed = completedModules.includes(moduleIdStr);

                return (
                  <Card 
                    key={module.id} 
                    className={`bg-white dark:bg-white/5 border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none backdrop-blur-xl transition-all ${unlocked ? 'hover:bg-zinc-50 dark:hover:bg-white/10' : 'opacity-50'}`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center border border-zinc-200 dark:border-white/5 ${completed ? 'bg-green-100 dark:bg-green-500/20' : unlocked ? 'bg-blue-100 dark:bg-blue-500/20' : 'bg-zinc-100 dark:bg-zinc-800'}`}>
                          {completed ? (
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                          ) : unlocked ? (
                            <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          ) : (
                            <Lock className="w-5 h-5 text-zinc-400 dark:text-zinc-500" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardTitle className="text-lg text-zinc-900 dark:text-white mb-2">Module {module.id}</CardTitle>
                      <CardDescription className="text-zinc-500 dark:text-zinc-300 font-medium">{module.title}</CardDescription>
                      
                      <div className="mt-6">
                        {unlocked ? (
                          <Link href={`/dashboard/modules/${module.id}`}>
                            <button className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${completed ? 'bg-zinc-100 dark:bg-white/10 hover:bg-zinc-200 dark:hover:bg-white/20 text-zinc-900 dark:text-white' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]'}`}>
                              {completed ? <CheckCircle2 className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
                              {completed ? 'Review Lesson' : 'Start Lesson'}
                            </button>
                          </Link>
                        ) : (
                          <button disabled className="w-full py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 bg-zinc-50 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 cursor-not-allowed border border-zinc-200 dark:border-white/5">
                            <Lock className="w-4 h-4" />
                            Locked
                          </button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
