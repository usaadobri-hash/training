const fs = require('fs');

const questions = [];
let qId = 1;

// General Knowledge (40 questions)
const general = [
  { q: "What does FMCSA stand for?", opts: ["Federal Motor Carrier Safety Administration", "Freight Movement Carrier Safety Agency", "Federal Motor Company Standard Association", "Federal Motor Carrier Security Agency"], ans: 0 },
  { q: "What is the maximum gross weight of a standard 5-axle semi-truck without permits?", opts: ["75,000 lbs", "80,000 lbs", "85,000 lbs", "100,000 lbs"], ans: 1 },
  { q: "What is the maximum legal weight for the steer axle?", opts: ["10,000 lbs", "12,000 lbs", "14,000 lbs", "20,000 lbs"], ans: 1 },
  { q: "What is the maximum legal weight for the tandem drive axles?", opts: ["30,000 lbs", "32,000 lbs", "34,000 lbs", "40,000 lbs"], ans: 2 },
  { q: "What does an NOA do?", opts: ["Notifies the broker to pay a factoring company", "Notifies the shipper of arrival", "Notifies DOT of an accident", "Notifies the driver of a new load"], ans: 0 },
  { q: "What does BOL stand for?", opts: ["Bill of Lading", "Book of Loads", "Broker Operating License", "Bridge Overpass Limit"], ans: 0 },
  { q: "What is a clean POD?", opts: ["A newly washed trailer", "A Proof of Delivery with no damages or shortages noted", "A background check passed driver", "A properly formatted Rate Confirmation"], ans: 1 },
  { q: "What is the standard length of a Dry Van trailer?", opts: ["40 ft", "45 ft", "48 ft", "53 ft"], ans: 3 },
  { q: "Which trailer type is used for hauling temperature-controlled freight?", opts: ["Dry Van", "Reefer", "Flatbed", "Step Deck"], ans: 1 },
  { q: "If a load requires tarping, what trailer type is most likely being used?", opts: ["Dry Van", "Reefer", "Flatbed", "Power Only"], ans: 2 },
  { q: "What is detention pay?", opts: ["Pay for hauling hazmat", "Compensation for waiting more than 2 hours at a shipper/receiver", "Pay for washing out a reefer", "A fine for an HOS violation"], ans: 1 },
  { q: "Who usually pays the Lumper fee?", opts: ["The driver out of pocket", "The carrier", "The broker/shipper via EFS/Comcheck", "The DOT"], ans: 2 },
  { q: "What does 'Drop and Hook' mean?", opts: ["Dropping a load and hooking a tow truck", "Dropping an empty trailer and immediately hooking to a pre-loaded one", "Dropping the rate and hooking a carrier", "A wrestling move"], ans: 1 },
  { q: "What happens if a driver falsifies their ELD logs?", opts: ["They get a warning", "They commit a federal offense and face Out of Service (OOS) penalties", "They must pay the broker", "Nothing"], ans: 1 },
  { q: "What is the 14-hour rule in HOS?", opts: ["A driver can drive for 14 hours", "A driver cannot drive past the 14th consecutive hour after coming on duty", "A driver must rest for 14 hours", "A driver can be on duty for 14 hours a week"], ans: 1 },
  { q: "What is the 11-hour rule in HOS?", opts: ["A driver can drive a maximum of 11 hours within a 14-hour window", "A driver must rest for 11 hours", "A driver can work 11 hours a week", "A driver can only take 11 loads a month"], ans: 0 },
  { q: "When is a 30-minute break required?", opts: ["Every 4 hours", "Before 8 cumulative hours of driving pass", "At noon", "Whenever the driver is tired"], ans: 1 },
  { q: "What is a 34-hour restart?", opts: ["Rebooting the ELD device", "Taking 34 consecutive hours off duty to reset the 70-hour clock", "Waiting 34 hours for a load", "A penalty for speeding"], ans: 1 },
  { q: "Which of these is NOT a CSA BASIC?", opts: ["Unsafe Driving", "Crash Indicator", "Fuel Surcharge", "Vehicle Maintenance"], ans: 2 },
  { q: "What is a deadhead?", opts: ["A broker who doesn't pay", "Driving with an empty trailer", "A broken engine part", "A sleeper berth"], ans: 1 }
];

general.forEach(g => {
  questions.push({ id: qId++, question: g.q, options: g.opts, correctAnswer: g.ans });
});

