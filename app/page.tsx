"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BirthdayGateway from "@/components/BirthdayGateway";
import ScrapbookNavigation from "@/components/ScrapbookNavigation";
import HeroScrapbook from "@/components/HeroScrapbook";
import PhotoGallery from "@/components/PhotoGallery";
import LetterSection from "@/components/LetterSection";
import MemoryNotes from "@/components/MemoryNotes";
import ChaosSection from "@/components/ChaosSection";
import FinalBirthdayPage from "@/components/FinalBirthdayPage";

export default function Home() {
  const [gatewayComplete, setGatewayComplete] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!gatewayComplete ? (
        <BirthdayGateway
          key="gateway"
          onComplete={() => setGatewayComplete(true)}
        />
      ) : (
        <motion.main
          key="birthday"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full bg-[#F3EBDD] min-h-screen text-[#382D27]"
        >
          <ScrapbookNavigation />
          <HeroScrapbook />
          <PhotoGallery />
          <LetterSection />
          <MemoryNotes />
          <ChaosSection />
          <FinalBirthdayPage />
        </motion.main>
      )}
    </AnimatePresence>
  );
}
