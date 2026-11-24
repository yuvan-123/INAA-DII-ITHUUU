"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  QUIZ_QUESTIONS,
  FINAL_CHALLENGE,
} from "@/data/gatewayConfig";

// ─── Types ────────────────────────────────────────────────────────────────────
type Phase =
  | "welcome"
  | "opening"
  | "quiz"
  | "riddle"
  | "final"
  | "unlocking"
  | "complete";

interface BirthdayGatewayProps {
  onComplete: () => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const WRONG_ROTATION_KEY = "wrongRotation";

function getWrongFeedback(feedbacks: string[], attempt: number): string {
  return feedbacks[attempt % feedbacks.length];
}

// ─── Decorative SVG components ────────────────────────────────────────────────
function WaxSeal({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="28" fill="#803F49" stroke="#49372B" strokeWidth="1.5" />
      <circle cx="30" cy="30" r="22" fill="none" stroke="#C99B98" strokeWidth="0.8" strokeDasharray="2 2" />
      <text x="30" y="35" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="14" fill="#F3EBDD" fontWeight="bold">K</text>
    </svg>
  );
}

function GoldenKey({ animate: shouldAnimate }: { animate: boolean }) {
  return (
    <motion.svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ scale: 0, rotate: -180, opacity: 0 }}
      animate={
        shouldAnimate
          ? {
              scale: [0, 1.3, 1],
              rotate: [-180, 20, 0],
              opacity: 1,
            }
          : {}
      }
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* Key circle */}
      <circle cx="38" cy="42" r="20" stroke="#C9A227" strokeWidth="6" fill="none" />
      <circle cx="38" cy="42" r="10" stroke="#C9A227" strokeWidth="3" fill="none" />
      {/* Key shaft */}
      <rect x="54" y="39" width="52" height="6" rx="3" fill="#C9A227" />
      {/* Key teeth */}
      <rect x="82" y="45" width="6" height="12" rx="2" fill="#C9A227" />
      <rect x="96" y="45" width="6" height="8" rx="2" fill="#C9A227" />
      {/* Shine */}
      <circle cx="30" cy="34" r="4" fill="rgba(255,220,100,0.5)" />
      {/* Glow ring */}
      <motion.circle
        cx="38"
        cy="42"
        r="28"
        stroke="#FFD700"
        strokeWidth="2"
        fill="none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={shouldAnimate ? { opacity: [0, 0.6, 0], scale: [0.8, 1.4, 1.8] } : {}}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
      />
    </motion.svg>
  );
}

function AntiqueBorder() {
  return (
    <div className="absolute inset-3 pointer-events-none">
      <div
        className="w-full h-full"
        style={{
          border: "1.5px solid rgba(73,55,43,0.3)",
          outline: "1px solid rgba(201,155,152,0.2)",
          outlineOffset: "4px",
        }}
      />
    </div>
  );
}

function FloatingParticles() {
  const particles = ["✦", "·", "✿", "♡", "✦", "·", "✿"];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute text-[#C99B98]/30 select-none"
          style={{
            left: `${10 + i * 13}%`,
            top: `${15 + (i % 3) * 25}%`,
            fontSize: i % 2 === 0 ? "12px" : "8px",
          }}
          animate={{
            y: [-8, 8, -8],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        >
          {p}
        </motion.span>
      ))}
    </div>
  );
}

// ─── Phase Components ─────────────────────────────────────────────────────────

