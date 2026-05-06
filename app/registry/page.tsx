"use client";

import { motion } from "framer-motion";

type Registry = {
  name: string;
  description: string;
  link: string;
};

const registries: Registry[] = [
  {
    name: "Zola",
    description: "Our main registry for home and experiences.",
    link: "#",
  },
  {
    name: "Honeymoon Fund",
    description: "Contribute to our honeymoon adventure.",
    link: "#",
  },
];

export default function Registry() {
  return (
    <section className="max-w-xl mx-auto px-6 py-24 text-center">
      <motion.h1
        className="text-4xl md:text-5xl font-light mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Registry
      </motion.h1>

      <motion.p
        className="text-charcoal/60 mb-14 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Your presence is the greatest gift. If you would like to celebrate us
        with something more, here is where you can find our wish lists.
      </motion.p>

      <div className="space-y-4">
        {registries.map((reg, i) => (
          <motion.a
            key={i}
            href={reg.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 border border-charcoal/10 hover:border-charcoal/30 transition-colors duration-300 text-left"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i + 0.3 }}
          >
            <p className="font-medium mb-1">{reg.name}</p>
            <p className="text-sm text-charcoal/60">{reg.description}</p>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
