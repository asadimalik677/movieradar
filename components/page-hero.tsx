export function PageHero({ title, description, eyebrow }: { title: string; description: string; eyebrow?: string }) {
  return (
    <section className="border-b border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {eyebrow ? <p className="mb-3 text-sm font-bold uppercase tracking-wide text-amber-300">{eyebrow}</p> : null}
        <h1 className="max-w-4xl text-4xl font-black md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">{description}</p>
      </div>
    </section>
  );
}
