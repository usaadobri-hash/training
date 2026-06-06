"use client";

import { useState, useEffect } from "react";
import USAMap from "react-usa-map";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, CheckCircle2, XCircle, Map as MapIcon, Clock, BookOpen, GraduationCap } from "lucide-react";

const STATES: Record<string, { name: string; tz: string }> = {
  AL: { name: "Alabama", tz: "CT" }, AZ: { name: "Arizona", tz: "MT" }, AR: { name: "Arkansas", tz: "CT" },
  CA: { name: "California", tz: "PT" }, CO: { name: "Colorado", tz: "MT" }, CT: { name: "Connecticut", tz: "ET" },
  DE: { name: "Delaware", tz: "ET" }, FL: { name: "Florida", tz: "ET" }, GA: { name: "Georgia", tz: "ET" },
  ID: { name: "Idaho", tz: "MT" }, IL: { name: "Illinois", tz: "CT" }, IN: { name: "Indiana", tz: "ET" },
  IA: { name: "Iowa", tz: "CT" }, KS: { name: "Kansas", tz: "CT" }, KY: { name: "Kentucky", tz: "ET" },
  LA: { name: "Louisiana", tz: "CT" }, ME: { name: "Maine", tz: "ET" }, MD: { name: "Maryland", tz: "ET" },
  MA: { name: "Massachusetts", tz: "ET" }, MI: { name: "Michigan", tz: "ET" }, MN: { name: "Minnesota", tz: "CT" },
  MS: { name: "Mississippi", tz: "CT" }, MO: { name: "Missouri", tz: "CT" }, MT: { name: "Montana", tz: "MT" },
  NE: { name: "Nebraska", tz: "CT" }, NV: { name: "Nevada", tz: "PT" }, NH: { name: "New Hampshire", tz: "ET" },
  NJ: { name: "New Jersey", tz: "ET" }, NM: { name: "New Mexico", tz: "MT" }, NY: { name: "New York", tz: "ET" },
  NC: { name: "North Carolina", tz: "ET" }, ND: { name: "North Dakota", tz: "CT" }, OH: { name: "Ohio", tz: "ET" },
  OK: { name: "Oklahoma", tz: "CT" }, OR: { name: "Oregon", tz: "PT" }, PA: { name: "Pennsylvania", tz: "ET" },
  RI: { name: "Rhode Island", tz: "ET" }, SC: { name: "South Carolina", tz: "ET" }, SD: { name: "South Dakota", tz: "CT" },
  TN: { name: "Tennessee", tz: "CT" }, TX: { name: "Texas", tz: "CT" }, UT: { name: "Utah", tz: "MT" },
  VT: { name: "Vermont", tz: "ET" }, VA: { name: "Virginia", tz: "ET" }, WA: { name: "Washington", tz: "PT" },
  WV: { name: "West Virginia", tz: "ET" }, WI: { name: "Wisconsin", tz: "CT" }, WY: { name: "Wyoming", tz: "MT" }
};

const TZ_OFFSETS: Record<string, number> = { PT: 0, MT: 1, CT: 2, ET: 3 };

type Question = {
  id: number;
  type: "LOCATION" | "ABBREVIATION" | "TIMEZONE";
  text: string;
  answer: string;
  options?: string[];
  targetAbbr?: string;
};

type TabType = 'learn' | 'location' | 'abbreviation' | 'timezone';

