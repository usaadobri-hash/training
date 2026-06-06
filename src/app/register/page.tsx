import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, ArrowRight, Mail, Lock, User, AlertCircle } from "lucide-react";
import { signup } from "@/app/auth/actions";

export default async function RegisterPage(props: { searchParams: Promise<{ error?: string }> }) {
  const searchParams = await props.searchParams;
  const error = searchParams?.error;

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-zinc-950 py-12">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] animate-pulse"></div>
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>

      <div className="z-10 w-full max-w-md px-4">
        <div className="flex justify-center mb-8">
          <div className="h-16 w-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl">
            <Truck className="text-purple-500 w-8 h-8" />
          </div>
        </div>

        <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none"></div>
          
          <CardHeader className="space-y-1 pb-6 pt-6 relative z-10">
            <CardTitle className="text-3xl font-bold text-center tracking-tight text-white">Join the Academy</CardTitle>
            <CardDescription className="text-center text-zinc-400">
              Start your 3-week journey to becoming a professional dispatcher
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/50 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-sm text-red-200">{error}</p>
              </div>
            )}
            <form action={signup} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-zinc-300">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                    <Input 
                      id="firstName" 
                      name="firstName"
                      placeholder="John" 
                      className="pl-10 bg-zinc-900/50 border-zinc-800 text-white focus-visible:ring-purple-500 h-11"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-zinc-300">Last Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                    <Input 
                      id="lastName" 
                      name="lastName"
                      placeholder="Doe" 
                      className="pl-10 bg-zinc-900/50 border-zinc-800 text-white focus-visible:ring-purple-500 h-11"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-300">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    placeholder="student@example.com" 
                    className="pl-10 bg-zinc-900/50 border-zinc-800 text-white focus-visible:ring-purple-500 h-11"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-zinc-300">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                  <Input 
                    id="password" 
                    name="password"
                    type="password" 
                    className="pl-10 bg-zinc-900/50 border-zinc-800 text-white focus-visible:ring-purple-500 h-11"
                    required
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full h-11 mt-4 bg-purple-600 hover:bg-purple-700 text-white transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)]"
              >
                <div className="flex items-center gap-2">
                  Create Account <ArrowRight className="w-4 h-4" />
                </div>
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pb-8 relative z-10">
            <div className="text-sm text-center text-zinc-400 w-full">
              Already have an account?{" "}
              <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
