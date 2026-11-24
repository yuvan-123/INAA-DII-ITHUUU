"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import type { Memory } from "@/data/memories";

interface PolaroidProps {
  memory: Memory;
  className?: string;
  tapeColor?: string;
}

export default function Polaroid({
  memory,
  className = "",
  tapeColor = "rgba(201, 155, 152, 0.65)",
}: PolaroidProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <motion.div
        className={`relative inline-block w-full max-w-[260px] sm:max-w-[270px] cursor-pointer select-none ${className}`}
        style={{
          transform: `rotate(${memory.rotation}deg)`,
          transformOrigin: "center center",
        }}
        whileHover={{
          scale: 1.04,
          rotate: 0,
          zIndex: 25,
          boxShadow: "0 14px 30px rgba(56,45,39,0.22)",
        }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setLightboxOpen(true)}
        transition={{ type: "spring", stiffness: 320, damping: 25 }}
      >
        {/* Washi tape on top */}
        <div
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-5 z-20 shadow-xs pointer-events-none"
          style={{
            background: tapeColor,
            transform: `translateX(-50%) rotate(${memory.rotation > 0 ? -2 : 2}deg)`,
          }}
        />

        {/* Polaroid frame */}
        <div className="bg-white p-3 sm:p-3.5 pb-8 sm:pb-9 shadow-[0_6px_20px_rgba(56,45,39,0.12)] border border-neutral-100/90 rounded-[2px] w-full">
          {/* Photo area */}
          <div className="relative w-full aspect-[4/5] bg-[#E9DFC9] photo-placeholder overflow-hidden rounded-[1px]">
            {memory.src ? (
              <Image
                src={memory.src}
                alt={memory.caption}
                fill
                className="object-cover object-top transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 300px"
              />
            ) : (
              <PlaceholderContent size={memory.size} />
            )}
          </div>

          {/* Caption */}
          <div className="pt-3 text-center">
            <p className="font-handwritten text-[#49372B] text-base sm:text-lg font-semibold leading-tight">
              {memory.caption}
            </p>
            <p className="font-handwritten text-[#85866B] text-xs sm:text-sm mt-0.5">
              {memory.date}
            </p>
            {memory.note && (
              <p className="font-body text-[#49372B]/75 text-xs italic mt-1 line-clamp-1">
                "{memory.note}"
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
            style={{ background: "rgba(56,45,39,0.85)", backdropFilter: "blur(6px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
          >
            <motion.div
              style={{
                background: "white",
                padding: "16px 16px 48px 16px",
                maxWidth: "92vw",
                maxHeight: "92vh",
                position: "relative",
              }}
              initial={{ scale: 0.88, opacity: 0, rotate: memory.rotation }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="shadow-2xl border border-neutral-100/90 rounded-[2px]"
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-3 right-3 z-30 bg-[#49372B]/10 hover:bg-[#803F49] hover:text-white text-[#49372B] p-2 rounded-full transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Close photo"
              >
                <X size={20} />
              </button>

              {/* Large photo container */}
              <div
                style={{
                  width: "min(520px, 86vw)",
                  height: "min(620px, 68vh)",
                  position: "relative",
                  background: "#F3EBDD",
                }}
                className="photo-placeholder overflow-hidden rounded-[2px]"
              >
                {memory.src ? (
                  <Image
                    src={memory.src}
                    alt={memory.caption}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 90vw, 540px"
                    priority
                  />
                ) : (
                  <PlaceholderContent size="lg" />
                )}
              </div>

              {/* Caption */}
              <div className="mt-4 text-center max-w-md mx-auto">
                <p className="font-handwritten text-[#49372B] text-2xl font-semibold">
                  {memory.caption}
                </p>
                <p className="font-handwritten text-[#85866B] text-sm mt-0.5">
                  {memory.date}
                </p>
                {memory.note && (
                  <p className="font-body text-[#49372B]/90 text-base sm:text-lg italic mt-2.5 leading-relaxed">
                    "{memory.note}"
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function PlaceholderContent({ size }: { size: "sm" | "md" | "lg" }) {
  const iconSize = size === "sm" ? 30 : size === "md" ? 38 : 46;
  return (
    <div className="w-full h-full photo-placeholder flex flex-col items-center justify-center gap-2 p-4 text-center">
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#85866B"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.5}
      >
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
      <span className="font-handwritten text-sm text-[#85866B] opacity-80 leading-tight">
        more memories to come ✿
      </span>
    </div>
  );
}
