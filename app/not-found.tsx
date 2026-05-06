import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center text-center px-6">
      <p className="text-sm uppercase tracking-widest text-gold mb-4">404</p>
      <h1 className="text-4xl font-light mb-6">Page not found</h1>
      <Link
        href="/"
        className="text-sm uppercase tracking-widest border border-charcoal px-8 py-3 hover:bg-charcoal hover:text-ivory transition-colors duration-300"
      >
        Go Home
      </Link>
    </section>
  );
}
