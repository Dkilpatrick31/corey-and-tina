"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  attending: string;
  guests: string;
  dietary: string;
  song: string;
};

export default function RSVP() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    attending: "",
    guests: "1",
    dietary: "",
    song: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire up to a form backend (e.g. Formspree, Netlify Forms, or a custom API route)
    console.log(form);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="flex min-h-screen items-center justify-center px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-4xl font-light mb-4">Thank you!</p>
          <p className="text-charcoal/60">
            {form.attending === "yes"
              ? "We can't wait to celebrate with you."
              : "We'll miss you and appreciate you letting us know."}
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="max-w-lg mx-auto px-6 py-24">
      <motion.h1
        className="text-4xl md:text-5xl font-light mb-3 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        RSVP
      </motion.h1>

      <motion.p
        className="text-center text-charcoal/60 mb-12 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Kindly respond by Month DD, YYYY
      </motion.p>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div>
          <label className="block text-xs uppercase tracking-widest mb-2">
            Full Name *
          </label>
          <input
            required
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border-b border-charcoal/30 bg-transparent py-2 focus:outline-none focus:border-charcoal transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest mb-2">
            Email *
          </label>
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border-b border-charcoal/30 bg-transparent py-2 focus:outline-none focus:border-charcoal transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest mb-3">
            Will you be attending? *
          </label>
          <div className="flex gap-6">
            {["yes", "no"].map((val) => (
              <label key={val} className="flex items-center gap-2 cursor-pointer">
                <input
                  required
                  type="radio"
                  name="attending"
                  value={val}
                  checked={form.attending === val}
                  onChange={handleChange}
                  className="accent-charcoal"
                />
                <span className="text-sm capitalize">
                  {val === "yes" ? "Joyfully accepts" : "Regretfully declines"}
                </span>
              </label>
            ))}
          </div>
        </div>

        {form.attending === "yes" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <label className="block text-xs uppercase tracking-widest mb-2">
              Number of Guests
            </label>
            <select
              name="guests"
              value={form.guests}
              onChange={handleChange}
              className="w-full border-b border-charcoal/30 bg-transparent py-2 focus:outline-none focus:border-charcoal transition-colors"
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </motion.div>
        )}

        <div>
          <label className="block text-xs uppercase tracking-widest mb-2">
            Dietary Restrictions
          </label>
          <input
            type="text"
            name="dietary"
            value={form.dietary}
            onChange={handleChange}
            placeholder="None"
            className="w-full border-b border-charcoal/30 bg-transparent py-2 focus:outline-none focus:border-charcoal transition-colors placeholder:text-charcoal/30"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest mb-2">
            Song Request
          </label>
          <input
            type="text"
            name="song"
            value={form.song}
            onChange={handleChange}
            placeholder="What will get you on the dance floor?"
            className="w-full border-b border-charcoal/30 bg-transparent py-2 focus:outline-none focus:border-charcoal transition-colors placeholder:text-charcoal/30"
          />
        </div>

        <button
          type="submit"
          className="w-full border border-charcoal py-3 text-sm uppercase tracking-widest hover:bg-charcoal hover:text-ivory transition-colors duration-300 mt-4"
        >
          Submit
        </button>
      </motion.form>
    </section>
  );
}
