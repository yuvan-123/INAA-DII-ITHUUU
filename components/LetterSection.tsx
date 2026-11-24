"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { letters } from "@/data/letters";

export default function LetterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  // Start with all letters folded/closed so the user can open them individually
  const [openedLetters, setOpenedLetters] = useState<Record<string, boolean>>({});

  const toggleLetter = (id: string) => {
    setOpenedLetters((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      id="letters"
      ref={ref}
      className="relative py-24 sm:py-28 lg:py-32 bg-[#F3EBDD] overflow-hidden"
    >
      {/* Background paper texture */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Decorative ambient background accents */}
      <span className="absolute top-16 right-12 text-[#803F49]/10 text-8xl font-handwritten select-none pointer-events-none rotate-12">
        ♡
      </span>
      <span className="absolute bottom-20 left-10 text-[#85866B]/15 text-8xl font-handwritten select-none pointer-events-none -rotate-12">
        ✦
      </span>

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-handwritten text-lg sm:text-xl text-[#85866B] mb-2 -rotate-1">
            chapter two ✦
          </p>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#49372B] font-medium italic leading-tight mb-4">
            Two Letters, <span className="text-[#803F49]">One Person</span>
          </h2>

          <div className="flex items-center gap-4 justify-center mb-5">
            <div className="h-px w-16 bg-[#85866B]/35" />
            <span className="font-handwritten text-xl text-[#803F49]">♡</span>
            <div className="h-px w-16 bg-[#85866B]/35" />
          </div>

          <p className="font-body text-[#49372B]/85 text-base sm:text-lg italic leading-relaxed">
            Two friends. Two different voices. One person who means the world to both of us.
          </p>
        </motion.div>

        {/* Letters Grid: 2 balanced columns on desktop (1440px - 1920px) */}
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-14 items-start">
          {letters.map((letter, i) => (
            <motion.div
              key={letter.id}
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.2 }}
            >
              <LetterCard
                letter={letter}
                isOpen={!!openedLetters[letter.id]}
                onToggle={() => toggleLetter(letter.id)}
                index={i}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface LetterCardProps {
  letter: (typeof letters)[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function LetterCard({ letter, isOpen, onToggle, index }: LetterCardProps) {
  const rotation = index === 0 ? -1 : 1;

  return (
    <div
      style={{ transform: `rotate(${rotation}deg)` }}
      className="relative transition-transform duration-300"
    >
      {/* Closed State (Folded Envelope Style) */}
      {!isOpen ? (
        <div
          onClick={onToggle}
          className="w-full text-left bg-[#E9DFC9] border border-[#C9B99A] shadow-[0_8px_24px_rgba(56,45,39,0.1)] p-8 relative rounded-sm cursor-pointer hover:shadow-xl transition-shadow group"
        >
          {/* Folded flap graphic */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-[#D9CCAF] border-b border-[#C9B99A]/60 flex items-center justify-center">
            {/* Wax seal */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-serif text-base text-[#F3EBDD] shadow-md ${
                index === 0 ? "bg-[#803F49]" : "bg-[#49372B]"
              } group-hover:scale-110 transition-transform`}
            >
              ♡
            </div>
          </div>

          <div className="pt-16 pb-4">
            <span className="font-handwritten text-sm text-[#85866B] uppercase tracking-widest block mb-1">
              Personal Dispatch
            </span>
            <h3 className="font-serif text-2xl text-[#49372B] italic font-medium mb-2">
              From {letter.from}
            </h3>
            <p className="font-body text-[#49372B]/70 italic text-sm">
              Click to unfold and read this letter →
            </p>
          </div>
        </div>
      ) : (
        /* Unfolded Letter Stationery Paper */
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="bg-[#E9DFC9] border border-[#C9B99A] shadow-[0_12px_36px_rgba(56,45,39,0.12)] p-7 sm:p-9 lg:p-10 relative rounded-sm lined-paper"
        >
          {/* Washi tape at top left corner */}
          <div
            className="absolute -top-3.5 left-8 w-20 h-6 shadow-xs pointer-events-none z-10"
            style={{
              background:
                index === 0 ? "rgba(201,155,152,0.7)" : "rgba(133,134,107,0.6)",
              transform: `rotate(${index === 0 ? -2 : 2}deg)`,
            }}
          />

          {/* Fold / Unfold Action Button */}
          <button
            onClick={onToggle}
            className="absolute top-4 right-4 text-xs font-handwritten text-[#85866B] hover:text-[#803F49] border border-[#C9B99A]/60 hover:border-[#803F49] px-2.5 py-1 rounded-sm transition-colors cursor-pointer"
            aria-label="Fold letter"
          >
            fold letter ↑
          </button>

          {/* Letter Header */}
          <div className="mb-6 pt-2 border-b border-[#C9B99A]/40 pb-3">
            <span className="font-handwritten text-xs text-[#85866B] tracking-widest uppercase block mb-1">
              handwritten with care · letter {index + 1}
            </span>
            <p className="font-serif italic text-xl sm:text-2xl text-[#49372B] font-medium">
              {letter.greeting}
            </p>
          </div>

          {/* Letter Body Paragraphs */}
          <div className="flex flex-col gap-4 mb-8">
            {letter.body.map((paragraph, pIdx) => (
              <p
                key={pIdx}
                className="font-body text-[#382D27] text-base sm:text-[17px] leading-[1.85]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Letter Closing & Signature */}
          <div className="pt-4 border-t border-[#C9B99A]/40">
            <p className="font-body text-[#49372B] text-base italic mb-1">
              {letter.closing}
            </p>
            <p
              className="font-handwritten text-3xl sm:text-4xl font-semibold -rotate-1 mt-1"
              style={{ color: index === 0 ? "#803F49" : "#49372B" }}
            >
              {letter.signature}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
