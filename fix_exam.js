const fs = require('fs');

const text = fs.readFileSync('src/data/exam.ts', 'utf8');
const arrayStart = text.indexOf('[');
const arrayEnd = text.lastIndexOf(']');
const arrayStr = text.substring(arrayStart, arrayEnd + 1);

let questions = [];
try {
  questions = JSON.parse(arrayStr);
} catch (e) {
  // If strict JSON parse fails because of single quotes or trailing commas, we can use eval
  questions = eval('(' + arrayStr + ')');
}

// 1. Filter out Interstate questions
const noInterstate = questions.filter(q => !q.question.includes('Interstate'));

// 2. Remove duplicates by question text
const seen = new Set();
const unique = [];
for (const q of noInterstate) {
  if (!seen.has(q.question)) {
    seen.add(q.question);
    unique.push(q);
  }
}

// 3. Keep exactly 50 questions
let finalQuestions = unique;
if (finalQuestions.length > 50) {
  finalQuestions = finalQuestions.slice(0, 50);
}

// Re-assign IDs to be sequential
finalQuestions = finalQuestions.map((q, i) => ({ ...q, id: i + 1 }));

console.log(`Original count: ${questions.length}`);
console.log(`Unique non-Interstate count: ${unique.length}`);
console.log(`Final count: ${finalQuestions.length}`);

const newContent = `export const finalExamQuestions = ${JSON.stringify(finalQuestions, null, 2)};\n`;

fs.writeFileSync('src/data/exam.ts', newContent);
console.log('Successfully updated src/data/exam.ts');
