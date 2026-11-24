import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#F3EBDD",
        parchment: "#E9DFC9",
        "brown-dark": "#49372B",
        burgundy: "#803F49",
        "dusty-rose": "#C99B98",
        olive: "#85866B",
        ink: "#382D27",
        "cream-light": "#F8F3EA",
        tan: "#C9B99A",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        handwritten: ["Caveat", "cursive"],
        body: ["EB Garamond", "Georgia", "serif"],
      },
      boxShadow: {
        polaroid:
          "2px 2px 8px rgba(56,45,39,0.15), 4px 4px 16px rgba(56,45,39,0.08)",
        "polaroid-hover":
          "4px 6px 20px rgba(56,45,39,0.22), 6px 8px 28px rgba(56,45,39,0.1)",
        note: "2px 2px 10px rgba(56,45,39,0.12)",
        letter:
          "0 4px 24px rgba(56,45,39,0.1), 0 1px 4px rgba(56,45,39,0.06)",
      },
    },
  },
  plugins: [],
} satisfies Config;
