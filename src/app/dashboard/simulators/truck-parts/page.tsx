"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, PlayCircle, Info } from "lucide-react";

export default function TruckDiagramSimulator() {
  const [activePart, setActivePart] = useState<string | null>(null);

  const truckParts = [
    {
      id: "tractor",
      name: "Tractor (Cab)",
      description: "The engine and cab where the driver sits. It provides the motive power to haul the trailer.",
      image: null,
      x: "15%",
      y: "40%",
    },
    {
      id: "fifth-wheel",
      name: "Fifth Wheel",
      description: "A horseshoe-shaped coupling device on the rear of the tractor that connects to the kingpin of the trailer.",
      image: "/images/fifth_wheel_part.png",
      x: "35%",
      y: "50%",
    },
    {
      id: "kingpin",
      name: "Kingpin",
      description: "A thick metal pin located under the front of the trailer that locks into the tractor's fifth wheel.",
      image: "/images/kingpin_part.png",
      x: "41%",
      y: "30%",
    },
    {
      id: "tandems",
      name: "Tandem Axles",
      description: "A pair of axles located close together at the rear of the trailer. They can often be slid forward or backward to distribute weight.",
      image: "/images/tandem_axles_part.png",
      x: "80%",
      y: "48%",
    },
    {
      id: "landing-gear",
      name: "Landing Gear",
      description: "Retractable legs used to support the front end of the trailer when it is not attached to a tractor.",
      image: "/images/landing_gear_part.png",
      x: "55%",
      y: "48%",
    },
    {
      id: "reefer-unit",
      name: "Reefer Unit (if applicable)",
      description: "The refrigeration unit mounted to the front of a refrigerated trailer to control cargo temperature.",
      image: "/images/reefer_unit_part.png",
      x: "40%",
      y: "35%",
    }
  ];

  const activePartData = truckParts.find(p => p.id === activePart);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/modules">
          <div className="h-10 w-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center border border-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5 text-zinc-300" />
          </div>
        </Link>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">Module 3</Badge>
            <span className="text-zinc-500 text-sm">Interactive Simulator</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Truck Parts & Components</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/10 overflow-hidden shadow-sm">
          <CardHeader className="bg-zinc-50 dark:bg-zinc-950/50 border-b border-zinc-200 dark:border-white/5 pb-4">
            <CardTitle className="text-zinc-900 dark:text-white text-lg">Interactive Diagram</CardTitle>
            <CardDescription className="text-zinc-500 dark:text-zinc-400">
              Click on the pulsing hotspots to learn about different components.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 relative bg-gradient-to-b from-zinc-800 to-zinc-950 min-h-[400px] flex items-center justify-center">
            {/* The Diagram Image */}
            <div className="relative w-full aspect-[16/9] max-h-[600px] overflow-hidden rounded-b-xl shadow-inner">
              <Image 
                src="/images/truck_base.png" 
                alt="Realistic Semi Truck" 
                fill 
                className="object-cover p-0"
              />
              
              {/* Hotspots */}
              {truckParts.map((part) => (
                <button
                  key={part.id}
                  onClick={() => setActivePart(part.id)}
                  className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full border-4 transition-all z-10 shadow-[0_0_10px_rgba(0,0,0,0.8)] ${
                    activePart === part.id 
                      ? 'bg-blue-500 border-white scale-125 shadow-[0_0_20px_rgba(59,130,246,1)]' 
                      : 'bg-white/50 border-blue-500 hover:scale-110 hover:bg-white/80'
                  }`}
                  style={{ left: part.x, top: part.y }}
                >
                  <span className="absolute inset-0 rounded-full animate-ping bg-blue-400 opacity-50"></span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6 flex flex-col h-full">
          <Card className="bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 backdrop-blur-xl flex-1 flex flex-col overflow-hidden shadow-sm">
            <CardHeader className="shrink-0 bg-white dark:bg-black/20 border-b border-zinc-200 dark:border-white/5">
              <CardTitle className="text-xl text-zinc-900 dark:text-white flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                Component Details
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-y-auto custom-scrollbar">
              {activePartData ? (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300 h-full flex flex-col">
                  {activePartData.image && (
                    <div className="relative w-full aspect-square border-b border-white/10 shrink-0">
                      <Image 
                        src={activePartData.image} 
                        alt={activePartData.name} 
                        fill 
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
                    </div>
                  )}
                  <div className="p-6 space-y-4">
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                      {activePartData.name}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-base">
                      {activePartData.description}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center opacity-50 p-6">
                  <div className="w-16 h-16 border-2 border-dashed border-zinc-500 rounded-full mb-4 flex items-center justify-center">
                    <span className="w-3 h-3 bg-zinc-500 rounded-full animate-ping"></span>
                  </div>
                  <p className="text-zinc-400 text-lg">Select a hotspot on the truck<br/>to view detailed photos and info.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
