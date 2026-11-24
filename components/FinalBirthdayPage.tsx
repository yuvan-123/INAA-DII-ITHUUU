"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

interface FinalBirthdayPageProps {
  photoSrc?: string;
}

export default function FinalBirthdayPage({
  photoSrc = "/images/bth/pic-2.jpeg",
}: FinalBirthdayPageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="forever-memories"
      ref={ref}
      className="relative min-h-screen py-24 sm:py-28 lg:py-36 bg-[#49372B] text-[#F3EBDD] overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Background paper texture */}
      <div
        className="absolute inset-0 opacity-12 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.25'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Large decorative watermark doodles */}
      <span className="absolute top-12 left-10 text-[#C99B98]/10 text-9xl font-handwritten select-none pointer-events-none -rotate-12">
        ✦
      </span>
      <span className="absolute bottom-16 right-10 text-[#E9DFC9]/10 text-9xl font-handwritten select-none pointer-events-none rotate-12">
        ✿
      </span>

      <div className="max-w-4xl xl:max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 w-full relative z-10 text-center">
        {/* Chapter label */}
        <motion.p
          className="font-handwritten text-lg sm:text-xl text-[#C9B99A]/80 mb-6 -rotate-1"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 0.85, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          the final page · until forever ✦
        </motion.p>

        {/* Large Final Hero Polaroid */}
        <motion.div
          className="relative mx-auto mb-14 max-w-[380px] sm:max-w-[430px]"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          {/* Polaroid Frame */}
          <div
            className="bg-white p-3.5 sm:p-4 pb-10 sm:pb-12 shadow-[0_12px_44px_rgba(0,0,0,0.4)] border border-neutral-200/60 rounded-[2px]"
            style={{ transform: "rotate(-1deg)" }}
          >
            {/* Washi tape on top */}
            <div
              className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-6 shadow-sm z-20 pointer-events-none"
              style={{
                background: "rgba(201, 155, 152, 0.75)",
                transform: "translateX(-50%) rotate(-2deg)",
              }}
            />

            {/* Photo area */}
            <div className="relative w-full aspect-[4/5] bg-[#E9DFC9] overflow-hidden rounded-[1px] photo-placeholder">
              {photoSrc ? (
                <Image
                  src={photoSrc}
                  alt="Three best friends memory"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 440px"
                  priority
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6">
                  <svg
                    width="48"
                    height="48"
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
                  <span className="font-handwritten text-base text-[#85866B] mt-2">
                    our favourite photo together
                  </span>
                </div>
              )}
            </div>

            {/* Polaroid caption */}
            <div className="pt-4 text-center">
              <p className="font-handwritten text-xl sm:text-2xl text-[#49372B] font-semibold">
                the three of us, always ♡
              </p>
              <p className="font-handwritten text-xs sm:text-sm text-[#85866B] mt-0.5">
                sealed in our memory scrapbook
              </p>
            </div>
          </div>
        </motion.div>

        {/* Birthday Greeting Heading */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F3EBDD] font-medium italic leading-tight mb-4">
            Happiee Birthday, <br className="sm:hidden" />
            <span className="text-[#C99B98]">Kavithaaa</span>
          </h2>

          <div className="flex items-center gap-4 justify-center my-6">
            <div className="h-px w-20 bg-[#C9B99A]/30" />
            <span className="font-handwritten text-2xl text-[#C99B98]">♡</span>
            <div className="h-px w-20 bg-[#C9B99A]/30" />
          </div>

          {/* Joint Message Keepsake Card */}
          <div className="max-w-2xl mx-auto p-8 sm:p-10 bg-[#F3EBDD]/8 border border-[#C9B99A]/20 backdrop-blur-xs rounded-sm relative shadow-xl">
            {/* Corner ornaments */}
            <span className="absolute top-3 left-3 font-handwritten text-sm text-[#C99B98] opacity-50">
              ✦
            </span>
            <span className="absolute top-3 right-3 font-handwritten text-sm text-[#C99B98] opacity-50">
              ✦
            </span>
            <span className="absolute bottom-3 left-3 font-handwritten text-sm text-[#C99B98] opacity-50">
              ✦
            </span>
            <span className="absolute bottom-3 right-3 font-handwritten text-sm text-[#C99B98] opacity-50">
              ✦
            </span>

            <p className="font-body text-[#E9DFC9] text-lg sm:text-xl italic leading-[1.9]">
              "Thank you for being the heart of our trio, the reason behind so many
              spontaneous laughs, and the person who makes every ordinary day feel
              like something worth holding onto. Here is to another year of shared
              dreams, endless chai, and unforgettable adventures."
            </p>
          </div>
        </motion.div>

        {/* Signatures Side by Side on Desktop */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-10 sm:gap-20 lg:gap-28 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {/* Yuvanshankar */}
          <div className="text-center -rotate-2">
            <p className="font-handwritten text-3xl sm:text-4xl text-[#C99B98] font-semibold leading-tight">
              Yuvanshankar
            </p>
            <p className="font-body text-xs sm:text-sm text-[#E9DFC9]/60 italic mt-1">
              always in your corner ♡
            </p>
          </div>

          <div className="hidden sm:block h-10 w-px bg-[#C9B99A]/25" />

          {/* Kaushalya */}
          <div className="text-center rotate-2">
            <p className="font-handwritten text-3xl sm:text-4xl text-[#C9B99A] font-semibold leading-tight">
              Kaushalya
            </p>
            <p className="font-body text-xs sm:text-sm text-[#E9DFC9]/60 italic mt-1">
              forever your partner in crime ✿
            </p>
          </div>
        </motion.div>

        {/* Closing Quote Banner */}
        <motion.div
          className="pt-6 border-t border-[#C9B99A]/20"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <p className="font-serif italic text-xl sm:text-2xl text-[#E9DFC9]/85 tracking-wide">
            "Here's to many more memories together."
          </p>
          <p className="font-handwritten text-sm text-[#C9B99A]/50 mt-4 tracking-widest uppercase">
            HAPPIEE BIRTHDAY KAVITHAAA · CRAFTED WITH LOVE
          </p>
        </motion.div>
      </div>
    </section>
  );
}