// Generate RPM Questions (20 questions)
for (let i = 0; i < 20; i++) {
  const distance = 500 + Math.floor(Math.random() * 1000);
  const rpm = (1.5 + Math.random() * 2).toFixed(2);
  const rate = Math.floor(distance * parseFloat(rpm));
  
  const actualRpm = "$" + (rate / distance).toFixed(2);
  const wrong1 = "$" + (rate / distance + 0.5).toFixed(2);
  const wrong2 = "$" + (rate / distance - 0.3).toFixed(2);
  const wrong3 = "$" + (rate / distance + 1.2).toFixed(2);
  
  const options = [actualRpm, wrong1, wrong2, wrong3];
  const shuffledOptions = options.sort(() => 0.5 - Math.random());
  const ansIdx = shuffledOptions.indexOf(actualRpm);

  questions.push({
    id: qId++,
    question: "If a load pays $" + rate + " and the loaded distance is " + distance + " miles, what is the Rate Per Mile (RPM)?",
    options: shuffledOptions,
    correctAnswer: ansIdx
  });
}

// Generate Interstate Questions (20 questions)
for (let i = 0; i < 20; i++) {
  const isEven = Math.random() > 0.5;
  const num = isEven ? [10, 40, 70, 80, 90][Math.floor(Math.random()*5)] : [5, 15, 35, 55, 75, 95][Math.floor(Math.random()*6)];
  
  let qText = "Interstate " + num + " generally runs in which direction?";
  let opts = ["East-West", "North-South", "Circular", "Diagonal"];
  let ans = isEven ? 0 : 1;
  
  questions.push({ id: qId++, question: qText, options: opts, correctAnswer: ans });
}

// Generate Timezone Questions (20 questions)
const cities = [
  { name: "Los Angeles, CA", tz: "Pacific Time" },
  { name: "Denver, CO", tz: "Mountain Time" },
  { name: "Chicago, IL", tz: "Central Time" },
  { name: "Dallas, TX", tz: "Central Time" },
  { name: "Atlanta, GA", tz: "Eastern Time" },
  { name: "New York, NY", tz: "Eastern Time" },
  { name: "Seattle, WA", tz: "Pacific Time" },
  { name: "Miami, FL", tz: "Eastern Time" }
];
const allTz = ["Eastern Time", "Central Time", "Mountain Time", "Pacific Time"];

for (let i = 0; i < 20; i++) {
  const city = cities[Math.floor(Math.random() * cities.length)];
  const options = [...allTz].sort(() => 0.5 - Math.random());
  const ansIdx = options.indexOf(city.tz);
  
  questions.push({
    id: qId++,
    question: "If you are booking a load picking up in " + city.name + ", what is the local time zone?",
    options: options,
    correctAnswer: ansIdx
  });
}

// Generate Remaining Weight Questions (20 questions) to reach 100
for (let i = 0; i < 20; i++) {
  const driveW = 32000 + Math.floor(Math.random() * 4000); // 32k to 36k
  const tandemW = 32000 + Math.floor(Math.random() * 4000);
  const steerW = 11000 + Math.floor(Math.random() * 2000); // 11k to 13k
  
  const gross = steerW + driveW + tandemW;
  
  let violation = "Legal";
  if (gross > 80000) violation = "Gross Overweight";
  else if (driveW > 34000) violation = "Drives Overweight";
  else if (tandemW > 34000) violation = "Tandems Overweight";
  else if (steerW > 12000) violation = "Steers Overweight";
  
  const opts = ["Legal", "Gross Overweight", "Drives Overweight", "Tandems Overweight"];
  if (opts.indexOf(violation) === -1) opts[3] = violation; // Ensure it's in the list
  const shuffledOpts = opts.sort(() => 0.5 - Math.random());
  const ansIdx = shuffledOpts.indexOf(violation);
  
  questions.push({
    id: qId++,
    question: "A truck scales out at: Steer " + steerW + " lbs, Drive " + driveW + " lbs, Tandem " + tandemW + " lbs. What is the status?",
    options: shuffledOpts,
    correctAnswer: ansIdx
  });
}

const final100 = questions.slice(0, 100);

const fileContent = "export const finalExamQuestions = " + JSON.stringify(final100, null, 2) + ";";
fs.writeFileSync('/Users/yahyokhonisroilov/.gemini/antigravity/scratch/dispatcher-academy/frontend/src/data/exam.ts', fileContent);
console.log("Generated 100 questions successfully!");
