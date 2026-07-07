import type { Metadata } from "next";
import { MovieGrid } from "@/components/movie-grid";
import { Pagination } from "@/components/pagination";
import { Section } from "@/components/section";
import { getLatestMovies } from "@/lib/movies";
import { paginate } from "@/lib/pagination";

export const metadata: Metadata = {
  title: "Latest Movies",
  description: "Browse the latest movie pages sorted by verified release date."
};

export default function LatestPage() {
  const page = paginate(getLatestMovies(), 1);
  return (
    <Section title="Latest Movies" eyebrow="Sorted by verified release date">
      <MovieGrid movies={page.items} />
      <Pagination basePath="/latest" page={1} totalPages={page.totalPages} />
    </Section>
  );
}
