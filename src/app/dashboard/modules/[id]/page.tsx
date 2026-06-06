import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { ArrowLeft, CheckCircle2, PlayCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { curriculumModules } from "@/data/modules";
import { ClientModuleLock } from "@/components/ClientModuleLock";

// This would normally come from a database, but we are reading from the static file for the curriculum.
export default async function ModulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const moduleId = parseInt(id, 10);
  const moduleData = curriculumModules.find(m => m.id === moduleId);

  if (!moduleData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Module Not Found</h1>
        <p className="text-zinc-500 dark:text-zinc-400">This module is either locked or does not exist.</p>
        <Link href="/dashboard/modules">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Return to Curriculum</button>
        </Link>
      </div>
    );
  }

  return (
    <ClientModuleLock moduleId={moduleData.id.toString()}>
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/modules">
          <div className="h-10 w-10 bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 rounded-xl flex items-center justify-center border border-zinc-200 dark:border-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
          </div>
        </Link>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">Module {moduleData.id}</Badge>
            <span className="text-zinc-500 text-sm">Reading Material</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">{moduleData.title}</h1>
        </div>
      </div>

      <Card className="bg-white/80 dark:bg-zinc-900/50 border-zinc-200 dark:border-white/5 shadow-sm backdrop-blur-xl overflow-hidden">
        <CardContent className="p-8 sm:p-12">
          <div className="prose dark:prose-invert prose-blue max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-10 prose-h2:border-b prose-h2:border-zinc-200 dark:prose-h2:border-white/10 prose-h2:pb-2 prose-p:leading-relaxed">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{moduleData.content}</ReactMarkdown>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/20 rounded-2xl p-6">
        <div>
          <p className="text-amber-700/80 dark:text-amber-400/80 font-medium mb-6">Ready to test your knowledge? Let&apos;s take the quiz.</p>
        </div>
        <Link href={`/dashboard/modules/${moduleData.id}/quiz`} className="shrink-0">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-all shadow-[0_0_15px_rgba(59,130,246,0.4)] flex items-center gap-2">
            <PlayCircle className="w-5 h-5" /> Start Quiz
          </button>
        </Link>
      </div>
      <div className="flex justify-between items-center pt-8 border-t border-zinc-200 dark:border-white/10 mt-8">
        {moduleData.id > 1 ? (
          <Link href={`/dashboard/modules/${moduleData.id - 1}`}>
            <button className="px-4 py-2 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white rounded-lg flex items-center gap-2 text-sm font-medium transition-colors border border-zinc-200 dark:border-transparent shadow-sm dark:shadow-none">
              <ArrowLeft className="w-4 h-4" /> Previous Lesson
            </button>
          </Link>
        ) : <div />}
        
        {moduleData.id < 13 ? (
          <Link href={`/dashboard/modules/${moduleData.id + 1}`}>
            <button className="px-4 py-2 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white rounded-lg flex items-center gap-2 text-sm font-medium transition-colors border border-zinc-200 dark:border-transparent shadow-sm dark:shadow-none">
              Next Lesson <PlayCircle className="w-4 h-4" />
            </button>
          </Link>
        ) : <div />}
      </div>
    </div>
    </ClientModuleLock>
  );
}
