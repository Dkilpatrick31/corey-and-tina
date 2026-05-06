"use client";

import { motion } from "framer-motion";

type Hotel = {
  name: string;
  distance: string;
  rate: string;
  code: string;
  deadline: string;
  link: string;
};

const hotels: Hotel[] = [
  {
    name: "Hotel Name",
    distance: "0.5 miles from venue",
    rate: "$XXX / night",
    code: "COREYANDTINA",
    deadline: "Month DD, YYYY",
    link: "#",
  },
];

export default function Travel() {
  return (
    <section className="max-w-2xl mx-auto px-6 py-24">
      <motion.h1
        className="text-4xl md:text-5xl font-light mb-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Travel
      </motion.h1>

      <motion.p
        className="text-center text-charcoal/60 mb-14"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Everything you need to get here and settle in.
      </motion.p>

      <motion.h2
        className="text-xl font-medium mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Hotel Blocks
      </motion.h2>

      <div className="space-y-6 mb-14">
        {hotels.map((hotel, i) => (
          <motion.div
            key={i}
            className="p-6 border border-charcoal/10 bg-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i + 0.4 }}
          >
            <h3 className="text-lg font-medium mb-1">{hotel.name}</h3>
            <p className="text-sm text-charcoal/60 mb-3">{hotel.distance}</p>
            <p className="text-sm mb-1">
              <span className="font-medium">Rate:</span> {hotel.rate}
            </p>
            <p className="text-sm mb-1">
              <span className="font-medium">Code:</span>{" "}
              <code className="bg-charcoal/5 px-1 py-0.5 rounded text-xs">
                {hotel.code}
              </code>
            </p>
            <p className="text-sm mb-4">
              <span className="font-medium">Book by:</span> {hotel.deadline}
            </p>
            <a
              href={hotel.link}
              className="text-sm uppercase tracking-widest border border-charcoal px-6 py-2 hover:bg-charcoal hover:text-ivory transition-colors duration-300 inline-block"
            >
              Reserve
            </a>
          </motion.div>
        ))}
      </div>

      <motion.h2
        className="text-xl font-medium mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Getting Here
      </motion.h2>
      <motion.div
        className="text-charcoal/70 leading-relaxed space-y-3 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <p>
          <span className="font-medium">By Air:</span> Add airport info here.
        </p>
        <p>
          <span className="font-medium">By Car:</span> Add driving directions here.
        </p>
        <p>
          <span className="font-medium">Parking:</span> Add parking info here.
        </p>
      </motion.div>
    </section>
  );
}
