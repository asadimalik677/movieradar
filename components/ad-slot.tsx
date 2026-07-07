export function AdSlot({ label = "Advertisement" }: { label?: string }) {
  return (
    <aside className="cinematic-panel grid min-h-24 place-items-center rounded p-4 text-xs uppercase tracking-wide text-zinc-500">
      {label}
    </aside>
  );
}
