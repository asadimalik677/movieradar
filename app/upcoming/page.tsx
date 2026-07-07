import type { Metadata } from "next";
import { MovieGrid } from "@/components/movie-grid";
import { Section } from "@/components/section";
import { getUpcomingMovies } from "@/lib/movies";

export const metadata: Metadata = {
  title: "Upcoming Movies",
  description: "Browse movies with verified future release dates where available."
};

export default function UpcomingPage() {
  const movies = getUpcomingMovies(48);
  return (
    <Section title="Upcoming Movies" eyebrow="Verified future dates">
      {movies.length ? <MovieGrid movies={movies} /> : <div className="cinematic-panel rounded p-6 text-zinc-300">Information currently unavailable.</div>}
    </Section>
  );
}
