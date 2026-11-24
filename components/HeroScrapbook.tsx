"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function HeroScrapbook() {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  const handleOpenEnvelope = () => {
    setEnvelopeOpen(true);
  };

  return (
    <section
      id="the-beginning"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 lg:py-28 overflow-hidden bg-[#F3EBDD]"
    >
      {/* Background paper texture & decorative elements */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Decorative ambient background doodles */}
      <span className="absolute top-28 left-8 text-[#85866B]/15 text-7xl font-handwritten select-none pointer-events-none -rotate-12">
        ✿
      </span>
      <span className="absolute bottom-12 right-12 text-[#C99B98]/20 text-8xl font-handwritten select-none pointer-events-none rotate-12">
        ♡
      </span>

      {/* Main 2-Column Desktop Container */}
      <div className="max-w-7xl w-full mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-14 items-center">
          
          {/* LEFT COLUMN: ~45% width (col-span-5 in 12-col grid) */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            {/* Small handwritten introduction badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <span className="h-px w-6 bg-[#85866B]/50" />
              <p className="font-handwritten text-lg sm:text-xl text-[#85866B] tracking-wide -rotate-1">
                a little gift from your two best friends ✦
              </p>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl lg:text-5xl xl:text-6xl text-[#49372B] font-medium leading-[1.15] mb-5"
            >
              Happiee Birthday <br />
              <span className="text-[#803F49] italic">Kavithaaa</span>
            </motion.h1>

            {/* Short subtitle / emotional description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-body text-[#49372B]/85 text-lg sm:text-xl italic leading-relaxed max-w-lg mb-8"
            >
              A little collection of memories, moments and everything that makes you
              special — gathered and bound with love.
            </motion.p>

            {/* Interactive Envelope / Welcome Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="w-full max-w-md"
            >
              <AnimatePresence mode="wait">
                {!envelopeOpen ? (
                  /* Closed Envelope State */
                  <div className="bg-[#E9DFC9] border border-[#C9B99A] p-6 shadow-[0_8px_24px_rgba(56,45,39,0.08)] relative rounded-sm">
                    {/* Washi tape top */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#C99B98]/60 -rotate-1 z-10 shadow-xs" />
                    
                    <div className="flex items-center gap-4 mb-4">
                      {/* Envelope SVG Icon with wax seal */}
                      <div className="w-14 h-11 bg-[#F3EBDD] border border-[#C9B99A] relative flex items-center justify-center shrink-0 shadow-xs rounded-[2px]">
                        <div className="w-5 h-5 rounded-full bg-[#803F49] text-[#F3EBDD] flex items-center justify-center font-serif text-[10px] shadow-xs">
                          ♡
                        </div>
                      </div>
                      <div>
                        <p className="font-serif italic text-base text-[#49372B] font-medium leading-tight">
                          A handwritten surprise is inside
                        </p>
                        <p className="font-handwritten text-sm text-[#85866B]">
                          sealed with a wax stamp
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleOpenEnvelope}
                      className="w-full py-3 px-6 bg-[#49372B] hover:bg-[#803F49] text-[#F3EBDD] font-serif italic text-base tracking-wide transition-all duration-300 shadow-[0_4px_12px_rgba(56,45,39,0.15)] flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <span>Open your little surprise</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                ) : (
                  /* Opened Letter Reveal */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-[#E9DFC9] border border-[#C9B99A] p-6 sm:p-7 shadow-[0_8px_30px_rgba(56,45,39,0.12)] relative rounded-sm lined-paper"
                  >
                    {/* Washi tape */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#85866B]/50 rotate-1 z-10 shadow-xs" />

                    <div className="flex items-center justify-between mb-3 border-b border-[#C9B99A]/40 pb-2">
                      <span className="font-handwritten text-base text-[#803F49]">
                        a note to begin with ✦
                      </span>
                      <span className="font-handwritten text-xs text-[#85866B]">
                        just for you
                      </span>
                    </div>

                    <p className="font-body text-[#382D27] text-lg sm:text-[19px] italic leading-relaxed mb-4">
                      "Some people make life a little more beautiful just by being in
                      it. So we made this little something for you."
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <p className="font-handwritten text-lg text-[#803F49]">
                        — with all our love ♡
                      </p>
                      <a
                        href="#three-of-us"
                        className="font-handwritten text-base text-[#49372B] hover:text-[#803F49] underline decoration-[#C9B99A] underline-offset-4 flex items-center gap-1 transition-colors"
                      >
                        turn page ↓
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: ~55% width (col-span-7 in 12-col grid) */}
          <div className="lg:col-span-7 relative w-full h-[540px] sm:h-[580px] lg:h-[620px] flex items-center justify-center">
            
            {/* Scrapbook Backdrop Matting */}
            <div className="absolute inset-4 sm:inset-6 bg-[#E9DFC9]/50 border border-[#C9B99A]/50 rounded-sm -rotate-1 pointer-events-none shadow-xs" />

            {/* POLAROID 1: Top Left - Sunlit Terrace Portrait */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -6 }}
              animate={{ opacity: 1, y: 0, rotate: -4 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{ rotate: 0, scale: 1.04, zIndex: 30 }}
              className="absolute top-2 sm:top-6 left-2 sm:left-6 z-10 cursor-pointer"
            >
              <div className="bg-white p-3 pb-8 shadow-[0_6px_20px_rgba(56,45,39,0.15)] w-48 sm:w-56 lg:w-60 border border-neutral-100/80">
                {/* Washi tape */}
                <div className="absolute -top-3 left-1/3 -translate-x-1/2 w-16 h-5 bg-[#C99B98]/75 -rotate-2 z-20 shadow-xs" />
                
                {/* Image */}
                <div className="relative w-full h-56 sm:h-64 bg-[#E9DFC9] overflow-hidden rounded-[1px]">
                  <Image
                    src="/images/photo-3.jpeg"
                    alt="Sunlit and smiling"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 240px, 280px"
                    priority
                  />
                </div>
                <p className="font-handwritten text-[#49372B] text-base text-center mt-3 leading-tight font-semibold">
                  sunlit & smiling ✨
                </p>
                <p className="font-handwritten text-[#85866B] text-xs text-center mt-0.5">
                  jasmine in her hair
                </p>
              </div>
            </motion.div>

            {/* POLAROID 2: Center Right - Saree & Fairy Lights */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: 6 }}
              animate={{ opacity: 1, y: 0, rotate: 5 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              whileHover={{ rotate: 0, scale: 1.04, zIndex: 30 }}
              className="absolute top-12 sm:top-16 right-2 sm:right-6 z-20 cursor-pointer"
            >
              <div className="bg-white p-3 pb-8 shadow-[0_8px_24px_rgba(56,45,39,0.18)] w-44 sm:w-52 lg:w-56 border border-neutral-100/80">
                {/* Washi tape */}
                <div className="absolute -top-3 right-8 w-14 h-5 bg-[#85866B]/65 rotate-3 z-20 shadow-xs" />

                {/* Image */}
                <div className="relative w-full h-52 sm:h-60 bg-[#E9DFC9] overflow-hidden rounded-[1px]">
                  <Image
                    src="/images/photo-1.jpeg"
                    alt="Fairy lights celebration"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 200px, 250px"
                    priority
                  />
                </div>
                <p className="font-handwritten text-[#49372B] text-base text-center mt-3 leading-tight font-semibold">
                  festive elegance 🌸
                </p>
                <p className="font-handwritten text-[#85866B] text-xs text-center mt-0.5">
                  fairy light moments
                </p>
              </div>
            </motion.div>

            {/* POLAROID 3: Bottom Center/Left - Saree with Bangles */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: -1 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              whileHover={{ rotate: 0, scale: 1.04, zIndex: 30 }}
              className="absolute bottom-4 sm:bottom-8 left-16 sm:left-24 lg:left-28 z-15 cursor-pointer"
            >
              <div className="bg-white p-2.5 pb-7 shadow-[0_6px_22px_rgba(56,45,39,0.16)] w-40 sm:w-48 lg:w-52 border border-neutral-100/80">
                <div className="relative w-full h-44 sm:h-52 bg-[#E9DFC9] overflow-hidden rounded-[1px]">
                  <Image
                    src="/images/photo-4.jpeg"
                    alt="Tradition and charm"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 180px, 220px"
                  />
                </div>
                <p className="font-handwritten text-[#49372B] text-sm sm:text-base text-center mt-2.5 leading-tight font-semibold">
                  bangles & grace ♡
                </p>
              </div>
            </motion.div>

            {/* Scrapbook Paper Note: Pinned Kraft Slip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 3 }}
              animate={{ opacity: 1, scale: 1, rotate: 2 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="absolute bottom-6 right-8 sm:right-16 z-25 max-w-[170px] sm:max-w-[200px]"
            >
              <div className="bg-[#E9DFC9] p-3.5 sm:p-4 border border-[#C9B99A] shadow-[0_4px_14px_rgba(56,45,39,0.1)] relative">
                {/* Vintage Pushpin */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#803F49] shadow-xs flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F3EBDD]/60" />
                </div>
                <p className="font-handwritten text-sm sm:text-base text-[#49372B] leading-tight pt-1">
                  "three people, one unbreakable bond."
                </p>
                <p className="font-handwritten text-xs text-[#85866B] text-right mt-1.5">
                  — chapter 2024 ✦
                </p>
              </div>
            </motion.div>

            {/* Vintage Stamp Decoration */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="absolute top-4 right-1/3 z-5 select-none pointer-events-none stamp -rotate-6"
            >
              MEMORIES · ARCHIVE 100%
            </motion.div>

            {/* Botanical Dried Flower Sketch */}
            <div className="absolute top-1/2 left-2 -translate-y-1/2 z-0 opacity-20 pointer-events-none select-none">
              <svg width="120" height="180" viewBox="0 0 120 180" fill="none">
                <path
                  d="M60 170 Q55 100 65 30 Q75 10 60 5"
                  stroke="#85866B"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M60 120 Q30 110 35 90 Q50 95 62 110"
                  fill="#85866B"
                  fillOpacity="0.4"
                />
                <path
                  d="M63 90 Q90 80 85 60 Q70 65 62 80"
                  fill="#85866B"
                  fillOpacity="0.4"
                />
                <circle cx="60" cy="18" r="8" fill="#803F49" fillOpacity="0.4" />
                <circle cx="50" cy="22" r="6" fill="#C99B98" fillOpacity="0.5" />
                <circle cx="70" cy="22" r="6" fill="#C99B98" fillOpacity="0.5" />
              </svg>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
