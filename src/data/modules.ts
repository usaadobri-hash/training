export const curriculumModules = [
  {
    id: 1,
    title: "Truck Drivers & Operations",
    content: `
![Module 1 Illustration](/modules/module_1.png)

# Truck Drivers & Operations

The trucking industry relies on various types of drivers and operational setups. As a dispatcher, you must understand the different types of drivers you will be managing and their operational styles.

## 1. Types of Drivers

### Company Driver
A company driver is an employee of a trucking company. They do not own the truck; the company provides the truck, covers fuel, insurance, and maintenance. 
- **Dispatcher Role:** You dispatch company drivers based strictly on company policy. They are paid per mile or hourly.

### Lease Operator
A lease operator is an independent contractor who leases a truck from a carrier. They make the truck payments and cover their operating expenses (like fuel), but run under the carrier's operating authority (MC number).
- **Dispatcher Role:** You must book profitable freight for them because they have high fixed costs (truck lease payments).

### Owner Operator
An owner-operator owns their truck outright. They might run under their own MC authority or lease onto another carrier.
- **Dispatcher Role:** Owner-operators are small business owners. They are highly motivated by profit and have the final say on which loads they accept or reject. You act as their business partner.

## 2. Operational Styles

### Solo Drivers
A single driver operating the truck. 
- **Limitations:** Limited by Hours of Service (HOS) rules to roughly 11 hours of driving per day. Maximum daily distance is around 550-600 miles.

### Team Drivers
Two drivers in the same truck. While one drives, the other sleeps in the sleeper berth.
- **Advantage:** The truck rarely stops moving. Team drivers can cover 1,000+ miles per day. Ideal for high-value or highly expedited freight (e.g., FedEx runs).

## 3. The Driver Lifestyle
The Over-The-Road (OTR) lifestyle is incredibly grueling. Drivers spend weeks away from their families, sleep in truck stops, and deal with massive traffic stress. 
- **The Dispatcher's Duty:** Treat your drivers with immense respect. Be their advocate when dealing with brokers and shippers. Never lie to a driver.
    `
  },
  {
    id: 2,
    title: "Stakeholders in Trucking",
    content: `
![Module 2 Illustration](/modules/module_2.png)

# Stakeholders in Trucking

A freight transaction is a complex web of different entities. You must understand who is who to successfully coordinate a load.

## 1. The Core Entities
- **Shipper (Consignor):** The company that manufactures or holds the goods and needs them transported. They are the origin of the freight.
- **Receiver (Consignee):** The company or facility that receives the goods. This is the destination.
- **Carrier:** The trucking company that physically transports the freight using their trucks and drivers.
- **Broker:** The middleman. They do not own trucks. They secure freight contracts from Shippers and outsource the physical transportation to Carriers.

## 2. Customer Relationships

### Direct Customer
When a Carrier or Independent Dispatcher works directly with a Shipper (e.g., Walmart). 
- **Pros:** No middleman taking a cut. Higher rates.
- **Cons:** Extremely hard to secure without massive capacity (hundreds of trucks) and an established reputation.

### Indirect Customer (Brokered Freight)
When you book a load from a load board through a Broker (e.g., TQL, CH Robinson).
- **Pros:** Readily available freight. Easy to find.
- **Cons:** The broker takes a margin (10-20% usually).

## 3. Types of Brokers

### Non-Asset Based Broker
A traditional broker who owns zero trucks. Their entire business is matching Shippers with Carriers via phones and software. Example: Coyote Logistics.

### Asset-Based Broker
A massive trucking company (e.g., J.B. Hunt, Schneider) that also operates a brokerage division. They try to move the freight on their own trucks first. If they don't have a truck available, their brokerage division posts it on a load board for an outside carrier to haul.
    `
  },
  {
    id: 3,
    title: "Truck Types & Parts",
    content: `
![Module 3 Illustration](/modules/module_3.png)

# Truck Types & Exterior Parts

To book the right freight, you must understand the equipment your carrier operates.

<div class="my-6 p-4 bg-blue-900/30 border border-blue-500/50 rounded-xl flex items-center justify-between">
  <div>
    <h4 class="font-bold text-white mb-1">Interactive Simulator Available</h4>
    <p class="text-zinc-300 text-sm">Practice identifying exterior parts in our 3D Truck Parts Simulator.</p>
  </div>
  <a href="/dashboard/simulators/truck-parts" class="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-500 transition-colors">Launch Simulator</a>
</div>

## 1. Tractor Types

### Day Cab
A tractor without a sleeping area behind the driver seats. 
- Lighter weight allows for heavier payloads.
- Used strictly for local or regional runs where the driver returns home daily.

### Sleeper Cab
A tractor equipped with a living compartment (bed, microwave, fridge). 
- Heavier than a day cab.
- Used for Over-The-Road (OTR) long-haul trucking.

### Straight Truck
A vehicle where the cab and the cargo box are built onto the same single chassis (they cannot be disconnected like a tractor-trailer).
- **Box Truck:** A common type of straight truck (like a U-Haul) used for local deliveries and final-mile logistics.

## 2. Major Truck Brands
- Freightliner (Cascadia is the most common fleet truck)
- Peterbilt (Iconic long-nose trucks like the 389)
- Kenworth (W900, T680)
- Volvo
- Mack

## 3. Essential Exterior Parts

- **Fifth Wheel:** The massive horseshoe-shaped steel plate that connects the tractor to the trailer's kingpin.
- **Gladhands:** The interlocking metal connectors for the red (emergency) and blue (service) air lines that provide air to the trailer brakes.
- **Tandems:** The set of two axles at the rear of the trailer that can slide forward or backward to adjust weight distribution.
- **Landing Gear:** The retractable legs that support the front of the trailer when it is disconnected from the tractor.
    `
  },
  {
    id: 4,
    title: "Freight Types",
    content: `
![Module 4 Illustration](/modules/module_4.png)

# Freight Types and Trailer Classifications

## 1. Load Sizes

### Full Truckload (FTL)
The shipper pays for the exclusive use of the entire 53-foot trailer. It goes straight from Shipper to Receiver with no stops. This is the easiest freight to dispatch.

### Less-Than-Truckload (LTL)
Small shipments (1-6 pallets). Massive LTL carriers (FedEx Freight, XPO) combine dozens of these into one trailer through hub-and-spoke terminal networks. Independent dispatchers rarely deal with traditional LTL.

### Partial (Volume LTL)
A hybrid. A shipment of 10 pallets that doesn't need an entire trailer. An advanced dispatcher will book two Partials and put them on the same trailer to generate higher total revenue than a single FTL.

## 2. Freight Categories

### General Freight
Standard palletized goods (electronics, paper, water, non-perishables). Hauled in 53' Dry Vans.

### Temperature Controlled
Perishables, frozen foods, or pharmaceuticals. Hauled in Refrigerated (Reefer) trailers. High rates, but high risk of cargo claims if the reefer motor breaks.

### Oversize Loads (OSOW)
Over-Dimensional / Over-Weight freight. If a load is wider than 8'6", taller than 13'6", or heavier than 80,000 lbs gross, it requires state permits, escort cars, and specific routing. Hauled on Flatbeds, Step Decks, or RGNs.

### Hazmat (Hazardous Materials)
Chemicals, explosives, or flammable liquids. Requires the driver to have a Hazmat Endorsement on their CDL, and the trailer must display specific warning placards. Pays very well due to the risk.
    `
  },
  {
    id: 5,
    title: "Documents & Requirements",
    content: `
![Module 5 Illustration](/modules/module_5.png)

# Documents & Operating Requirements

The trucking industry runs on paperwork. If a carrier's paperwork is out of date, they cannot legally move freight.

## 1. Operating Authority
- **MC Number (Motor Carrier):** Issued by the FMCSA. It grants the carrier the legal authority to transport freight across state lines for hire.
- **USDOT Number:** A unique identifier assigned to all commercial vehicles by the Department of Transportation.
- **SCAC Code (Standard Carrier Alpha Code):** A unique 2-4 letter code used to identify transportation companies, primarily required when hauling ocean containers or dealing with the military.

## 2. Driver Credentials
- **CDL (Commercial Driver's License):** Required to drive vehicles over 26,000 lbs.
- **Endorsements:** Add-ons to a CDL.
  - 'X' = Tanker & Hazmat combined
  - 'T' = Double/Triple trailers
- **TWIC Card (Transportation Worker Identification Credential):** Issued by the TSA. Required for unescorted access to secure maritime ports (to pick up ocean containers).
- **Passports / Border Crossing:** Drivers need a valid passport, FAST card, or Enhanced CDL to run loads into Canada or Mexico.

## 3. Load Documents
- **Rate Confirmation (Rate Con):** The legally binding contract from the broker detailing the rate, addresses, and terms. *Never dispatch a truck without a signed Rate Con.*
- **Bill of Lading (BOL):** The receipt for the freight given by the shipper.
- **Proof of Delivery (POD):** The BOL becomes the POD once it is signed by the receiver upon delivery. You need this to get paid!
    `
  },
  {
    id: 6,
    title: "Safety & FMCSA",
    content: `
![Module 6 Illustration](/modules/module_6.png)

# Safety, FMCSA, and DOT Audits

## 1. The FMCSA
The Federal Motor Carrier Safety Administration (FMCSA) is the government agency that regulates the trucking industry. Their primary mission is to prevent crashes, injuries, and fatalities. 

## 2. CSA Scores (Compliance, Safety, Accountability)
The FMCSA tracks carrier safety using the CSA system. Points are added to a carrier's score every time a driver receives a violation during a roadside inspection.
- Brokers will check a carrier's CSA score (often using tools like Carrier411).
- If the score is too high (bad), brokers will put the carrier on a "Do Not Use" list, meaning you won't be able to book freight for them.

## 3. DOT Inspections
State Troopers and DOT officers conduct roadside inspections to enforce safety.
- **Level 1:** Full inspection. They check driver logs, medical cards, and physically crawl under the truck to inspect brakes, air lines, and suspension.
- **Level 2:** Walk-around inspection. No crawling under the truck.
- **Level 3:** Driver-only inspection (credentials and logbooks).

### Out of Service (OOS)
If an officer finds a severe violation (e.g., bald tires, driver out of hours), they will issue an Out of Service order. The truck is legally forbidden from moving until a mobile mechanic fixes the issue. This destroys profitability.

## 4. Carrier Ratings
Carriers are issued a safety rating after a compliance review audit:
- **Satisfactory:** Good to go.
- **Conditional:** The carrier has safety issues but can still operate. Many brokers refuse to work with Conditional carriers.
- **Unsatisfactory:** The carrier's MC authority is revoked. They are shut down.
    `
  },
  {
    id: 7,
    title: "ELD & HOS",
    content: `
![Module 7 Illustration](/modules/module_7.png)

# ELD & Hours of Service (HOS)

<div class="my-6 p-4 bg-blue-900/30 border border-blue-500/50 rounded-xl flex items-center justify-between">
  <div>
    <h4 class="font-bold text-white mb-1">Interactive Simulator Available</h4>
    <p class="text-zinc-300 text-sm">Practice calculating legal drive times in our ELD Simulator.</p>
  </div>
  <a href="/dashboard/simulators/eld" class="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-500 transition-colors">Launch Simulator</a>
</div>

## 1. The Electronic Logging Device (ELD)
An ELD is a piece of hardware plugged into the truck's engine port. It automatically tracks motion. When the truck goes over 5 mph, the driver is automatically placed in "Driving" status. Dispatchers must plan routes precisely because logbooks cannot be faked.

## 2. The Core HOS Rules

### The 11-Hour Rule (Drive Time)
A driver may drive a maximum of 11 hours after taking 10 consecutive hours off-duty.
*(11 hours at 55 mph avg = ~600 miles max per day).*

### The 14-Hour Rule (The Daily Shift)
A driver has a 14-hour "window" to complete their 11 hours of driving. 
- **Critical:** The 14-hour clock DOES NOT STOP for breaks, traffic, or waiting at a shipper. Once it hits 14 hours, the truck must stop.

### The 30-Minute Break
A driver must take a 30-minute break if 8 consecutive hours of driving have passed.

## 3. The Weekly Cycle

### The 70-Hour Rule
A driver cannot drive if they have accumulated 70 hours of On-Duty time in any 8 consecutive days.

### The 34-Hour Reset
To reset the 70-hour clock back to zero, a driver must take 34 consecutive hours Off-Duty (usually over a weekend).

## 4. Trip Planning Example
If you book a load going 1,200 miles, it requires 22 hours of pure driving (at 55 mph). That is two full 11-hour shifts, plus a 10-hour break in between. It is physically and legally impossible for a solo driver to deliver it the next day.
    `
  },
  {
    id: 8,
    title: "Load Securement",
    content: `
![Module 8 Illustration](/modules/module_8.png)

# Load Securement

When moving 45,000 lbs of steel or machinery down a highway at 70 mph, proper securement is life or death. The DOT has strict regulations on how many tie-downs are required based on weight and length.

## 1. Flatbed Securement Tools

### Straps (Winch & Ratchet)
Heavy-duty nylon webbing used to strap down cargo like lumber, drywall, or pipe. 
- *Edge Protectors (Vee-Boards):* Plastic or metal angles placed under the strap to prevent the strap from cutting into the freight (or the sharp freight cutting the strap).

### Chains & Binders
Steel chains are required for incredibly heavy or sharp freight that would slice through nylon straps, such as steel coils, excavators, and massive machinery.

### Tarps
Heavy canvas covers used to protect flatbed freight from weather. 
- *Lumber Tarps:* Massive tarps with "flaps" on the ends to cover tall stacks of lumber.
- *Steel Tarps:* Smaller, flatter tarps used for low-profile loads like steel coils.
- **Dispatcher Note:** Tarping is exhausting, dangerous work. Always negotiate extra "Tarp Pay" (usually $50-$150) from the broker.

## 2. Dry Van & Reefer Securement

### Load Bars / E-Track Straps
Metal bars or ratchet straps that lock into the interior walls of a Dry Van. They prevent pallets from sliding backward toward the trailer doors during transit.

### Dunnage
Scrap wood used to separate cargo or prop it up so a forklift can get under it. 

### Airbags
Massive inflatable bags placed between pallets of fragile cargo (like glass bottles). They are inflated to wedge the pallets tightly against the walls to prevent shifting.

### Block & Brace
Using wood and nails to build a physical barrier on the wooden floor of a trailer to prevent heavy items (like paper rolls) from sliding forward or backward.
    `
  },
  {
    id: 9,
    title: "Load Boards",
    content: `
![Module 9 Illustration](/modules/module_9.png)

# Mastering Load Boards

Load boards are digital marketplaces where brokers post loads and dispatchers search for freight.

## 1. The Big Players
- **DAT One:** The undisputed king of load boards. It has the most freight and the best rate data tools.
- **Truckstop.com:** The second largest. Excellent for flatbed and specialized freight.

## 2. Performing a Lane Search
When searching, you input:
- **DH-O (Deadhead Origin):** Where your truck is empty and the radius you will drive to pick up.
- **DH-D (Deadhead Destination):** Where you want to go.
- **Equipment:** Van (V), Reefer (R), Flatbed (F).

## 3. Market Rates & RPM
- **RPM (Rate Per Mile):** The total payout divided by the total miles. (e.g., $1500 / 500 miles = $3.00 RPM).
- **DAT RateView:** A tool built into DAT that shows the 15-day average rate for a specific lane. If the average is $2.50/mile, use that as your baseline for negotiations.

## 4. The Danger of Deadhead
"Deadhead" is driving empty. If you drive 200 miles empty to pick up a load that pays $1,000 for 300 loaded miles, your actual RPM isn't $3.33 ($1000/300). Your actual RPM is $2.00 ($1000 / 500 total miles). 
**Deadhead destroys profitability.**

## 5. Posting Your Truck
Instead of just searching, you can post your truck's location and equipment on the board. Brokers with matching freight will call you. This gives you massive leverage in negotiations because *they* are calling *you*.
    `
  },
  {
    id: 10,
    title: "Broker Communication",
    content: `
![Module 10 Illustration](/modules/module_10.png)

# Broker Communication & Negotiation



## 1. Calling Brokers
When you call a broker from a load board posting, be fast and professional.
- *"Hi, calling on the Dallas to Chicago Van load. What are the details?"*
- Get the exact commodity, weight, and appointment times *before* talking money.

## 2. Negotiation Strategy
- **Never accept the first offer.** If they offer $1,500, they have room to move up.
- **The Opening Counter:** *"My driver is empty 10 miles away with full hours. But I need $1,800 to put the truck on it."*
- **Meet in the Middle:** If they counter with $1,600, say, *"Meet me at $1,700, send the Rate Con, and I'll send tracking immediately."*

## 3. Rate Confirmations (RC)
The RC is the legally binding contract. 
- Review it carefully. Does the rate match what you negotiated? Are the times correct?
- **Sign it and return it immediately.** The load is not yours until they get the signed RC back.

## 4. Handling Objections
- *Broker: "The market rate is only $2.00 a mile."*
- *You:* *"The market average is $2.00, but there are only 3 trucks posted in this city today and 20 loads. It's a tight market. Pay $2.50 and I'll cover it right now."*
    `
  },
  {
    id: 11,
    title: "Dispatch Workflow",
    content: `
![Module 11 Illustration](/modules/module_11.png)

# The Dispatch Workflow

Dispatching is a systematic process. Following a strict workflow prevents errors.

## Step 1: Find the Load
Assess your driver's location, available hours (HOS), and equipment. Scan the load boards or contact dedicated broker relationships.

## Step 2: Call the Broker & Negotiate
Confirm the load details fit your driver's legal limits and capabilities. Negotiate the rate to meet your carrier's profit margin goals.

## Step 3: Book the Load (Carrier Setup)
If this is a new broker, send them your Carrier Setup Packet (MC Authority, W-9, COI, NOA).

## Step 4: Sign the Rate Confirmation
Receive the RC, verify all details, sign it, and email it back.

## Step 5: Driver Instructions
Send the load details to your driver via text or a TMS App. Include:
- Pickup Name, Address, and Appointment Time
- Delivery Name, Address, and Appointment Time
- Commodity and Weight
- Pickup/Reference Numbers (Crucial!)

## Step 6: Initial Updates
Send an email to the broker confirming the driver has received the dispatch and is rolling to the shipper.
    `
  },
  {
    id: 12,
    title: "Update Department",
    content: `
![Module 12 Illustration](/modules/module_12.png)

# The Update Department

Brokers manage hundreds of trucks. Their biggest fear is a truck going missing. As a dispatcher, you are the "Update Department" for your carrier. Proactive communication builds trust and leads to dedicated lanes.

## 1. Check Calls and Tracking
Brokers require tracking (like Macropoint or Trucker Tools) on the driver's phone. 
- You must also provide manual "Check Calls" (updates via email or phone) at critical milestones.

## 2. The 4 Mandatory Updates
1. **Dispatched:** *"Driver is empty, tracking is accepted, ETA to shipper is 14:00."*
2. **Loaded:** *"Driver is loaded, secured, and leaving the facility. BOL says 42,000 lbs. ETA to receiver is 08:00 tomorrow."*
3. **Arrived at Receiver:** *"Driver arrived at the gate at 07:45. Waiting for a dock door."*
4. **Empty (Delivered):** *"Driver is empty. Clean POD attached. Please send the new Rate Con if you have a reload!"*

## 3. Handling Delays
Never lie about a delay. 
- **The Wrong Way:** Driver is stuck in a snowstorm. You ignore the broker's calls hoping the driver makes up time. They arrive 4 hours late and the load is rejected.
- **The Right Way:** *"Hey John, driver hit a major snowstorm in Wyoming. He is safe but traffic is stopped. We will miss the 08:00 appointment. Please call the receiver and reschedule us for 13:00."* Brokers can fix almost anything if you give them advance warning.
    `
  },
  {
    id: 13,
    title: "Final Dispatcher Simulation",
    content: `
![Module 13 Illustration](/modules/module_13.png)

# Final Dispatcher Simulation

You have reached the final module. This is where you put everything together.

## The Capstone Experience
Before you take the Final Exam, you must simulate a full day in the life of a dispatcher. You need to combine your knowledge of HOS, Truck Types, Load Boards, and Communication.

## Tasks to Complete:
1. **Load Board Simulation:** Go to the Load Board simulator and find a profitable load for a 53' Reefer emptying out in Dallas, TX. Watch out for scams.
2. **HOS Check:** Verify in the ELD Simulator that your driver has enough hours on their 70-hour clock to complete the transit legally.

## The Final Exam
Once you feel comfortable, proceed to the Assessments section in the sidebar and take the **Final Exam**. 
- It is a comprehensive 100-question test covering all 13 modules.
- You must score an **80% or higher** to pass.
- Upon passing, you will be awarded your official **Dispatcher Academy Certificate**.

Good luck. You are ready.
    `
  }
];
