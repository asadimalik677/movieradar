import type { Metadata } from "next";
import { MovieGrid } from "@/components/movie-grid";
import { Pagination } from "@/components/pagination";
import { Section } from "@/components/section";
import { allMovies } from "@/lib/movies";
import { paginate } from "@/lib/pagination";

export const metadata: Metadata = {
  title: "Movies",
  description: "Browse the complete verified movie discovery catalog."
};

export default function MoviesPage() {
  const page = paginate(allMovies, 1);
  return (
    <Section title="Movies" eyebrow={`${allMovies.length.toLocaleString()} verified guides`}>
      <MovieGrid movies={page.items} />
      <Pagination basePath="/movies" page={1} totalPages={page.totalPages} />
    </Section>
  );
}
