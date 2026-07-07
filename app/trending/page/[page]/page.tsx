import { notFound } from "next/navigation";
import { MovieGrid } from "@/components/movie-grid";
import { Pagination } from "@/components/pagination";
import { Section } from "@/components/section";
import { getTrendingMovies } from "@/lib/movies";
import { paginate } from "@/lib/pagination";

export function generateStaticParams() {
  const totalPages = paginate(getTrendingMovies(), 1).totalPages;
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => ({ page: String(index + 2) }));
}

export default async function TrendingPaginatedPage({ params }: { params: Promise<{ page: string }> }) {
  const { page: rawPage } = await params;
  const pageNumber = Number(rawPage);
  const page = paginate(getTrendingMovies(), pageNumber);
  if (!Number.isInteger(pageNumber) || pageNumber < 2 || pageNumber > page.totalPages) notFound();
  return (
    <Section title={`Trending Movies: Page ${pageNumber}`} eyebrow="Most connected titles">
      <MovieGrid movies={page.items} />
      <Pagination basePath="/trending" page={pageNumber} totalPages={page.totalPages} />
    </Section>
  );
}
