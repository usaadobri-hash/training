"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Scale, AlertTriangle, CheckCircle2, RefreshCw, BookOpen, Activity, ArrowRight, ArrowLeft as ArrowLeftIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RealisticTruck = ({ steerLabel, driveLabel, tandemLabel, title, driveOffset = 0, tandemOffset = 0, arrowType = null, arrowPos = null }: any) => {
  return (
    <div className="space-y-6">
      <h3 className="text-center font-extrabold text-2xl text-zinc-800 dark:text-white">{title}</h3>
      <div className="relative border-b-2 border-zinc-200 dark:border-zinc-800 pb-12 pt-10">
        <div className="flex items-end justify-center gap-2">
          
          {/* CAB */}
          <div className="w-24 h-28 bg-gradient-to-b from-red-500 to-red-700 dark:from-red-600 dark:to-red-900 rounded-tl-3xl rounded-tr-xl flex flex-col justify-end p-2 relative shadow-[5px_0_15px_rgba(0,0,0,0.2)] border-r border-red-800 dark:border-red-950 z-20">
            {/* Window */}
            <div className="absolute top-2 right-1 w-10 h-10 bg-gradient-to-br from-black/80 to-black/40 dark:from-black dark:to-blue-950/80 rounded-tl-xl rounded-tr-sm rounded-bl-sm border-b-2 border-black/40"></div>
            {/* Grill */}
            <div className="absolute top-10 left-0 w-3 h-10 bg-gradient-to-r from-zinc-300 to-zinc-400 dark:from-zinc-700 dark:to-zinc-800 rounded-r-md border-r border-y border-zinc-500 shadow-inner"></div>
            {/* 5th wheel connection (Drives) */}
            <div className="absolute -bottom-1 -right-4 w-6 h-3 bg-zinc-800 dark:bg-black rounded-sm"></div>

            {/* Steer Tire */}
            <div className="absolute -bottom-5 left-3">
              <div className="w-12 h-12 rounded-full bg-zinc-900 dark:bg-black border-4 border-zinc-400 dark:border-zinc-600 shadow-lg flex items-center justify-center">
                <div className="w-5 h-5 bg-zinc-300 dark:bg-zinc-500 rounded-full shadow-inner"></div>
              </div>
            </div>
          </div>

          {/* TRAILER */}
          <div className="w-[380px] h-32 bg-gradient-to-b from-zinc-100 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded shadow-xl relative z-10 flex flex-col justify-between">
            {/* Top metallic trim */}
            <div className="w-full h-2 bg-white/60 dark:bg-white/10"></div>
            {/* Bottom metallic trim / frame */}
            <div className="w-full h-4 bg-zinc-400 dark:bg-black/60 border-t border-zinc-300 dark:border-zinc-700"></div>
            
            {/* Drive Tires (under front of trailer, visually connected to 5th wheel) */}
            <div className={`absolute -bottom-6 left-4 flex gap-1 bg-zinc-800 dark:bg-black p-1.5 rounded-t-md shadow-inner transition-transform duration-500`} style={{ transform: `translateX(${driveOffset}px)` }}>
              {arrowType && arrowPos === 'drive' && (
                <div className={`absolute -top-14 ${arrowType === 'forward' ? '-left-6 text-blue-500' : 'left-8 text-amber-500'} font-black text-5xl animate-bounce`}>
                  {arrowType === 'forward' ? <ArrowLeftIcon className="w-12 h-12 stroke-[4px]" /> : <ArrowRight className="w-12 h-12 stroke-[4px]" />}
                </div>
              )}
              <div className="w-12 h-12 rounded-full bg-zinc-900 dark:bg-black border-4 border-zinc-400 dark:border-zinc-600 flex items-center justify-center shadow-md"><div className="w-5 h-5 bg-zinc-300 dark:bg-zinc-500 rounded-full shadow-inner"></div></div>
              <div className="w-12 h-12 rounded-full bg-zinc-900 dark:bg-black border-4 border-zinc-400 dark:border-zinc-600 flex items-center justify-center shadow-md"><div className="w-5 h-5 bg-zinc-300 dark:bg-zinc-500 rounded-full shadow-inner"></div></div>
            </div>

            {/* Tandem Tires (under rear of trailer) */}
            <div className={`absolute -bottom-6 right-6 flex gap-1 bg-zinc-800 dark:bg-black p-1.5 rounded-t-md shadow-inner transition-transform duration-500`} style={{ transform: `translateX(${tandemOffset}px)` }}>
              {arrowType && arrowPos === 'tandem' && (
                <div className={`absolute -top-14 ${arrowType === 'forward' ? '-left-6 text-blue-500' : 'left-8 text-amber-500'} font-black text-5xl animate-bounce`}>
                  {arrowType === 'forward' ? <ArrowLeftIcon className="w-12 h-12 stroke-[4px]" /> : <ArrowRight className="w-12 h-12 stroke-[4px]" />}
                </div>
              )}
              <div className="w-12 h-12 rounded-full bg-zinc-900 dark:bg-black border-4 border-zinc-400 dark:border-zinc-600 flex items-center justify-center shadow-md"><div className="w-5 h-5 bg-zinc-300 dark:bg-zinc-500 rounded-full shadow-inner"></div></div>
              <div className="w-12 h-12 rounded-full bg-zinc-900 dark:bg-black border-4 border-zinc-400 dark:border-zinc-600 flex items-center justify-center shadow-md"><div className="w-5 h-5 bg-zinc-300 dark:bg-zinc-500 rounded-full shadow-inner"></div></div>
            </div>
          </div>
        </div>

        {/* Weight Labels */}
        <div className="flex justify-between mt-12 px-8 text-sm font-bold text-zinc-600 dark:text-zinc-400">
          <div className="flex flex-col items-center w-28">
            <span className="text-xs uppercase tracking-wider mb-2 opacity-70">Steer</span>
            <span className={`px-3 py-2 rounded-lg border shadow-sm w-full text-center transition-colors duration-300 ${steerLabel === 'Heavier' ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800' : steerLabel === 'Lighter' ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300'}`}>{steerLabel}</span>
          </div>
          
          <div className="flex flex-col items-center w-28">
            <span className="text-xs uppercase tracking-wider mb-2 opacity-70">Drive</span>
            <span className={`px-3 py-2 rounded-lg border shadow-sm w-full text-center transition-colors duration-300 ${driveLabel === 'Heavier' ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800' : driveLabel === 'Lighter' ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300'}`}>{driveLabel}</span>
          </div>

          <div className="flex flex-col items-center w-28">
            <span className="text-xs uppercase tracking-wider mb-2 opacity-70">Tandem</span>
            <span className={`px-3 py-2 rounded-lg border shadow-sm w-full text-center transition-colors duration-300 ${tandemLabel === 'Heavier' ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800' : tandemLabel === 'Lighter' ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300'}`}>{tandemLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AxleWeightSimulator() {
  const [activeTab, setActiveTab] = useState<'learn' | 'simulator'>('learn');

  // Simulator State
  const [steer, setSteer] = useState(0);
  const [drive, setDrive] = useState(0);
  const [tandem, setTandem] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
    generateNewProblem();
  }, []);

  function generateNewProblem() {
    const baseSteer = Math.floor(Math.random() * 15) * 100 + 10000;
    const baseDrive = Math.floor(Math.random() * 55) * 100 + 28000;
    const baseTandem = Math.floor(Math.random() * 55) * 100 + 28000;
    
    let isIllegal = false;
    let s = baseSteer, d = baseDrive, t = baseTandem;
    
    while (!isIllegal) {
        const fwOff = Math.floor(Math.random() * 15) - 7;
        const tandOff = Math.floor(Math.random() * 21) - 10;
        
        s = baseSteer + (fwOff * 500);
        d = baseDrive - (fwOff * 500) - (tandOff * 250);
        t = baseTandem + (tandOff * 250);
        
        if ((s > 12000 || d > 34000 || t > 34000) && s > 8000 && d > 20000 && t > 20000) {
            isIllegal = true;
        }
    }
    setSteer(s);
    setDrive(d);
    setTandem(t);
  };

  const slideFifthWheel = (direction: 'forward' | 'backward') => {
    if (direction === 'forward') {
      setSteer(s => s + 500);
      setDrive(d => d - 500);
    } else {
      setSteer(s => s - 500);
      setDrive(d => d + 500);
    }
  };

  const slideTandems = (direction: 'forward' | 'backward') => {
    if (direction === 'forward') {
      setDrive(d => d - 250);
      setTandem(t => t + 250);
    } else {
      setDrive(d => d + 250);
      setTandem(t => t - 250);
    }
  };

  if (!isClient) return null;

  const gross = steer + drive + tandem;
  const isSteerOver = steer > 12000;
  const isDriveOver = drive > 34000;
  const isTandemOver = tandem > 34000;
  const isGrossOver = gross > 80000;
  const isLegal = !isSteerOver && !isDriveOver && !isTandemOver && !isGrossOver;

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500 pb-20">
      
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
              <Badge className="bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400">Simulator</Badge>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Axle Weight & Bridge Law</h1>
          </div>
        </div>
        
        {activeTab === 'simulator' && (
          <button 
            onClick={generateNewProblem}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors font-medium shadow-lg shadow-blue-500/20"
          >
            <RefreshCw className="w-4 h-4" /> New Scenario
          </button>
        )}
      </div>

      {/* Custom Tabs */}
      <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-xl w-fit">
        <button 
          onClick={() => setActiveTab('learn')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'learn' 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-white/5'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Learn Rules
        </button>
        <button 
          onClick={() => setActiveTab('simulator')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'simulator' 
              ? 'bg-amber-600 text-white shadow-md' 
              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-white/5'
          }`}
        >
          <Activity className="w-4 h-4" />
          Practice Simulator
        </button>
      </div>

      {/* --- LEARN MODE --- */}
      {activeTab === 'learn' && (
        <Card className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xl">
          <div className="p-8 lg:p-16 text-zinc-900 dark:text-white space-y-16 rounded-xl">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Adjusting your load</h1>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium text-lg">How sliding the 5th wheel and tandems affects axle weights</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-20">
              
              <RealisticTruck 
                title="Legal limits for a standard truck/trailer" 
                steerLabel="12,000 lbs" 
                driveLabel="34,000 lbs" 
                tandemLabel="34,000 lbs" 
              />
              
              <RealisticTruck 
                title="Sliding your 5th wheel forward" 
                steerLabel="Heavier" 
                driveLabel="Lighter" 
                tandemLabel="No change" 
                driveOffset={-16}
                arrowType="forward"
                arrowPos="drive"
              />

              <RealisticTruck 
                title="Sliding your 5th wheel backward" 
                steerLabel="Lighter" 
                driveLabel="Heavier" 
                tandemLabel="No change" 
                driveOffset={16}
                arrowType="backward"
                arrowPos="drive"
              />

              <RealisticTruck 
                title="Sliding your trailer tandems forward" 
                steerLabel="No change" 
                driveLabel="Lighter" 
                tandemLabel="Heavier" 
                tandemOffset={-24}
                arrowType="forward"
                arrowPos="tandem"
              />

              <RealisticTruck 
                title="Sliding your trailer tandems backward" 
                steerLabel="No change" 
                driveLabel="Heavier" 
                tandemLabel="Lighter" 
                tandemOffset={24}
                arrowType="backward"
                arrowPos="tandem"
              />

              {/* Mathematical Rules */}
              <div className="text-center space-y-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
                <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white leading-tight">
                  Each notch on the 5th wheel<br/><span className="text-blue-600 dark:text-blue-400">moves about 500 lbs</span>
                </h2>
                <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white leading-tight">
                  Each hole on the trailer axle<br/><span className="text-amber-600 dark:text-amber-400">moves exactly 250 lbs</span>
                </h2>
              </div>
            </div>
            
            <div className="flex justify-center pt-12">
              <button 
                onClick={() => setActiveTab('simulator')}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-transform hover:scale-105"
              >
                I&apos;m ready, let&apos;s practice!
              </button>
            </div>
          </div>
        </Card>
      )}


      {/* --- SIMULATOR MODE --- */}
      {activeTab === 'simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-right-4 duration-300">
          <Card className="lg:col-span-2 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/10 shadow-sm">
            <CardHeader>
              <CardTitle className="text-zinc-900 dark:text-white flex items-center gap-2">
                <Scale className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                CAT Scale Simulator
              </CardTitle>
              <CardDescription className="text-zinc-500 dark:text-zinc-400">
                The truck is loaded. Check your axle weights. Use the sliding 5th wheel and trailer tandems to fix the weight distribution.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="relative h-48 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-white/5 flex items-end justify-between px-10 pb-6 overflow-hidden shadow-inner">
                <div className="absolute top-4 left-4 text-xs text-zinc-500 font-mono">Gross Weight: {gross.toLocaleString()} lbs</div>
                
                <div className="flex flex-col items-center">
                  <div className="w-16 h-12 bg-blue-600/20 border-2 border-blue-500 rounded-t-lg flex items-center justify-center text-xs text-blue-200 font-bold">CAB</div>
                  <div className="w-8 h-8 rounded-full border-4 border-zinc-600 bg-zinc-800 -mt-2 shadow-lg"></div>
                  <div className={`mt-3 font-mono text-lg font-black ${isSteerOver ? 'text-red-400' : 'text-green-400'}`}>{steer.toLocaleString()}</div>
                  <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Max: 12k</div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-20 h-4 bg-zinc-700 rounded-sm"></div>
                  <div className="flex gap-1 -mt-2">
                    <div className="w-8 h-8 rounded-full border-4 border-zinc-600 bg-zinc-800 shadow-lg"></div>
                    <div className="w-8 h-8 rounded-full border-4 border-zinc-600 bg-zinc-800 shadow-lg"></div>
                  </div>
                  <div className={`mt-3 font-mono text-lg font-black ${isDriveOver ? 'text-red-400' : 'text-green-400'}`}>{drive.toLocaleString()}</div>
                  <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Max: 34k</div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-48 h-16 bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded flex items-center justify-center text-zinc-600 dark:text-zinc-600 text-sm font-black tracking-widest shadow-md">TRAILER</div>
                  <div className="flex gap-1 -mt-2">
                    <div className="w-8 h-8 rounded-full border-4 border-zinc-600 bg-zinc-800 shadow-lg"></div>
                    <div className="w-8 h-8 rounded-full border-4 border-zinc-600 bg-zinc-800 shadow-lg"></div>
                  </div>
                  <div className={`mt-3 font-mono text-lg font-black ${isTandemOver ? 'text-red-400' : 'text-green-400'}`}>{tandem.toLocaleString()}</div>
                  <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Max: 34k</div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-zinc-900 dark:text-white font-medium flex justify-between">
                    <span>5th Wheel Controls</span>
                    <span className="text-xs text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-400/10 border border-blue-200 dark:border-blue-400/20 px-2 py-1 rounded font-mono font-bold">500 lbs / notch</span>
                  </h3>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => slideFifthWheel('forward')}
                      className="flex-1 py-3 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 hover:border-blue-500/50 text-zinc-900 dark:text-white rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700 text-sm flex flex-col items-center justify-center gap-1 shadow-sm"
                    >
                      <span className="font-semibold text-blue-600 dark:text-blue-100">Slide FORWARD (1 Notch)</span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">(Shifts weight to Steer)</span>
                    </button>
                    <button 
                      onClick={() => slideFifthWheel('backward')}
                      className="flex-1 py-3 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 hover:border-blue-500/50 text-zinc-900 dark:text-white rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700 text-sm flex flex-col items-center justify-center gap-1 shadow-sm"
                    >
                      <span className="font-semibold text-blue-600 dark:text-blue-100">Slide BACKWARD (1 Notch)</span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">(Shifts weight to Drives)</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-zinc-900 dark:text-white font-medium flex justify-between">
                    <span>Trailer Tandem Controls</span>
                    <span className="text-xs text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-400/10 border border-purple-200 dark:border-purple-400/20 px-2 py-1 rounded font-mono font-bold">250 lbs / hole</span>
                  </h3>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => slideTandems('forward')}
                      className="flex-1 py-3 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 hover:border-purple-500/50 text-zinc-900 dark:text-white rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700 text-sm flex flex-col items-center justify-center gap-1 shadow-sm"
                    >
                      <span className="font-semibold text-purple-600 dark:text-purple-100">Slide FORWARD (1 Hole)</span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">(Shifts weight to Trailer)</span>
                    </button>
                    <button 
                      onClick={() => slideTandems('backward')}
                      className="flex-1 py-3 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 hover:border-purple-500/50 text-zinc-900 dark:text-white rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700 text-sm flex flex-col items-center justify-center gap-1 shadow-sm"
                    >
                      <span className="font-semibold text-purple-600 dark:text-purple-100">Slide BACKWARD (1 Hole)</span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">(Shifts weight to Drives)</span>
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-white dark:bg-white/5 border-zinc-200 dark:border-white/10 shadow-sm">
              <CardHeader>
                <CardTitle className="text-zinc-900 dark:text-white">Inspection Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isGrossOver && (
                    <div className="flex items-start gap-3 text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                      <AlertTriangle className="w-5 h-5 shrink-0" />
                      <p className="text-sm">Gross weight exceeds 80,000 lbs. The load must be reworked.</p>
                    </div>
                  )}
                  {isSteerOver && (
                    <div className="flex items-start gap-3 text-amber-400 bg-amber-400/10 p-3 rounded-lg border border-amber-400/20">
                      <AlertTriangle className="w-5 h-5 shrink-0" />
                      <p className="text-sm">Steer axle is overweight (&gt; 12,000 lbs).</p>
                    </div>
                  )}
                  {isDriveOver && (
                    <div className="flex items-start gap-3 text-amber-400 bg-amber-400/10 p-3 rounded-lg border border-amber-400/20">
                      <AlertTriangle className="w-5 h-5 shrink-0" />
                      <p className="text-sm">Drive axles are overweight (&gt; 34,000 lbs).</p>
                    </div>
                  )}
                  {isTandemOver && (
                    <div className="flex items-start gap-3 text-amber-400 bg-amber-400/10 p-3 rounded-lg border border-amber-400/20">
                      <AlertTriangle className="w-5 h-5 shrink-0" />
                      <p className="text-sm">Trailer tandems are overweight (&gt; 34,000 lbs).</p>
                    </div>
                  )}
                  {isLegal && (
                    <div className="flex items-start gap-3 text-green-400 bg-green-400/10 p-4 rounded-xl border-2 border-green-400/30 shadow-[0_0_15px_rgba(74,222,128,0.2)]">
                      <CheckCircle2 className="w-6 h-6 shrink-0" />
                      <div className="space-y-1">
                        <p className="text-base font-bold">All axles legal!</p>
                        <p className="text-xs text-green-400/70 font-medium">You can safely proceed to the highway.</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-50 dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-950 border-zinc-200 dark:border-white/5 shadow-sm">
              <CardHeader>
                <CardTitle className="text-zinc-700 dark:text-zinc-300 text-lg flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  Quick Reference
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                <div className="bg-white dark:bg-black/30 p-3 rounded-lg border border-zinc-200 dark:border-white/5 space-y-2">
                  <p className="flex justify-between"><span className="text-zinc-500 font-medium">5th Wheel Fwd</span><span className="text-zinc-900 dark:text-zinc-300 font-mono">+ Steer / - Drive</span></p>
                  <p className="flex justify-between"><span className="text-zinc-500 font-medium">5th Wheel Bck</span><span className="text-zinc-900 dark:text-zinc-300 font-mono">- Steer / + Drive</span></p>
                </div>
                <div className="bg-white dark:bg-black/30 p-3 rounded-lg border border-zinc-200 dark:border-white/5 space-y-2">
                  <p className="flex justify-between"><span className="text-zinc-500 font-medium">Tandem Fwd</span><span className="text-zinc-900 dark:text-zinc-300 font-mono">- Drive / + Trailer</span></p>
                  <p className="flex justify-between"><span className="text-zinc-500 font-medium">Tandem Bck</span><span className="text-zinc-900 dark:text-zinc-300 font-mono">+ Drive / - Trailer</span></p>
                </div>
                
                <button 
                  onClick={() => setActiveTab('learn')}
                  className="w-full mt-4 py-2 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-wider"
                >
                  View Full Tutorial
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
