"use client";

import { Truck, ArrowLeft, Thermometer, Box, ArrowRightLeft, Layers } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TRAILER_CATEGORIES = [
  {
    title: "Dry Van",
    icon: <Box className="w-6 h-6 text-blue-500" />,
    description: "The most common enclosed trailer used to haul non-perishable goods.",
    types: [
      {
        name: "Standard Dry Van",
        desc: "A fully enclosed box trailer protecting cargo from the elements.",
        freight: "Palletized goods, electronics, paper, clothing, retail goods.",
        advantages: "Keeps freight dry and secure. Very abundant capacity.",
        dimensions: "53' Long x 8'6\" Wide x 9' Tall (inside)",
        weightLimit: "44,000 - 45,000 lbs"
      },
      {
        name: "Swing Door",
        desc: "Features two rear doors that swing open fully.",
        freight: "General dry freight.",
        advantages: "Allows for maximum interior loading space. Forklifts can enter easily.",
        dimensions: "Standard 53'",
        weightLimit: "45,000 lbs"
      },
      {
        name: "Roll-Up Door",
        desc: "Features a rear door that rolls up into the ceiling, like a garage door.",
        freight: "Local delivery goods, LTL freight.",
        advantages: "Driver doesn't need space behind the truck to open the doors at tight docks.",
        dimensions: "Slightly lower clearance due to the door mechanism.",
        weightLimit: "44,000 lbs"
      }
    ]
  },
  {
    title: "Refrigerated (Reefer)",
    icon: <Thermometer className="w-6 h-6 text-sky-500" />,
    description: "Insulated trailers equipped with a refrigeration unit (motor) to control temperature.",
    types: [
      {
        name: "Single Temperature Reefer",
        desc: "Maintains one consistent temperature throughout the entire trailer.",
        freight: "Produce, frozen meats, pharmaceuticals, chemicals.",
        advantages: "High-paying freight. Protects sensitive goods from spoiling.",
        dimensions: "53' Long x 8'6\" Wide",
        weightLimit: "42,500 - 44,000 lbs (Heavier than Dry Vans due to insulation/motor)"
      },
      {
        name: "Multi-Temperature Reefer",
        desc: "Divided into separate zones (using bulkheads) allowing different temperatures in the same trailer.",
        freight: "Mixed food service deliveries (e.g., frozen fries in front, fresh produce in back).",
        advantages: "Maximum flexibility for grocery distributors.",
        dimensions: "53' Long x 8'6\" Wide",
        weightLimit: "42,000 lbs"
      }
    ]
  },
  {
    title: "Flatbed & Open Deck",
    icon: <Layers className="w-6 h-6 text-amber-500" />,
    description: "Trailers with no sides or roof, designed for large, heavy, or irregularly shaped cargo.",
    types: [
      {
        name: "Standard Flatbed",
        desc: "A completely flat deck, usually 48' or 53' long.",
        freight: "Lumber, steel pipes, building materials, machinery.",
        advantages: "Can be loaded from the sides or from above by a crane.",
        dimensions: "48' or 53' Long x 8'6\" Wide x 5' High (Deck height)",
        weightLimit: "48,000 lbs"
      },
      {
        name: "Conestoga",
        desc: "A flatbed covered by a retractable heavy-duty tarp system.",
        freight: "Aerospace parts, specialized metals, sensitive machinery.",
        advantages: "Provides flatbed-style loading (from sides) but protects the cargo from weather without manually tarping.",
        dimensions: "48' or 53' Long",
        weightLimit: "44,000 lbs (Tarp system adds weight)"
      },
      {
        name: "Step Deck (Drop Deck)",
        desc: "A flatbed with a lowered lower deck to accommodate taller freight.",
        freight: "Tractors, tall machinery, construction equipment.",
        advantages: "Allows for hauling freight up to 10 feet tall without requiring oversize permits.",
        dimensions: "Upper Deck: 11' | Lower Deck: 37'",
        weightLimit: "46,000 lbs"
      },
      {
        name: "Double Drop",
        desc: "A trailer with an upper deck, a very low 'well' in the middle, and a rear deck over the axles.",
        freight: "Extremely tall industrial equipment.",
        advantages: "The 'well' is only 18-24 inches off the ground, allowing for massive height clearance.",
        dimensions: "Well length varies (usually 29')",
        weightLimit: "40,000 lbs (Varies by axle configuration)"
      },
      {
        name: "RGN (Removable Gooseneck)",
        desc: "A specialized drop deck where the front detaches, creating a ramp for drivable equipment.",
        freight: "Bulldozers, combines, massive excavators.",
        advantages: "Equipment can simply be driven onto the trailer instead of lifted by cranes.",
        dimensions: "Varies heavily",
        weightLimit: "40,000 - 150,000+ lbs (Depending on number of axles)"
      }
    ]
  },
  {
    title: "Specialized Trailers",
    icon: <ArrowRightLeft className="w-6 h-6 text-purple-500" />,
    description: "Highly specific equipment built for very narrow niches in the freight market.",
    types: [
      {
        name: "Lowboy",
        desc: "A heavy-duty trailer specifically built to haul extremely massive weights.",
        freight: "Military equipment, mining machinery.",
        advantages: "Incredibly strong and low to the ground for extreme oversize loads.",
        dimensions: "Varies",
        weightLimit: "Up to 80,000 lbs per trailer (Often requires 3-4 axles)"
      },
      {
        name: "Tanker",
        desc: "A cylindrical trailer designed for bulk liquids or dry powder.",
        freight: "Gasoline, milk, chemicals, cement.",
        advantages: "The only legal and efficient way to move bulk unpackaged liquids.",
        dimensions: "Capacity measured in gallons (e.g., 6,000 - 9,000 gallons)",
        weightLimit: "45,000 lbs"
      },
      {
        name: "Hopper Bottom (Grain Trailer)",
        desc: "An open-top trailer with funnels at the bottom for discharging bulk goods.",
        freight: "Corn, wheat, soybeans, fertilizer.",
        advantages: "Gravity does the unloading work when placed over a pit.",
        dimensions: "40' - 43' Long",
        weightLimit: "50,000 lbs"
      },
      {
        name: "Car Hauler",
        desc: "A skeletal trailer designed to stack vehicles.",
        freight: "New and used automobiles.",
        advantages: "Hydraulic ramps allow for stacking 7 to 9 cars safely.",
        dimensions: "Highly specialized",
        weightLimit: "Varies based on vehicle counts"
      },
      {
        name: "Livestock Trailer",
        desc: "A vented, enclosed trailer with internal gates to transport live animals.",
        freight: "Cattle, pigs, sheep.",
        advantages: "Keeps animals contained while allowing airflow.",
        dimensions: "53' Long",
        weightLimit: "Depends on animal weight"
      }
    ]
  }
];