export default function USAMapSimulator() {
  const [activeTab, setActiveTab] = useState<TabType>('learn');
  const [question, setQuestion] = useState<Question | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [highlightedState, setHighlightedState] = useState<string | null>(null);

  // Free Learn Mode State
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  useEffect(() => {
    setScore(0);
    setStreak(0);
    setFeedback(null);
    setHighlightedState(null);
    if (activeTab !== 'learn') {
      generateQuestion(activeTab);
    }
  }, [activeTab]);

  // Prevent browser native tooltips from revealing state names during the quiz
  useEffect(() => {
    const removeTooltips = () => {
      const titles = document.querySelectorAll('.map-container title');
      titles.forEach(t => t.remove());
    };
    const timer = setTimeout(removeTooltips, 100);
    return () => clearTimeout(timer);
  }, []);

  const generateQuestion = (tab: TabType) => {
    setFeedback(null);
    setHighlightedState(null);
    const keys = Object.keys(STATES);
    
    if (tab === "location") {
      const abbr = keys[Math.floor(Math.random() * keys.length)];
      setQuestion({
        id: Date.now(),
        type: "LOCATION",
        text: `Find and click on ${STATES[abbr].name} on the map.`,
        answer: abbr,
        targetAbbr: abbr
      });
    } else if (tab === "abbreviation") {
      const abbr = keys[Math.floor(Math.random() * keys.length)];
      const wrong1 = keys[Math.floor(Math.random() * keys.length)];
      const wrong2 = keys[Math.floor(Math.random() * keys.length)];
      const wrong3 = keys[Math.floor(Math.random() * keys.length)];
      
      const options = Array.from(new Set([abbr, wrong1, wrong2, wrong3]));
      while(options.length < 4) {
        options.push(keys[Math.floor(Math.random() * keys.length)]);
      }
      const finalOptions = [...new Set(options)].slice(0, 4).sort(() => Math.random() - 0.5);

      setQuestion({
        id: Date.now(),
        type: "ABBREVIATION",
        text: `What is the correct abbreviation for ${STATES[abbr].name}?`,
        answer: abbr,
        options: finalOptions,
        targetAbbr: abbr
      });
    } else if (tab === "timezone") {
      const abbr1 = keys[Math.floor(Math.random() * keys.length)];
      let abbr2 = keys[Math.floor(Math.random() * keys.length)];
      while (STATES[abbr1].tz === STATES[abbr2].tz) {
        abbr2 = keys[Math.floor(Math.random() * keys.length)];
      }
      
      const state1 = STATES[abbr1];
      const state2 = STATES[abbr2];
      
      let hour = Math.floor(Math.random() * 12) + 1;
      let isPM = Math.random() > 0.5;
      
      let time124 = isPM && hour !== 12 ? hour + 12 : (!isPM && hour === 12 ? 0 : hour);
      let diff = TZ_OFFSETS[state2.tz] - TZ_OFFSETS[state1.tz];
      let time224 = time124 + diff;
      
      if (time224 >= 24) time224 -= 24;
      if (time224 < 0) time224 += 24;
      
      let isPM2 = time224 >= 12;
      let hour2 = time224 % 12;
      if (hour2 === 0) hour2 = 12;
      
      const formatTime = (h: number, pm: boolean) => `${h}:00 ${pm ? 'PM' : 'AM'}`;
      const answer = formatTime(hour2, isPM2);
      
      const wrong1 = formatTime((hour2 + 1 > 12 ? 1 : hour2 + 1), isPM2);
      const wrong2 = formatTime((hour2 - 1 < 1 ? 12 : hour2 - 1), isPM2);
      const wrong3 = formatTime(hour2, !isPM2);
      
      const options = [answer, wrong1, wrong2, wrong3].sort(() => Math.random() - 0.5);
      
      setQuestion({
        id: Date.now(),
        type: "TIMEZONE",
        text: `If it is ${formatTime(hour, isPM)} in ${state1.name} (${abbr1}), what time is it right now in ${state2.name} (${abbr2})?`,
        answer,
        options
      });
    }
  };

  const handleMapClick = (event: any) => {
    const clickedAbbr = event.target.dataset.name;
    
    if (activeTab === 'learn') {
      setHoveredState(clickedAbbr);
      setHighlightedState(clickedAbbr);
      return;
    }

    if (!question || question.type !== "LOCATION") return;
    
    if (clickedAbbr === question.answer) {
      setScore(s => s + 10);
      setStreak(s => s + 1);
      setHighlightedState(clickedAbbr);
      setFeedback({ isCorrect: true, text: `Correct! That is ${STATES[clickedAbbr]?.name}.` });
      setTimeout(() => generateQuestion(activeTab), 2000);
    } else {
      setStreak(0);
      setFeedback({ isCorrect: false, text: `Incorrect. You clicked ${STATES[clickedAbbr]?.name || clickedAbbr}. Try again!` });
    }
  };

  const handleOptionClick = (option: string) => {
    if (!question) return;
    
    if (option === question.answer) {
      setScore(s => s + 10);
      setStreak(s => s + 1);
      if (question.targetAbbr) setHighlightedState(question.targetAbbr);
      setFeedback({ isCorrect: true, text: `Correct!` });
      setTimeout(() => generateQuestion(activeTab), 2000);
    } else {
      setStreak(0);
      setFeedback({ isCorrect: false, text: `Incorrect. The correct answer was ${question.answer}.` });
      setTimeout(() => generateQuestion(activeTab), 3000);
    }
  };

  const mapCustomizations = () => {
    if (!highlightedState) return {};
    return {
      [highlightedState]: {
        fill: "#3b82f6" // blue-500
      }
    };
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-3">
            <Globe className="w-8 h-8 text-blue-500" />
            USA Map & Time Zones
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">Master state locations, abbreviations, and time zone calculations.</p>
        </div>
        {activeTab !== 'learn' && (
          <div className="flex gap-4">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl p-3 px-5 text-center">
              <p className="text-xs text-zinc-500 font-semibold uppercase">Score</p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">{score}</p>
            </div>
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl p-3 px-5 text-center">
              <p className="text-xs text-zinc-500 font-semibold uppercase">Streak</p>
              <p className="text-2xl font-bold text-orange-400">{streak}🔥</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-xl w-fit mb-6">
        <button 
          onClick={() => setActiveTab('learn')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'learn' ? 'bg-blue-600 text-white shadow-md' : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <GraduationCap className="w-4 h-4" /> Learn Mode
        </button>
        <button 
          onClick={() => setActiveTab('location')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'location' ? 'bg-amber-600 text-white shadow-md' : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <MapIcon className="w-4 h-4" /> Locations Quiz
        </button>
        <button 
          onClick={() => setActiveTab('abbreviation')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'abbreviation' ? 'bg-purple-600 text-white shadow-md' : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <BookOpen className="w-4 h-4" /> Abbreviations Quiz
        </button>
        <button 
          onClick={() => setActiveTab('timezone')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'timezone' ? 'bg-emerald-600 text-white shadow-md' : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Clock className="w-4 h-4" /> Time Zones Quiz
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sidebar Panel (Changes based on mode) */}
        <div className="lg:col-span-1 space-y-6">
          
          {activeTab === 'learn' && (
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/10 animate-in fade-in zoom-in duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-zinc-900 dark:text-white">State Information</CardTitle>
                <CardDescription className="text-zinc-500 dark:text-zinc-400">Click on any state on the map to view its details.</CardDescription>
              </CardHeader>
              <CardContent>
                {hoveredState && STATES[hoveredState] ? (
                  <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-xl p-6 text-center shadow-lg">
                      <h2 className="text-4xl font-black text-blue-900 dark:text-white mb-2">{STATES[hoveredState].name}</h2>
                      <div className="flex justify-center gap-4 mt-4">
                        <div className="bg-white dark:bg-zinc-950 px-4 py-2 rounded-lg border border-zinc-200 dark:border-white/10">
                          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Abbreviation</p>
                          <p className="text-2xl text-blue-500 dark:text-blue-400 font-mono font-bold mt-1">{hoveredState}</p>
                        </div>
                        <div className="bg-white dark:bg-zinc-950 px-4 py-2 rounded-lg border border-zinc-200 dark:border-white/10">
                          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Time Zone</p>
                          <p className="text-2xl text-amber-500 dark:text-amber-400 font-mono font-bold mt-1">{STATES[hoveredState].tz}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-48 border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center text-zinc-500">
                    <p>Select a state...</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab !== 'learn' && question && (
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/10 animate-in fade-in slide-in-from-left-4 duration-300 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2 mb-2">
                  {question.type === "LOCATION" && <MapIcon className="w-5 h-5 text-amber-500 dark:text-amber-400" />}
                  {question.type === "ABBREVIATION" && <BookOpen className="w-5 h-5 text-purple-500 dark:text-purple-400" />}
                  {question.type === "TIMEZONE" && <Clock className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />}
                  <CardDescription className="text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">
                    {question.type} QUESTION
                  </CardDescription>
                </div>
                <CardTitle className="text-xl text-zinc-900 dark:text-white leading-relaxed">
                  {question.text}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {question.type === "LOCATION" && (
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 text-center">
                    <Globe className="w-12 h-12 text-amber-500 mx-auto mb-3 animate-pulse" />
                    <p className="text-amber-400 font-medium">Click on the interactive map to submit your answer.</p>
                  </div>
                )}

                {question.options && (
                  <div className="grid grid-cols-1 gap-3">
                    {question.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleOptionClick(opt)}
                        disabled={!!feedback && feedback.isCorrect}
                        className={`w-full border font-medium py-4 px-6 rounded-xl transition-all text-left text-lg flex items-center gap-4 ${
                          activeTab === 'abbreviation' ? 'hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-500/10 bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white' : 
                          activeTab === 'timezone' ? 'hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white' : ''
                        }`}
                      >
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-200 dark:bg-white/5 text-sm text-zinc-600 dark:text-zinc-400">
                          {["A", "B", "C", "D"][i]}
                        </span>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {feedback && (
                  <div className={`mt-6 p-4 rounded-xl flex items-start gap-3 border animate-in zoom-in-95 duration-200 ${feedback.isCorrect ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                    {feedback.isCorrect ? <CheckCircle2 className="w-5 h-5 mt-0.5" /> : <XCircle className="w-5 h-5 mt-0.5" />}
                    <p className="font-medium">{feedback.text}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/10 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-zinc-900 dark:text-white">Time Zone Cheat Sheet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center p-2 rounded bg-zinc-100 dark:bg-white/5">
                  <span className="text-zinc-600 dark:text-zinc-400">Pacific Time (PT)</span>
                  <span className="text-zinc-900 dark:text-white font-medium">-3 hrs from ET</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-zinc-100 dark:bg-white/5">
                  <span className="text-zinc-600 dark:text-zinc-400">Mountain Time (MT)</span>
                  <span className="text-zinc-900 dark:text-white font-medium">-2 hrs from ET</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-zinc-100 dark:bg-white/5">
                  <span className="text-zinc-600 dark:text-zinc-400">Central Time (CT)</span>
                  <span className="text-zinc-900 dark:text-white font-medium">-1 hr from ET</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-zinc-100 dark:bg-white/5">
                  <span className="text-zinc-600 dark:text-zinc-400">Eastern Time (ET)</span>
                  <span className="text-zinc-900 dark:text-white font-medium">Base Time</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map Panel */}
        <div className="lg:col-span-2">
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/10 h-full overflow-hidden shadow-2xl">
            <CardContent className="p-0 flex items-center justify-center min-h-[500px] h-full relative">
              <div className="w-full max-w-[800px] p-6 map-container">
                <USAMap 
                  onClick={handleMapClick} 
                  customize={mapCustomizations()}
                  defaultFill="#27272a" /* zinc-800 */
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
      </div>
      
      {/* Global styles for the map hover effects */}
      <style dangerouslySetInnerHTML={{__html: `
        .map-container svg {
          width: 100%;
          height: auto;
          filter: drop-shadow(0 0 10px rgba(0,0,0,0.1));
        }
        .dark .map-container svg {
          filter: drop-shadow(0 0 10px rgba(0,0,0,0.5));
        }
        .map-container path {
          cursor: pointer;
          transition: fill 0.2s ease;
          stroke: #ffffff;
          stroke-width: 1px;
          fill: #d4d4d8; /* zinc-300 */
        }
        .dark .map-container path {
          stroke: #18181b; /* zinc-950 */
          fill: #27272a; /* zinc-800 */
        }
        .map-container path:hover {
          fill: #a1a1aa !important; /* zinc-400 */
        }
        .dark .map-container path:hover {
          fill: #52525b !important; /* zinc-600 */
        }
        .map-container title {
          display: none !important;
        }
      `}} />
    </div>
  );
}
