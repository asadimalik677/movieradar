export function SkeletonCard() {
  return (
    <div className="animate-pulse rounded border border-white/10 bg-white/5">
      <div className="aspect-[16/10] bg-white/10" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-2/3 rounded bg-white/10" />
        <div className="h-3 w-full rounded bg-white/10" />
        <div className="h-3 w-4/5 rounded bg-white/10" />
      </div>
    </div>
  );
}
