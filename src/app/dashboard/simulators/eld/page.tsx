"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, AlertTriangle, CheckCircle2, History, RotateCcw, Truck, Briefcase, Coffee, Moon, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type LogEntry = {
  id: number;
  timeStamp: string;
  action: string;
  duration: number;
};

export default function EldSimulator() {
  const [clock, setClock] = useState({ day: 1, hour: 8 });
  const [driveTime, setDriveTime] = useState(0); // Max 11
  const [shiftTime, setShiftTime] = useState(0); // Max 14
  const [cycleTime, setCycleTime] = useState(0); // Max 70
  const [timeSinceBreak, setTimeSinceBreak] = useState(0); // Max 8
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const formatTime = (hourNum: number) => {
    const h = Math.floor(hourNum);
    const m = hourNum % 1 === 0.5 ? '30' : '00';
    return `${h.toString().padStart(2, '0')}:${m}`;
  };

  const addTime = (hours: number) => {
    setClock(prev => {
      let newHour = prev.hour + hours;
      let newDay = prev.day;
      if (newHour >= 24) {
        newDay += Math.floor(newHour / 24);
        newHour = newHour % 24;
      }
      return { day: newDay, hour: newHour };
    });
  };

  const handleAction = (type: 'Drive' | 'On-Duty' | 'Off-Duty' | '10-Hr Sleep' | '34-Hr Restart', hours: number) => {
    const timeString = `Day ${clock.day}, ${formatTime(clock.hour)}`;
    
    if (type === 'Drive') {
      setDriveTime(p => p + hours);
      setShiftTime(p => p + hours);
      setCycleTime(p => p + hours);
      setTimeSinceBreak(p => p + hours);
    } else if (type === 'On-Duty') {
      setShiftTime(p => p + hours);
      setCycleTime(p => p + hours);
    } else if (type === 'Off-Duty') {
      setShiftTime(p => p + hours); // 14-hr window does not stop!
      setTimeSinceBreak(0); // Any off-duty break resets the 8-hour break clock
    } else if (type === '10-Hr Sleep') {
      setDriveTime(0);
      setShiftTime(0);
      setTimeSinceBreak(0);
      // cycle time remains unchanged
    } else if (type === '34-Hr Restart') {
      setDriveTime(0);
      setShiftTime(0);
      setCycleTime(0);
      setTimeSinceBreak(0);
    }
    
    addTime(hours);
    
    setLogs(prev => [{
      id: Date.now(),
      timeStamp: timeString,
      action: type,
      duration: hours
    }, ...prev]);
  };

  const handleReset = () => {
    setClock({ day: 1, hour: 8 });
    setDriveTime(0);
    setShiftTime(0);
    setCycleTime(0);
    setTimeSinceBreak(0);
    setLogs([]);
  };

  // Remaining Times (Calculated)
  const breakRemaining = Math.max(0, 8 - timeSinceBreak);
  const driveRemaining = Math.max(0, 11 - driveTime);
  const shiftRemaining = Math.max(0, 14 - shiftTime);
  const cycleRemaining = Math.max(0, 70 - cycleTime);

  // Violations
  const isDriveViolation = driveTime > 11;
  const isShiftViolation = shiftTime > 14;
  const isCycleViolation = cycleTime > 70;
  const isBreakViolation = timeSinceBreak > 8;
  
  // Can they legally drive?
  const canDrive = !isDriveViolation && !isShiftViolation && !isCycleViolation && !isBreakViolation;

  // Circular Progress Component
  const CircularRing = ({ remaining, max, label, colorHex, tailwindColor }: { remaining: number, max: number, label: string, colorHex: string, tailwindColor: string }) => {
    const radius = 42;
    const circumference = 2 * Math.PI * radius;
    // Stroke dashoffset for remaining time
    const strokeDashoffset = circumference - (Math.max(0, Math.min(remaining, max)) / max) * circumference;
    
    return (
      <div className="flex flex-col items-center justify-center relative w-[100px] h-[100px] shrink-0">
        <svg className="w-full h-full -rotate-90 transform drop-shadow-lg" viewBox="0 0 100 100">
          {/* Background Track */}
          <circle cx="50" cy="50" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" className="text-zinc-100 dark:text-white/5" />
          {/* Progress Ring */}
          <circle 
            cx="50" cy="50" r={radius} 
            stroke={remaining <= 0 ? '#ef4444' : colorHex} 
            strokeWidth="8" 
            fill="transparent" 
            strokeDasharray={circumference} 
            strokeDashoffset={strokeDashoffset} 
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pt-1">
          <span className={`text-base font-black ${remaining <= 0 ? 'text-red-600 dark:text-red-400 animate-pulse' : 'text-zinc-900 dark:text-white'} leading-none`}>
            {formatTime(remaining)}
          </span>
          <span className={`text-[11px] font-bold mt-0.5`} style={{ color: remaining <= 0 ? '#ef4444' : colorHex }}>
            {label}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/modules">
            <div className="h-10 w-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center border border-white/10 transition-colors">
              <ArrowLeft className="w-5 h-5 text-zinc-300" />
            </div>
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30">HOS Simulator</Badge>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">ELD Dashboard</h1>
          </div>
        </div>
        
        {/* Virtual Clock */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl p-3 px-6 flex items-center gap-4 shadow-sm">
          <Clock className="w-6 h-6 text-blue-500 dark:text-blue-400" />
          <div>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Current Simulation Time</p>
            <p className="text-2xl font-black text-zinc-900 dark:text-white leading-none">Day {clock.day} <span className="text-blue-600 dark:text-blue-400 ml-2">{formatTime(clock.hour)}</span></p>
          </div>
        </div>
      </div>

      {/* Rules Overview Banner */}
      <div className="bg-blue-50 dark:bg-zinc-900 dark:bg-none border border-blue-200 dark:border-white/10 rounded-xl p-6 shadow-sm backdrop-blur-md">
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 dark:bg-white/10 p-3 rounded-full shrink-0">
            <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-blue-900 dark:text-white">Daily Shift vs Weekly Cycle Rules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-zinc-700 dark:text-zinc-400">
              <p><strong className="text-emerald-600 dark:text-emerald-400">11-Hour Drive Limit:</strong> You may drive a maximum of 11 hours after 10 consecutive hours off duty.</p>
              <p><strong className="text-blue-600 dark:text-blue-400">14-Hour Shift Limit:</strong> You may not drive beyond the 14th consecutive hour after coming on duty.</p>
              <p><strong className="text-amber-600 dark:text-amber-400">30-Minute Break:</strong> You must take a 30-minute break before driving more than 8 consecutive hours.</p>
              <p><strong className="text-purple-600 dark:text-purple-400">70-Hour Cycle Limit:</strong> You may not drive after 70 hours on duty in 8 days. A 34-hour restart resets this cycle.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Clocks & Controls */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/10 shadow-sm overflow-hidden">
            <CardHeader className="bg-zinc-50 dark:bg-black/20 border-b border-zinc-200 dark:border-white/5 pb-4">
              <CardTitle className="text-zinc-900 dark:text-white flex items-center justify-between">
                <span>Active Clocks <span className="text-xs text-zinc-400 dark:text-zinc-500 ml-2 font-normal">(Time Remaining)</span></span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              
              {/* Circular Progress Row */}
              <div className="flex items-center justify-between sm:justify-around flex-wrap gap-4">
                <CircularRing remaining={breakRemaining} max={8} label="Break" colorHex="#f59e0b" tailwindColor="text-amber-500" />
                <CircularRing remaining={driveRemaining} max={11} label="Drive" colorHex="#10b981" tailwindColor="text-emerald-500" />
                <CircularRing remaining={shiftRemaining} max={14} label="Shift" colorHex="#3b82f6" tailwindColor="text-blue-500" />
                <CircularRing remaining={cycleRemaining} max={70} label="Cycle" colorHex="#a855f7" tailwindColor="text-purple-500" />
              </div>

            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/10 shadow-sm overflow-hidden">
            <CardHeader className="bg-zinc-50 dark:bg-black/20 border-b border-zinc-200 dark:border-white/5 pb-4">
              <CardTitle className="text-zinc-900 dark:text-white">Logbook Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {/* Drive Button */}
                <button 
                  onClick={() => handleAction('Drive', 1)}
                  className="p-4 bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 rounded-xl transition-all text-left group"
                >
                  <Truck className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                  <p className="font-bold text-emerald-900 dark:text-white">Drive 1 hr</p>
                  <p className="text-[10px] text-emerald-600/70 dark:text-emerald-400/70 uppercase font-bold mt-1 tracking-wider">+1 hr to all clocks</p>
                </button>

                {/* On Duty Button */}
                <button 
                  onClick={() => handleAction('On-Duty', 1)}
                  className="p-4 bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 rounded-xl transition-all text-left group"
                >
                  <Briefcase className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                  <p className="font-bold text-blue-900 dark:text-white">On-Duty 1 hr</p>
                  <p className="text-[10px] text-blue-600/70 dark:text-blue-400/70 uppercase font-bold mt-1 tracking-wider">Load/Fuel. +1 hr to Shift & Cycle</p>
                </button>

                {/* Off Duty Button */}
                <button 
                  onClick={() => handleAction('Off-Duty', 1)}
                  className="p-4 bg-zinc-100 dark:bg-zinc-500/10 hover:bg-zinc-200 dark:hover:bg-zinc-500/20 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-500/30 rounded-xl transition-all text-left group"
                >
                  <Coffee className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                  <p className="font-bold text-zinc-900 dark:text-white">Break 1 hr</p>
                  <p className="text-[10px] text-zinc-500/70 dark:text-zinc-400/70 uppercase font-bold mt-1 tracking-wider">+1 hr to Shift window only</p>
                </button>

                {/* 10-Hr Sleep Button */}
                <button 
                  onClick={() => handleAction('10-Hr Sleep', 10)}
                  className="p-4 bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 rounded-xl transition-all text-left group md:col-span-1"
                >
                  <Moon className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                  <p className="font-bold text-indigo-900 dark:text-white">10-Hr Sleep</p>
                  <p className="text-[10px] text-indigo-600/70 dark:text-indigo-400/70 uppercase font-bold mt-1 tracking-wider">Resets 11hr & 14hr clocks</p>
                </button>

                {/* 34-Hr Restart Button */}
                <button 
                  onClick={() => handleAction('34-Hr Restart', 34)}
                  className="p-4 bg-purple-50 dark:bg-purple-500/10 hover:bg-purple-100 dark:hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/30 rounded-xl transition-all text-left group md:col-span-2"
                >
                  <RotateCcw className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                  <p className="font-bold text-purple-900 dark:text-white">34-Hour Restart</p>
                  <p className="text-[10px] text-purple-600/70 dark:text-purple-400/70 uppercase font-bold mt-1 tracking-wider">Resets EVERYTHING including 70hr cycle</p>
                </button>
              </div>

            </CardContent>
          </Card>
        </div>

        {/* Right Column: Status & Logs */}
        <div className="space-y-6">
          <Card className={`${canDrive ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-500/30' : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-500/30'} shadow-sm`}>
            <CardHeader className="pb-4">
              <CardTitle className="text-zinc-900 dark:text-white">Compliance Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isDriveViolation && (
                  <div className="flex items-start gap-3 text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950 p-4 rounded-lg border border-red-300 dark:border-red-500/20 shadow-inner">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="text-sm font-medium">HOS Violation! Exceeded 11 hours of driving. Requires 10-Hr Sleep.</p>
                  </div>
                )}
                
                {isShiftViolation && (
                  <div className="flex items-start gap-3 text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950 p-4 rounded-lg border border-red-300 dark:border-red-500/20 shadow-inner">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="text-sm font-medium">HOS Violation! 14-hour shift window expired. Requires 10-Hr Sleep before driving again.</p>
                  </div>
                )}

                {isBreakViolation && (
                  <div className="flex items-start gap-3 text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950 p-4 rounded-lg border border-red-300 dark:border-red-500/20 shadow-inner">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="text-sm font-medium">HOS Violation! Drove more than 8 hours without a break. Requires a 30-min break (Off-Duty).</p>
                  </div>
                )}

                {isCycleViolation && (
                  <div className="flex items-start gap-3 text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950 p-4 rounded-lg border border-red-300 dark:border-red-500/20 shadow-inner">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="text-sm font-medium">HOS Violation! Exceeded 70-Hour Cycle limit. Requires 34-Hour Restart.</p>
                  </div>
                )}

                {canDrive && (
                  <div className="flex flex-col items-center justify-center text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 p-6 rounded-lg border border-emerald-300 dark:border-emerald-500/20">
                    <CheckCircle2 className="w-12 h-12 mb-3 drop-shadow-[0_0_15px_rgba(16,185,129,0.2)] dark:drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                    <p className="font-black text-xl">Fully Compliant</p>
                    <p className="text-sm text-center mt-1 text-emerald-600/80 dark:text-emerald-400/80">The driver is legal to operate.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/10 shadow-sm overflow-hidden flex flex-col h-[400px]">
            <CardHeader className="bg-zinc-50 dark:bg-black/20 border-b border-zinc-200 dark:border-white/5 pb-4 shrink-0 flex flex-row items-center justify-between">
              <CardTitle className="text-zinc-900 dark:text-white text-lg">ELD Log History</CardTitle>
              <button onClick={handleReset} className="text-xs text-red-400 hover:text-red-300 font-bold uppercase tracking-wider bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                Clear Logs
              </button>
            </CardHeader>
            <CardContent className="p-0 overflow-y-auto flex-1 custom-scrollbar">
              {logs.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-zinc-500 p-6 text-center">
                  <History className="w-8 h-8 mb-2 opacity-50" />
                  <p>No logs recorded yet.</p>
                  <p className="text-sm mt-1">Press an action to start the simulation.</p>
                </div>
              ) : (
                <div className="divide-y divide-zinc-200 dark:divide-white/5">
                  {logs.map(log => (
                    <div key={log.id} className="p-4 hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors flex items-center justify-between">
                      <div>
                        <p className="text-zinc-900 dark:text-white font-bold">{log.action}</p>
                        <p className="text-xs text-zinc-500 font-mono mt-0.5">{log.timeStamp}</p>
                      </div>
                      <Badge variant="outline" className="border-zinc-300 dark:border-white/10 text-zinc-600 dark:text-zinc-300">
                        {log.duration} hr{log.duration !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}

