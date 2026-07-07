import type { Metadata } from "next";
import { MovieGrid } from "@/components/movie-grid";
import { Pagination } from "@/components/pagination";
import { Section } from "@/components/section";
import { getTrendingMovies } from "@/lib/movies";
import { paginate } from "@/lib/pagination";

export const metadata: Metadata = {
  title: "Trending Movies",
  description: "Browse popular movie pages ranked by public knowledge graph connectivity."
};

export default function TrendingPage() {
  const page = paginate(getTrendingMovies(), 1);
  return (
    <Section title="Trending Movies" eyebrow="Most connected titles">
      <MovieGrid movies={page.items} />
      <Pagination basePath="/trending" page={1} totalPages={page.totalPages} />
    </Section>
  );
}
