// ============================================================
// THE ULTIMATE MATH CHALLENGE Configuration
// ============================================================

export interface MathQuestion {
  id: number;
  level: "EASY" | "MEDIUM" | "EXTREME";
  question: string;
  subText?: string;
  options?: string[];
  correctIndex?: number;
  correctFeedback?: string;
  wrongFeedback?: string;
}

export const MATH_QUESTIONS: MathQuestion[] = [
  {
    id: 1,
    level: "EASY",
    question: "What is 25 × 4 + 10?",
    options: ["100", "110", "120", "90"],
    correctIndex: 1, // 110
    correctFeedback: "Okay, not bad! We have a genius among us!",
    wrongFeedback: "Bro... we literally started with easy questions 😭",
  },
  {
    id: 2,
    level: "MEDIUM",
    question: "If 3x + 7 = 52, what is the value of x²?",
    options: ["225", "196", "256", "144"],
    correctIndex: 0, // 225
    correctFeedback: "Wait... you're actually smarter than expected!",
    wrongFeedback: "Math is clearly not your strongest relationship 😂",
  },
  {
    id: 3,
    level: "EXTREME",
    question: "Evaluate the following definite integral:",
    subText: "∫₀^∞ (x³ / (eˣ − 1)) dx",
  },
];
