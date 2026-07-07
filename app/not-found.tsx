import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center">
      <p className="mb-3 text-sm font-bold uppercase tracking-wide text-amber-300">404</p>
      <h1 className="text-4xl font-black">Page not found</h1>
      <p className="mt-4 text-zinc-300">Information currently unavailable.</p>
      <Link href="/" className="mt-8 inline-block rounded bg-ember px-5 py-3 font-bold text-white">Back to homepage</Link>
    </section>
  );
}
