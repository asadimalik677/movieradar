import type { Metadata } from "next";
import { FacetList } from "@/components/facet-list";
import { Section } from "@/components/section";
import { directorFacets } from "@/lib/movies";

export const metadata: Metadata = {
  title: "Movie Directors",
  description: "Browse verified movie pages by director."
};

export default function DirectorsPage() {
  return (
    <Section title="Movie Directors" eyebrow="Browse by filmmaker">
      <FacetList basePath="/directors" items={directorFacets.slice(0, 500)} />
    </Section>
  );
}
