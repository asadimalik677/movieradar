export function Section({ title, children, eyebrow }: { title: string; eyebrow?: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-5">
        {eyebrow ? <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-ember">{eyebrow}</p> : null}
        <h2 className="text-2xl font-bold text-white md:text-3xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}
