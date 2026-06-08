"use client";

import { useState } from "react";
import { Trailer } from "@/data/trailers";
import { ChevronDown, Box, Info, Image as ImageIcon, AlertTriangle } from "lucide-react";
import Image from "next/image";

export default function TrailerCard({ trailer }: { trailer: Trailer }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-white/5 mb-6">
      {/* Header (Clickable) */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-5 flex items-center justify-between cursor-pointer select-none bg-zinc-50 dark:bg-zinc-950/50 hover:bg-zinc-100 dark:hover:bg-zinc-900/80 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center border border-blue-200 dark:border-blue-800">
            <Box className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{trailer.name}</h3>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{trailer.category}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ChevronDown className={`w-6 h-6 text-zinc-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {/* Expandable Content */}
      <div className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <div className="p-6 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-8 leading-relaxed">
            {trailer.description}
          </p>

          {/* Image Gallery */}
          {trailer.images && trailer.images.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {trailer.images.map((img, idx) => (
                <div key={idx} className="relative aspect-video rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                  <Image src={img} alt={`${trailer.name} view ${idx + 1}`} fill className="object-cover" unoptimized />
                </div>
              ))}
            </div>
          ) : (
             <div className="w-full h-48 bg-zinc-100 dark:bg-zinc-800 rounded-xl mb-8 flex flex-col items-center justify-center border border-dashed border-zinc-300 dark:border-zinc-700">
               <ImageIcon className="w-8 h-8 text-zinc-400 mb-2" />
               <p className="text-sm text-zinc-500">Image rendering in progress...</p>
             </div>
          )}

          {/* Specs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-500" /> Specs & Capacity
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-zinc-500 dark:text-zinc-400">Length</span>
                  <span className="font-mono text-zinc-900 dark:text-white">{trailer.dimensions.length}</span>
                </li>
                <li className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-zinc-500 dark:text-zinc-400">Width</span>
                  <span className="font-mono text-zinc-900 dark:text-white">{trailer.dimensions.width}</span>
                </li>
                <li className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-zinc-500 dark:text-zinc-400">Height</span>
                  <span className="font-mono text-zinc-900 dark:text-white">{trailer.dimensions.height}</span>
                </li>
                <li className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-zinc-500 dark:text-zinc-400">Max Weight</span>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{trailer.weightCapacity}</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <Box className="w-4 h-4 text-emerald-500" /> Typical Freight
              </h4>
              <div className="flex flex-wrap gap-2">
                {trailer.freightExamples.map((freight, i) => (
                  <span key={i} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs rounded-full border border-zinc-200 dark:border-zinc-700">
                    {freight}
                  </span>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg">
                <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider block mb-1">Load Example</span>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 italic">"{trailer.typicalLoad}"</p>
              </div>
            </div>
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20 rounded-xl">
              <h4 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-3 text-sm uppercase tracking-wider">Advantages</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                {trailer.advantages.map((adv, i) => <li key={i}>{adv}</li>)}
              </ul>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-xl">
              <h4 className="font-semibold text-red-700 dark:text-red-400 mb-3 text-sm uppercase tracking-wider">Disadvantages</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                {trailer.disadvantages.map((dis, i) => <li key={i}>{dis}</li>)}
              </ul>
            </div>
          </div>

          {/* Dispatcher Tips */}
          <div className="p-5 bg-gradient-to-r from-amber-100 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/10 border border-amber-200 dark:border-amber-700/30 rounded-xl flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-amber-900 dark:text-amber-400 mb-1">Dispatcher Tips</h4>
              <p className="text-sm text-amber-800 dark:text-amber-200/80 leading-relaxed">
                {trailer.dispatcherTips}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