function WelcomeScreen({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.div
      key="welcome"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center min-h-screen w-full px-4 py-12"
    >
      <FloatingParticles />

      {/* Decorative top stamp */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="stamp mb-8 text-xs tracking-widest"
      >
        ✦ STRICTLY CONFIDENTIAL ✦
      </motion.div>

      {/* Main envelope card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
        className="relative max-w-lg w-full"
      >
        {/* Paper card */}
        <div
          className="paper-texture rounded-sm px-10 py-12 text-center relative overflow-hidden"
          style={{
            boxShadow:
              "0 8px 32px rgba(73,55,43,0.18), 0 2px 8px rgba(73,55,43,0.12), inset 0 0 60px rgba(73,55,43,0.03)",
            border: "1px solid rgba(201,155,152,0.4)",
          }}
        >
          <AntiqueBorder />

          {/* Envelope illustration */}
          <motion.div
            className="mx-auto mb-6 relative"
            style={{ width: 100, height: 80 }}
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Envelope body */}
            <svg width="100" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Body */}
              <rect x="2" y="20" width="96" height="58" rx="2" fill="#E9DFC9" stroke="#49372B" strokeWidth="1.5" />
              {/* Flap */}
              <path d="M2 20 L50 52 L98 20" fill="#D4C8B0" stroke="#49372B" strokeWidth="1.5" strokeLinejoin="round" />
              {/* Bottom fold lines */}
              <path d="M2 78 L38 50" stroke="#C9B99A" strokeWidth="1" />
              <path d="M98 78 L62 50" stroke="#C9B99A" strokeWidth="1" />
              {/* Wax seal on flap */}
              <circle cx="50" cy="40" r="10" fill="#803F49" stroke="#49372B" strokeWidth="1" />
              <text x="50" y="44" textAnchor="middle" fontFamily="serif" fontSize="9" fill="#F3EBDD" fontWeight="bold">K</text>
            </svg>
          </motion.div>

          {/* Mysterious title */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="font-serif text-2xl sm:text-3xl text-[#49372B] mb-2 leading-tight"
            style={{ fontVariant: "small-caps" }}
          >
            A Very Secret Invitation
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-[#85866B] text-sm mb-5 font-handwritten text-lg tracking-wide"
          >
            — for worthy visitors only —
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="font-body text-[#49372B] text-base sm:text-lg leading-relaxed mb-8 italic"
            style={{ fontFamily: "'EB Garamond', serif" }}
          >
            &ldquo;Well, well... Someone has arrived at a very special place.
            But before you enter, you must{" "}
            <span className="font-semibold not-italic text-[#803F49]">
              prove
            </span>{" "}
            that you deserve to be here!&rdquo;
          </motion.p>

          {/* Open button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpen}
            className="relative inline-flex items-center gap-3 px-8 py-3.5 font-serif text-base tracking-widest uppercase cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #49372B, #6B4F3E)",
              color: "#F3EBDD",
              border: "1px solid rgba(201,155,152,0.3)",
              boxShadow: "0 4px 16px rgba(73,55,43,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
              letterSpacing: "0.15em",
            }}
          >
            <span>✉</span>
            <span>Open the Invitation</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Bottom flourish */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="mt-8 font-handwritten text-[#85866B]/70 text-base"
      >
        ~sealed with memories & love~
      </motion.p>
    </motion.div>
  );
}

// Opening animation screen
function OpeningScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      key="opening"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen w-full"
    >
      {/* Envelope opening animation */}
      <motion.div className="relative" style={{ width: 160, height: 130 }}>
        <svg width="160" height="130" viewBox="0 0 160 130" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="32" width="156" height="96" rx="3" fill="#E9DFC9" stroke="#49372B" strokeWidth="2" />
          <path d="M2 32 L80 85 L158 32" fill="#D4C8B0" stroke="#49372B" strokeWidth="2" strokeLinejoin="round" />
          <path d="M2 128 L60 82" stroke="#C9B99A" strokeWidth="1.5" />
          <path d="M158 128 L100 82" stroke="#C9B99A" strokeWidth="1.5" />
        </svg>
        {/* Flap opening */}
        <motion.div
          className="absolute"
          style={{ top: 2, left: 2, transformOrigin: "center top" }}
          initial={{ rotateX: 0 }}
          animate={{ rotateX: -160 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeInOut" }}
        >
          <svg width="156" height="55" viewBox="0 0 156 55" fill="none">
            <path d="M0 0 L78 53 L156 0" fill="#D4C8B0" stroke="#49372B" strokeWidth="2" strokeLinejoin="round" />
          </svg>
        </motion.div>
        {/* Letter rising from envelope */}
        <motion.div
          className="absolute"
          style={{ bottom: 10, left: "50%", x: "-50%" }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: -60, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
        >
          <div
            className="w-24 h-16 rounded-sm flex items-center justify-center font-handwritten text-[#49372B] text-sm"
            style={{
              background: "#F3EBDD",
              border: "1px solid rgba(73,55,43,0.3)",
              boxShadow: "0 4px 12px rgba(73,55,43,0.15)",
            }}
          >
            🎂 For you!
          </div>
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-8 font-handwritten text-[#49372B] text-xl"
      >
        Opening your invitation...
      </motion.p>
    </motion.div>
  );
}

// Quiz phase
function QuizPhase({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [feedback, setFeedback] = useState<{
    message: string;
    isCorrect: boolean;
  } | null>(null);
  const [answered, setAnswered] = useState(false);
  const wrongRotation = useRef(0);

  const question = QUIZ_QUESTIONS[questionIndex];

  const handleAnswer = useCallback(
    (index: number) => {
      if (answered) return;

      const isCorrect =
        question.allCorrect || index === question.correctIndex;

      if (isCorrect) {
        setFeedback({ message: question.correctFeedback, isCorrect: true });
        setAnswered(true);
        setTimeout(() => {
          setFeedback(null);
          setAnswered(false);
          setWrongAttempts(0);
          if (questionIndex + 1 >= QUIZ_QUESTIONS.length) {
            onComplete();
          } else {
            setQuestionIndex((q) => q + 1);
          }
        }, 2200);
      } else {
        // Check for a per-option special message first
        const specialMsg = question.specialWrongFeedbacks?.[index];
        const msg = specialMsg
          ? specialMsg
          : getWrongFeedback(question.wrongFeedbacks, wrongRotation.current);
        if (!specialMsg) wrongRotation.current += 1;
        setWrongAttempts((a) => a + 1);
        setFeedback({ message: msg, isCorrect: false });
        setTimeout(() => setFeedback(null), 2500);
      }
    },
    [answered, question, questionIndex, onComplete]
  );

  return (
    <motion.div
      key={`quiz-${questionIndex}`}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen w-full px-4 py-12"
    >
      <FloatingParticles />

      {/* Progress indicator */}
      <div className="flex gap-2 mb-8">
        {QUIZ_QUESTIONS.map((_, i) => (
          <motion.div
            key={i}
            className="rounded-full"
            style={{
              width: 10,
              height: 10,
              background:
                i < questionIndex
                  ? "#803F49"
                  : i === questionIndex
                  ? "#C99B98"
                  : "rgba(73,55,43,0.2)",
              border: "1px solid rgba(73,55,43,0.3)",
            }}
            animate={i === questionIndex ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Question card */}
      <motion.div
        className="relative max-w-xl w-full"
        layout
      >
        <div
          className="paper-texture rounded-sm px-8 py-10 relative"
          style={{
            boxShadow: "0 8px 32px rgba(73,55,43,0.15), 0 2px 8px rgba(73,55,43,0.1)",
            border: "1px solid rgba(201,155,152,0.4)",
          }}
        >
          <AntiqueBorder />

          {/* Question number badge */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center font-serif text-sm font-bold"
              style={{ background: "#803F49", color: "#F3EBDD" }}
            >
              {questionIndex + 1}
            </div>
            <span className="font-handwritten text-[#85866B] text-base">
              Question {questionIndex + 1} of {QUIZ_QUESTIONS.length}
            </span>
            <span className="ml-auto stamp text-xs py-1 px-2">Quiz Time!</span>
          </div>

          <h2
            className="font-serif text-xl sm:text-2xl text-[#49372B] mb-8 leading-snug"
          >
            {question.question}
          </h2>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {question.options.map((opt, i) => (
              <motion.button
                key={i}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(i)}
                disabled={answered}
                className="w-full text-left px-5 py-3.5 rounded-sm font-body text-base cursor-pointer transition-colors"
                style={{
                  background:
                    answered && i === question.correctIndex
                      ? "rgba(128,63,73,0.12)"
                      : "rgba(233,223,201,0.5)",
                  border: "1px solid",
                  borderColor:
                    answered && i === question.correctIndex
                      ? "#803F49"
                      : "rgba(201,185,154,0.5)",
                  color: "#382D27",
                  opacity: answered && i !== question.correctIndex ? 0.5 : 1,
                }}
              >
                <span
                  className="inline-block w-6 h-6 rounded-full text-center leading-6 mr-3 text-xs font-serif font-bold"
                  style={{
                    background: "rgba(73,55,43,0.1)",
                    border: "1px solid rgba(73,55,43,0.2)",
                    color: "#49372B",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    minWidth: "24px",
                    minHeight: "24px",
                  }}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </motion.button>
            ))}
          </div>

          {wrongAttempts > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-center font-handwritten text-[#85866B] text-sm"
            >
              Attempts so far: {wrongAttempts} 😅 (unlimited retries!)
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* Feedback toast */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            key="feedback"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            className="fixed bottom-10 left-1/2 max-w-sm w-full px-6 py-4 rounded-sm font-handwritten text-lg text-center z-50"
            style={{
              transform: "translateX(-50%)",
              background: feedback.isCorrect
                ? "linear-gradient(135deg, #49372B, #6B4F3E)"
                : "linear-gradient(135deg, #803F49, #9B4F58)",
              color: "#F3EBDD",
              boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {feedback.isCorrect ? "✓ " : "✗ "}
            {feedback.message}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Math Challenge Phase (Replaces Riddle) ──────────────────────────────────
function MathChallengePhase({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean } | null>(null);
  const [answered, setAnswered] = useState(false);
  const [calculusInput, setCalculusInput] = useState("");
  const [showMeme, setShowMeme] = useState(false);

  // Question 1 (EASY)
  const handleQ1Answer = (index: number) => {
    if (answered) return;
    if (index === 1) {
      // 110 is Option B
      setFeedback({
        message: "Okay, not bad! We have a genius among us!",
        isCorrect: true,
      });
      setAnswered(true);
      setTimeout(() => {
        setFeedback(null);
        setAnswered(false);
        setWrongAttempts(0);
        setStep(2);
      }, 1600);
    } else {
      setWrongAttempts((w) => w + 1);
      setFeedback({
        message: "Bro... we literally started with easy questions 😭",
        isCorrect: false,
      });
      setTimeout(() => setFeedback(null), 2500);
    }
  };

  // Question 2 (MEDIUM)
  const handleQ2Answer = (index: number) => {
    if (answered) return;
    if (index === 0) {
      // 225 is Option A (3x = 45 => x = 15 => x^2 = 225)
      setFeedback({
        message: "Wait... you're actually smarter than expected!",
        isCorrect: true,
      });
      setAnswered(true);
      setTimeout(() => {
        setFeedback(null);
        setAnswered(false);
        setWrongAttempts(0);
        setStep(3);
      }, 1600);
    } else {
      setWrongAttempts((w) => w + 1);
      setFeedback({
        message: "Math is clearly not your strongest relationship 😂",
        isCorrect: false,
      });
      setTimeout(() => setFeedback(null), 2500);
    }
  };

  // Question 3 (EXTREME)
  const handleQ3Submit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setShowMeme(true);
  };

  return (
    <motion.div
      key={`math-step-${step}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen w-full px-4 py-12"
    >
      <FloatingParticles />

      {/* Main Activity Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-center mb-6 sm:mb-8 max-w-xl mx-auto"
      >
        <span className="stamp text-xs tracking-widest mb-3 inline-block">
          ✦ GATEWAY EXAMINATION ✦
        </span>

        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#49372B] tracking-wide mt-1">
          THE ULTIMATE MATH CHALLENGE
        </h2>

        <p className="font-handwritten text-base sm:text-lg text-[#85866B] mt-2 italic">
          &ldquo;Three questions. Three difficulty levels. Let&apos;s see if your brain is ready!&rdquo;
        </p>
      </motion.div>

      {/* Progression & Difficulty Badge */}
      <div className="flex items-center gap-3 sm:gap-4 mb-6">
        {/* Step indicator */}
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className="flex items-center gap-1.5 font-handwritten text-sm"
              style={{
                color: s === step ? "#803F49" : s < step ? "#85866B" : "rgba(73,55,43,0.3)",
              }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full inline-block transition-transform duration-300"
                style={{
                  background:
                    s === step
                      ? "#803F49"
                      : s < step
                      ? "#85866B"
                      : "rgba(73,55,43,0.25)",
                  transform: s === step ? "scale(1.3)" : "scale(1)",
                }}
              />
              <span>0{s}/03</span>
            </div>
          ))}
        </div>

        <span className="text-[#C9B99A]">·</span>

        {/* Level badge */}
        <span
          className="stamp text-xs uppercase px-2.5 py-1 tracking-wider"
          style={{
            borderColor:
              step === 1 ? "#85866B" : step === 2 ? "#C99B98" : "#803F49",
            color: step === 1 ? "#85866B" : step === 2 ? "#C99B98" : "#803F49",
            background:
              step === 3 ? "rgba(128, 63, 73, 0.08)" : "transparent",
            fontWeight: step === 3 ? "bold" : "normal",
          }}
        >
          {step === 1
            ? "Difficulty: EASY"
            : step === 2
            ? "Difficulty: MEDIUM"
            : "Difficulty: EXTREME"}
        </span>
      </div>

      {/* Main Parchment Card */}
      <motion.div
        className="relative max-w-xl w-full"
        layout
      >
        <div
          className="paper-texture rounded-sm px-7 sm:px-10 py-9 sm:py-11 relative"
          style={{
            boxShadow:
              "0 8px 36px rgba(73,55,43,0.18), 0 2px 8px rgba(73,55,43,0.1)",
            border: "1px solid rgba(201,155,152,0.45)",
          }}
        >
          <AntiqueBorder />

          {/* ── QUESTION 1: EASY ────────────────────── */}
          {step === 1 && (
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#C9B99A]/40">
                <span className="font-handwritten text-sm text-[#85866B]">
                  Question 1 of 3
                </span>
                <span className="font-serif text-xs text-[#85866B] uppercase tracking-wider">
                  Level: Easy
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl text-[#49372B] mb-6 leading-snug">
                What is 25 × 4 + 10?
              </h3>

              <div className="flex flex-col gap-3">
                {["100", "110", "120", "90"].map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleQ1Answer(i)}
                    disabled={answered}
                    className="w-full text-left px-5 py-3.5 rounded-sm font-body text-base cursor-pointer transition-colors"
                    style={{
                      background:
                        answered && i === 1
                          ? "rgba(128,63,73,0.12)"
                          : "rgba(233,223,201,0.5)",
                      border: "1px solid",
                      borderColor:
                        answered && i === 1
                          ? "#803F49"
                          : "rgba(201,185,154,0.5)",
                      color: "#382D27",
                    }}
                  >
                    <span
                      className="inline-flex items-center justify-center w-6 h-6 rounded-full mr-3 text-xs font-serif font-bold"
                      style={{
                        background: "rgba(73,55,43,0.1)",
                        border: "1px solid rgba(73,55,43,0.2)",
                        color: "#49372B",
                        minWidth: "24px",
                        fontSize: "11px",
                      }}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="font-medium text-lg">{opt}</span>
                  </motion.button>
                ))}
              </div>

              {wrongAttempts > 0 && (
                <p className="mt-4 text-center font-handwritten text-[#85866B] text-sm">
                  {wrongAttempts} attempt{wrongAttempts > 1 ? "s" : ""}... give it another shot! 🧮
                </p>
              )}
            </div>
          )}

          {/* ── QUESTION 2: MEDIUM ──────────────────── */}
          {step === 2 && (
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#C9B99A]/40">
                <span className="font-handwritten text-sm text-[#85866B]">
                  Question 2 of 3
                </span>
                <span className="font-serif text-xs text-[#85866B] uppercase tracking-wider">
                  Level: Medium
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl text-[#49372B] mb-2 leading-snug">
                If 3x + 7 = 52, what is the value of x²?
              </h3>
              <p className="font-handwritten text-[#85866B] text-base mb-6">
                Take your time to calculate properly...
              </p>

              <div className="flex flex-col gap-3">
                {["225", "196", "256", "144"].map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleQ2Answer(i)}
                    disabled={answered}
                    className="w-full text-left px-5 py-3.5 rounded-sm font-body text-base cursor-pointer transition-colors"
                    style={{
                      background:
                        answered && i === 0
                          ? "rgba(128,63,73,0.12)"
                          : "rgba(233,223,201,0.5)",
                      border: "1px solid",
                      borderColor:
                        answered && i === 0
                          ? "#803F49"
                          : "rgba(201,185,154,0.5)",
                      color: "#382D27",
                    }}
                  >
                    <span
                      className="inline-flex items-center justify-center w-6 h-6 rounded-full mr-3 text-xs font-serif font-bold"
                      style={{
                        background: "rgba(73,55,43,0.1)",
                        border: "1px solid rgba(73,55,43,0.2)",
                        color: "#49372B",
                        minWidth: "24px",
                        fontSize: "11px",
                      }}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="font-medium text-lg">{opt}</span>
                  </motion.button>
                ))}
              </div>

              {wrongAttempts > 0 && (
                <p className="mt-4 text-center font-handwritten text-[#85866B] text-sm">
                  {wrongAttempts} attempt{wrongAttempts > 1 ? "s" : ""}... hint: find x first! 😉
                </p>
              )}
            </div>
          )}

          {/* ── QUESTION 3: EXTREME ─────────────────── */}
          {step === 3 && (
            <div>
              {/* Formal Exam Banner */}
              <div className="text-center mb-5 pb-3 border-b-2 border-double border-[#C9B99A]/60">
                <span className="font-serif text-[11px] uppercase tracking-widest text-[#803F49] font-bold block mb-1">
                  DEPARTMENT OF ADVANCED CALCULUS · FINAL EXAMINATION
                </span>
                <span className="font-serif italic text-xs text-[#85866B]">
                  Time Allowed: 3 Hours · Marks: 100 · Calculators Strictly Prohibited
                </span>
              </div>

              <div className="text-center">
                <span className="font-handwritten text-[#803F49] text-base block mb-1 font-semibold">
                  Section III · Definite Integrals
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-[#49372B] font-medium mb-3">
                  Evaluate the following definite integral:
                </h3>

                {/* Intimidating Integral Display */}
                <div
                  className="my-5 py-6 px-4 rounded-sm bg-[#F8F3EA] border border-[#C9B99A]/70 flex items-center justify-center select-none"
                  style={{
                    boxShadow: "inset 0 1px 4px rgba(73,55,43,0.06)",
                  }}
                >
                  <div className="flex items-center gap-2 sm:gap-3 font-serif text-[#382D27]">
                    {/* Integral sign with limits */}
                    <div className="flex flex-col items-center leading-none select-none">
                      <span className="text-sm sm:text-base font-serif italic mb-0.5 font-bold">
                        ∞
                      </span>
                      <span className="text-5xl sm:text-6xl font-serif font-light leading-none">
                        ∫
                      </span>
                      <span className="text-sm sm:text-base font-serif italic mt-0.5 font-bold">
                        0
                      </span>
                    </div>

                    {/* Fraction */}
                    <div className="flex flex-col items-center justify-center">
                      <span className="pb-1 text-2xl sm:text-3xl font-serif italic border-b-2 border-[#49372B] px-3">
                        x<sup>3</sup>
                      </span>
                      <span className="pt-1.5 text-2xl sm:text-3xl font-serif italic px-2">
                        e<sup>x</sup> − 1
                      </span>
                    </div>

                    {/* dx */}
                    <span className="text-2xl sm:text-3xl font-serif italic ml-1.5">
                      dx
                    </span>
                  </div>
                </div>

                <p className="font-handwritten text-sm text-[#85866B] mb-5">
                  Show all integration steps and derive the exact closed-form solution:
                </p>

                {/* Solution Text Input Form */}
                <form onSubmit={handleQ3Submit} className="flex flex-col gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      value={calculusInput}
                      onChange={(e) => setCalculusInput(e.target.value)}
                      placeholder="Type your solution here (e.g. π⁴/15)..."
                      className="w-full px-4 py-3 bg-[#F8F3EA] border border-[#C9B99A] rounded-sm font-serif text-sm sm:text-base text-[#49372B] placeholder:text-[#85866B]/60 focus:outline-none focus:border-[#803F49] transition-all"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 font-serif text-sm sm:text-base tracking-widest uppercase cursor-pointer text-[#F3EBDD] transition-all shadow-sm"
                    style={{
                      background: "linear-gradient(135deg, #49372B, #6B4F3E)",
                      border: "1px solid rgba(201,155,152,0.3)",
                      letterSpacing: "0.14em",
                    }}
                  >
                    Submit Solution ✍️
                  </motion.button>
                </form>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Feedback Toast for Q1 and Q2 */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            key="math-feedback"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-10 left-1/2 max-w-sm w-full px-6 py-4 rounded-sm font-handwritten text-lg text-center z-50 -translate-x-1/2"
            style={{
              background: feedback.isCorrect
                ? "linear-gradient(135deg, #49372B, #6B4F3E)"
                : "linear-gradient(135deg, #803F49, #9B4F58)",
              color: "#F3EBDD",
              boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {feedback.isCorrect ? "✓ " : "✗ "}
            {feedback.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── QUESTION 3 MEME REVEAL OVERLAY ─────────── */}
      <AnimatePresence>
        {showMeme && (
          <motion.div
            key="math-meme-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4"
            style={{
              background: "rgba(243, 235, 221, 0.94)",
              backdropFilter: "blur(6px)",
            }}
          >
            {/* Playful Floating Emojis */}
            <div className="relative mb-2 flex items-center justify-center">
              {["💀", "😭", "📚", "❌", "🎓"].map((emoji, idx) => (
                <motion.span
                  key={idx}
                  className="absolute select-none text-2xl sm:text-3xl"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0.8],
                    scale: [0, 1.3, 1],
                    x: Math.cos((idx / 5) * Math.PI * 2) * 65,
                    y: Math.sin((idx / 5) * Math.PI * 2) * 65,
                  }}
                  transition={{ delay: 0.15 + idx * 0.08, duration: 0.6 }}
                >
                  {emoji}
                </motion.span>
              ))}

              {/* Main Center Emoji */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 15 }}
                className="text-7xl sm:text-8xl select-none"
              >
                💀
              </motion.div>
            </div>

            {/* Meme Card */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 220, damping: 20 }}
              className="paper-texture p-7 sm:p-9 rounded-sm border border-[#C9B99A] shadow-2xl max-w-lg w-full text-center relative mt-4"
            >
              <AntiqueBorder />

              {/* Red Stamp */}
              <div className="mb-4 inline-block stamp text-xs tracking-widest text-[#803F49] border-[#803F49] -rotate-3">
                ✦ EXAM RESULTS: FRAUD DETECTED ✦
              </div>

              {/* Meme Text 1 */}
              <h3 className="font-serif text-2xl sm:text-3xl text-[#803F49] font-bold mb-3 leading-snug">
                Bro, I KNOW you&apos;re bad at math 💀😭
              </h3>

              {/* Meme Text 2 */}
              <p className="font-handwritten text-xl sm:text-2xl text-[#49372B] leading-relaxed mb-8">
                &ldquo;Who do you think you&apos;re fooling? Just let yourself in already!&rdquo;
              </p>

              {/* Action Button: OKAY, LET ME IN ♡ */}
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={onComplete}
                className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 font-serif text-base sm:text-lg tracking-widest uppercase cursor-pointer w-full sm:w-auto shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #803F49, #9B4F58)",
                  color: "#F3EBDD",
                  border: "1px solid rgba(255,255,255,0.2)",
                  letterSpacing: "0.14em",
                  boxShadow: "0 6px 24px rgba(128,63,73,0.35)",
                }}
              >
                <span>OKAY, LET ME IN ♡</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Final challenge phase
function FinalPhase({ onComplete }: { onComplete: () => void }) {
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean } | null>(null);
  const [answered, setAnswered] = useState(false);
  const [showCat, setShowCat] = useState(false);
  const wrongRotation = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const proceed = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowCat(false);
    onComplete();
  }, [onComplete]);

  const handleAnswer = useCallback(
    (index: number) => {
      if (answered) return;

      const isCorrect = FINAL_CHALLENGE.allCorrect || index === FINAL_CHALLENGE.correctIndex;

      if (isCorrect) {
        setFeedback({ message: FINAL_CHALLENGE.correctFeedback, isCorrect: true });
        setAnswered(true);
        // Show cat animation after a short pause
        setTimeout(() => setShowCat(true), 600);
        // Added 10 more seconds (14.5 seconds total) so user can comfortably read all texts
        timerRef.current = setTimeout(() => {
          proceed();
        }, 14500);
      } else {
        const msg = getWrongFeedback(FINAL_CHALLENGE.wrongFeedbacks, wrongRotation.current);
        wrongRotation.current += 1;
        setWrongAttempts((a) => a + 1);
        setFeedback({ message: msg, isCorrect: false });
        setTimeout(() => setFeedback(null), 2500);
      }
    },
    [answered, proceed]
  );

  return (
    <motion.div
      key="final"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen w-full px-4 py-12"
    >
      <FloatingParticles />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <span className="stamp text-xs tracking-widest mb-3 inline-block">Final Challenge</span>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#49372B] mt-2">
          One Last Question... 🗝️
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="relative max-w-xl w-full"
      >
        <div
          className="paper-texture rounded-sm px-8 py-10 relative"
          style={{
            boxShadow: "0 8px 40px rgba(73,55,43,0.2)",
            border: "1px solid rgba(201,155,152,0.5)",
          }}
        >
          <AntiqueBorder />

          {/* Decorative wax seal top */}
          <div className="flex justify-center mb-6">
            <WaxSeal size={52} />
          </div>

          <p className="font-handwritten text-[#85866B] text-xl text-center mb-2">
            {FINAL_CHALLENGE.prompt}
          </p>
          <h3 className="font-serif text-lg sm:text-xl text-[#49372B] text-center mb-8 leading-snug">
            {FINAL_CHALLENGE.subPrompt}
          </h3>

          <div className="flex flex-col gap-3">
            {FINAL_CHALLENGE.options.map((opt, i) => (
              <motion.button
                key={i}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(i)}
                disabled={answered}
                className="w-full text-left px-5 py-3.5 rounded-sm font-body text-base cursor-pointer"
                style={{
                  background: answered ? "rgba(128,63,73,0.08)" : "rgba(233,223,201,0.5)",
                  border: "1px solid",
                  borderColor: answered ? "#803F49" : "rgba(201,185,154,0.5)",
                  color: "#382D27",
                  opacity: answered ? 0.7 : 1,
                }}
              >
                <span
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full mr-3 text-xs font-serif font-bold"
                  style={{
                    background: "rgba(73,55,43,0.1)",
                    border: "1px solid rgba(73,55,43,0.2)",
                    color: "#49372B",
                    minWidth: "24px",
                    fontSize: "11px",
                  }}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </motion.button>
            ))}
          </div>

          {wrongAttempts > 0 && (
            <p className="mt-4 text-center font-handwritten text-[#85866B] text-sm">
              So close! {wrongAttempts} attempt{wrongAttempts > 1 ? "s" : ""}... think with your heart! 💖
            </p>
          )}
        </div>
      </motion.div>

      {/* Wrong answer feedback toast */}
      <AnimatePresence>
        {feedback && !feedback.isCorrect && (
          <motion.div
            key="final-feedback"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-10 left-1/2 max-w-sm w-full px-6 py-4 rounded-sm font-handwritten text-lg text-center z-50"
            style={{
              transform: "translateX(-50%)",
              background: "linear-gradient(135deg, #803F49, #9B4F58)",
              color: "#F3EBDD",
              boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
            }}
          >
            ✗ {feedback.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✨ Cat Manifesting Overlay ✨ */}
      <AnimatePresence>
        {showCat && (
          <motion.div
            key="cat-manifest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
            style={{
              background: "rgba(243,235,221,0.92)",
              backdropFilter: "blur(6px)",
            }}
          >
            {/* Sparkle ring */}
            <div className="relative flex items-center justify-center">
              {[...Array(10)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute text-yellow-400 select-none"
                  style={{ fontSize: "18px" }}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0, 1, 0],
                    x: Math.cos((i / 10) * Math.PI * 2) * 90,
                    y: Math.sin((i / 10) * Math.PI * 2) * 90,
                    scale: [0, 1.4, 0.8, 1.2, 0],
                  }}
                  transition={{ duration: 2.2, delay: i * 0.08, ease: "easeOut" }}
                >
                  ✨
                </motion.span>
              ))}

              {/* The cat */}
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{
                  scale: [0, 1.3, 1],
                  rotate: [-10, 5, 0],
                  y: [0, -12, 0, -8, 0],
                }}
                transition={{
                  scale: { duration: 0.5, times: [0, 0.6, 1] },
                  rotate: { duration: 0.5 },
                  y: { duration: 1.5, delay: 0.5, repeat: 1, ease: "easeInOut" },
                }}
                className="text-8xl select-none"
                style={{ filter: "drop-shadow(0 4px 16px rgba(201,155,152,0.5))" }}
              >
                🐱
              </motion.div>
            </div>

            {/* Stars above */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0, 1, 0.6, 1], y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-2 text-2xl tracking-widest"
            >
              ⭐ ✨ ⭐
            </motion.div>

            {/* MANIFESTING text */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 180 }}
              className="mt-5 text-center px-6 max-w-sm mx-auto"
            >
              <p
                className="font-serif text-2xl sm:text-3xl text-[#49372B] mb-2"
                style={{ letterSpacing: "0.08em" }}
              >
                ✨ MANIFESTING ✨
              </p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="font-handwritten text-[#803F49] text-xl leading-relaxed"
              >
                WHAT YOU NEED 🌟
              </motion.p>

              {/* Personal message */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                className="mt-4 px-5 py-3 rounded-sm"
                style={{
                  background: "rgba(128,63,73,0.08)",
                  border: "1px solid rgba(201,155,152,0.4)",
                }}
              >
                <p className="font-handwritten text-[#49372B] text-lg leading-relaxed">
                  Nee oru oru naalaiki oru oru option choose pannuva 😂
                </p>
                <p className="font-handwritten text-[#803F49] text-lg leading-relaxed mt-1">
                  so nee ipo ethu venumoo eduthuko — un life ku varum athu 😊
                </p>
              </motion.div>

              {/* Optional Continue Button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                onClick={proceed}
                className="mt-5 px-5 py-2 rounded-xs font-handwritten text-base text-[#49372B] bg-[#F8F3EA] hover:bg-white border border-[#C9B99A] shadow-xs cursor-pointer transition-all inline-flex items-center gap-1.5"
              >
                <span>continue to the math challenge</span>
                <span>➔</span>
              </motion.button>
            </motion.div>

            {/* Paw prints floating up */}
            {["🐾", "🐾", "🐾"].map((paw, i) => (
              <motion.span
                key={i}
                className="fixed select-none pointer-events-none"
                style={{
                  left: `${25 + i * 25}%`,
                  bottom: "10%",
                  fontSize: "20px",
                  opacity: 0,
                }}
                animate={{
                  y: [-20, -120],
                  opacity: [0, 0.7, 0],
                  rotate: [0, i % 2 === 0 ? 15 : -15],
                }}
                transition={{
                  duration: 1.8,
                  delay: 0.3 + i * 0.3,
                  ease: "easeOut",
                }}
              >
                {paw}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Unlocking animation screen
function UnlockingScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"key" | "message">("key");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("message"), 1800);
    return () => clearTimeout(t1);
  }, []);

  return (
    <motion.div
      key="unlocking"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center min-h-screen w-full px-4 py-12 text-center"
    >
      <FloatingParticles />

      {/* Star burst particles */}
      <div className="relative">
        {[...Array(8)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-yellow-400/60 select-none pointer-events-none"
            style={{
              fontSize: "16px",
              top: "50%",
              left: "50%",
            }}
            initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              x: Math.cos((i / 8) * Math.PI * 2) * 80,
              y: Math.sin((i / 8) * Math.PI * 2) * 80,
              scale: [0, 1.5, 0],
            }}
            transition={{ duration: 1.5, delay: 0.5 + i * 0.08 }}
          >
            ✦
          </motion.span>
        ))}

        <GoldenKey animate={true} />
      </div>

      <AnimatePresence>
        {phase === "message" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8 max-w-md"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="text-5xl mb-4"
            >
              🎉
            </motion.div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#49372B] mb-4">
              Congratulations!
            </h2>
            <p className="font-body text-[#49372B]/80 text-lg italic leading-relaxed mb-8"
              style={{ fontFamily: "'EB Garamond', serif" }}>
              &ldquo;You&apos;ve earned your invitation.<br />
              The birthday memories are waiting for you...&rdquo;
            </p>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={onDone}
              className="inline-flex items-center gap-3 px-10 py-4 font-serif text-base tracking-widest uppercase cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #803F49, #A0505E)",
                color: "#F3EBDD",
                boxShadow:
                  "0 6px 24px rgba(128,63,73,0.4), 0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.1)",
                letterSpacing: "0.12em",
              }}
            >
              <span>🎂</span>
              <span>Enter the Birthday World</span>
              <span>✨</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Mute Button ──────────────────────────────────────────────────────────────
function MuteButton({
  muted,
  onToggle,
}: {
  muted: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      onClick={onToggle}
      title={muted ? "Unmute music" : "Mute music"}
      className="fixed top-5 right-5 z-50 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
      style={{
        background: "rgba(73,55,43,0.15)",
        border: "1px solid rgba(73,55,43,0.25)",
        color: "#49372B",
        backdropFilter: "blur(4px)",
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-base">{muted ? "🔇" : "🎵"}</span>
    </motion.button>
  );
}

// ─── Main Gateway Component ───────────────────────────────────────────────────
export default function BirthdayGateway({ onComplete }: BirthdayGatewayProps) {
  const [phase, setPhase] = useState<Phase>("welcome");
  const [muted, setMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio: attempt to play soft background music if browser allows
  // Uses a royalty-free URL; replace with your own file if desired
  useEffect(() => {
    // We only create the audio element client-side
    // Music is muted by default; user can unmute via the button
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.25;
    audio.muted = true;
    audioRef.current = audio;
    return () => {
      audio.pause();
    };
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      if (audioRef.current) {
        audioRef.current.muted = next;
        if (!next) {
          audioRef.current.play().catch(() => {
            // autoplay blocked — that's fine
          });
        }
      }
      return next;
    });
  }, []);

  const goToPhase = useCallback((p: Phase) => setPhase(p), []);

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden"
      style={{ background: "linear-gradient(160deg, #F3EBDD 0%, #EDE3CE 50%, #E9DFC9 100%)" }}
    >
      {/* Subtle paper grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E\")",
          zIndex: 0,
        }}
      />

      <MuteButton muted={muted} onToggle={toggleMute} />

      <AnimatePresence mode="wait">
        {phase === "welcome" && (
          <WelcomeScreen key="welcome" onOpen={() => goToPhase("opening")} />
        )}
        {phase === "opening" && (
          <OpeningScreen key="opening" onDone={() => goToPhase("quiz")} />
        )}
        {phase === "quiz" && (
          <QuizPhase key="quiz" onComplete={() => goToPhase("final")} />
        )}
        {phase === "final" && (
          <FinalPhase key="final" onComplete={() => goToPhase("riddle")} />
        )}
        {phase === "riddle" && (
          <MathChallengePhase key="math" onComplete={onComplete} />
        )}
        {phase === "unlocking" && (
          <UnlockingScreen key="unlocking" onDone={onComplete} />
        )}
      </AnimatePresence>
    </div>
  );
}