export default function TrailerTypesModule() {
  return (
    <div className="max-w-6xl mx-auto pb-16 animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard">
          <div className="h-10 w-10 bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 rounded-xl flex items-center justify-center border border-zinc-200 dark:border-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
          </div>
        </Link>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">Educational Module</Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Trailer Types Guide</h1>
        </div>
      </div>

      <div className="prose dark:prose-invert prose-blue max-w-none mb-10">
        <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
          As a freight dispatcher, you must understand the exact capabilities and limitations of the equipment your carrier operates. Booking the wrong freight for a trailer can lead to rejected loads, severe fines, or dangerous accidents. Use this comprehensive guide to master the various trailer configurations.
        </p>
      </div>

      <div className="space-y-12">
        {TRAILER_CATEGORIES.map((category, idx) => (
          <div key={idx} className="space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b border-zinc-200 dark:border-white/10">
              <div className="p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-lg shadow-sm">
                {category.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">{category.title}</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{category.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {category.types.map((trailer, tIdx) => (
                <Card key={tIdx} className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl text-zinc-900 dark:text-white">{trailer.name}</CardTitle>
                    <CardDescription className="text-zinc-500 dark:text-zinc-400 mt-1">{trailer.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 text-sm">
                      <div className="grid grid-cols-3 gap-2">
                        <span className="font-semibold text-zinc-700 dark:text-zinc-300">Typical Freight:</span>
                        <span className="col-span-2 text-zinc-600 dark:text-zinc-400">{trailer.freight}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="font-semibold text-zinc-700 dark:text-zinc-300">Advantages:</span>
                        <span className="col-span-2 text-zinc-600 dark:text-zinc-400">{trailer.advantages}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 py-2 border-t border-zinc-100 dark:border-white/5">
                        <span className="font-semibold text-zinc-700 dark:text-zinc-300">Dimensions:</span>
                        <span className="col-span-2 text-blue-600 dark:text-blue-400 font-mono">{trailer.dimensions}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="font-semibold text-zinc-700 dark:text-zinc-300">Weight Limit:</span>
                        <span className="col-span-2 text-amber-600 dark:text-amber-400 font-mono font-medium">{trailer.weightLimit}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
