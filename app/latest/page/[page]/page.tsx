import { notFound } from "next/navigation";
import { MovieGrid } from "@/components/movie-grid";
import { Pagination } from "@/components/pagination";
import { Section } from "@/components/section";
import { getLatestMovies } from "@/lib/movies";
import { paginate } from "@/lib/pagination";

export function generateStaticParams() {
  const totalPages = paginate(getLatestMovies(), 1).totalPages;
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => ({ page: String(index + 2) }));
}

export default async function LatestPaginatedPage({ params }: { params: Promise<{ page: string }> }) {
  const { page: rawPage } = await params;
  const pageNumber = Number(rawPage);
  const page = paginate(getLatestMovies(), pageNumber);
  if (!Number.isInteger(pageNumber) || pageNumber < 2 || pageNumber > page.totalPages) notFound();
  return (
    <Section title={`Latest Movies: Page ${pageNumber}`} eyebrow="Sorted by verified release date">
      <MovieGrid movies={page.items} />
      <Pagination basePath="/latest" page={pageNumber} totalPages={page.totalPages} />
    </Section>
  );
}
