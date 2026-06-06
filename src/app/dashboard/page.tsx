"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, PlayCircle, Trophy, FileText, ArrowUpRight, Award } from "lucide-react";
import Link from "next/link";
import { useProgress } from "@/context/ProgressContext";
import { curriculumModules } from "@/data/modules";

export default function DashboardPage() {
  const { overallProgress, completedModules, quizScores, isModuleUnlocked } = useProgress();

  // Find the highest unlocked module that isn't completed yet, or the very last module
  let currentModuleId = "1";
  for (let i = 0; i < curriculumModules.length; i++) {
    const m = curriculumModules[i];
    const mIdStr = m.id.toString();
    if (isModuleUnlocked(mIdStr)) {
      currentModuleId = mIdStr;
      if (!completedModules.includes(mIdStr)) {
        break; // First unlocked but not completed
      }
    }
  }

  const currentModule = curriculumModules.find(m => m.id.toString() === currentModuleId) || curriculumModules[0];
  
  // Format recent scores
  const recentScores = [...quizScores].reverse().slice(0, 3).map(score => {
    const mod = curriculumModules.find(m => m.id.toString() === score.moduleId);
    return {
      name: mod ? mod.title : `Module ${score.moduleId}`,
      score: score.score,
      date: score.date
    };
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">Welcome back!</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Here's an overview of your training progress.</p>
      </div>

      <div className="space-y-6">
        <Card className="bg-white dark:bg-white/5 border-zinc-200 dark:border-white/10 backdrop-blur-xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-zinc-900 dark:text-white">Current Module</CardTitle>
            <CardDescription className="text-zinc-500 dark:text-zinc-400">Module {currentModule.id}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">{currentModule.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">Continue your training to finish the course.</p>
                <div className="flex items-center gap-2">
                  {completedModules.includes(currentModule.id.toString()) ? (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Completed</Badge>
                  ) : (
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30">In Progress</Badge>
                  )}
                </div>
              </div>
              <Link href={`/dashboard/modules/${currentModule.id}`}>
                <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                  <PlayCircle className="w-5 h-5" />
                  Continue Learning
                </button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
