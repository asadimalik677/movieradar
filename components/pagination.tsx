import Link from "next/link";

export function Pagination({ basePath, page, totalPages }: { basePath: string; page: number; totalPages: number }) {
  if (totalPages <= 1) return null;
  const prev = page > 1 ? (page === 2 ? basePath : `${basePath}/page/${page - 1}`) : null;
  const next = page < totalPages ? `${basePath}/page/${page + 1}` : null;
  return (
    <nav className="mt-8 flex items-center justify-center gap-3">
      {prev ? <Link className="rounded border border-white/10 px-4 py-2" href={`${prev}/`}>Previous</Link> : null}
      <span className="text-sm text-zinc-500">Page {page} of {totalPages}</span>
      {next ? <Link className="rounded border border-white/10 px-4 py-2" href={`${next}/`}>Next</Link> : null}
    </nav>
  );
}
