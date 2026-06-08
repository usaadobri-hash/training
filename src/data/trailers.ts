export type Trailer = {
  id: string;
  name: string;
  category: "Enclosed" | "Open Deck" | "Specialized";
  description: string;
  images: string[];
  dimensions: { length: string; width: string; height: string };
  weightCapacity: string;
  freightExamples: string[];
  advantages: string[];
  disadvantages: string[];
  dispatcherTips: string;
  typicalLoad: string;
  whenToUse: string;
};

export const trailersData: Trailer[] = [
  {
    id: "dry-van",
    name: "Dry Van",
    category: "Enclosed",
    description: "The workhorse of the American logistics industry. A fully enclosed rectangular box that protects freight from weather, theft, and damage.",
    images: ["/trailers/dry_van_hero.png", "/trailers/dry_van_loaded.png"],
    dimensions: { length: "53'", width: "102\" (8' 6\")", height: "110\" (inside)" },
    weightCapacity: "44,000 - 45,000 lbs",
    freightExamples: ["Palletized goods", "Electronics", "Paper products", "Apparel", "Non-perishable food"],
    advantages: ["Protects freight from weather.", "Very common, cheap to operate.", "Easy to load via docks."],
    disadvantages: ["Cannot haul oversized items.", "Cannot load from the side or top.", "No temperature control."],
    dispatcherTips: "Always check if the shipper requires 'Swing Doors' (opens fully, better for wide loads) or allows 'Roll-up Doors' (takes up ceiling space). Ensure the trailer is swept clean and free of holes before pickup.",
    typicalLoad: "26 pallets of consumer electronics weighing 32,000 lbs.",
    whenToUse: "For standard, palletized, dry goods that require no temperature control and fit within standard dock dimensions."
  },
  {
    id: "reefer",
    name: "Refrigerated (Reefer)",
    category: "Enclosed",
    description: "An insulated dry van equipped with a front-mounted refrigeration unit (TRU) designed to keep perishable freight at a specific temperature.",
    images: ["/trailers/reefer_hero.png", "/trailers/reefer_loaded.png"],
    dimensions: { length: "53'", width: "102\"", height: "105\" (inside due to insulation)" },
    weightCapacity: "42,500 - 44,000 lbs",
    freightExamples: ["Fresh produce", "Frozen meats", "Pharmaceuticals", "Chemicals", "Beverages"],
    advantages: ["Commands higher rates.", "Protects sensitive freight from freezing or spoiling."],
    disadvantages: ["Heavier than a dry van, meaning lower payload capacity.", "Requires fuel for the reefer motor.", "Requires frequent trailer washouts."],
    dispatcherTips: "You must run the reefer unit on 'Continuous' mode for fresh produce to keep airflow constant, but 'Cycle' mode is often fine for frozen goods to save fuel. Always pulp (check temperature of) the product before loading.",
    typicalLoad: "20 pallets of fresh strawberries at 34°F Continuous.",
    whenToUse: "When hauling perishable goods, items susceptible to freezing in winter, or when a dry van load pays well enough to warrant using a reefer."
  },
  {
    id: "flatbed",
    name: "Flatbed",
    category: "Open Deck",
    description: "An open trailer with no sides or roof, designed to haul freight that won't fit into a standard enclosed trailer or requires loading from the side or top via crane.",
    images: ["/trailers/flatbed_hero.png", "/trailers/flatbed_loaded.png"],
    dimensions: { length: "48' or 53'", width: "102\"", height: "Deck is ~5' off the ground" },
    weightCapacity: "48,000 lbs",
    freightExamples: ["Steel pipes", "Lumber", "Machinery", "Building materials", "Concrete barriers"],
    advantages: ["Extremely versatile for awkwardly shaped cargo.", "High weight capacity.", "Can be loaded from any angle."],
    disadvantages: ["Freight is exposed to weather.", "Requires physical labor to strap, chain, and tarp loads.", "Dangerous in high winds."],
    dispatcherTips: "Always negotiate 'Tarp Pay' (usually $50-$150) if the shipper requires the load to be covered. Verify if the load requires chains or just straps.",
    typicalLoad: "45,000 lbs of steel coils requiring chains and a lumber tarp.",
    whenToUse: "For heavy, durable, or oddly shaped items that are impervious to weather or can be tarped."
  },
  {
    id: "conestoga",
    name: "Conestoga",
    category: "Open Deck",
    description: "A flatbed trailer equipped with a rolling tarp system on a track. It provides the loading flexibility of a flatbed with the weather protection of a dry van.",
    images: ["/trailers/conestoga_hero.png", "/trailers/conestoga_loaded.png"],
    dimensions: { length: "48' or 53'", width: "102\"", height: "Inside clearance ~98\"" },
    weightCapacity: "43,000 - 45,000 lbs",
    freightExamples: ["Aerospace parts", "Machined metal", "Sensitive equipment", "Glass"],
    advantages: ["Protects freight perfectly without the driver having to physically throw heavy tarps.", "Saves hours at pickup/delivery.", "Premium rates."],
    disadvantages: ["The tarp system adds weight, reducing total capacity.", "Tarp system takes up width/height space.", "Expensive to repair."],
    dispatcherTips: "Sell this trailer to brokers as a premium service. You can charge more because the freight is guaranteed to be dry, and the driver won't waste 2 hours tarping.",
    typicalLoad: "Aircraft wings that cannot get wet but are too wide for a standard dry van.",
    whenToUse: "When a shipper has high-value, weather-sensitive flatbed freight but refuses standard tarps due to scratching risks."
  },
  {
    id: "step-deck",
    name: "Step Deck (Drop Deck)",
    category: "Open Deck",
    description: "A specialized flatbed that drops down after clearing the tractor's fifth wheel, creating a lower deck for taller freight.",
    images: ["/trailers/step_deck_hero.png", "/trailers/step_deck_loaded.png"],
    dimensions: { length: "11' Upper / 37' Lower", width: "102\"", height: "Lower deck is ~40\" off the ground" },
    weightCapacity: "46,000 lbs",
    freightExamples: ["Agricultural tractors", "Tall machinery", "Construction materials", "Generators"],
    advantages: ["Can haul freight up to 10 feet tall legally without oversize permits.", "Lower center of gravity."],
    disadvantages: ["Less overall deck space than a standard flatbed.", "Cannot haul standard 48' long freight on a single level."],
    dispatcherTips: "Confirm the exact dimensions of the freight. The upper deck is usually 11 feet long, meaning the tall portion of the freight must fit completely on the lower deck.",
    typicalLoad: "Two John Deere tractors, driven onto the lower deck.",
    whenToUse: "When freight is taller than 8.5 feet but doesn't warrant an extreme heavy-haul trailer."
  },
  {
    id: "rgn",
    name: "RGN (Removable Gooseneck)",
    category: "Specialized",
    description: "A heavy-haul trailer where the front 'gooseneck' detaches, allowing the trailer to drop to the ground and act as its own ramp for drivable machinery.",
    images: ["/trailers/rgn_hero.png", "/trailers/rgn_loaded.png"],
    dimensions: { length: "Well length ~29'", width: "102\"", height: "Well is ~18\" off the ground" },
    weightCapacity: "40,000 - 150,000+ lbs (Depends on axles)",
    freightExamples: ["Bulldozers", "Excavators", "Cranes", "Massive industrial parts"],
    advantages: ["The well is incredibly low, allowing massive height clearance (up to 12 feet tall).", "Drivable equipment doesn't need cranes to load."],
    disadvantages: ["Very heavy trailer, meaning standard loads aren't profitable.", "Requires expensive oversize/overweight permits frequently."],
    dispatcherTips: "RGN freight is highly lucrative but requires meticulous route planning. You must arrange permits, pilot cars, and verify bridge heights.",
    typicalLoad: "An 80,000 lb Caterpillar Excavator requiring 3 extra axles.",
    whenToUse: "For extreme overweight, over-height, or drivable heavy machinery."
  },
  {
    id: "lowboy",
    name: "Lowboy",
    category: "Specialized",
    description: "Similar to an RGN, a lowboy is a heavy-duty trailer sitting inches off the ground, built strictly for extreme heavy haul.",
    images: ["/trailers/lowboy_hero.png", "/trailers/lowboy_loaded.png"],
    dimensions: { length: "Varies", width: "102\" (can be widened)", height: "Deck height 18-24\"" },
    weightCapacity: "Up to 80,000 lbs (Standard 3-axle)",
    freightExamples: ["Military tanks", "Mining dump trucks", "Transformers"],
    advantages: ["Handles the heaviest freight on the road legally.", "Low deck provides stability."],
    disadvantages: ["Extremely slow to travel with.", "Not suitable for standard dock loading."],
    dispatcherTips: "Lowboys are almost always oversize loads. Ensure your driver is comfortable running with pilot cars and strictly following permitted routes.",
    typicalLoad: "A military M1 Abrams tank.",
    whenToUse: "When freight weight exceeds the capacity of standard flatbeds or step decks."
  },
  {
    id: "hotshot",
    name: "Hotshot",
    category: "Open Deck",
    description: "A Class 3 to 5 heavy-duty pickup truck (e.g., F-350, Ram 3500) pulling a 40-foot flatbed gooseneck trailer.",
    images: ["/trailers/hotshot_hero.png", "/trailers/hotshot_loaded.png"],
    dimensions: { length: "40'", width: "102\"", height: "Standard deck" },
    weightCapacity: "12,000 - 18,000 lbs",
    freightExamples: ["Small machinery", "LTL flatbed freight", "Vehicles", "Construction materials"],
    advantages: ["Cheaper to operate and insure than a semi.", "Can navigate tight residential or construction areas.", "Perfect for urgent, expedited LTL freight."],
    disadvantages: ["Cannot haul standard truckload weights (40k lbs).", "Often subject to the same DOT regulations but earns less gross revenue."],
    dispatcherTips: "Hotshots make money on 'Less Than Truckload' (LTL) freight. Try to book 2 or 3 smaller loads going the same direction to maximize the deck space.",
    typicalLoad: "3 pallets of heavy bricks and a small skid steer.",
    whenToUse: "For time-sensitive, partial flatbed loads that don't require a full 18-wheeler."
  },
  {
    id: "tanker",
    name: "Tanker",
    category: "Specialized",
    description: "A cylindrical enclosed trailer designed specifically for hauling bulk liquids, gases, or dry powders.",
    images: ["/trailers/tanker_hero.png"],
    dimensions: { length: "40' - 45'", width: "102\"", height: "Varies" },
    weightCapacity: "~45,000 lbs (6,000 - 9,000 Gallons)",
    freightExamples: ["Gasoline", "Chemicals", "Milk", "Liquid Sugar", "Cement powder"],
    advantages: ["The only efficient way to move bulk liquids.", "High demand for hazmat/chemical haulers."],
    disadvantages: ["Drivers face 'liquid surge' which makes stopping dangerous.", "Often requires Hazmat and Tanker endorsements.", "Rigorous cleaning required."],
    dispatcherTips: "Ensure your driver has a Tanker Endorsement. If hauling fuel or chemicals, Hazmat is required. Always verify if the shipper requires 'food grade' tanks.",
    typicalLoad: "8,000 gallons of unleaded gasoline.",
    whenToUse: "When hauling liquids or dry bulk powders."
  },
  {
    id: "hopper-bottom",
    name: "Hopper Bottom (Grain Trailer)",
    category: "Specialized",
    description: "An open-top trailer with funnels (hoppers) at the bottom, used to transport bulk agricultural commodities.",
    images: [],
    dimensions: { length: "40' - 43'", width: "102\"", height: "Varies" },
    weightCapacity: "50,000 lbs",
    freightExamples: ["Corn", "Wheat", "Soybeans", "Fertilizer"],
    advantages: ["Gravity unloads the freight in minutes when parked over a pit.", "Highly efficient for farms."],
    disadvantages: ["Highly seasonal (harvest times).", "Can't haul anything other than bulk dry goods."],
    dispatcherTips: "Rates fluctuate wildly based on harvest seasons. Be prepared to chase the harvest across the Midwest for the best money.",
    typicalLoad: "900 bushels of corn from a farm to a grain elevator.",
    whenToUse: "For agricultural or bulk dry goods that can be poured."
  },
  {
    id: "car-hauler",
    name: "Car Hauler",
    category: "Specialized",
    description: "A highly specialized skeletal trailer with hydraulic ramps used to stack and transport multiple passenger vehicles.",
    images: [],
    dimensions: { length: "Up to 80' total combination", width: "102\"", height: "13'6\" to 14'" },
    weightCapacity: "Varies (can haul 7-9 cars)",
    freightExamples: ["New dealership cars", "Used auction cars", "POV (Privately owned vehicles)"],
    advantages: ["Extremely high earning potential per load.", "Consistent demand from auctions and dealerships."],
    disadvantages: ["Very expensive equipment.", "High liability for damage.", "Takes hours to load and secure properly."],
    dispatcherTips: "You must constantly check for overhead bridge clearances, as car haulers frequently push the maximum legal height limits.",
    typicalLoad: "8 brand new SUVs from a port to a dealership.",
    whenToUse: "Exclusively for hauling vehicles."
  }
];
