"use client";

import { motion } from "framer-motion";

export default function OurStory() {
  return (
    <section className="max-w-2xl mx-auto px-6 py-24">
      <motion.h1
        className="text-4xl md:text-5xl font-light mb-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Our Story
      </motion.h1>

      <motion.div
        className="space-y-6 text-charcoal/70 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <p>
          Add your story here.
        </p>
      </motion.div>
    </section>
  );
}
