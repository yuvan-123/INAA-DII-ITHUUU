// notes.ts — replace placeholder content with your real notes

export interface Note {
  id: string;
  category: "appreciation" | "habits" | "laughs" | "friendship" | "never-change";
  text: string;
  rotation: number;
  color: string;
  handStyle?: "normal" | "big" | "small";
}

export const notes: Note[] = [
  // Things we appreciate
  {
    id: "note-01",
    category: "appreciation",
    text: "You always have the knowledge of both positive and negative things, you always see the whole picture.",
    rotation: -1.5,
    color: "#F3EBDD",
  },
  {
    id: "note-02",
    category: "appreciation",
    text: "Ellarayum ae romba nala gavanipa — adding with a bit sense of humor too 😄",
    rotation: 2,
    color: "#F0E8D6",
  },
  {
    id: "note-03",
    category: "appreciation",
    text: "U have interest in most of the things womens find hard to do, like easy! ✨",
    rotation: -0.5,
    color: "#F3EBDD",
  },

  // Little habits / Little things that make you, you
  {
    id: "note-04",
    category: "habits",
    text: "Summa summa reassurance amari ketukurathu, yen kekura nu therila but I know u likes to get the answer from our mouth 🥺",
    rotation: 1.5,
    color: "#EDE3D0",
  },
  {
    id: "note-05",
    category: "habits",
    text: "The way you laugh — in a good way thaa! 😂",
    rotation: -2,
    color: "#F0E8D6",
  },

  // Things that make us laugh
  {
    id: "note-06",
    category: "laughs",
    text: "Nee panra mostly ellamae enna sirika tha vaikum 😂",
    rotation: 3,
    color: "#F3EBDD",
  },
  {
    id: "note-07",
    category: "laughs",
    text: "The way you make ur hair thali vidurathu when you feel a proud gethu moment 😂💁",
    rotation: -1,
    color: "#EDE3D0",
  },

  // Why friendship matters
  {
    id: "note-08",
    category: "friendship",
    text: "You make us feel like we can be completely ourselves. That's not a small thing.",
    rotation: 1,
    color: "#F0E8D6",
  },
  {
    id: "note-09",
    category: "friendship",
    text: "Some friendships feel like home. This is one of them.",
    rotation: -2.5,
    color: "#F3EBDD",
  },

  // Things we hope she never changes
  {
    id: "note-10",
    category: "never-change",
    text: "The way you care so deeply, even when you try to hide it.",
    rotation: 2,
    color: "#EDE3D0",
  },
  {
    id: "note-11",
    category: "never-change",
    text: "Your laugh. Please never change your laugh.",
    rotation: -1.5,
    color: "#F3EBDD",
  },
  {
    id: "note-12",
    category: "never-change",
    text: "The fact that you always, always show up.",
    rotation: 1.5,
    color: "#F0E8D6",
  },
];

export const noteCategories: { key: Note["category"]; label: string; emoji: string }[] = [
  { key: "appreciation", label: "Things we appreciate about you", emoji: "✦" },
  { key: "habits", label: "Little things that make you, you", emoji: "✿" },
  { key: "laughs", label: "Things that make us laugh", emoji: "♡" },
  { key: "friendship", label: "Why your friendship matters", emoji: "✦" },
  { key: "never-change", label: "Things we hope you never change", emoji: "✿" },
];
