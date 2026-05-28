"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#our-story", label: "Our Story" },
  { href: "#wedding-weekend", label: "Wedding Weekend" },
  { href: "#what-to-wear", label: "What to Wear" },
  { href: "#travel", label: "Where to Stay" },
  { href: "#things-to-do", label: "Things to Do" },
  { href: "#faq", label: "FAQ" },
  { href: "#rsvp", label: "RSVP" },
  { href: "#registry", label: "Registry" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onHero = pathname === "/" && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        onHero
          ? "bg-transparent border-b border-white/10"
          : "bg-ivory/90 backdrop-blur-sm border-b border-charcoal/10"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="#"
          className={`font-script text-3xl transition-colors duration-500 ${
            onHero ? "text-white" : "text-charcoal"
          }`}
          onClick={() => setOpen(false)}
        >
          C &amp; C
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={`font-body text-[10px] uppercase tracking-widest transition-colors duration-300 ${
                onHero
                  ? "text-white/70 hover:text-white"
                  : "text-charcoal/50 hover:text-charcoal"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block w-5 h-px transition-all duration-300 ${
                onHero ? "bg-white" : "bg-charcoal"
              } ${
                i === 0 && open
                  ? "translate-y-2 rotate-45"
                  : i === 1 && open
                  ? "opacity-0"
                  : i === 2 && open
                  ? "-translate-y-2 -rotate-45"
                  : ""
              }`}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            className="md:hidden bg-ivory border-t border-charcoal/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="px-6 py-4 flex flex-col gap-5">
              {links.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="font-body text-xs uppercase tracking-widest text-charcoal/60 hover:text-charcoal transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
