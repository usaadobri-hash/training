"use client";

import { Check, X } from "lucide-react";

export default function ComparisonTables() {
  const TableRow = ({ label, a, b, highlight }: { label: string, a: string | React.ReactNode, b: string | React.ReactNode, highlight?: boolean }) => (
    <tr className="border-b border-zinc-100 dark:border-zinc-800 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
      <td className="py-3 px-4 text-sm font-medium text-zinc-900 dark:text-white">{label}</td>
      <td className={`py-3 px-4 text-sm ${highlight ? 'font-bold text-blue-600 dark:text-blue-400' : 'text-zinc-600 dark:text-zinc-300'}`}>{a}</td>
      <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-300">{b}</td>
    </tr>
  );

  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Dry Van vs Reefer</h3>
        <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
                <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-white w-1/3">Feature</th>
                <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-white w-1/3">Dry Van</th>
                <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-white w-1/3">Reefer</th>
              </tr>
            </thead>
            <tbody>
              <TableRow label="Max Weight" a="45,000 lbs" b="43,000 lbs (Heavier empty weight)" />
              <TableRow label="Temperature Control" a={<X className="w-4 h-4 text-red-500"/>} b={<Check className="w-4 h-4 text-emerald-500"/>} />
              <TableRow label="Interior Width" a="100 - 102 inches" b="97 - 98 inches (Due to insulation)" />
              <TableRow label="Fuel Requirement" a="Tractor only" b="Tractor + TRU (Reefer Motor)" />
              <TableRow label="Rate Per Mile (Avg)" a="$2.00 - $2.50" b="$2.50 - $3.20+" highlight />
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Flatbed vs Step Deck</h3>
        <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
                <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-white w-1/3">Feature</th>
                <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-white w-1/3">Standard Flatbed</th>
                <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-white w-1/3">Step Deck</th>
              </tr>
            </thead>
            <tbody>
              <TableRow label="Deck Height" a="~60 inches" b="~40 inches (Lower deck)" />
              <TableRow label="Max Legal Freight Height" a="8' 6&quot; (102 inches)" b="10' (120 inches)" highlight />
              <TableRow label="Deck Length (Continuous)" a="48' or 53'" b="37' (Lower) + 11' (Upper)" />
              <TableRow label="Loading Ease (Forklift)" a="Very easy along entire side" b="Difficult on upper deck" />
            </tbody>
          </table>
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Step Deck vs RGN</h3>
        <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
                <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-white w-1/3">Feature</th>
                <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-white w-1/3">Step Deck</th>
                <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-white w-1/3">RGN</th>
              </tr>
            </thead>
            <tbody>
              <TableRow label="Deck Height" a="~40 inches" b="~18 - 24 inches" />
              <TableRow label="Max Legal Freight Height" a="10' (120 inches)" b="11'6&quot; to 12' (144 inches)" highlight />
              <TableRow label="Drivable Loading" a="Requires external ramps" b="Neck detaches acting as its own ramp" highlight />
              <TableRow label="Max Weight" a="~46,000 lbs" b="40,000 to 150,000+ lbs (with extra axles)" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
