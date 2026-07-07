import type { Metadata } from "next";
import { MovieGrid } from "@/components/movie-grid";
import { Section } from "@/components/section";
import { getTopRatedFallback } from "@/lib/movies";

export const metadata: Metadata = {
  title: "Top Rated Movies",
  description: "Browse high-signal movie guides. Third-party rating values are shown only when verified."
};

export default function TopRatedPage() {
  return (
    <Section title="Top Rated Movies" eyebrow="Rating data currently unavailable">
      <MovieGrid movies={getTopRatedFallback(48)} />
    </Section>
  );
}
