"use client";

import { signout } from "@/app/auth/actions";
import Link from "next/link";
import { Truck, LayoutDashboard, BookOpen, Map, Award, Settings, LogOut, CheckCircle2, Globe, Menu, X } from "lucide-react";
import { useProgress } from "@/context/ProgressContext";
import { useState } from "react";

export function Sidebar() {
  const { overallProgress } = useProgress();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Header (Hidden on Desktop) */}
      <div className="md:hidden fixed top-0 left-0 w-full h-16 bg-white dark:bg-zinc-950 border-b border-black/10 dark:border-white/10 z-50 flex items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setIsMobileOpen(false)}>
          <div className="flex flex-col leading-none italic font-black tracking-tighter">
            <span className="text-xl text-red-600">SARAY</span>
            <span className="text-lg text-blue-700">EXPRESS INC</span>
          </div>
        </Link>
        <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="p-2 text-zinc-900 dark:text-white focus:outline-none">
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Actual Sidebar */}
      <div className={`h-[100dvh] w-64 bg-white dark:bg-zinc-950 border-r border-black/10 dark:border-white/10 flex flex-col fixed top-0 left-0 transition-transform duration-300 z-50 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      {/* Header */}
      <div className="p-6 shrink-0">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex flex-col leading-none italic font-black tracking-tighter">
            <span className="text-2xl text-red-600">SARAY</span>
            <span className="text-xl text-blue-700">EXPRESS INC</span>
          </div>
        </Link>
      </div>

      {/* Scrollable Content */}
      <div 
        className="flex-1 overflow-y-auto px-3 py-2 space-y-6 custom-scrollbar"
        onClick={() => setIsMobileOpen(false)}
      >
        
        {/* Main Menu */}
        <div>
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-3">Menu</div>
          <div className="space-y-1">
            <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link href="/dashboard/modules" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <BookOpen className="w-5 h-5" />
              <span>Curriculum</span>
            </Link>
          </div>
        </div>

        {/* Assessments */}
        <div>
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-3">Assessments</div>
          <div className="space-y-1">
            <Link href="/dashboard/exam" className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white transition-colors text-sm">
              <BookOpen className="w-4 h-4 text-rose-500" />
              <span>Final Exam</span>
            </Link>
            <Link href="/dashboard/certificate" className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white transition-colors text-sm">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Certificate</span>
            </Link>
          </div>
        </div>

        {/* Simulators */}
        <div>
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-3">Simulators</div>
          <div className="space-y-1">
            <Link href="/dashboard/simulators/usa-map" className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white transition-colors text-sm">
              <Globe className="w-4 h-4 text-blue-400" />
              <span>US States Map</span>
            </Link>
            <Link href="/dashboard/simulators/truck-parts" className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white transition-colors text-sm">
              <Truck className="w-4 h-4 text-zinc-500" />
              <span>Truck Parts</span>
            </Link>
            <Link href="/dashboard/simulators/axle" className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white transition-colors text-sm">
              <Truck className="w-4 h-4 text-amber-500" />
              <span>Axle Weights</span>
            </Link>
            <Link href="/dashboard/simulators/eld" className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white transition-colors text-sm">
              <CheckCircle2 className="w-4 h-4 text-blue-500" />
              <span>ELD & HOS</span>
            </Link>
            <Link href="/dashboard/simulators/broker" className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white transition-colors text-sm">
              <Map className="w-4 h-4 text-purple-500" />
              <span>AI Broker</span>
            </Link>
          </div>
        </div>


        
        {/* Account Settings */}
        <div>
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-3">Account</div>
          <div className="space-y-1">
            <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white transition-colors text-sm">
              <Settings className="w-4 h-4 text-zinc-400" />
              <span>Settings</span>
            </Link>
          </div>
        </div>

      </div>

      {/* Footer Profile & Logout */}
      <div className="p-4 border-t border-black/10 dark:border-white/10 shrink-0 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md">
        


        {/* Profile Card */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center">
              <span className="text-sm font-medium text-zinc-900 dark:text-white">JS</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">John Student</p>
              <p className="text-xs text-zinc-500 truncate">Week 1 - Foundations</p>
            </div>
          </div>
          
          <form action={signout}>
            <button type="submit" className="p-2 rounded-lg text-zinc-400 dark:text-zinc-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer" title="Logout">
              <LogOut className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
