"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Stamp geometry ───────────────────────────────────────────────────────────
const SW = 96, SH = 128, PR = 4, PS = 10, PM = 5;
const PERFS: [number, number][] = [];
for (let x = PM; x <= SW - PM; x += PS) {
  PERFS.push([x, PM], [x, SH - PM]);
}
for (let y = PM + PS; y < SH - PM; y += PS) {
  PERFS.push([PM, y], [SW - PM, y]);
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const HOTELS = [
  {
    name: "Hotel Peter and Paul",
    url: "https://hotelpeterandpaul.com",
    details: [
      "Ceremony & reception venue",
      "Located in the Marigny, just outside the French Quarter",
      "~15–20 min walk to French Quarter",
      "Beautifully restored historic church turned boutique hotel",
      "Room block coming soon",
    ],
  },
  {
    name: "The Frenchmen Hotel",
    url: "https://thefrenchmenhotel.com",
    details: [
      "~2 min walk to Hotel Peter and Paul",
      "Boutique, intimate hotel",
      "Steps from Frenchmen Street",
    ],
  },
  {
    name: "Hotel Provincial",
    url: "https://hotelprovincial.com",
    details: [
      "Located in the French Quarter",
      "~5–10 min walk to Bourbon Street",
      "Classic French Quarter hotel with charming courtyards",
    ],
  },
  {
    name: "Hampton Inn New Orleans French Quarter",
    url: "https://www.hilton.com/en/hotels/msyhxhx-hampton-new-orleans-french-quarter-market-area/",
    details: [
      "~5 min drive to venue",
      "Clean, comfortable, reliable",
      "Includes breakfast",
    ],
  },
];

const FAQS = [
  {
    q: "When should I RSVP by?",
    a: "You can RSVP now — details will be shared with your formal invitation as well.",
  },
  {
    q: "What is the dress code?",
    a: "Formal attire. We recommend light fabrics for the New Orleans weather and comfortable shoes for walking around the city.",
  },
  {
    q: "Where should I stay?",
    a: "We recommend staying at Hotel Peter and Paul or nearby in the French Quarter or Marigny. See the Where to Stay section for details.",
  },
  {
    q: "How do I get around?",
    a: "Uber, Lyft and walking are the easiest ways to get around the city.",
  },
  {
    q: "What will the weather be like?",
    a: "Early April in New Orleans is typically warm and slightly humid, especially in the evenings.",
  },
  {
    q: "Are children invited?",
    a: "We kindly ask that only children listed on the invitation attend our wedding weekend.",
  },
  {
    q: "Can I bring a plus one?",
    a: "Due to limited space, we are only able to accommodate guests listed on the invitation.",
  },
  {
    q: "Will there be transportation?",
    a: "Transportation to and from the airport will not be provided. We recommend Uber or Lyft — convenient and easy in New Orleans.",
  },
  {
    q: "What time should I arrive?",
    a: "Guest arrival 5:00 PM, ceremony starts 5:30 PM. Please arrive 15–20 minutes early.",
  },
];

// ─── Shared helpers ───────────────────────────────────────────────────────────
const inView = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: "easeOut" } },
};
const vp = { once: true, margin: "-70px" as const };

const inputCls =
  "w-full bg-transparent border-b border-[#faf9f6]/30 py-2.5 text-[#faf9f6] " +
  "placeholder-[#faf9f6]/35 font-cormorant text-lg outline-none " +
  "focus:border-[#faf9f6]/60 transition-colors duration-200";

function RadioBtn({
  name,
  value,
  label,
}: {
  name: string;
  value: string;
  label: string;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input type="radio" name={name} value={value} className="peer sr-only" />
      <span className="w-4 h-4 rounded-full border border-[#faf9f6]/40 flex-shrink-0 transition-colors peer-checked:border-gold peer-checked:bg-gold/25" />
      <span className="font-cormorant text-lg text-[#faf9f6]/70 transition-colors peer-checked:text-[#faf9f6]">
        {label}
      </span>
    </label>
  );
}

