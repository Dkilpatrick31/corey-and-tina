"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/our-story", label: "Our Story" },
  { href: "/wedding-weekend", label: "Wedding Weekend" },
  { href: "/travel", label: "Travel" },
  { href: "/things-to-do", label: "Things to Do" },
  { href: "/faq", label: "FAQ" },
  { href: "/registry", label: "Registry" },
  { href: "/rsvp", label: "RSVP" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-ivory/90 backdrop-blur-sm border-b border-charcoal/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm uppercase tracking-widest font-medium"
          onClick={() => setOpen(false)}
        >
          C &amp; T
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-xs uppercase tracking-widest transition-colors duration-200 ${
                pathname === href
                  ? "text-charcoal"
                  : "text-charcoal/50 hover:text-charcoal"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-px bg-charcoal transition-transform duration-300 ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block w-5 h-px bg-charcoal transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-px bg-charcoal transition-transform duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
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
                <Link
                  key={href}
                  href={href}
                  className={`text-xs uppercase tracking-widest ${
                    pathname === href ? "text-charcoal" : "text-charcoal/50"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
