// memories.ts — real photos linked with scrapbook memories

export interface Memory {
  id: string;
  src: string | null; // local path like "/images/photo-1.jpeg" or Supabase public URL; null = placeholder
  caption: string;
  date: string;
  rotation: number; // degrees, e.g. -3 to 3
  size: "sm" | "md" | "lg";
  note?: string; // personal memory note shown below/beside polaroid
  folder: "group" | "yuvan-and-her" | "bestfriend-and-her" | "funny-moments" | "final-memory";
}

export const memories: Memory[] = [
  {
    id: "mem-01",
    src: "/images/yuvan/pic-1.jpeg",
    caption: "Campus strolls & sunny days ☀️",
    date: "Yuvan & Kavithaaa",
    rotation: -2,
    size: "lg",
    note: "Worst Egg Dosa and winning hackathonnnnnnn 😎",
    folder: "yuvan-and-her",
  },
  {
    id: "mem-02",
    src: "/images/yuvan/pic-2.jpeg",
    caption: "Hearts filter & goofy smiles ♡",
    date: "Pure fun vibes",
    rotation: 1.5,
    size: "md",
    note: "Internship la work thavaraa ellaa vishayam pannathu 😂",
    folder: "yuvan-and-her",
  },
  {
    id: "mem-03",
    src: "/images/kaush/pic-1.jpeg",
    caption: "Jhumkas, mallipoo & twin smiles 🌸",
    date: "Kaushalya & Kavithaaa",
    rotation: -1,
    size: "md",
    note: "Dressed up, flowers in hair, and that unmistakable bestie energy.",
    folder: "bestfriend-and-her",
  },
  {
    id: "mem-04",
    src: "/images/kaush/pic-2.jpeg",
    caption: "Campus walks & garden blooms 🌿",
    date: "Everyday memories",
    rotation: 2,
    size: "sm",
    note: "From college corridors to sunny gardens, always making memories together.",
    folder: "bestfriend-and-her",
  },
  {
    id: "mem-05",
    src: "/images/bth/pic-1.jpeg",
    caption: "Mall chronicles & mirror selfies 🛍️",
    date: "Unplanned hangouts",
    rotation: -2.5,
    size: "md",
    note: "The place where naa vanthu OC Dress vaangiya tharunam 😂",
    folder: "group",
  },
  {
    id: "mem-06",
    src: "/images/bth/pic-2.jpeg",
    caption: "Rooftop breezes & genuine smiles ☁️",
    date: "Golden hours together",
    rotation: 3,
    size: "sm",
    note: "First time visit to un VEEDU daa 💃",
    folder: "group",
  },
  {
    id: "mem-07",
    src: "/images/bth/pic-3.jpeg",
    caption: "The classic trio out & about 🍿",
    date: "Food runs & movie nights",
    rotation: -1.5,
    size: "lg",
    note: "Emathi kooptutu poninga laaa 🤨 VANDALUR ZOO 😤",
    folder: "group",
  },
];

export const funnyMoments: Memory[] = [
  {
    id: "fun-01",
    src: "/images/photo-2.jpeg",
    caption: "Hackathon mode activated 😭",
    date: "The legendary desk selfie",
    rotation: -3,
    size: "md",
    note: "Glasses placed down, cute face on, zero sleep, 100% chaos.",
    folder: "funny-moments",
  },
  {
    id: "fun-02",
    src: "/images/chaos/latest-1.jpeg",
    caption: "The face she makes when we say something dumb",
    date: "Every single day",
    rotation: 2,
    size: "sm",
    note: "She claims she was just thinking, but we all know it was pure judgment.",
    folder: "funny-moments",
  },
  {
    id: "fun-03",
    src: "/images/chaos/latest-2.jpeg",
    caption: "Nobody asked her to, but she did it anyway",
    date: "Chaos chronicles",
    rotation: 1,
    size: "md",
    note: "Preserved in the vault of memories.",
    folder: "funny-moments",
  },
];

export const insideJokes = [
  {
    id: "joke-01",
    text: "\"That's literally what I just said.\"",
    note: "She says this every single time, without fail.",
  },
  {
    id: "joke-02",
    text: "The whole [your inside joke here] saga",
    note: "We will never let her forget this moment.",
  },
  {
    id: "joke-03",
    text: "\"No seriously, what IS that?\"",
    note: "If you know, you know.",
  },
  {
    id: "joke-04",
    text: "Her signature stare when we steal her food",
    note: "Dangerously quiet, deeply offended.",
  },
];
