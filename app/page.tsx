"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
type Hotel = {
  name: string;
  url: string;
  image: string;
  amenities: {
    distance: string;
    restaurant: string | null;
    pool: boolean;
    breakfast: string | null;
  };
  notes: string;
  roomBlockLink?: string;
  roomBlockDeadline?: string;
  noRoomBlock?: boolean;
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const HOTELS: Hotel[] = [
  {
    name: "Hotel Peter and Paul",
    url: "https://hotelpeterandpaul.com",
    image: "/images/hotel-peter-and-paul-new.jpeg",
    amenities: {
      distance: "On-site — this is our venue!",
      restaurant: "Yes — The Elysian Bar",
      pool: false,
      breakfast: null,
    },
    notes: "A beautifully restored historic church and schoolhouse turned boutique hotel, located in the Marigny.",
    roomBlockLink: "https://reservations.travelclick.com/114648?groupID=5300450",
    roomBlockDeadline: "Must book by March 1, 2027",
  },
  {
    name: "Hampton Inn French Quarter Market Area",
    url: "https://www.hilton.com/en/hotels/msyhxhx-hampton-new-orleans-french-quarter-market-area/",
    image: "/images/hampton-inn-new-orleans.jpeg",
    amenities: {
      distance: "~1.2 miles / 5 min drive to venue",
      restaurant: null,
      pool: false,
      breakfast: "Yes — complimentary",
    },
    notes: "Clean, comfortable, and reliable. Great value option with complimentary breakfast included.",
    roomBlockLink: "https://nam02.safelinks.protection.outlook.com/?url=https%3A%2F%2Flinks.h6.hilton.com%2Ff%2Fa%2FsPY6S1lqNKiOQRfjhyzb6g~~%2FAAQRxRA~%2F5H-3kS7e6Ldq8cKTeeIsM4HKxbQLv74dCJLPNUmjhkPmjuUuZQTc0Lw22SfG_ytJr2sSnDn-yHbgEOPWgvYnZ3TbiCsvVYPfH-iiTjqOqJZuggQK3WfPPFz3R86KvBbrOrKOl1y4-R0l-FeIOLXoyCibQ7foYus5Kp91Jy8zqPrGXJPsfDzgkhKN7pl4qKUf&data=05%7C02%7CSenia.Sierra%40Hilton.com%7C92544e4e751642e899b008debc4c3aee%7C660292d2cfd54a3db7a7e8f7ee458a0a%7C0%7C0%7C639155232841182149%7CUnknown%7CTWFpbGZsb3d8eyJFbXB0eU1hcGkiOnRydWUsIlYiOiIwLjAuMDAwMCIsIlAiOiJXaW4zMiIsIkFOIjoiTWFpbCIsIldUIjoyfQ%3D%3D%7C0%7C%7C%7C&sdata=6zmBkH5sWCDzVjjWyRjs0Cqkkq%2Bf14mTigI3DOilxHg%3D&reserved=0",
    roomBlockDeadline: "Must book by March 1, 2027",
  },
  {
    name: "Holiday Inn French Quarter — Chateau LeMoyne",
    url: "#",
    image: "/images/holiday-inn-chateau-lemoyne.jpeg",
    amenities: {
      distance: "~1.7 miles / 8–10 min drive to venue",
      restaurant: "Yes — on-site restaurant & bar",
      pool: true,
      breakfast: "Complimentary breakfast included",
    },
    notes: "Classic French Quarter hotel with a peaceful courtyard atmosphere, tucked just off Bourbon Street while still close to all the action.",
    roomBlockLink: "https://maps.app.goo.gl/PC88PNgzo2y9FgvU9?g_st=ic",
    roomBlockDeadline: "Must book by March 1, 2027",
  },
  {
    name: "Hotel Provincial",
    url: "https://hotelprovincial.com",
    image: "/images/french-quarter-colonial-hotel-flags.jpeg",
    amenities: {
      distance: "~0.5 miles / 10 min walk to venue",
      restaurant: "Yes — Broussard's Restaurant & Courtyard",
      pool: true,
      breakfast: null,
    },
    notes: "Classic French Quarter hotel with charming courtyards. Steps from Bourbon Street.",
    noRoomBlock: true,
  },
];

const THINGS = [
  {
    category: "Slow Mornings",
    items: [
      { name: "Cafe du Monde", description: "A New Orleans classic, famous for beignets and café au lait. A must-visit." },
      { name: "French Truck Coffee", description: "A favorite for a relaxed start to the day." },
      { name: "Bearcat Cafe", description: "Bright, modern spot with healthy options and indulgent brunch favorites." },
      { name: "Willa Jean", description: "Trendy bakery and brunch spot known for biscuits and pastries." },
      { name: "Elizabeth's", description: "Cozy neighborhood favorite in the Bywater, laid-back and local." },
    ],
  },
  {
    category: "Dinner & Drinks",
    items: [
      { name: "The Elysian Bar", description: "Our favorite spot—located right between Hotel Peter and Paul and the church, making it the closest and easiest option. Open 7am–2pm and 3pm–10pm, with a cozy coffee bar tucked inside—perfect for a quick drink before heading out." },
      { name: "Cane & Table", description: "Caribbean-inspired flavors and great cocktails." },
      { name: "Brennan's", description: "A classic New Orleans dining experience, elegant and iconic." },
      { name: "Vessel", description: "Stunning restaurant inside a restored church." },
      { name: "Acme Oyster House", description: "New Orleans staple for chargrilled oysters." },
      { name: "Paladar 511", description: "Handmade pasta, pizza, and a cool modern vibe." },
    ],
  },
  {
    category: "Music & Evenings Out",
    items: [
      { name: "Frenchmen Street", description: "Live music and a local feel." },
      { name: "Bourbon Street", description: "Lively, iconic, and always unforgettable." },
      { name: "Lafitte's Blacksmith Shop Bar", description: "One of the oldest bars in the country." },
      { name: "Hot Tin", description: "Rooftop bar with amazing skyline views, perfect for sunset drinks." },
      { name: "Bacchanal Wine", description: "Backyard wine bar with live music, very romantic." },
      { name: "The Carousel Bar & Lounge", description: "A literal spinning bar inside Hotel Monteleone." },
      { name: "Pat O'Brien's", description: "Famous for hurricanes and a lively courtyard." },
      { name: "Fritzels European Jazz Pub", description: "Cozy, old-world jazz bar with classic New Orleans charm and live traditional jazz nightly." },
    ],
  },
  {
    category: "A Little New Orleans Magic",
    items: [
      { name: "Ghost Tours", description: "A fun and spooky way to explore the French Quarter at night." },
      { name: "New Orleans Pharmacy Museum", description: "Quirky and fascinating, old-world medical history." },
      { name: "Marie Laveau's House of Voodoo", description: "A well-known shop for all things mystical." },
      { name: "Jackson Square", description: "Street performers, artists, and classic New Orleans energy." },
      { name: "Garden District", description: "Beautiful historic homes and oak-lined streets." },
    ],
  },
  {
    category: "Explore & Experience",
    items: [
      { name: "French Quarter", description: "Walk, wander, and take it all in." },
      { name: "Jackson Square", description: "Historic, beautiful, and full of life." },
      { name: "Swamp & Gator Tour (one of our favorites!)", description: "Explore the Louisiana bayou by boat, see alligators up close." },
    ],
  },
  {
    category: "Museums & Culture",
    items: [
      { name: "The National WWII Museum", description: "One of the top museums in the country, interactive and immersive." },
      { name: "Ogden Museum of Southern Art", description: "Great spot to explore Southern art." },
      { name: "New Orleans Museum of Art", description: "Located in City Park, perfect with a scenic stroll." },
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
    a: "Semi-formal / cocktail attire. Think elegant but relaxed — lightweight fabrics are recommended for the New Orleans April weather. For outfit inspiration and style details, check out our What to Wear section above.",
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
  "placeholder-[#faf9f6]/35 font-body text-lg outline-none " +
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
      <span className="font-body text-lg text-[#faf9f6]/70 transition-colors peer-checked:text-[#faf9f6]">
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

// ─── Shared section heading ───────────────────────────────────────────────────
function SectionHeading({
  label,
  title,
  className = "mb-16",
}: {
  label: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={`text-center ${className}`}>
      <motion.p
        className="font-heading text-xs tracking-[0.4em] uppercase text-gold mb-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={vp}
        transition={{ duration: 0.7 }}
      >
        {label}
      </motion.p>
      <motion.h2
        className="font-script text-5xl md:text-6xl text-[#faf9f6]"
        initial="hidden"
        whileInView="show"
        viewport={vp}
        variants={inView}
      >
        {title}
      </motion.h2>
    </div>
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

        {/* Hero copy */}
        <div className="relative z-10 px-6 max-w-3xl w-full">
          <motion.h1
            className="font-script text-6xl md:text-8xl text-[#faf9f6] leading-none mb-6 tracking-wide whitespace-nowrap"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          >
            Christina{" "}
            <span className="text-5xl md:text-6xl opacity-80">&amp;</span>
            {" "}Corey
          </motion.h1>
          <motion.p
            className="font-heading text-[0.65rem] md:text-xs text-[#faf9f6]/80 tracking-[0.4em] uppercase mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.25 }}
          >
            April 3, 2027&nbsp;&nbsp;&middot;&nbsp;&nbsp;Hotel Peter and
            Paul&nbsp;&nbsp;&middot;&nbsp;&nbsp;New Orleans, Louisiana
          </motion.p>
          <motion.p
            className="font-body text-lg md:text-xl text-[#faf9f6]/80 leading-relaxed max-w-2xl mx-auto"
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
      <section id="our-story" className="bg-[#2C3E2D] py-24 px-6 textured-bg">
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeading label="Our Story" title="Our Love Story" />
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div
              className="order-2 md:order-1"
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={vp}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <div className="font-body text-xl md:text-2xl text-[#faf9f6]/80 leading-relaxed space-y-7">
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
                <div className="relative aspect-[2/3] overflow-hidden rounded-[5px] shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
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
      <section id="wedding-weekend" className="bg-[#2C3E2D] py-24 px-6 textured-bg border-t border-[#faf9f6]/10">
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeading label="The Weekend" title="Wedding Weekend" />
          <div className="flex gap-6 md:gap-12 items-start">
            <div className="hidden lg:block pt-[82px] flex-shrink-0">
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
                  <p className="font-heading text-xs tracking-[0.35em] uppercase text-[#faf9f6]/45 mb-5">Friday, April 2, 2027</p>
                  <p className="font-body text-lg text-[#faf9f6]/65 mb-4">with our immediate family and wedding party</p>
                  <p className="font-body text-xl text-[#faf9f6]/80">5:30 PM &nbsp;&middot;&nbsp; Muriel&apos;s Jackson Square</p>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[5px] shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
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
                  <p className="font-heading text-xs tracking-[0.35em] uppercase text-[#faf9f6]/45 mb-5">Saturday, April 3, 2027</p>
                  <p className="font-body text-lg text-[#faf9f6]/65 mb-4">Ceremony &amp; Reception &nbsp;&middot;&nbsp; Hotel Peter and Paul</p>
                  <p className="font-body text-xl text-[#faf9f6]/80">Guest arrival 5:00 PM &nbsp;&middot;&nbsp; Ceremony begins 5:30 PM</p>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[5px] shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
                  <Image src="/images/hotel-peter-and-paul-church-facade.jpeg" alt="Hotel Peter and Paul" fill className="object-cover" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════ WHAT TO WEAR ══ */}
      <section id="what-to-wear" className="bg-[#2C3E2D] py-24 px-6 textured-bg border-t border-[#faf9f6]/10">
        <div className="max-w-5xl mx-auto relative z-10">
          <SectionHeading label="What to Wear" title="Dress the Part" />
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={vp}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <p className="font-heading text-xs tracking-[0.35em] uppercase text-gold mb-6">
                Semi-formal / Cocktail Attire
              </p>
              <p className="font-body text-lg text-[#faf9f6]/80 leading-relaxed">
                We want you to feel beautiful, comfortable, and ready to celebrate. Think elegant but relaxed — the kind of outfit that lets you dance, explore the city, and raise a glass with ease. New Orleans in April is warm, so lightweight fabrics are your best friend.
              </p>
            </motion.div>
            <motion.div
              className="max-w-3xl mx-auto w-full"
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={vp}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
            >
              <div className="relative w-full overflow-hidden rounded-lg shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
                <Image
                  src="/images/wedding-style-guide.png"
                  alt="Wedding style guide"
                  width={900}
                  height={1200}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ WHERE TO STAY ══ */}
      <section id="travel" className="bg-[#2C3E2D] py-24 px-6 textured-bg border-t border-[#faf9f6]/10">
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeading label="Travel & Hotels" title="Where to Stay" className="mb-6" />
          <motion.p
            className="text-center font-body text-lg md:text-xl text-[#faf9f6]/70 max-w-2xl mx-auto mb-16 leading-relaxed"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={vp}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            We&apos;re so excited to celebrate with you in New Orleans! The
            closest airport is Louis Armstrong New Orleans International Airport,
            about a 20–25 minute drive into the city.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOTELS.map((hotel, i) => (
              <motion.div
                key={hotel.name}
                className="border border-[#faf9f6]/15 p-8 flex flex-col gap-5"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.75, ease: "easeOut", delay: i * 0.08 }}
              >
                <div className="relative h-48 overflow-hidden rounded-[5px] shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
                  <Image
                    src={hotel.image}
                    alt={hotel.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-heading text-2xl text-[#faf9f6] leading-tight">
                  {hotel.name}
                </h3>
                <ul className="space-y-2.5 flex-1">
                  {[
                    { label: "Distance", value: hotel.amenities.distance },
                    { label: "Restaurant / Bar", value: hotel.amenities.restaurant ?? "No" },
                    { label: "Pool", value: hotel.amenities.pool ? "Yes" : "No" },
                    { label: "Breakfast", value: hotel.amenities.breakfast ?? "No" },
                  ].map(({ label, value }) => (
                    <li key={label} className="flex items-start gap-2">
                      <span className="text-gold flex-shrink-0 mt-0.5">·</span>
                      <span className="font-body text-sm text-[#faf9f6]/65">
                        <span className="text-[#faf9f6]/40 text-[10px] uppercase tracking-widest">{label}</span>
                        {" — "}
                        {value}
                      </span>
                    </li>
                  ))}
                  <li className="flex items-start gap-2 pt-1">
                    <span className="text-gold flex-shrink-0 mt-0.5">·</span>
                    <p className="font-body italic text-sm text-[#faf9f6]/50">{hotel.notes}</p>
                  </li>
                </ul>
                <div className="flex flex-col gap-3 mt-auto">
                  <a
                    href={hotel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="self-start text-[10px] uppercase tracking-widest border border-[#faf9f6]/30 text-[#faf9f6]/60 px-5 py-2.5 hover:border-[#faf9f6]/60 hover:text-[#faf9f6] transition-colors duration-300"
                  >
                    Visit Website
                  </a>
                  {hotel.roomBlockLink && (
                    <div className="flex flex-col gap-1.5">
                      <a
                        href={hotel.roomBlockLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="self-start text-[10px] uppercase tracking-widest border border-gold text-gold px-5 py-2.5 hover:bg-gold hover:text-charcoal transition-colors duration-300"
                      >
                        Book Your Room Block
                      </a>
                      {hotel.roomBlockDeadline && (
                        <p className="font-body italic text-xs text-[#faf9f6]/40">
                          {hotel.roomBlockDeadline}
                        </p>
                      )}
                    </div>
                  )}
                  {hotel.noRoomBlock && (
                    <p className="font-body italic text-xs text-[#faf9f6]/40">
                      No room block at this time
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════ THINGS TO DO ══ */}
      <section id="things-to-do" className="bg-[#2C3E2D] py-24 px-6 textured-bg border-t border-[#faf9f6]/10">
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeading label="New Orleans" title="Things to Do" className="mb-4" />
          <motion.p
            className="text-center font-body text-lg text-[#faf9f6]/60 mb-16"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={vp}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Our favorite spots — make a weekend of it.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {THINGS.map((rec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.07 }}
              >
                <p className="font-heading text-xs tracking-[0.35em] uppercase text-gold mb-5">
                  {rec.category}
                </p>
                <ul className="space-y-4">
                  {rec.items.map((item, j) => (
                    <li key={j}>
                      <p className="font-body text-base text-[#faf9f6]/90">{item.name}</p>
                      <p className="font-body italic text-sm text-[#faf9f6]/55 mt-0.5 leading-snug">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════ FAQ ══ */}
      <section id="faq" className="bg-[#2C3E2D] py-24 px-6 textured-bg border-t border-[#faf9f6]/10">
        <div className="max-w-3xl mx-auto relative z-10">
          <SectionHeading label="Got Questions" title="Frequently Asked" />

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
                  <span className="font-body text-base text-[#faf9f6]/85 group-hover:text-[#faf9f6] transition-colors">
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
                      <p className="font-body text-base text-[#faf9f6]/65 pb-5 pr-10 leading-relaxed">
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
      <section id="rsvp" className="bg-[#2C3E2D] py-24 px-6 textured-bg border-t border-[#faf9f6]/10">
        <div className="max-w-2xl mx-auto relative z-10">
          <div className="text-center">
            <motion.p
              className="font-script text-5xl text-[#faf9f6]/80 mb-2"
              initial="hidden" whileInView="show" viewport={vp} variants={inView}
            >
              Kindly Reply
            </motion.p>
            <motion.h2
              className="font-heading text-4xl md:text-5xl tracking-[0.25em] uppercase text-[#faf9f6] mb-14"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={vp}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              RSVP
            </motion.h2>
          </div>

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
              <p className="font-heading text-xs uppercase tracking-[0.35em] text-[#faf9f6]/45">
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
              <p className="font-body italic text-sm text-[#faf9f6]/35">
                Please only include guests listed on your invitation
              </p>
            </div>

            {/* Guest names */}
            <div className="space-y-1.5">
              <p className="font-heading text-xs uppercase tracking-[0.35em] text-[#faf9f6]/45">
                Names of Guests Attending
              </p>
              <textarea
                name="guestNames"
                placeholder="Please list the full names of all guests in your party"
                rows={3}
                className={`${inputCls} resize-none`}
              />
            </div>

            {/* Dietary */}
            <input
              name="dietary"
              placeholder="Dietary Restrictions / Allergies"
              className={inputCls}
            />

            {/* Meal */}
            <div className="space-y-3">
              <p className="font-heading text-xs uppercase tracking-[0.35em] text-[#faf9f6]/45">
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
              className="w-full bg-gold text-charcoal py-4 font-heading text-xl tracking-[0.2em] uppercase hover:opacity-90 transition-opacity duration-300"
            >
              Send RSVP
            </button>
          </motion.form>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ REGISTRY ══ */}
      <section id="registry" className="bg-charcoal py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <SectionHeading label="A Gift of Love" title="Registry" className="mb-8" />
          <motion.p
            className="font-body text-xl text-[#faf9f6]/70 leading-relaxed mb-12"
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
        <p className="font-heading text-xs tracking-[0.35em] uppercase text-[#faf9f6]/40">
          April 3, 2027 &nbsp;&middot;&nbsp; New Orleans, Louisiana
        </p>
      </footer>
    </>
  );
}