// ─── Floral vine ─────────────────────────────────────────────────────────────
function FloralVine() {
  const heights = [55, 120, 185, 250, 315, 380, 445];
  return (
    <svg width="48" height="500" viewBox="0 0 48 500" fill="none" aria-hidden="true">
      <path
        d="M 24 0 C 19 70 29 140 24 210 C 19 280 29 350 24 420 C 19 460 29 490 24 500"
        stroke="rgba(250,249,246,0.22)"
        strokeWidth="1.5"
      />
      {heights.map((y, i) => {
        const left = i % 2 === 0;
        return (
          <ellipse
            key={y}
            cx={left ? 11 : 37}
            cy={y}
            rx={13}
            ry={5}
            fill="rgba(250,249,246,0.17)"
            transform={`rotate(${left ? -38 : 38} ${left ? 11 : 37} ${y})`}
          />
        );
      })}
      <circle cx="24" cy="14" r="3" fill="rgba(250,249,246,0.22)" />
      <circle cx="24" cy="486" r="3" fill="rgba(250,249,246,0.22)" />
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════ HERO ══ */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <Image
          src="/images/louisiana-bayou-spanish-moss.jpeg"
          alt="Louisiana bayou with Spanish moss"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Postage stamp – top right */}
        <div className="absolute top-5 right-5 z-20 flex items-center gap-2 select-none">
          <svg width="46" height={SH} viewBox={`0 0 46 ${SH}`} fill="none" aria-hidden="true">
            {Array.from({ length: 7 }, (_, i) => {
              const y = 9 + i * 17;
              return (
                <path
                  key={i}
                  d={`M 0 ${y} C 11 ${y - 7} 23 ${y + 7} 34 ${y} S 46 ${y - 7} 46 ${y}`}
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth="1.5"
                />
              );
            })}
          </svg>
          <svg width={SW} height={SH} viewBox={`0 0 ${SW} ${SH}`}>
            <defs>
              <mask id="stamp-mask">
                <rect width={SW} height={SH} fill="white" />
                {PERFS.map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r={PR} fill="black" />
                ))}
              </mask>
              <clipPath id="stamp-img-clip">
                <rect x={10} y={10} width={SW - 20} height={SH - 26} />
              </clipPath>
            </defs>
            <rect width={SW} height={SH} fill="#faf9f6" mask="url(#stamp-mask)" />
            <image
              href="/images/hotel-peter-and-paul-entrance-door.jpeg"
              x={10} y={10}
              width={SW - 20}
              height={SH - 26}
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#stamp-img-clip)"
            />
            <text
              x={SW / 2} y={SH - 6}
              textAnchor="middle"
              fontSize="6"
              fill="#3c3c3c"
              fontFamily="sans-serif"
              letterSpacing="2"
            >
              NEW ORLEANS
            </text>
          </svg>
        </div>

        {/* Hero copy */}
        <div className="relative z-10 px-6 max-w-3xl w-full">
          <motion.h1
            className="font-script text-8xl md:text-[10rem] text-[#faf9f6] leading-none mb-6"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          >
            Christina &amp; Corey
          </motion.h1>
          <motion.p
            className="font-cormorant text-[0.65rem] md:text-xs text-[#faf9f6]/80 tracking-[0.4em] uppercase mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.25 }}
          >
            April 3, 2027&nbsp;&nbsp;&middot;&nbsp;&nbsp;Hotel Peter and
            Paul&nbsp;&nbsp;&middot;&nbsp;&nbsp;New Orleans, Louisiana
          </motion.p>
          <motion.p
            className="font-cormorant italic text-lg md:text-xl text-[#faf9f6]/80 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.45 }}
          >
            We&apos;re so excited to celebrate our wedding weekend in New
            Orleans—a place that holds so much meaning to us—surrounded by the
            people we love most. It means everything to have you there as we
            begin this next chapter.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════════ OUR LOVE STORY ══ */}
      <section id="our-story" className="bg-[#2C3E2D] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-center font-cormorant text-4xl md:text-5xl tracking-[0.25em] uppercase text-[#faf9f6] mb-16"
            initial="hidden" whileInView="show" viewport={vp} variants={inView}
          >
            Our Love Story
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
            <motion.div
              className="order-2 md:order-1"
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={vp}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <div className="font-cormorant italic text-xl md:text-2xl text-[#faf9f6]/80 leading-relaxed space-y-7">
                <p>We met at a music festival while traveling, and from the start, it felt like something we were meant to find.</p>
                <p>After some time spent long distance and traveling back and forth, we eventually made our way to Dallas and built a life together there.</p>
                <p>Over time, we&apos;ve created something that feels steady, fun, and truly our own.</p>
                <p>We&apos;re so excited to celebrate this next chapter with all of you.</p>
              </div>
            </motion.div>
            <motion.div
              className="order-1 md:order-2"
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={vp}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
            >
              <div className="relative p-[10px] border border-[#faf9f6]/25">
                <div className="relative aspect-[2/3] overflow-hidden">
                  <Image
                    src="/images/couple-joshua-tree-golden-hour.jpeg"
                    alt="Christina and Corey at Joshua Tree"
                    fill className="object-cover"
                  />
                </div>
                <div className="absolute inset-[4px] border border-[#faf9f6]/10 pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ WEDDING WEEKEND ══ */}
      <section id="wedding-weekend" className="bg-[#2C3E2D] py-24 px-6 border-t border-[#faf9f6]/10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-center font-cormorant text-4xl md:text-5xl tracking-[0.25em] uppercase text-[#faf9f6] mb-16"
            initial="hidden" whileInView="show" viewport={vp} variants={inView}
          >
            Wedding Weekend
          </motion.h2>
          <div className="flex gap-6 md:gap-12 items-start">
            <div className="hidden lg:block pt-8 flex-shrink-0">
              <FloralVine />
            </div>
            <div className="flex-1 space-y-20">
              <motion.div
                className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.9, ease: "easeOut" }}
              >
                <div>
                  <h3 className="font-script text-5xl md:text-6xl text-[#faf9f6]/90 mb-3 leading-none">Rehearsal Dinner</h3>
                  <p className="font-cormorant text-xs tracking-[0.35em] uppercase text-[#faf9f6]/45 mb-5">Friday, April 2, 2027</p>
                  <p className="font-cormorant italic text-lg text-[#faf9f6]/65 mb-4">with our immediate family and wedding party</p>
                  <p className="font-cormorant text-xl text-[#faf9f6]/80">5:30 PM &nbsp;&middot;&nbsp; Muriel&apos;s Jackson Square</p>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src="/images/muriels-jackson-square-bistro.jpeg" alt="Muriel's Jackson Square" fill className="object-cover" />
                </div>
              </motion.div>
              <motion.div
                className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
              >
                <div>
                  <h3 className="font-script text-5xl md:text-6xl text-[#faf9f6]/90 mb-3 leading-none">Wedding Day</h3>
                  <p className="font-cormorant text-xs tracking-[0.35em] uppercase text-[#faf9f6]/45 mb-5">Saturday, April 3, 2027</p>
                  <p className="font-cormorant italic text-lg text-[#faf9f6]/65 mb-4">Ceremony &amp; Reception &nbsp;&middot;&nbsp; Hotel Peter and Paul</p>
                  <p className="font-cormorant text-xl text-[#faf9f6]/80">Guest arrival 5:00 PM &nbsp;&middot;&nbsp; Ceremony begins 5:30 PM</p>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src="/images/hotel-peter-and-paul-church-facade.jpeg" alt="Hotel Peter and Paul" fill className="object-cover" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ WHERE TO STAY ══ */}
      <section id="travel" className="bg-[#2C3E2D] py-24 px-6 border-t border-[#faf9f6]/10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-center font-cormorant text-4xl md:text-5xl tracking-[0.25em] uppercase text-[#faf9f6] mb-6"
            initial="hidden" whileInView="show" viewport={vp} variants={inView}
          >
            Where to Stay
          </motion.h2>
          <motion.p
            className="text-center font-cormorant italic text-lg md:text-xl text-[#faf9f6]/70 max-w-2xl mx-auto mb-16 leading-relaxed"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={vp}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            We&apos;re so excited to celebrate with you in New Orleans! The
            closest airport is Louis Armstrong New Orleans International Airport,
            about a 20–25 minute drive into the city.
          </motion.p>

          <div className="grid sm:grid-cols-2 gap-6">
            {HOTELS.map((hotel, i) => (
              <motion.div
                key={hotel.name}
                className="border border-[#faf9f6]/15 p-8 flex flex-col gap-5"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.75, ease: "easeOut", delay: i * 0.08 }}
              >
                <h3 className="font-cormorant text-2xl text-[#faf9f6] leading-tight">
                  {hotel.name}
                </h3>
                <ul className="space-y-2 flex-1">
                  {hotel.details.map((d) => (
                    <li key={d} className="flex items-start gap-2 font-cormorant text-base text-[#faf9f6]/65">
                      <span className="text-gold mt-0.5 flex-shrink-0">·</span>
                      {d}
                    </li>
                  ))}
                </ul>
                <a
                  href={hotel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start text-[10px] uppercase tracking-widest border border-[#faf9f6]/30 text-[#faf9f6]/60 px-5 py-2.5 hover:border-[#faf9f6]/60 hover:text-[#faf9f6] transition-colors duration-300"
                >
                  Visit Website
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════ FAQ ══ */}
      <section id="faq" className="bg-[#2C3E2D] py-24 px-6 border-t border-[#faf9f6]/10">
        <div className="max-w-3xl mx-auto">
          <motion.p
            className="text-center font-cormorant text-xs tracking-[0.4em] uppercase text-gold mb-3"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={vp}
            transition={{ duration: 0.7 }}
          >
            Got Questions
          </motion.p>
          <motion.h2
            className="text-center font-cormorant text-4xl md:text-5xl tracking-[0.25em] uppercase text-[#faf9f6] mb-14"
            initial="hidden" whileInView="show" viewport={vp} variants={inView}
          >
            FAQ
          </motion.h2>

          <motion.div
            className="divide-y divide-[#faf9f6]/15"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.8 }}
          >
            {FAQS.map((faq, i) => (
              <div key={i}>
                <button
                  className="w-full flex items-center justify-between gap-6 py-5 text-left group"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="font-cormorant text-xl text-[#faf9f6]/85 group-hover:text-[#faf9f6] transition-colors">
                    {faq.q}
                  </span>
                  <span className="text-gold text-2xl leading-none flex-shrink-0 w-5 text-center">
                    {openFaq === i ? "×" : "+"}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className="font-cormorant italic text-lg text-[#faf9f6]/65 pb-5 pr-10 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ RSVP ══ */}
      <section id="rsvp" className="bg-[#2C3E2D] py-24 px-6 border-t border-[#faf9f6]/10">
        <div className="max-w-2xl mx-auto">
          <motion.p
            className="text-center font-script text-5xl text-[#faf9f6]/80 mb-2"
            initial="hidden" whileInView="show" viewport={vp} variants={inView}
          >
            Kindly Reply
          </motion.p>
          <motion.h2
            className="text-center font-cormorant text-4xl md:text-5xl tracking-[0.25em] uppercase text-[#faf9f6] mb-14"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={vp}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            RSVP
          </motion.h2>

          <motion.form
            action="https://formspree.io/f/mpqblyqa"
            method="POST"
            className="space-y-9"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.85 }}
          >
            {/* Name row */}
            <div className="grid grid-cols-2 gap-6">
              <input name="firstName" placeholder="First Name" className={inputCls} required />
              <input name="lastName" placeholder="Last Name" className={inputCls} required />
            </div>

            {/* Email */}
            <input name="email" type="email" placeholder="Email Address" className={inputCls} required />

            {/* Attending */}
            <div className="space-y-3">
              <p className="font-cormorant text-xs uppercase tracking-[0.35em] text-[#faf9f6]/45">
                Will you attend?
              </p>
              <div className="flex flex-wrap gap-8">
                <RadioBtn name="attending" value="Joyfully Accepts" label="Joyfully Accepts" />
                <RadioBtn name="attending" value="Regretfully Declines" label="Regretfully Declines" />
              </div>
            </div>

            {/* Number of guests */}
            <div className="space-y-1.5">
              <input
                name="guests"
                type="number"
                min="1"
                max="10"
                placeholder="Number of Guests"
                className={inputCls}
              />
              <p className="font-cormorant italic text-sm text-[#faf9f6]/35">
                Please only include guests listed on your invitation
              </p>
            </div>

            {/* Dietary */}
            <input
              name="dietary"
              placeholder="Dietary Restrictions / Allergies"
              className={inputCls}
            />

            {/* Meal */}
            <div className="space-y-3">
              <p className="font-cormorant text-xs uppercase tracking-[0.35em] text-[#faf9f6]/45">
                Meal Preference
              </p>
              <div className="flex gap-8">
                <RadioBtn name="meal" value="Chicken" label="Chicken" />
                <RadioBtn name="meal" value="Fish" label="Fish" />
              </div>
            </div>

            {/* Song */}
            <input name="song" placeholder="Song Request" className={inputCls} />

            {/* Message */}
            <textarea
              name="message"
              placeholder="Message for the Couple"
              rows={4}
              className={`${inputCls} resize-none`}
            />

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gold text-charcoal py-4 font-cormorant text-xl tracking-[0.2em] uppercase hover:opacity-90 transition-opacity duration-300"
            >
              Send RSVP
            </button>
          </motion.form>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ REGISTRY ══ */}
      <section id="registry" className="bg-charcoal py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            className="font-cormorant text-4xl md:text-5xl tracking-[0.25em] uppercase text-[#faf9f6] mb-8"
            initial="hidden" whileInView="show" viewport={vp} variants={inView}
          >
            Registry
          </motion.h2>
          <motion.p
            className="font-cormorant italic text-xl text-[#faf9f6]/70 leading-relaxed mb-12"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={vp}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            Your presence means everything to us, and we are so grateful to
            celebrate together. For those who wish to give a gift, we&apos;ve
            created a honeymoon fund to help us begin this next chapter.
          </motion.p>
          <motion.a
            href="https://www.honeyfund.com/site/perez-guedry-04-03-2027"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-gold text-gold text-xs uppercase tracking-widest px-10 py-4 hover:bg-gold hover:text-charcoal transition-colors duration-300"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={vp}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Visit Our Honeyfund
          </motion.a>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ FOOTER ══ */}
      <footer className="bg-charcoal border-t border-[#faf9f6]/10 py-14 px-6 text-center">
        <p className="font-script text-5xl text-[#faf9f6]/80 mb-3">
          Christina &amp; Corey
        </p>
        <p className="font-cormorant text-xs tracking-[0.35em] uppercase text-[#faf9f6]/40">
          April 3, 2027 &nbsp;&middot;&nbsp; New Orleans, Louisiana
        </p>
      </footer>
    </>
  );
}
