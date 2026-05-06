"use client";

import { motion } from "framer-motion";

type Event = {
  day: string;
  time: string;
  title: string;
  location: string;
  description: string;
};

const events: Event[] = [
  {
    day: "Friday",
    time: "7:00 PM",
    title: "Welcome Drinks",
    location: "Venue Name",
    description: "Kick off the weekend with cocktails and good company.",
  },
  {
    day: "Saturday",
    time: "5:00 PM",
    title: "Ceremony",
    location: "Ceremony Venue",
    description: "The main event.",
  },
  {
    day: "Saturday",
    time: "6:00 PM",
    title: "Reception",
    location: "Reception Venue",
    description: "Dinner, dancing, and celebration.",
  },
  {
    day: "Sunday",
    time: "11:00 AM",
    title: "Farewell Brunch",
    location: "TBD",
    description: "One last morning together before we all head home.",
  },
];

export default function WeddingWeekend() {
  return (
    <section className="max-w-2xl mx-auto px-6 py-24">
      <motion.h1
        className="text-4xl md:text-5xl font-light mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Wedding Weekend
      </motion.h1>

      <div className="space-y-10">
        {events.map((event, i) => (
          <motion.div
            key={i}
            className="border-l-2 border-gold pl-6"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * i + 0.2 }}
          >
            <p className="text-xs uppercase tracking-widest text-gold mb-1">
              {event.day} &bull; {event.time}
            </p>
            <h2 className="text-xl font-medium mb-1">{event.title}</h2>
            <p className="text-sm text-charcoal/60 mb-2">{event.location}</p>
            <p className="text-charcoal/70 text-sm leading-relaxed">
              {event.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
