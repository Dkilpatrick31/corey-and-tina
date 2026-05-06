"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type FAQ = { q: string; a: string };

const faqs: FAQ[] = [
  {
    q: "What is the dress code?",
    a: "Black tie optional. We encourage guests to dress up and celebrate with us.",
  },
  {
    q: "Are children welcome?",
    a: "We love your little ones! Please indicate on your RSVP if you plan to bring children.",
  },
  {
    q: "Will there be transportation between the hotel and venue?",
    a: "Yes — shuttle details will be shared closer to the date.",
  },
  {
    q: "Can I take photos during the ceremony?",
    a: "We are having an unplugged ceremony. Please enjoy the moment and let our photographer capture it.",
  },
  {
    q: "What if I have dietary restrictions?",
    a: "Please note any dietary needs on your RSVP and we will make sure you are taken care of.",
  },
];

function FAQItem({ faq, index }: { faq: FAQ; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="border-b border-charcoal/10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 + 0.2 }}
    >
      <button
        className="w-full flex justify-between items-center py-5 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium pr-4">{faq.q}</span>
        <span className="text-gold text-xl flex-shrink-0">
          {open ? "−" : "+"}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.p
            className="pb-5 text-sm text-charcoal/70 leading-relaxed"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            {faq.a}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section className="max-w-2xl mx-auto px-6 py-24">
      <motion.h1
        className="text-4xl md:text-5xl font-light mb-14 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        FAQ
      </motion.h1>

      <div>
        {faqs.map((faq, i) => (
          <FAQItem key={i} faq={faq} index={i} />
        ))}
      </div>
    </section>
  );
}
