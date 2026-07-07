import type { Metadata } from "next";
import { FacetList } from "@/components/facet-list";
import { Section } from "@/components/section";
import { languageFacets } from "@/lib/movies";

export const metadata: Metadata = {
  title: "Movies by Language",
  description: "Browse verified movie pages by original language."
};

export default function LanguagesPage() {
  return (
    <Section title="Movies by Language" eyebrow="Browse by language">
      <FacetList basePath="/languages" items={languageFacets} />
    </Section>
  );
}
