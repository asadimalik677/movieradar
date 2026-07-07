import type { Metadata } from "next";
import { FacetList } from "@/components/facet-list";
import { Section } from "@/components/section";
import { studioFacets } from "@/lib/movies";

export const metadata: Metadata = {
  title: "Movie Studios and Production Companies",
  description: "Browse verified movie pages by production company."
};

export default function StudiosPage() {
  return (
    <Section title="Studios and Production Companies" eyebrow="Browse by studio">
      <FacetList basePath="/studios" items={studioFacets.slice(0, 500)} />
    </Section>
  );
}
