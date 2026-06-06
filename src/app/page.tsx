import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Truck, ArrowRight, ShieldCheck, MapPin, Award } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 overflow-hidden relative">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] animate-pulse delay-1000"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <nav className="flex justify-between items-center mb-24">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10">
              <Truck className="text-blue-500 w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight">Dispatcher Academy</span>
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-zinc-300 hover:text-white">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-white text-black hover:bg-zinc-200">Get Started</Button>
            </Link>
          </div>
        </nav>

        <main className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-blue-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Next Cohort Starting Soon
            </div>
            
            <h1 className="text-6xl font-extrabold tracking-tight leading-[1.1]">
              Master the art of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Freight Dispatching
              </span>
            </h1>
            
            <p className="text-xl text-zinc-400 leading-relaxed max-w-lg">
              A comprehensive 3-week training platform. Learn from industry experts, interact with real-world simulators, and launch your career.
            </p>
            
            <div className="flex gap-4 pt-4">
              <Link href="/register">
                <Button className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] transition-all rounded-xl">
                  Start Training <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" className="h-14 px-8 text-lg border-white/20 bg-white/5 hover:bg-white/10 rounded-xl text-black">
                View Curriculum
              </Button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
              <div className="space-y-6">
                {[
                  { icon: ShieldCheck, title: "Industry Fundamentals", desc: "Learn freight flows, truck types, and core documentation.", color: "text-green-400" },
                  { icon: MapPin, title: "Dispatch Operations", desc: "Master geography, routing, and real dispatch scenarios.", color: "text-blue-400" },
                  { icon: Award, title: "Interactive Simulators", desc: "Practice with AI voice brokers and axle weight simulators.", color: "text-purple-400" }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-default">
                    <div className="h-12 w-12 rounded-xl bg-black/50 flex items-center justify-center shrink-0">
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                      <p className="text-zinc-400">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
