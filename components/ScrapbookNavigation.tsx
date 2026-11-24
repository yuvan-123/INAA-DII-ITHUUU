"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "The Beginning", href: "#the-beginning", id: "the-beginning" },
  { label: "Three of Us", href: "#three-of-us", id: "three-of-us" },
  { label: "Letters", href: "#letters", id: "letters" },
  { label: "Little Things", href: "#little-things", id: "little-things" },
  { label: "Our Chaos", href: "#our-chaos", id: "our-chaos" },
  { label: "Forever Memories", href: "#forever-memories", id: "forever-memories" },
];

export default function ScrapbookNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("the-beginning");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Detect active section based on scroll position
      const scrollPosition = window.scrollY + 200;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(navItems[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#F3EBDD]/95 backdrop-blur-md shadow-[0_2px_16px_rgba(56,45,39,0.08)] border-b border-[#C9B99A]/40 py-3"
            : "bg-[#F3EBDD]/80 backdrop-blur-sm border-b border-[#C9B99A]/20 py-4 lg:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
          {/* Brand Logo / Wordmark */}
          <a
            href="#the-beginning"
            onClick={(e) => handleNavClick(e, "#the-beginning")}
            className="flex items-center gap-3 group text-decoration-none"
          >
            <span className="w-8 h-8 rounded-full bg-[#803F49]/10 text-[#803F49] flex items-center justify-center font-serif text-sm border border-[#803F49]/25 group-hover:rotate-12 transition-transform duration-300">
              ✦
            </span>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-medium tracking-wide text-[#49372B] italic">
                Happiee Birthday Kavithaaa
              </span>
              <span className="font-handwritten text-xs text-[#85866B] -mt-1 hidden sm:inline">
                scrapbook of three best friends
              </span>
            </div>
          </a>

          {/* Desktop Horizontal Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-3.5 py-1.5 text-sm lg:text-[15px] font-body tracking-wide transition-all duration-200 rounded-sm ${
                    isActive
                      ? "text-[#803F49] font-medium"
                      : "text-[#49372B]/75 hover:text-[#49372B] hover:bg-[#E9DFC9]/40"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#803F49]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-sm bg-[#E9DFC9]/60 border border-[#C9B99A]/50 text-[#49372B] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <span
              className={`w-5 h-[2px] bg-[#49372B] transition-transform duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-[5px]" : "mb-1"
              }`}
            />
            <span
              className={`w-5 h-[2px] bg-[#49372B] transition-opacity duration-300 ${
                mobileMenuOpen ? "opacity-0" : "mb-1"
              }`}
            />
            <span
              className={`w-5 h-[2px] bg-[#49372B] transition-transform duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-[5px]" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-[#382D27]/40 backdrop-blur-xs"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Paper Menu Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-0 right-0 bottom-0 w-72 bg-[#F3EBDD] border-l border-[#C9B99A] shadow-2xl p-8 pt-24 flex flex-col justify-between"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
              }}
            >
              <div>
                <p className="font-handwritten text-[#85866B] text-lg mb-6 border-b border-[#C9B99A]/40 pb-2">
                  Table of Contents ✦
                </p>
                <div className="flex flex-col gap-4">
                  {navItems.map((item, idx) => (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`text-lg font-serif italic transition-colors flex items-center justify-between ${
                        activeSection === item.id
                          ? "text-[#803F49] font-semibold"
                          : "text-[#49372B]/85 hover:text-[#803F49]"
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="font-handwritten text-xs text-[#85866B]">
                        ch. {idx + 1}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="text-center pt-6 border-t border-[#C9B99A]/40">
                <p className="font-handwritten text-sm text-[#85866B]">
                  made with love by your two best friends ♡
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
