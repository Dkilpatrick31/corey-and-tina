"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center text-center px-6">
      <motion.p
        className="text-sm uppercase tracking-widest text-gold mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        We&apos;re getting married
      </motion.p>

      <motion.h1
        className="text-6xl md:text-8xl font-light mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Corey &amp; Tina
      </motion.h1>

      <motion.p
        className="text-xl md:text-2xl text-charcoal/60 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Month DD, YYYY
      </motion.p>

      <motion.p
        className="text-lg text-charcoal/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        City, State
      </motion.p>

      <motion.a
        href="/rsvp"
        className="mt-12 inline-block border border-charcoal px-10 py-3 text-sm uppercase tracking-widest hover:bg-charcoal hover:text-ivory transition-colors duration-300"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        RSVP
      </motion.a>
    </section>
  );
}
