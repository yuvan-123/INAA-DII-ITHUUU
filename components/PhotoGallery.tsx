"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Polaroid from "./Polaroid";
import { memories } from "@/data/memories";

const tapeColors = [
  "rgba(201, 155, 152, 0.7)", // dusty rose
  "rgba(133, 134, 107, 0.65)", // olive
  "rgba(201, 185, 154, 0.75)", // tan
  "rgba(128, 63, 73, 0.55)",  // burgundy tint
];

export default function PhotoGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="three-of-us"
      className="relative py-24 sm:py-28 lg:py-32 bg-[#E9DFC9] overflow-hidden"
    >
      {/* Top torn paper transition */}
      <div
        className="absolute top-0 left-0 right-0 h-6 sm:h-8 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 24' preserveAspectRatio='none'%3E%3Cpath d='M0,0 C50,20 100,5 150,15 C200,25 250,8 300,18 C350,28 400,10 450,20 C500,30 550,8 600,18 C650,28 700,6 750,16 C800,26 850,8 900,18 C950,28 1000,10 1050,20 C1100,30 1150,8 1200,0 L1200,24 L0,24 Z' fill='%23F3EBDD'/%3E%3C/svg%3E\")",
          backgroundSize: "100% 100%",
        }}
      />

      {/* Decorative ambient background doodles */}
      <span className="absolute top-20 right-10 text-[#85866B]/15 text-8xl font-handwritten select-none pointer-events-none rotate-12">
        ✦
      </span>
      <span className="absolute bottom-16 left-8 text-[#803F49]/10 text-9xl font-handwritten select-none pointer-events-none -rotate-12">
        ✿
      </span>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-handwritten text-lg sm:text-xl text-[#85866B] mb-2 -rotate-1">
            chapter one ✦
          </p>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#49372B] font-medium italic leading-tight mb-4">
            Three of Us
          </h2>

          <div className="flex items-center gap-4 justify-center mb-5">
            <div className="h-px w-16 bg-[#85866B]/35" />
            <span className="font-handwritten text-xl text-[#803F49]">✿</span>
            <div className="h-px w-16 bg-[#85866B]/35" />
          </div>

          <p className="font-body text-[#49372B]/85 text-base sm:text-lg italic leading-relaxed">
            A scrapbook of us — moments big and small, candid and planned, silly and
            sweet. Click any photo to open its story.
          </p>
        </motion.div>

        {/* Polaroid Scrapbook Grid: Balanced 4-Column on Desktop (1440px - 1920px) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-10 items-start justify-items-center">
          {memories.map((mem, idx) => (
            <motion.div
              key={mem.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              className="w-full flex justify-center"
            >
              <Polaroid
                memory={mem}
                tapeColor={tapeColors[idx % tapeColors.length]}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom Annotation */}
        <motion.p
          className="text-center mt-16 font-handwritten text-base sm:text-lg text-[#85866B]/75"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.8 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          click any Polaroid to see the full photo & personal note ↗
        </motion.p>
      </div>

      {/* Bottom torn paper transition */}
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
