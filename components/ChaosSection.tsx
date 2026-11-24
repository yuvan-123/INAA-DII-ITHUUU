"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Polaroid from "./Polaroid";
import UnfilteredArchives from "./UnfilteredArchives";
import { funnyMoments } from "@/data/memories";

export default function ChaosSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="our-chaos"
      ref={ref}
      className="relative py-24 sm:py-28 lg:py-32 bg-[#F3EBDD] overflow-hidden"
    >
      {/* Background paper texture */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Decorative vintage stamp */}
      <div className="absolute top-12 right-8 sm:right-16 stamp -rotate-6 select-none pointer-events-none">
        CERTIFIED CHAOS ✦ 100%
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-handwritten text-lg sm:text-xl text-[#85866B] mb-2 -rotate-1">
            chapter four ✦
          </p>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#49372B] font-medium italic leading-tight mb-4">
            Our Little <span className="text-[#803F49]">Chaos</span>
          </h2>

          <div className="flex items-center gap-4 justify-center mb-5">
            <div className="h-px w-16 bg-[#85866B]/35" />
            <span className="font-handwritten text-xl text-[#803F49]">✿</span>
            <div className="h-px w-16 bg-[#85866B]/35" />
          </div>

          <p className="font-body text-[#49372B]/85 text-base sm:text-lg italic leading-relaxed">
            The unscripted bits. The inside jokes. The candid snapshots and moments we
            will never let each other live down.
          </p>
        </motion.div>

        {/* Funny Polaroids: Centered row with generous spacing */}
        <div className="flex flex-wrap justify-center gap-8 sm:gap-10 lg:gap-14 mb-16 sm:mb-20">
          {funnyMoments.map((mem, i) => (
            <motion.div
              key={mem.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Polaroid
                memory={mem}
                tapeColor={
                  i === 0
                    ? "rgba(128, 63, 73, 0.65)"
                    : i === 1
                    ? "rgba(133, 134, 107, 0.6)"
                    : "rgba(201, 155, 152, 0.7)"
                }
              />
            </motion.div>
          ))}
        </div>

        {/* The Unfiltered Archives */}
        <UnfilteredArchives />
      </div>
    </section>
  );
}
