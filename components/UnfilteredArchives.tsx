"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { DEFAULT_POLAROID_IMAGES, VINTAGE_CAPTIONS } from "@/data/polaroidManifest";

interface DisplayPhoto {
  id: string;
  src: string;
  caption: string;
  rotation: number;
  tapeColor: string;
  tapeRotation: number;
  aspect: "aspect-[4/5]" | "aspect-[1/1]" | "aspect-[3/4]";
}

const TAPE_COLORS = [
  "rgba(128, 63, 73, 0.65)", // Burgundy
  "rgba(133, 134, 107, 0.6)",  // Olive
  "rgba(201, 155, 152, 0.7)", // Dusty rose
  "rgba(73, 55, 43, 0.55)",   // Dark brown
  "rgba(201, 185, 154, 0.65)", // Tan
];

const ROTATIONS = [-3.2, 2.1, -1.8, 3.4, -2.5, 1.6, -3.0, 2.7, -1.2, 3.1, -2.2, 1.9];
const ASPECTS: ("aspect-[4/5]" | "aspect-[1/1]" | "aspect-[3/4]")[] = [
  "aspect-[4/5]",
  "aspect-[1/1]",
  "aspect-[4/5]",
  "aspect-[3/4]",
];

// Shuffle helper (Fisher-Yates)
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function UnfilteredArchives() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [mounted, setMounted] = useState(false);
  const [allAvailableImages, setAllAvailableImages] = useState<string[]>(DEFAULT_POLAROID_IMAGES);
  const [displayedPhotos, setDisplayedPhotos] = useState<DisplayPhoto[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Helper to build a randomized selection of 10-12 photos
  const generateRandomSelection = useCallback((images: string[]) => {
    if (images.length === 0) {
      setDisplayedPhotos([]);
      return;
    }

    // Shuffle the full pool
    const shuffled = shuffleArray(images);

    // Pick between 10 to 12 distinct photos, or all if fewer available
    const countToPick = Math.min(shuffled.length, Math.max(8, Math.min(12, shuffled.length)));
    const selected = shuffled.slice(0, countToPick);

    // Also shuffle captions
    const shuffledCaptions = shuffleArray(VINTAGE_CAPTIONS);

    const mapped: DisplayPhoto[] = selected.map((src, idx) => ({
      id: `archive-${idx}-${src}`,
      src,
      caption: shuffledCaptions[idx % shuffledCaptions.length],
      rotation: ROTATIONS[idx % ROTATIONS.length],
      tapeColor: TAPE_COLORS[idx % TAPE_COLORS.length],
      tapeRotation: (idx % 2 === 0 ? 1 : -1) * (1.5 + (idx % 3)),
      aspect: ASPECTS[idx % ASPECTS.length],
    }));

    setDisplayedPhotos(mapped);
  }, []);

  // Fetch live images on client mount and randomize
  useEffect(() => {
    setMounted(true);

    async function loadImages() {
      try {
        const res = await fetch("/api/polaroids");
        if (res.ok) {
          const data = await res.json();
          if (data.images && Array.isArray(data.images) && data.images.length > 0) {
            setAllAvailableImages(data.images);
            generateRandomSelection(data.images);
            return;
          }
        }
      } catch (e) {
        console.warn("Using fallback polaroid manifest:", e);
      }
      // Fallback to static manifest if API is slow or offline
      generateRandomSelection(DEFAULT_POLAROID_IMAGES);
    }

    loadImages();
  }, [generateRandomSelection]);

  // Keyboard navigation for Lightbox
  const handlePrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? displayedPhotos.length - 1 : prev - 1;
    });
  }, [displayedPhotos.length]);

  const handleNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === displayedPhotos.length - 1 ? 0 : prev + 1;
    });
  }, [displayedPhotos.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, handlePrev, handleNext]);

  return (
    <div ref={ref} className="mt-16 sm:mt-20">
      {/* Section Header */}
      <motion.div
        className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="font-handwritten text-lg sm:text-xl text-[#85866B] mb-2 inline-block -rotate-1">
          vault dispatch · polaroid collection ✦
        </span>

        <h3 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl text-[#49372B] font-medium leading-tight mb-3">
          The Unfiltered <span className="text-[#803F49]">Archives</span>
        </h3>

        <p className="font-body text-[#49372B]/85 text-base sm:text-lg italic leading-relaxed">
          Random pictures, candid moments and photographs from our gallery.
        </p>

        <div className="flex items-center gap-4 justify-center mt-5">
          <div className="h-px w-16 bg-[#85866B]/35" />
          <span className="font-handwritten text-xl text-[#803F49]">✦</span>
          <div className="h-px w-16 bg-[#85866B]/35" />
        </div>

        {/* Shuffle Button on demand */}
        {mounted && allAvailableImages.length > 0 && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => generateRandomSelection(allAvailableImages)}
              className="inline-flex items-center gap-2 font-handwritten text-base sm:text-lg text-[#49372B] bg-[#E9DFC9] hover:bg-[#F8F3EA] border border-[#C9B99A] hover:border-[#803F49] px-4 py-1.5 rounded-xs shadow-xs hover:shadow-md transition-all cursor-pointer"
              title="Shuffle a new set of memories from the vault"
            >
              <Sparkles size={16} className="text-[#803F49]" />
              <span>shuffle the archives</span>
              <span className="text-xs font-serif opacity-60">
                ({allAvailableImages.length} available)
              </span>
            </button>
          </div>
        )}
      </motion.div>

      {/* Gallery Grid */}
      {!mounted ? (
        // Initial SSR skeleton to avoid hydration mismatch
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto px-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white p-3 pb-8 rounded-[2px] shadow-sm border border-neutral-100 opacity-60 animate-pulse"
            >
              <div className="w-full aspect-[4/5] bg-[#E9DFC9]" />
              <div className="h-4 bg-[#E9DFC9] mt-3 mx-auto w-3/4 rounded-xs" />
            </div>
          ))}
        </div>
      ) : displayedPhotos.length === 0 ? (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-md mx-auto text-center p-8 bg-[#E9DFC9] border border-[#C9B99A] rounded-sm shadow-sm"
        >
          <span className="text-4xl select-none block mb-3">🎞️</span>
          <p className="font-serif text-xl text-[#49372B] italic mb-1">
            The Archive Vault is Empty
          </p>
          <p className="font-handwritten text-base text-[#85866B]">
            Add photographs into the &ldquo;images/poloroid&rdquo; folder to see your candid memories scattered here ✦
          </p>
        </motion.div>
      ) : (
        /* Multi-column scattered polaroid album */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 sm:gap-8 lg:gap-10 items-start max-w-7xl mx-auto px-2 sm:px-4">
          {displayedPhotos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: Math.min(i * 0.08, 0.8) }}
              className="flex justify-center w-full"
            >
              <div
                onClick={() => setLightboxIndex(i)}
                style={{
                  transform: `rotate(${photo.rotation}deg)`,
                  transformOrigin: "center center",
                }}
                className="relative inline-block w-full max-w-[280px] sm:max-w-[300px] cursor-pointer select-none group transition-all duration-300 hover:rotate-0 hover:scale-[1.03] hover:z-20"
              >
                {/* Washi tape strip on top */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-5 z-20 shadow-xs pointer-events-none opacity-85 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: photo.tapeColor,
                    transform: `translateX(-50%) rotate(${photo.tapeRotation}deg)`,
                  }}
                />

                {/* White Polaroid frame with vintage paper textures */}
                <div className="bg-white p-3 sm:p-3.5 pb-6 sm:pb-8 shadow-[0_6px_20px_rgba(56,45,39,0.12)] group-hover:shadow-[0_14px_32px_rgba(56,45,39,0.22)] border border-neutral-100/90 rounded-[2px] transition-shadow">
                  {/* Photo area */}
                  <div
                    className={`relative w-full ${photo.aspect} bg-[#E9DFC9] overflow-hidden rounded-[1px]`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.caption}
                      fill
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
                      loading="lazy"
                    />
                  </div>

                  {/* Handwritten caption */}
                  <div className="pt-3 text-center px-1">
                    <p className="font-handwritten text-[#49372B] text-base sm:text-lg leading-tight">
                      &ldquo;{photo.caption}&rdquo;
                    </p>
                    <span className="font-serif text-[10px] uppercase tracking-widest text-[#85866B]/70 block mt-1">
                      archive #{i + 1}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Interactive Lightbox View */}
      <AnimatePresence>
        {lightboxIndex !== null && displayedPhotos[lightboxIndex] && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8"
            style={{
              background: "rgba(56, 45, 39, 0.88)",
              backdropFilter: "blur(6px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            {/* Modal Card */}
            <motion.div
              style={{
                background: "white",
                maxWidth: "94vw",
                maxHeight: "92vh",
              }}
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative p-4 sm:p-6 pb-6 sm:pb-8 shadow-2xl border border-neutral-100 rounded-[2px] flex flex-col items-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-3 right-3 z-30 bg-[#49372B]/10 hover:bg-[#803F49] hover:text-white text-[#49372B] p-2 rounded-full transition-colors cursor-pointer"
                aria-label="Close photo"
              >
                <X size={20} />
              </button>

              {/* Large Image Box */}
              <div
                style={{
                  width: "min(560px, 86vw)",
                  height: "min(620px, 66vh)",
                  background: "#F3EBDD",
                }}
                className="relative overflow-hidden rounded-[2px]"
              >
                <Image
                  src={displayedPhotos[lightboxIndex].src}
                  alt={displayedPhotos[lightboxIndex].caption}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 90vw, 560px"
                  priority
                />
              </div>

              {/* Caption & Counter */}
              <div className="mt-4 text-center max-w-md w-full px-2">
                <p className="font-handwritten text-[#49372B] text-xl sm:text-2xl font-semibold">
                  &ldquo;{displayedPhotos[lightboxIndex].caption}&rdquo;
                </p>
                <p className="font-serif text-xs text-[#85866B] uppercase tracking-wider mt-1">
                  archive {lightboxIndex + 1} of {displayedPhotos.length}
                </p>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between w-full mt-4 pt-3 border-t border-[#C9B99A]/30">
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-1 font-handwritten text-base sm:text-lg text-[#49372B] hover:text-[#803F49] px-3 py-1 rounded-sm border border-[#C9B99A]/40 hover:border-[#803F49] transition-colors cursor-pointer"
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={18} />
                  <span>Previous</span>
                </button>

                <span className="font-handwritten text-xs text-[#85866B]">
                  ← use arrow keys →
                </span>

                <button
                  onClick={handleNext}
                  className="flex items-center gap-1 font-handwritten text-base sm:text-lg text-[#49372B] hover:text-[#803F49] px-3 py-1 rounded-sm border border-[#C9B99A]/40 hover:border-[#803F49] transition-colors cursor-pointer"
                  aria-label="Next photo"
                >
                  <span>Next</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
