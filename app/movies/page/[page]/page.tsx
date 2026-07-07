import { notFound } from "next/navigation";
import { MovieGrid } from "@/components/movie-grid";
import { Pagination } from "@/components/pagination";
import { Section } from "@/components/section";
import { allMovies } from "@/lib/movies";
import { paginate } from "@/lib/pagination";

export function generateStaticParams() {
  const totalPages = paginate(allMovies, 1).totalPages;
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => ({ page: String(index + 2) }));
}

export default async function MoviesPaginatedPage({ params }: { params: Promise<{ page: string }> }) {
  const { page: rawPage } = await params;
  const pageNumber = Number(rawPage);
  const page = paginate(allMovies, pageNumber);
  if (!Number.isInteger(pageNumber) || pageNumber < 2 || pageNumber > page.totalPages) notFound();
  return (
    <Section title={`Movies: Page ${pageNumber}`} eyebrow="Verified movie guides">
      <MovieGrid movies={page.items} />
      <Pagination basePath="/movies" page={pageNumber} totalPages={page.totalPages} />
    </Section>
  );
}
