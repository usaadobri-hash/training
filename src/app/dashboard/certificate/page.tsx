"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Printer, Award, CheckCircle2, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProgress } from "@/context/ProgressContext";

export default function CertificatePage() {
  const { examPassed, isLoaded } = useProgress();
  const [date, setDate] = useState("");
  const [certId, setCertId] = useState("");

  useEffect(() => {
    // Generate a unique ID and current date on mount
    const today = new Date();
    setDate(today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
    setCertId("DA-" + Math.random().toString(36).substr(2, 9).toUpperCase());
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!isLoaded) return null;

  if (!examPassed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Certificate Locked</h1>
        <p className="text-zinc-500 dark:text-zinc-400">You must pass the Final Exam to view your certificate.</p>
        <Link href="/dashboard/exam">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Go to Final Exam</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500 pb-20 print:p-0 print:m-0">
      
      {/* Non-printable header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 print:hidden">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <div className="h-10 w-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center border border-white/10 transition-colors">
              <ArrowLeft className="w-5 h-5 text-zinc-300" />
            </div>
          </Link>
          <div>
            <Badge className="bg-green-500/20 text-green-400 mb-1">Passed Assessment</Badge>
            <h1 className="text-3xl font-bold tracking-tight text-white">Your Certificate</h1>
          </div>
        </div>
        
        <button 
          onClick={handlePrint}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] flex items-center gap-2"
        >
          <Printer className="w-5 h-5" /> Print / Save as PDF
        </button>
      </div>

      {/* The Certificate itself */}
      <div className="bg-zinc-900 border border-white/10 p-4 sm:p-12 rounded-3xl print:border-none print:bg-white print:p-0 print:m-0 print:shadow-none overflow-hidden relative">
        
        {/* Certificate Border Design */}
        <div className="absolute inset-0 m-4 sm:m-8 border-[12px] border-double border-zinc-700/50 print:border-zinc-300 print:m-4 rounded-xl pointer-events-none"></div>
        <div className="absolute inset-0 m-6 sm:m-10 border border-zinc-600/30 print:border-zinc-200 print:m-6 rounded-lg pointer-events-none"></div>

        <CardContent className="relative z-10 p-8 sm:p-16 text-center flex flex-col items-center justify-center min-h-[600px] print:min-h-0 print:text-black">
          
          <div className="mb-8">
            <Award className="w-24 h-24 text-blue-500 mx-auto print:text-blue-700" />
          </div>

          <h1 className="text-5xl sm:text-6xl font-serif text-white tracking-widest uppercase mb-4 print:text-black">
            Certificate
          </h1>
          <h2 className="text-xl sm:text-2xl text-zinc-400 tracking-widest uppercase mb-12 print:text-zinc-600">
            Of Completion
          </h2>

          <p className="text-zinc-400 italic text-lg mb-4 print:text-zinc-600">This is to proudly certify that</p>
          
          <div className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 pb-2 mb-4 border-b border-white/10 min-w-[300px] px-12 print:border-zinc-300 print:bg-none print:text-black print:pb-4">
            John Doe
          </div>

          <p className="text-zinc-400 text-lg max-w-xl mx-auto leading-relaxed mb-16 print:text-zinc-700">
            Has successfully completed the comprehensive 3-Week Professional Freight Dispatcher Training Academy, including all modules, simulators, and the 100-question final assessment.
          </p>

          <div className="w-full flex justify-between items-end px-4 sm:px-12 mt-8">
            <div className="flex flex-col items-center">
              <div className="w-40 border-b border-white/20 pb-2 mb-2 print:border-zinc-400 text-lg text-white font-signature print:text-black">
                Y. Isroilov
              </div>
              <span className="text-sm text-zinc-500 uppercase tracking-widest print:text-zinc-500">Lead Instructor</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-32 border-b border-white/20 pb-2 mb-2 print:border-zinc-400 text-lg text-white print:text-black font-mono">
                {date}
              </div>
              <span className="text-sm text-zinc-500 uppercase tracking-widest print:text-zinc-500">Date Issued</span>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="absolute bottom-8 right-8 flex items-center gap-2 opacity-50 print:opacity-100">
            <CheckCircle2 className="w-4 h-4 text-green-500 print:text-green-600" />
            <span className="text-xs font-mono text-zinc-500 print:text-zinc-600">VERIFIED ID: {certId}</span>
          </div>

        </CardContent>
      </div>

      <style jsx global>{`
        @media print {
          @page { size: landscape; margin: 0; }
          body { 
            background: white !important; 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important;
          }
          nav, aside, header { display: none !important; }
        }
      `}</style>
    </div>
  );
}
