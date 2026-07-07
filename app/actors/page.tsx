import type { Metadata } from "next";
import { FacetList } from "@/components/facet-list";
import { Section } from "@/components/section";
import { actorFacets } from "@/lib/movies";

export const metadata: Metadata = {
  title: "Movie Actors",
  description: "Browse verified movie pages by listed cast members."
};

export default function ActorsPage() {
  return (
    <Section title="Movie Actors" eyebrow="Browse by cast">
      <FacetList basePath="/actors" items={actorFacets.slice(0, 500)} />
    </Section>
  );
}
