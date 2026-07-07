import type { Metadata } from "next";
import { FacetList } from "@/components/facet-list";
import { Section } from "@/components/section";
import { yearFacets } from "@/lib/movies";

export const metadata: Metadata = {
  title: "Movies by Year",
  description: "Browse verified movie pages by release year."
};

export default function YearsPage() {
  return (
    <Section title="Movies by Year" eyebrow="Browse by release year">
      <FacetList basePath="/years" items={yearFacets} />
    </Section>
  );
}
