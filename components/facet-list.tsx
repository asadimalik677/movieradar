import Link from "next/link";
import type { FacetItem } from "@/lib/types";

export function FacetList({ basePath, items }: { basePath: string; items: FacetItem[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <Link key={item.slug} href={`${basePath}/${item.slug}/`} className="flex items-center justify-between rounded border border-white/10 bg-white/[0.04] px-4 py-3 hover:border-ember">
          <span className="font-medium">{item.name}</span>
          <span className="text-sm text-zinc-500">{item.count}</span>
        </Link>
      ))}
    </div>
  );
}
