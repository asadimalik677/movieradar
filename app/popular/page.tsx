import type { Metadata } from "next";
import { MovieGrid } from "@/components/movie-grid";
import { Section } from "@/components/section";
import { getPopularMovies } from "@/lib/movies";

export const metadata: Metadata = {
  title: "Popular Movies",
  description: "Browse popular verified movie guides ranked by public knowledge graph connectivity."
};

export default function PopularPage() {
  return (
    <Section title="Popular Movies" eyebrow="High-connectivity titles">
      <MovieGrid movies={getPopularMovies(48)} />
    </Section>
  );
}
