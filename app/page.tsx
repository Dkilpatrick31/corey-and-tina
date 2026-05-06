"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <Image
          src="/images/hotel-peter-and-paul-entrance-door.jpeg"
          alt="Hotel Peter and Paul entrance"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 px-6">
          <motion.h1
            className="font-script text-7xl md:text-9xl text-white leading-none"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          >
            Christina &amp; Corey
          </motion.h1>

          <motion.p
            className="mt-8 text-[0.65rem] md:text-xs text-white/85 tracking-[0.35em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          >
            April 3, 2027&nbsp;&nbsp;&middot;&nbsp;&nbsp;Hotel Peter and
            Paul&nbsp;&nbsp;&middot;&nbsp;&nbsp;New Orleans, Louisiana
          </motion.p>
        </div>
      </section>

      {/* WELCOME */}
      <section className="bg-[#2C3E2D] py-28 px-6 flex items-center justify-center">
        <motion.p
          className="max-w-2xl text-center text-xl md:text-2xl text-white/90 font-light italic leading-relaxed"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          We&apos;re so excited to celebrate our wedding weekend in New
          Orleans—a place that holds so much meaning to us—surrounded by the
          people we love most.
        </motion.p>
      </section>

      {/* OUR STORY PREVIEW */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            className="relative aspect-[3/4] overflow-hidden"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <Image
              src="/images/french-quarter-ironwork-balconies-ferns.jpeg"
              alt="French Quarter ironwork balconies with hanging ferns"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          >
            <p className="text-xs uppercase tracking-widest text-gold mb-6">
              Our Story
            </p>
            <h2 className="font-script text-5xl md:text-6xl text-charcoal leading-tight mb-8">
              How It All Began
            </h2>
            <p className="text-charcoal/70 leading-relaxed text-lg">
              We met at a music festival while traveling, and from the start, it
              felt like something we were meant to find.
            </p>
            <Link
              href="/our-story"
              className="mt-10 inline-block text-xs uppercase tracking-widest border-b border-charcoal pb-0.5 hover:text-gold hover:border-gold transition-colors duration-300"
            >
              Read Our Story
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
