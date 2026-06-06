"use client";

import { useState, useEffect, ReactNode } from "react";
import { Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AccessGuard({ children }: { children: ReactNode }) {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const access = localStorage.getItem("saray_access_granted");
    if (access === "true") {
      setHasAccess(true);
    } else {
      setHasAccess(false);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase().trim() === "pineapple") {
      localStorage.setItem("saray_access_granted", "true");
      setHasAccess(true);
    } else {
      setError(true);
      setPassword("");
    }
  };

  // Prevent hydration mismatch flashes by rendering nothing until check is done
  if (hasAccess === null) return null;

  if (hasAccess) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 bg-zinc-950 flex flex-col items-center justify-center p-4 z-[100]">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="relative w-full max-w-md bg-zinc-900/80 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
        
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <div className="flex flex-col items-center leading-none italic font-black tracking-tighter">
            <span className="text-4xl text-red-600">SARAY</span>
            <span className="text-3xl text-blue-700">EXPRESS INC</span>
          </div>
        </div>

        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex h-12 w-12 bg-white/5 rounded-full items-center justify-center border border-white/10 mb-2">
            <Lock className="w-5 h-5 text-zinc-400" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Student Access Only</h2>
          <p className="text-zinc-400 text-sm">Please enter the access code provided by your instructor to view this platform.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input 
              type="password" 
              placeholder="Enter access code..." 
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              className={`h-14 bg-black/50 border-white/10 text-white placeholder:text-zinc-600 text-center text-lg focus-visible:ring-blue-500 rounded-xl transition-all ${error ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            />
            {error && (
              <p className="text-red-500 text-sm font-medium text-center animate-in fade-in zoom-in duration-300">
                Incorrect access code. Please try again.
              </p>
            )}
          </div>
          <Button 
            type="submit" 
            className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all"
          >
            Enter Platform <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </form>

      </div>
    </div>
  );
}
