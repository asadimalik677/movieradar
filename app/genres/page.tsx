import type { Metadata } from "next";
import { FacetList } from "@/components/facet-list";
import { Section } from "@/components/section";
import { genreFacets } from "@/lib/movies";

export const metadata: Metadata = {
  title: "Movie Genres",
  description: "Browse verified movie pages by genre."
};

export default function GenresPage() {
  return (
    <Section title="Movie Genres" eyebrow="Browse by style">
      <FacetList basePath="/genres" items={genreFacets} />
    </Section>
  );
}
