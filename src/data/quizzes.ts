export const quizzes = [
  {
    moduleId: 1,
    title: "Truck Drivers & Operations Quiz",
    questions: [
      { id: 1, question: "Who provides the truck for a Company Driver?", options: ["The driver", "The trucking company", "The broker", "The shipper"], correctAnswer: 1 },
      { id: 2, question: "Which type of driver is highly motivated by profit and has final say on loads?", options: ["Company Driver", "Owner Operator", "Student Driver", "Team Driver"], correctAnswer: 1 },
      { id: 3, question: "What is a major limitation of a Solo Driver?", options: ["They can't drive flatbeds", "They are limited by HOS rules to roughly 11 hours of driving per day", "They require two logbooks", "They can't drive at night"], correctAnswer: 1 },
      { id: 4, question: "What is the primary advantage of Team Drivers?", options: ["The truck rarely stops moving", "They don't have to follow HOS rules", "They get paid double by brokers", "They use less fuel"], correctAnswer: 0 },
      { id: 5, question: "Who makes the truck payments for a Lease Operator?", options: ["The broker", "The DOT", "The Lease Operator", "The receiver"], correctAnswer: 2 },
      { id: 6, question: "If you dispatch a Company Driver, what dictates their schedule?", options: ["Their personal preference", "Company policy", "The load board", "The FMCSA exclusively"], correctAnswer: 1 },
      { id: 7, question: "How many miles per day can a Solo Driver safely cover on average?", options: ["1,000+", "550-600", "200-300", "800"], correctAnswer: 1 },
      { id: 8, question: "How many miles per day can Team Drivers cover?", options: ["500", "700", "1,000+", "400"], correctAnswer: 2 },
      { id: 9, question: "What must a dispatcher do when dealing with drivers living the OTR lifestyle?", options: ["Treat them with immense respect and be their advocate", "Lie to them to get loads covered", "Force them to drive tired", "Ignore their calls"], correctAnswer: 0 },
      { id: 10, question: "Which driver type operates under a carrier's MC number but pays for their own fuel?", options: ["Owner Operator with Authority", "Lease Operator", "Company Driver", "Broker"], correctAnswer: 1 }
    ]
  },
  {
    moduleId: 2,
    title: "Stakeholders in Trucking Quiz",
    questions: [
      { id: 1, question: "Who is the 'Consignor' in a freight transaction?", options: ["The Broker", "The Shipper", "The Receiver", "The Carrier"], correctAnswer: 1 },
      { id: 2, question: "Who is the 'Consignee'?", options: ["The Shipper", "The Receiver", "The Carrier", "The Dispatcher"], correctAnswer: 1 },
      { id: 3, question: "What does a Broker do?", options: ["Owns trucks and moves freight", "Acts as the middleman matching Shippers with Carriers", "Manufactures the goods", "Inspects the trucks"], correctAnswer: 1 },
      { id: 4, question: "What is an advantage of having a Direct Customer?", options: ["The broker pays more", "No middleman taking a cut", "You don't need a truck", "It's easy to get"], correctAnswer: 1 },
      { id: 5, question: "What is a disadvantage of a Direct Customer?", options: ["Brokers take 50%", "Extremely hard to secure without massive capacity", "They don't pay", "They only ship Hazmat"], correctAnswer: 1 },
      { id: 6, question: "What is an Asset-Based Broker?", options: ["A broker who only works with assets", "A trucking company that also operates a brokerage division", "A broker with no trucks", "A factoring company"], correctAnswer: 1 },
      { id: 7, question: "What is a Non-Asset Based Broker?", options: ["A broker who owns zero trucks", "A carrier with no trailers", "A shipper with no warehouse", "A receiver with no docks"], correctAnswer: 0 },
      { id: 8, question: "Who physically transports the freight?", options: ["The Shipper", "The Carrier", "The Broker", "The Receiver"], correctAnswer: 1 },
      { id: 9, question: "What is a common margin taken by brokers?", options: ["1-2%", "10-20%", "50-60%", "90%"], correctAnswer: 1 },
      { id: 10, question: "If you book a load from CH Robinson, is that a Direct or Indirect customer?", options: ["Direct", "Indirect (Brokered Freight)", "Neither", "Both"], correctAnswer: 1 }
    ]
  },
  {
    moduleId: 3,
    title: "Truck Types & Parts Quiz",
    questions: [
      { id: 1, question: "Which tractor type has no sleeping area?", options: ["Sleeper Cab", "Day Cab", "Straight Truck", "Hotshot"], correctAnswer: 1 },
      { id: 2, question: "What is the benefit of a Day Cab over a Sleeper Cab?", options: ["It uses no fuel", "It is lighter, allowing for heavier payloads", "It can drive 24 hours a day", "It doesn't need an engine"], correctAnswer: 1 },
      { id: 3, question: "What is a Straight Truck?", options: ["A truck that can only turn left", "A vehicle where the cab and cargo box are on the same chassis", "A truck with a 53' trailer attached", "A pickup truck"], correctAnswer: 1 },
      { id: 4, question: "Which is a major truck brand?", options: ["Freightliner", "Toyota", "Honda", "BMW"], correctAnswer: 0 },
      { id: 5, question: "What connects the tractor to the trailer's kingpin?", options: ["Gladhands", "Tandems", "Landing Gear", "The Fifth Wheel"], correctAnswer: 3 },
      { id: 6, question: "What are Gladhands?", options: ["Tools to fix the engine", "Metal connectors for the red and blue air lines", "A type of steering wheel", "Brake pads"], correctAnswer: 1 },
      { id: 7, question: "What color is the emergency air line?", options: ["Blue", "Green", "Red", "Yellow"], correctAnswer: 2 },
      { id: 8, question: "What are Tandems?", options: ["The steer tires", "The set of two axles at the rear of the trailer", "The mirrors", "The exhaust pipes"], correctAnswer: 1 },
      { id: 9, question: "Why do drivers slide their Tandems?", options: ["To fit under low bridges", "To adjust weight distribution", "To go faster", "To save fuel"], correctAnswer: 1 },
      { id: 10, question: "What supports the front of a disconnected trailer?", options: ["Gladhands", "Fifth Wheel", "Landing Gear", "Kingpin"], correctAnswer: 2 }
    ]
  },
  {
    moduleId: 4,
    title: "Freight Types Quiz",
    questions: [
      { id: 1, question: "What does FTL stand for?", options: ["Freight Transit Logistics", "Full Truckload", "Fast Transit Lane", "Flatbed Truck Load"], correctAnswer: 1 },
      { id: 2, question: "What characterizes an FTL load?", options: ["It makes 10 stops", "It goes straight from Shipper to Receiver with no stops", "It is only 2 pallets", "It requires two trucks"], correctAnswer: 1 },
      { id: 3, question: "What is LTL?", options: ["Less-Than-Truckload", "Long-Term Logistics", "Legal Truck Limit", "Light Trailer Load"], correctAnswer: 0 },
      { id: 4, question: "What is a Partial (Volume LTL)?", options: ["A load that is fully damaged", "A shipment too large for LTL but doesn't need a full trailer", "A load going less than 50 miles", "A load without paperwork"], correctAnswer: 1 },
      { id: 5, question: "Which trailer hauls frozen foods and pharmaceuticals?", options: ["Dry Van", "Reefer (Refrigerated)", "Flatbed", "Step Deck"], correctAnswer: 1 },
      { id: 6, question: "What is OSOW?", options: ["Only Ships On Weekends", "Over-Sized / Over-Weight", "Open Source Over Web", "Over State Over Way"], correctAnswer: 1 },
      { id: 7, question: "Which of these requires state permits and escort cars?", options: ["General Freight", "LTL", "OSOW (Oversize) Loads", "Dry Van loads under 40k lbs"], correctAnswer: 2 },
      { id: 8, question: "What does a driver need to haul Hazmat?", options: ["A bigger truck", "A Hazmat Endorsement on their CDL", "A police escort", "A red truck"], correctAnswer: 1 },
      { id: 9, question: "What type of freight is general palletized goods like electronics and paper?", options: ["General Freight", "Temperature Controlled", "Hazmat", "OSOW"], correctAnswer: 0 },
      { id: 10, question: "Why do Hazmat loads pay very well?", options: ["They are always light", "Due to the high risk involved", "They don't require an ELD", "They are usually local runs"], correctAnswer: 1 }
    ]
  },
  {
    moduleId: 5,
    title: "Documents & Requirements Quiz",
    questions: [
      { id: 1, question: "What grants a carrier the legal authority to transport freight across state lines?", options: ["W-9", "MC Number", "BOL", "POD"], correctAnswer: 1 },
      { id: 2, question: "What is a SCAC code used for?", options: ["Identifying companies, primarily for ocean containers or military", "Tracking fuel tax", "Opening a bank account", "Logbook recording"], correctAnswer: 0 },
      { id: 3, question: "What is a TWIC card?", options: ["A fuel discount card", "Transportation Worker Identification Credential for secure maritime ports", "A toll pass", "A medical certificate"], correctAnswer: 1 },
      { id: 4, question: "What endorsement allows a driver to haul hazardous materials?", options: ["'T' Endorsement", "'X' Endorsement", "'M' Endorsement", "'P' Endorsement"], correctAnswer: 1 },
      { id: 5, question: "What is the legally binding contract from the broker detailing the rate?", options: ["Bill of Lading", "Proof of Delivery", "Rate Confirmation (Rate Con)", "Notice of Assignment"], correctAnswer: 2 },
      { id: 6, question: "What is the golden rule regarding Rate Cons?", options: ["Sign it after delivery", "Never dispatch a truck without a signed Rate Con", "Always negotiate it down", "Throw it away"], correctAnswer: 1 },
      { id: 7, question: "Which document is the receipt for the freight given by the shipper?", options: ["Rate Con", "Bill of Lading (BOL)", "W-9", "COI"], correctAnswer: 1 },
      { id: 8, question: "When does the BOL become the POD (Proof of Delivery)?", options: ["When the broker emails it", "When it is signed by the receiver upon delivery", "When the dispatcher signs it", "When the driver picks up the load"], correctAnswer: 1 },
      { id: 9, question: "Why is the POD critical?", options: ["To cross the border", "You need it to get paid", "To buy fuel", "To pass a DOT inspection"], correctAnswer: 1 },
      { id: 10, question: "What do drivers need to run loads into Canada or Mexico?", options: ["A TWIC card", "A Hazmat endorsement", "A valid passport, FAST card, or Enhanced CDL", "A SCAC code"], correctAnswer: 2 }
    ]
  },
  {
    moduleId: 6,
    title: "Safety & FMCSA Quiz",
    questions: [
      { id: 1, question: "What is the primary mission of the FMCSA?", options: ["To set freight rates", "To prevent crashes, injuries, and fatalities", "To build highways", "To sell trucks"], correctAnswer: 1 },
      { id: 2, question: "What does CSA stand for?", options: ["Carrier Safety Association", "Compliance, Safety, Accountability", "Commercial Standard Agreement", "Cargo Securement Act"], correctAnswer: 1 },
      { id: 3, question: "What happens if a carrier's CSA score is too high (bad)?", options: ["Brokers put them on a 'Do Not Use' list", "They get a bonus", "They are exempt from taxes", "They get dedicated lanes"], correctAnswer: 0 },
      { id: 4, question: "Which DOT inspection level is the most thorough and includes crawling under the truck?", options: ["Level 1", "Level 2", "Level 3", "Level 4"], correctAnswer: 0 },
      { id: 5, question: "Which DOT inspection is Driver-Only (credentials and logbooks)?", options: ["Level 1", "Level 2", "Level 3", "Level 4"], correctAnswer: 2 },
      { id: 6, question: "What does an Out of Service (OOS) order mean?", options: ["The driver must take a 30-minute break", "The truck is legally forbidden from moving until the issue is fixed", "The broker canceled the load", "The truck is sold"], correctAnswer: 1 },
      { id: 7, question: "What tool do brokers often use to check a carrier's CSA score?", options: ["Google Maps", "Carrier411", "DAT RateView", "Facebook"], correctAnswer: 1 },
      { id: 8, question: "Which of these is a Carrier Safety Rating?", options: ["Excellent", "Conditional", "Warning", "Probation"], correctAnswer: 1 },
      { id: 9, question: "What happens to a carrier with an 'Unsatisfactory' safety rating?", options: ["Their MC authority is revoked and they are shut down", "They pay higher tolls", "They can only haul LTL", "They must drive slower"], correctAnswer: 0 },
      { id: 10, question: "Who conducts roadside DOT inspections?", options: ["Brokers", "State Troopers and DOT officers", "Dispatchers", "Receivers"], correctAnswer: 1 }
    ]
  },
  {
    moduleId: 7,
    title: "ELD & HOS Quiz",
    questions: [
      { id: 1, question: "What is the maximum drive time per day under HOS rules?", options: ["10 hours", "11 hours", "14 hours", "70 hours"], correctAnswer: 1 },
      { id: 2, question: "How long is the total daily 'window' (shift) a driver has to complete their driving?", options: ["11 hours", "12 hours", "14 hours", "24 hours"], correctAnswer: 2 },
      { id: 3, question: "Does the 14-hour clock stop for traffic or waiting at a shipper?", options: ["Yes", "No", "Only if it takes more than 2 hours", "Only on weekends"], correctAnswer: 1 },
      { id: 4, question: "When must a driver take a 30-minute break?", options: ["Every 4 hours", "If 8 consecutive hours of driving have passed", "At noon", "Before crossing state lines"], correctAnswer: 1 },
      { id: 5, question: "How long must a driver be off-duty to reset their daily 11 and 14-hour clocks?", options: ["8 consecutive hours", "10 consecutive hours", "24 consecutive hours", "34 consecutive hours"], correctAnswer: 1 },
      { id: 6, question: "What is the 70-Hour Rule?", options: ["Maximum drive time in a month", "Maximum On-Duty time in any 8 consecutive days", "Minimum pay rate", "Weekly break requirement"], correctAnswer: 1 },
      { id: 7, question: "How does a driver reset their 70-hour clock?", options: ["10 hours off-duty", "24 hours off-duty", "34 consecutive hours off-duty", "By crossing a state line"], correctAnswer: 2 },
      { id: 8, question: "At what speed does an ELD automatically switch to 'Driving' status?", options: ["1 mph", "5 mph", "15 mph", "55 mph"], correctAnswer: 1 },
      { id: 9, question: "If a load is 1,200 miles, can a solo driver legally complete it in one shift?", options: ["Yes", "No", "Only if they speed", "Only at night"], correctAnswer: 1 },
      { id: 10, question: "What does ELD stand for?", options: ["Electronic Logging Device", "Engine Load Data", "Electronic License Document", "Engine Limit Detector"], correctAnswer: 0 }
    ]
  },
  {
    moduleId: 8,
    title: "Load Securement Quiz",
    questions: [
      { id: 1, question: "What are nylon straps typically used to secure?", options: ["Steel coils", "Lumber, drywall, or pipe", "Glass bottles", "Perishables"], correctAnswer: 1 },
      { id: 2, question: "What are Edge Protectors (Vee-Boards) used for?", options: ["To prevent the strap from cutting the freight (or vice versa)", "To make the load look better", "To increase aerodynamics", "To lift the freight"], correctAnswer: 0 },
      { id: 3, question: "What securement tool is required for incredibly heavy or sharp freight like steel coils?", options: ["Nylon straps", "Bungee cords", "Steel chains and binders", "Duct tape"], correctAnswer: 2 },
      { id: 4, question: "What is the purpose of a Tarp on a flatbed?", options: ["To hold the freight down", "To protect the freight from weather", "To hide the freight from DOT", "To keep the driver warm"], correctAnswer: 1 },
      { id: 5, question: "Because tarping is exhausting and dangerous, what should a dispatcher always do?", options: ["Tell the driver to skip it", "Negotiate extra 'Tarp Pay' from the broker", "Tarp it themselves", "Only book van loads"], correctAnswer: 1 },
      { id: 6, question: "What are Load Bars or E-Track Straps used for in a Dry Van?", options: ["To hold the roof up", "To prevent pallets from sliding backward toward the doors", "To refrigerate the trailer", "To lock the wheels"], correctAnswer: 1 },
      { id: 7, question: "What is Dunnage?", options: ["Scrap wood used to separate cargo or prop it up", "A type of flatbed trailer", "A tool to measure weight", "A DOT fine"], correctAnswer: 0 },
      { id: 8, question: "How are inflatable Airbags used in load securement?", options: ["To lift the trailer", "To wedge pallets tightly against the walls to prevent shifting", "To cool down the brakes", "To float the truck"], correctAnswer: 1 },
      { id: 9, question: "What does 'Block & Brace' mean?", options: ["Using wood and nails on the floor to prevent heavy items from sliding", "Blocking the wheels with bricks", "Bracing the steering wheel", "Locking the trailer doors"], correctAnswer: 0 },
      { id: 10, question: "Who dictates the strict regulations on how many tie-downs are required?", options: ["The Shipper", "The DOT (Department of Transportation)", "The Broker", "The Receiver"], correctAnswer: 1 }
    ]
  },
  {
    moduleId: 9,
    title: "Load Boards Quiz",
    questions: [
      { id: 1, question: "What are the two dominant load boards in the USA?", options: ["Uber Freight and Convoy", "DAT and Truckstop", "Amazon and CH Robinson", "TQL and Coyote"], correctAnswer: 1 },
      { id: 2, question: "What does DH-O stand for?", options: ["Deadhead Outbound", "Deadhead Origin", "Drive Hours Off", "Destination Hours"], correctAnswer: 1 },
      { id: 3, question: "What does DH-D stand for?", options: ["Deadhead Destination", "Driver Hours Daily", "Direct Haul Distance", "Double Header Drop"], correctAnswer: 0 },
      { id: 4, question: "What is RPM in trucking?", options: ["Revolutions Per Minute", "Rate Per Mile", "Revenue Per Month", "Route Planning Matrix"], correctAnswer: 1 },
      { id: 5, question: "How is Rate Per Mile (RPM) calculated?", options: ["Total Payout / Total Miles", "Total Miles / Total Payout", "Flat rate minus fuel", "Driver pay times hours"], correctAnswer: 0 },
      { id: 6, question: "What is DAT RateView used for?", options: ["Tracking drivers", "Showing the 15-day average rate for a specific lane", "Paying lumpers", "Checking weather"], correctAnswer: 1 },
      { id: 7, question: "Why is Deadhead dangerous to profit margins?", options: ["It is illegal", "It burns fuel while generating zero revenue", "It damages the trailer", "It ruins the tires"], correctAnswer: 1 },
      { id: 8, question: "If you drive 200 empty miles for a load paying $1000 for 300 loaded miles, what is your actual RPM?", options: ["$3.33", "$2.00", "$5.00", "$1.00"], correctAnswer: 1 },
      { id: 9, question: "What is the benefit of 'Posting' your truck on a load board?", options: ["It's free", "Brokers call you, giving you negotiating leverage", "It hides your location", "It legally binds brokers"], correctAnswer: 1 },
      { id: 10, question: "If you search for 'R' on the equipment filter, what are you looking for?", options: ["Rigid", "Reefer (Refrigerated)", "RGN", "Roll-off"], correctAnswer: 1 }
    ]
  },
  {
    moduleId: 10,
    title: "Broker Communication Quiz",
    questions: [
      { id: 1, question: "When calling a broker from a load board posting, how should you speak?", options: ["Slow and casual", "Fast and professional", "Aggressive", "Whisper"], correctAnswer: 1 },
      { id: 2, question: "What should you ask for *before* talking money?", options: ["The broker's name", "The exact commodity, weight, and appointment times", "The lumper fee", "The DOT number"], correctAnswer: 1 },
      { id: 3, question: "Should you accept the broker's first offer?", options: ["Yes, always", "Never, they usually have room to move up", "Only on weekends", "Only for LTL"], correctAnswer: 1 },
      { id: 4, question: "What is an effective opening counter-offer?", options: ["Hang up", "Ask what they are paying, then ask for more because your truck is empty and ready", "Email them a lower rate", "Threaten them"], correctAnswer: 1 },
      { id: 5, question: "What is the Rate Confirmation (RC)?", options: ["A suggestion", "The legally binding contract", "A receipt", "A map"], correctAnswer: 1 },
      { id: 6, question: "What must you do after receiving the Rate Con?", options: ["Review it, sign it, and return it immediately", "Delete it", "Send it to the DOT", "Give it to the receiver"], correctAnswer: 0 },
      { id: 7, question: "When is the load officially yours?", options: ["When you call the broker", "When the broker sends the RC", "When the broker receives the signed RC back from you", "When the driver arrives"], correctAnswer: 2 },
      { id: 8, question: "If a broker says the market rate is only $2.00/mile, how should you handle the objection?", options: ["Agree and hang up", "Argue that it is a tight market with few trucks and ask for more", "Report them to the FMCSA", "Cry"], correctAnswer: 1 },
      { id: 9, question: "What is a 'Tight Market'?", options: ["Many trucks, few loads", "Few trucks, many loads (Carrier has leverage)", "High traffic", "Strict DOT inspections"], correctAnswer: 1 },
      { id: 10, question: "What happens if you dispatch the driver before signing the Rate Con?", options: ["You make more money", "You have zero legal protection if the load is canceled", "The driver gets a bonus", "The broker gets fired"], correctAnswer: 1 }
    ]
  },
  {
    moduleId: 11,
    title: "Dispatch Workflow Quiz",
    questions: [
      { id: 1, question: "Why is following a strict dispatch workflow important?", options: ["It looks good", "It prevents costly errors", "The DOT requires it", "Brokers check it"], correctAnswer: 1 },
      { id: 2, question: "What is Step 1 in the workflow?", options: ["Call the broker", "Assess driver's location, available hours, and find the load", "Sign the RC", "Send the driver to the shipper"], correctAnswer: 1 },
      { id: 3, question: "What must you confirm during Step 2 (Negotiation)?", options: ["The weather", "That load details fit the driver's legal limits and capabilities", "The color of the freight", "The receiver's name"], correctAnswer: 1 },
      { id: 4, question: "If booking with a new broker, what must you send them?", options: ["A gift card", "Carrier Setup Packet (MC Authority, W-9, COI, NOA)", "The driver's medical card", "A blank check"], correctAnswer: 1 },
      { id: 5, question: "What do you do in Step 4?", options: ["Verify, sign, and return the Rate Confirmation", "Drive the truck", "Wash the trailer", "Sleep"], correctAnswer: 0 },
      { id: 6, question: "How should you send load details to your driver?", options: ["Read them fast over the phone", "Via text or a TMS App so it is in writing", "Write them on a napkin", "Tell the broker to do it"], correctAnswer: 1 },
      { id: 7, question: "Which of the following is crucial to include in driver instructions?", options: ["The broker's home address", "Pickup/Reference Numbers", "The cost of the freight", "The DOT regulations"], correctAnswer: 1 },
      { id: 8, question: "What is the final step of the initial dispatch workflow?", options: ["Send an email confirming the driver has received dispatch and is rolling", "Go home", "Delete the Rate Con", "Invoice the broker"], correctAnswer: 0 },
      { id: 9, question: "What is a TMS App?", options: ["Truck Maintenance System", "Transportation Management System App used to send dispatch details to drivers", "Total Mileage Software", "Toll Management System"], correctAnswer: 1 },
      { id: 10, question: "Should you ever skip verifying the RC details before signing?", options: ["Yes, to save time", "No, never", "Only for cheap loads", "Only for familiar brokers"], correctAnswer: 1 }
    ]
  },
  {
    moduleId: 12,
    title: "Update Department Quiz",
    questions: [
      { id: 1, question: "What is a broker's biggest fear?", options: ["Paying too much", "A truck going missing", "DOT inspections", "Lumper fees"], correctAnswer: 1 },
      { id: 2, question: "What role do you play for your carrier regarding brokers?", options: ["The 'Update Department'", "The mechanic", "The driver", "The banker"], correctAnswer: 0 },
      { id: 3, question: "What do tracking apps like Macropoint or Trucker Tools do?", options: ["Pay the driver", "Track the driver's phone location for the broker", "Check engine codes", "Find loads"], correctAnswer: 1 },
      { id: 4, question: "How many mandatory 'Check Call' updates are standard?", options: ["1", "2", "4", "10"], correctAnswer: 2 },
      { id: 5, question: "Which of the following is NOT one of the 4 mandatory updates?", options: ["Dispatched", "Loaded", "Crossed State Line", "Empty (Delivered)"], correctAnswer: 2 },
      { id: 6, question: "What should you say during the 'Loaded' update?", options: ["Driver is loaded, secured, and leaving. ETA to receiver is X.", "Driver is sleeping.", "Send me the money.", "Driver lost the BOL."], correctAnswer: 0 },
      { id: 7, question: "What should you include in the 'Empty (Delivered)' update?", options: ["A request for a vacation", "A clean POD and a request for a reload", "A complaint about the shipper", "A picture of the truck"], correctAnswer: 1 },
      { id: 8, question: "How should you handle delays (like a snowstorm)?", options: ["Ignore the broker's calls", "Call the broker immediately with advance warning so they can reschedule", "Tell the driver to speed", "Cancel the load entirely"], correctAnswer: 1 },
      { id: 9, question: "Why is proactive communication important?", options: ["It wastes time", "It builds trust and leads to dedicated lanes", "It confuses the broker", "It is required by the FMCSA"], correctAnswer: 1 },
      { id: 10, question: "Is it acceptable to lie about a driver's location?", options: ["Yes, to save the load", "No, never", "Only if it's a short delay", "Only to bad brokers"], correctAnswer: 1 }
    ]
  },
  {
    moduleId: 13,
    title: "Final Preparation Quiz",
    questions: [
      { id: 1, question: "What is the final requirement to pass the Dispatcher Academy?", options: ["Pay a fee", "Pass the 100-question Final Exam with an 80% or higher", "Drive a truck", "Start an LLC"], correctAnswer: 1 },
      { id: 2, question: "What simulation involves finding a profitable load for a 53' Reefer?", options: ["ELD Simulator", "Load Board Simulation", "Broker Call Simulation", "Truck Parts Simulation"], correctAnswer: 1 },
      { id: 3, question: "What is the goal of the Broker Call Simulation?", options: ["To hang up quickly", "To negotiate a rate at least $0.30/mile higher than the initial offer", "To ask for directions", "To verify the DOT number"], correctAnswer: 1 },
      { id: 4, question: "Why do you use the ELD Simulator during the capstone?", options: ["To verify the driver has enough hours on their 70-hour clock", "To check engine codes", "To find the best fuel prices", "To message the broker"], correctAnswer: 0 },
      { id: 5, question: "What happens after you pass the Final Exam?", options: ["You get a free truck", "You are awarded your official Dispatcher Academy Certificate", "You must take it again", "You become a broker"], correctAnswer: 1 },
      { id: 6, question: "What score is required to pass the Final Exam?", options: ["60%", "70%", "80%", "100%"], correctAnswer: 2 },
      { id: 7, question: "How many questions are on the Final Exam?", options: ["10", "50", "100", "200"], correctAnswer: 2 },
      { id: 8, question: "What topics are covered on the Final Exam?", options: ["Only Load Boards", "Only Safety", "All 13 modules", "Only Truck Parts"], correctAnswer: 2 },
      { id: 9, question: "What should you watch out for during the Load Board simulation?", options: ["Good rates", "Scams", "Flatbeds", "Short runs"], correctAnswer: 1 },
      { id: 10, question: "What determines if a load is 'legally possible' to run?", options: ["The broker's opinion", "The driver's Available Hours of Service (HOS)", "The load board", "The dispatcher's mood"], correctAnswer: 1 }
    ]
  }
];
