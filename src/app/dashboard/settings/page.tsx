"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Bell, Shield, Moon, Monitor, LogOut, CheckCircle2, AlertCircle, Loader2, Upload } from "lucide-react";
import { signout } from "@/app/auth/actions";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // User State
  const [userId, setUserId] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // UI State
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [emailWarning, setEmailWarning] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        if (user) {
          setUserId(user.id);
          setEmail(user.email || "");
          setFirstName(user.user_metadata?.first_name || "");
          setLastName(user.user_metadata?.last_name || "");
          setAvatarUrl(user.user_metadata?.avatar_url || "");
          setNotificationsEnabled(user.user_metadata?.notifications_enabled ?? true);
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        console.error("Error fetching user:", e.message);
      } finally {
        setIsLoading(false);
      }
    };

    // eslint-disable-next-line
    setMounted(true);
    fetchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !userId) return;
    const file = e.target.files[0];
    
    setIsUploading(true);
    setFeedback(null);
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${userId}-${Math.random()}.${fileExt}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);

      // Update user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl }
      });

      if (updateError) throw updateError;

      setAvatarUrl(publicUrl);
      setFeedback({ type: "success", message: "Avatar updated successfully!" });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setFeedback({ type: "error", message: `Failed to upload avatar: ${e.message}` });
    } finally {
      setIsUploading(false);
      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setFeedback(null);
    setEmailWarning(null);
    try {
      // 1. Update Metadata (Name)
      const { error: metadataError } = await supabase.auth.updateUser({
        data: {
          first_name: firstName,
          last_name: lastName
        }
      });
      if (metadataError) throw metadataError;

      // 2. Update Email (Only if changed)
      const { data: { user } } = await supabase.auth.getUser();
      if (user && user.email !== email) {
        const { error: emailError } = await supabase.auth.updateUser({ email });
        if (emailError) throw emailError;
        setEmailWarning("A confirmation link has been sent to both your old and new email addresses. The change will take effect once confirmed.");
      }

      setFeedback({ type: "success", message: "Profile saved successfully!" });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setFeedback({ type: "error", message: `Failed to save profile: ${e.message}` });
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleNotifications = async () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { notifications_enabled: newValue }
      });
      if (error) throw error;
      setFeedback({ type: "success", message: "Notification preferences updated!" });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      // Revert on failure
      setNotificationsEnabled(!newValue);
      setFeedback({ type: "error", message: `Failed to update preferences: ${e.message}` });
    }
  };

  const getInitials = () => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "JS";
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">Account Settings</h1>
        <p className="text-zinc-500 dark:text-zinc-400 transition-colors">Manage your profile, preferences, and security settings.</p>
      </div>

      {feedback && (
        <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 border animate-in slide-in-from-top-2 duration-300 ${feedback.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400'}`}>
          {feedback.type === 'success' ? <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" /> : <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />}
          <p className="font-medium">{feedback.message}</p>
        </div>
      )}

      {emailWarning && (
        <div className="mb-6 p-4 rounded-xl flex items-start gap-3 border bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400 animate-in slide-in-from-top-2 duration-300">
          <Mail className="w-5 h-5 mt-0.5 shrink-0" />
          <p className="font-medium text-sm">{emailWarning}</p>
        </div>
      )}

      <div className="grid gap-6">
        {/* Profile Card */}
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/10 transition-colors shadow-sm dark:shadow-none">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-white flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600 dark:text-blue-500" />
              Profile Information
            </CardTitle>
            <CardDescription className="text-zinc-500 dark:text-zinc-400">Update your personal details and avatar.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                {avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatarUrl} alt="Avatar" className="w-20 h-20 rounded-full object-cover border-2 border-zinc-200 dark:border-white/10" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-600/20 border-2 border-blue-200 dark:border-blue-500/50 flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{getInitials()}</span>
                  </div>
                )}
                {isUploading && (
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  </div>
                )}
              </div>
              <div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleAvatarUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="px-4 py-2 bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 text-slate-900 dark:text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Upload className="w-4 h-4" />
                  {isUploading ? "Uploading..." : "Change Avatar"}
                </button>
                <p className="text-xs text-zinc-500 mt-2">Recommended: Square JPG, PNG, or GIF. Max 2MB.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">First Name</label>
                <input 
                  type="text" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-white/10 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Last Name</label>
                <input 
                  type="text" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-white/10 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-white/10 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
                <p className="text-xs text-zinc-500">Changing your email will require confirmation.</p>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-white/5 flex justify-end">
              <button 
                onClick={handleSaveProfile}
                disabled={isSaving}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] font-medium flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                {isSaving ? "Saving Changes..." : "Save Profile"}
              </button>
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
            <CardDescription className="text-zinc-500 dark:text-zinc-400">Manage your app experience. Saved automatically.</CardDescription>
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
                className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${mounted && theme === 'dark' ? 'bg-blue-500' : 'bg-zinc-300 dark:bg-zinc-700'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${mounted && theme === 'dark' ? 'right-1' : 'left-1'}`}></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-black/50 rounded-xl border border-zinc-100 dark:border-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <Bell className={`w-5 h-5 ${notificationsEnabled ? 'text-amber-500' : 'text-zinc-400'}`} />
                <div>
                  <p className="font-medium text-slate-900 dark:text-white transition-colors">Email Notifications</p>
                  <p className="text-xs text-zinc-500">Receive updates about new modules and exams.</p>
                </div>
              </div>
              <div 
                onClick={handleToggleNotifications}
                className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${notificationsEnabled ? 'bg-amber-500' : 'bg-zinc-300 dark:bg-zinc-700'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${notificationsEnabled ? 'right-1' : 'left-1'}`}></div>
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
