// ============================================================
// BIRTHDAY SECRET SOCIETY — Gateway Configuration
// Edit this file to personalize questions, answers, and riddles
// ============================================================

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;        // set to -1 when allCorrect is true
  allCorrect?: boolean;        // if true, every option counts as correct
  correctFeedback: string;
  wrongFeedbacks: string[];    // rotated through on each wrong attempt
  specialWrongFeedbacks?: Record<number, string>; // per-option override
}

export interface Riddle {
  riddleText: string;
  hint: string;
  options: string[];
  correctIndex: number;
  correctFeedback: string;
  wrongFeedbacks: string[];
}

export interface FinalChallenge {
  prompt: string;
  subPrompt: string;
  options: string[];
  correctIndex: number;      // set to -1 when allCorrect is true
  allCorrect?: boolean;
  correctFeedback: string;
  wrongFeedbacks: string[];
}

// ─── Quiz Questions ───────────────────────────────────────────────────────────
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "What is Kavithaaa's most iconic dialogue that she repeats on a daily basis?",
    options: [
      "Helloo Guyssssss 🤩",
      "Mooodu nee 😂",
      "ina da pannuva ipo 🫣",
      "akkaa vanthurukan guyss 💃",
    ],
    correctIndex: 1,
    correctFeedback: "YESSS!! Mooodu nee 😂 — classic Kavithaaa certified!",
    wrongFeedbacks: [
      "Its okk guyss, these answers are from me, so MOOODITU OTHHUKO 😈",
      "Its okk guyss, these answers are from me, so MOOODITU OTHHUKO 😈",
      "Its okk guyss, these answers are from me, so MOOODITU OTHHUKO 😈",
    ],
  },
  {
    question: "What makes Kavithaaa the HAPPIEST she's ever been?",
    options: [
      "Talking with puppies 🐶",
      "Eating Briiyaani after long time 🍛",
      "looking at the stars at night 🌙",
      "talking with friends [NAANGA THAA] 😊",
    ],
    correctIndex: -1,
    allCorrect: true,
    correctFeedback: "ellamae correct thaa, summa test pana KELAMBUUU 😂",
    wrongFeedbacks: [],
  },
  {
    question: "What can Kavithaaa NEVER say no to?",
    options: [
      "whatever we asks to buy 😊",
      "vaa saapida polamm 🍽️",
      "ex veetuku poitu varalam 😂",
      "paris polaam aahhh 🗼",
    ],
    correctIndex: 3,
    correctFeedback: "PARIS POLAAM!! 🗼 She could NEVER say no to that!",
    wrongFeedbacks: [
      "PAASAMAE ILLA APO 😢 Try again!",
      "PAASAMAE ILLA APO 😢 Think bigger!",
      "PAASAMAE ILLA APO 😢 She'd never!",
    ],
    specialWrongFeedbacks: {
      1: "FINE answer but paris solluva nu ninaichaa its ok 😄",
    },
  },
  {
    question: "Which best describes Kavithaaa's favourite way to spend a lazy day?",
    options: [
      "veetu velai paakurathu 🧹",
      "watching series continuously 🍿",
      "reels spamming 📱",
      "taking photos of herself 🌟",
    ],
    correctIndex: -1,
    allCorrect: true,
    correctFeedback: "NEE ELLAMAE PANNUVAN NU SOLLUVA, SO SUMMA VACHIRUKAN ITHA 😂",
    wrongFeedbacks: [],
  },
];

// ─── Mystery Riddle ───────────────────────────────────────────────────────────
export const RIDDLE: Riddle = {
  riddleText:
    "I am not a place you go to study,\n" +
    "but many lessons live inside me.\n" +
    "I hold the laughter, tears, and chats —\n" +
    "the memories of three good friends.\n" +
    "Open me and you will find\n" +
    "a birthday girl with a golden shine.\n" +
    "What am I? 🤔",
  hint: "💡 Hint: You're literally looking AT me right now...",
  options: [
    "A library 📚",
    "A birthday scrapbook 📖✨",
    "A WhatsApp group chat",
    "A time machine ⏳",
  ],
  correctIndex: 1,
  correctFeedback: "Of course it's the BIRTHDAY SCRAPBOOK! You're a genius! 🎉",
  wrongFeedbacks: [
    "A library?? Come on now. Look around you! 😂",
    "WhatsApp group?! The riddle said 'open me'... THINK! 🧠",
    "A time machine? Interesting... but very wrong! 🕰️",
    "That is NOT it! Read the riddle again, slowly this time 🐢",
  ],
};

// ─── Final Challenge ──────────────────────────────────────────────────────────
export const FINAL_CHALLENGE: FinalChallenge = {
  prompt: "One last question, brave soul...",
  subPrompt: "What is Kavithaaa's birthday wish from the bottom of her heart?",
  options: [
    "To win a million dollars 💰",
    "To be surrounded by love, laughter & her favourite people forever 🥰",
    "To finally understand calculus",
    "World domination 👑",
  ],
  correctIndex: -1,
  allCorrect: true,
  correctFeedback:
    "Nee oru oru naalaiki oru oru option choose pannuva 😂. so nee ipo ethu venumoo eduthuko un life ku varum athu 😊 MANIFESTING WHAT YOU NEED",
  wrongFeedbacks: [],
};
