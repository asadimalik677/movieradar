import type { Metadata } from "next";
import { FacetList } from "@/components/facet-list";
import { Section } from "@/components/section";
import { countryFacets } from "@/lib/movies";

export const metadata: Metadata = {
  title: "Movies by Country",
  description: "Browse verified movie pages by country of origin."
};

export default function CountriesPage() {
  return (
    <Section title="Movies by Country" eyebrow="Browse by origin">
      <FacetList basePath="/countries" items={countryFacets} />
    </Section>
  );
}
