"use client";

import { motion } from "framer-motion";

type Rec = {
  category: string;
  items: { name: string; description: string }[];
};

const recommendations: Rec[] = [
  {
    category: "Restaurants",
    items: [
      { name: "Restaurant Name", description: "Short description." },
      { name: "Restaurant Name", description: "Short description." },
    ],
  },
  {
    category: "Bars & Coffee",
    items: [
      { name: "Bar / Café Name", description: "Short description." },
    ],
  },
  {
    category: "Sights & Activities",
    items: [
      { name: "Attraction Name", description: "Short description." },
    ],
  },
];

export default function ThingsToDo() {
  return (
    <section className="max-w-2xl mx-auto px-6 py-24">
      <motion.h1
        className="text-4xl md:text-5xl font-light mb-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Things to Do
      </motion.h1>

      <motion.p
        className="text-center text-charcoal/60 mb-14"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Our favorite spots — make a weekend of it.
      </motion.p>

      <div className="space-y-12">
        {recommendations.map((rec, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 * i + 0.3 }}
          >
            <h2 className="text-xs uppercase tracking-widest text-gold mb-4">
              {rec.category}
            </h2>
            <ul className="space-y-4">
              {rec.items.map((item, j) => (
                <li key={j} className="border-b border-charcoal/10 pb-4">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-charcoal/60 mt-0.5">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
