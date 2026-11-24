"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EnvelopeIntroProps {
  onOpen: () => void;
}

export default function EnvelopeIntro({ onOpen }: EnvelopeIntroProps) {
  const [phase, setPhase] = useState<"idle" | "opening" | "message" | "done">(
    "idle"
  );

  const handleOpen = () => {
    setPhase("opening");
    setTimeout(() => setPhase("message"), 1200);
  };

  const handleProceed = () => {
    setPhase("done");
    setTimeout(onOpen, 600);
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{ background: "#F3EBDD" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: phase === "done" ? 0 : 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background paper grain */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.1'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Decorative corner text */}
      <span
        className="absolute top-8 left-6 text-olive opacity-30 select-none"
        style={{
          fontFamily: "Caveat, cursive",
          fontSize: "15px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        for you ✦
      </span>
      <span
        className="absolute top-8 right-6 text-olive opacity-30 select-none"
        style={{
          fontFamily: "Caveat, cursive",
          fontSize: "15px",
          letterSpacing: "0.1em",
        }}
      >
        with love
      </span>

      {/* Pre-open state */}
      <AnimatePresence mode="wait">
        {phase === "idle" && (
          <motion.div
            key="idle"
            className="flex flex-col items-center gap-8 max-w-md w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            {/* Handwritten intro */}
            <p
              className="text-center text-brown-dark"
              style={{
                fontFamily: "Caveat, cursive",
                fontSize: "22px",
                lineHeight: 1.6,
                transform: "rotate(-0.5deg)",
                color: "#49372B",
              }}
            >
              something small but meaningful
              <br />
              <span className="text-olive">— just for you —</span>
            </p>

            {/* Title */}
            <div className="text-center">
              <h1
                className="text-brown-dark"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(36px, 6vw, 56px)",
                  fontStyle: "italic",
                  fontWeight: 500,
                  lineHeight: 1.2,
                }}
              >
                Happiee Birthday
                <br />
                <span style={{ color: "#803F49" }}>Kavithaaa</span>
              </h1>
            </div>

            {/* SVG Envelope */}
            <motion.div
              className="relative"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <EnvelopeSVG />
            </motion.div>

            {/* CTA Button */}
            <motion.button
              onClick={handleOpen}
              className="relative px-10 py-3 text-parchment overflow-hidden"
              style={{
                background: "#49372B",
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "16px",
                fontStyle: "italic",
                letterSpacing: "0.04em",
                border: "none",
                cursor: "pointer",
                boxShadow: "2px 3px 12px rgba(56,45,39,0.2)",
              }}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              Open your little surprise
            </motion.button>
          </motion.div>
        )}

        {phase === "opening" && (
          <motion.div
            key="opening"
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Envelope opening animation */}
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.05, 0.95] }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <EnvelopeOpenSVG />
            </motion.div>
          </motion.div>
        )}

        {phase === "message" && (
          <motion.div
            key="message"
            className="max-w-lg w-full"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Letter card */}
            <div
              className="relative p-10 mx-4"
              style={{
                background: "#E9DFC9",
                boxShadow:
                  "0 4px 32px rgba(56,45,39,0.1), 0 1px 4px rgba(56,45,39,0.06)",
                backgroundImage:
                  "repeating-linear-gradient(transparent, transparent 27px, rgba(133,134,107,0.15) 27px, rgba(133,134,107,0.15) 28px)",
              }}
            >
              {/* Washi tape top */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 opacity-70"
                style={{
                  background: "rgba(201,155,152,0.6)",
                  transform: "translateX(-50%) rotate(-1deg)",
                }}
              />

              <p
                className="text-brown-dark mb-3"
                style={{
                  fontFamily: "Caveat, cursive",
                  fontSize: "18px",
                  color: "#803F49",
                  transform: "rotate(-0.5deg)",
                }}
              >
                a little note first —
              </p>

              <p
                className="text-brown-dark leading-relaxed mb-6"
                style={{
                  fontFamily: "'EB Garamond', Georgia, serif",
                  fontSize: "18px",
                  fontStyle: "italic",
                  lineHeight: 1.9,
                  color: "#49372B",
                }}
              >
                "Some people make life a little more beautiful just by being in
                it. So we made this little something for you."
              </p>

              <p
                className="text-right"
                style={{
                  fontFamily: "Caveat, cursive",
                  fontSize: "18px",
                  color: "#49372B",
                  opacity: 0.75,
                }}
              >
                — with love ♡
              </p>
            </div>

            <div className="flex justify-center mt-8">
              <motion.button
                onClick={handleProceed}
                className="px-10 py-3"
                style={{
                  background: "#803F49",
                  color: "#F3EBDD",
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "16px",
                  fontStyle: "italic",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "2px 3px 12px rgba(128,63,73,0.25)",
                  letterSpacing: "0.03em",
                }}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                Step inside →
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function EnvelopeSVG() {
  return (
    <svg
      width="200"
      height="140"
      viewBox="0 0 200 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Envelope body */}
      <rect
        x="4"
        y="30"
        width="192"
        height="106"
        rx="3"
        fill="#E9DFC9"
        stroke="#C9B99A"
        strokeWidth="1.5"
      />
      {/* Envelope flap (closed) */}
      <path
        d="M4 33 L100 85 L196 33"
        fill="#D9CCAF"
        stroke="#C9B99A"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Bottom triangle left */}
      <path d="M4 136 L78 90" stroke="#C9B99A" strokeWidth="1" opacity="0.5" />
      {/* Bottom triangle right */}
      <path
        d="M196 136 L122 90"
        stroke="#C9B99A"
        strokeWidth="1"
        opacity="0.5"
      />
      {/* Wax seal */}
      <circle cx="100" cy="82" r="12" fill="#803F49" opacity="0.85" />
      <text
        x="100"
        y="87"
        textAnchor="middle"
        fill="#E9DFC9"
        fontSize="12"
        fontFamily="Georgia, serif"
      >
        ♡
      </text>
    </svg>
  );
}

function EnvelopeOpenSVG() {
  return (
    <svg
      width="200"
      height="160"
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Letter peeking out */}
      <rect
        x="30"
        y="4"
        width="140"
        height="80"
        rx="2"
        fill="#F3EBDD"
        stroke="#C9B99A"
        strokeWidth="1"
        opacity="0.9"
      />
      <line
        x1="50"
        y1="30"
        x2="150"
        y2="30"
        stroke="#85866B"
        strokeWidth="1"
        opacity="0.3"
      />
      <line
        x1="50"
        y1="45"
        x2="150"
        y2="45"
        stroke="#85866B"
        strokeWidth="1"
        opacity="0.3"
      />
      <line
        x1="50"
        y1="60"
        x2="130"
        y2="60"
        stroke="#85866B"
        strokeWidth="1"
        opacity="0.3"
      />
      {/* Envelope body */}
      <rect
        x="4"
        y="50"
        width="192"
        height="106"
        rx="3"
        fill="#E9DFC9"
        stroke="#C9B99A"
        strokeWidth="1.5"
      />
      {/* Open flap */}
      <path
        d="M4 50 L100 10 L196 50"
        fill="#D9CCAF"
        stroke="#C9B99A"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Bottom left fold */}
      <path d="M4 156 L78 110" stroke="#C9B99A" strokeWidth="1" opacity="0.5" />
      {/* Bottom right fold */}
      <path
        d="M196 156 L122 110"
        stroke="#C9B99A"
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  );
}
