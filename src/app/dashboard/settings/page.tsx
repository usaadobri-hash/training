"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Bell, Shield, Moon, Monitor, LogOut } from "lucide-react";
import { signout } from "@/app/auth/actions";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">Account Settings</h1>
        <p className="text-zinc-500 dark:text-zinc-400 transition-colors">Manage your profile, preferences, and security settings.</p>
      </div>

      <div className="grid gap-6">
        {/* Profile Card */}
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/10 transition-colors shadow-sm dark:shadow-none">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-white flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600 dark:text-blue-500" />
              Profile Information
            </CardTitle>
            <CardDescription className="text-zinc-500 dark:text-zinc-400">Update your personal details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-600/20 border-2 border-blue-200 dark:border-blue-500/50 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">JS</span>
              </div>
              <div>
                <button className="px-4 py-2 bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 text-slate-900 dark:text-white rounded-lg transition-colors text-sm font-medium">
                  Change Avatar
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Full Name</label>
                <input 
                  type="text" 
                  defaultValue="John Student"
                  className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-white/10 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email Address</label>
                <input 
                  type="email" 
                  defaultValue="john@example.com"
                  className="w-full bg-zinc-100 dark:bg-black border border-zinc-200 dark:border-white/10 rounded-lg px-4 py-2 text-zinc-400 cursor-not-allowed"
                  disabled
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/10 transition-colors shadow-sm dark:shadow-none">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-white flex items-center gap-2">
              <Monitor className="w-5 h-5 text-purple-500" />
              Preferences
            </CardTitle>
            <CardDescription className="text-zinc-500 dark:text-zinc-400">Manage your app experience.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-black/50 rounded-xl border border-zinc-100 dark:border-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <Moon className={`w-5 h-5 ${mounted && theme === 'dark' ? 'text-blue-400' : 'text-zinc-400'}`} />
                <div>
                  <p className="font-medium text-slate-900 dark:text-white transition-colors">Dark Mode</p>
                  <p className="text-xs text-zinc-500">Toggle between light and dark themes.</p>
                </div>
              </div>
              <div 
                onClick={mounted ? toggleTheme : undefined}
                className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${mounted && theme === 'dark' ? 'bg-blue-500' : 'bg-zinc-300'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${mounted && theme === 'dark' ? 'right-1' : 'left-1'}`}></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-black/50 rounded-xl border border-zinc-100 dark:border-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-zinc-400" />
                <div>
                  <p className="font-medium text-slate-900 dark:text-white transition-colors">Email Notifications</p>
                  <p className="text-xs text-zinc-500">Receive updates about new modules and exams.</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-blue-500 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="bg-white dark:bg-zinc-900 border-red-200 dark:border-red-500/20 transition-colors shadow-sm dark:shadow-none">
          <CardHeader>
            <CardTitle className="text-red-500 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security
            </CardTitle>
            <CardDescription className="text-zinc-500 dark:text-zinc-400">Account security and sessions.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={signout}>
              <button 
                type="submit" 
                className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-500/10 hover:bg-red-200 dark:hover:bg-red-500/20 text-red-600 dark:text-red-500 rounded-lg transition-colors font-medium"
              >
                <LogOut className="w-4 h-4" />
                Sign out of all devices
              </button>
            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
