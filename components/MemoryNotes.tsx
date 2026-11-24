"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { notes, noteCategories } from "@/data/notes";

export default function MemoryNotes() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeCategory, setActiveCategory] = useState<string>("all");
  // Start with all notes folded so the visitor can uncover each one interactively
  const [revealedNotes, setRevealedNotes] = useState<Set<string>>(new Set());

  const filtered =
    activeCategory === "all"
      ? notes
      : notes.filter((n) => n.category === activeCategory);

  const toggleNote = (id: string) => {
    setRevealedNotes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section
      id="little-things"
      ref={ref}
      className="relative py-24 sm:py-28 lg:py-32 bg-[#E9DFC9] overflow-hidden"
    >
      {/* Top torn edge transition */}
      <div
        className="absolute top-0 left-0 right-0 h-6 sm:h-8 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 24' preserveAspectRatio='none'%3E%3Cpath d='M0,0 C50,20 100,5 150,15 C200,25 250,8 300,18 C350,28 400,10 450,20 C500,30 550,8 600,18 C650,28 700,6 750,16 C800,26 850,8 900,18 C950,28 1000,10 1050,20 C1100,30 1150,8 1200,0 L1200,24 L0,24 Z' fill='%23F3EBDD'/%3E%3C/svg%3E\")",
          backgroundSize: "100% 100%",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-handwritten text-lg sm:text-xl text-[#85866B] mb-2 -rotate-1">
            chapter three ✦
          </p>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#49372B] font-medium italic leading-tight mb-4">
            Things We Love <span className="text-[#803F49]">About You</span>
          </h2>

          <div className="flex items-center gap-4 justify-center mb-5">
            <div className="h-px w-16 bg-[#85866B]/35" />
            <span className="font-handwritten text-xl text-[#803F49]">✦</span>
            <div className="h-px w-16 bg-[#85866B]/35" />
          </div>

          <p className="font-body text-[#49372B]/85 text-base sm:text-lg italic leading-relaxed">
            Little handwritten slips of paper we saved and pinned down. Tap any note
            to reveal or hide its memory.
          </p>
        </motion.div>

        {/* Category Filter Pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-14"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FilterPill
            label="All Notes"
            active={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
          />
          {noteCategories.map((cat) => (
            <FilterPill
              key={cat.key}
              label={`${cat.emoji} ${cat.label}`}
              active={activeCategory === cat.key}
              onClick={() => setActiveCategory(cat.key)}
            />
          ))}
        </motion.div>

        {/* Notes Grid: 4-Column Balanced Grid on Desktop (1440px - 1920px) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8 items-stretch">
          <AnimatePresence mode="popLayout">
            {filtered.map((note, i) => (
              <motion.div
                key={note.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="flex"
              >
                <NoteCard
                  note={note}
                  revealed={revealedNotes.has(note.id)}
                  onReveal={() => toggleNote(note.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom torn edge transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-6 sm:h-8 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 24' preserveAspectRatio='none'%3E%3Cpath d='M0,24 C50,4 100,19 150,9 C200,-1 250,16 300,6 C350,-4 400,14 450,4 C500,-6 550,16 600,6 C650,-4 700,18 750,8 C800,-2 850,16 900,6 C950,-4 1000,14 1050,4 C1100,-6 1150,16 1200,24 L1200,0 L0,0 Z' fill='%23F3EBDD'/%3E%3C/svg%3E\")",
          backgroundSize: "100% 100%",
        }}
      />
    </section>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`font-handwritten text-base px-4 py-1.5 transition-all duration-200 border rounded-xs cursor-pointer ${
        active
          ? "bg-[#49372B] text-[#F3EBDD] border-[#49372B] shadow-sm scale-105"
          : "bg-[#F3EBDD]/60 text-[#49372B] border-[#C9B99A] hover:bg-[#F3EBDD] hover:border-[#85866B]"
      }`}
    >
      {label}
    </button>
  );
}

interface NoteCardProps {
  note: (typeof notes)[0];
  revealed: boolean;
  onReveal: () => void;
}

function NoteCard({ note, revealed, onReveal }: NoteCardProps) {
  return (
    <motion.div
      onClick={onReveal}
      className="w-full cursor-pointer select-none transition-shadow"
      style={{
        transform: `rotate(${note.rotation}deg)`,
        transformOrigin: "center center",
      }}
      whileHover={{ scale: 1.03, rotate: 0, zIndex: 15 }}
      transition={{ type: "spring", stiffness: 320, damping: 25 }}
    >
      <div
        className="w-full h-full p-5 sm:p-6 min-h-[170px] relative flex flex-col justify-between border border-[#C9B99A]/60 shadow-[0_4px_16px_rgba(56,45,39,0.08)] hover:shadow-lg transition-all rounded-[1px]"
        style={{ background: note.color }}
      >
        {/* Pushpin at top center */}
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#803F49] shadow-sm flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#F3EBDD]/70" />
        </div>

        {/* Revealed Note Content vs Hidden Teaser */}
        <div className="pt-2">
          {revealed ? (
            <p className="font-handwritten text-lg sm:text-xl text-[#382D27] leading-snug font-medium">
              "{note.text}"
            </p>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <span className="font-handwritten text-2xl text-[#85866B] opacity-60">
                ✦
              </span>
              <span className="font-handwritten text-sm text-[#85866B] mt-1">
                tap to unfold note
              </span>
            </div>
          )}
        </div>

        {/* Note Footer Tag */}
        <div className="flex items-center justify-between pt-3 border-t border-[#C9B99A]/30 mt-4">
          <span className="font-handwritten text-xs uppercase tracking-wider text-[#85866B]">
            {note.category.replace("-", " ")}
          </span>
          <span className="font-handwritten text-xs text-[#803F49] opacity-70">
            {revealed ? "fold ↑" : "open →"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
