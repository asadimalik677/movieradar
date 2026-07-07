import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MovieGrid } from "@/components/movie-grid";
import { Section } from "@/components/section";
import { languageFacets, moviesForFacet } from "@/lib/movies";

export function generateStaticParams() {
  return languageFacets.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const facet = languageFacets.find((item) => item.slug === slug);
  return {
    title: facet ? `${facet.name} Movies` : "Language Movies",
    description: facet ? `Browse verified movie guides connected with ${facet.name}.` : undefined
  };
}

export default async function LanguagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const facet = languageFacets.find((item) => item.slug === slug);
  if (!facet) notFound();
  return (
    <Section title={`${facet.name} Movies`} eyebrow={`${facet.count} titles`}>
      <MovieGrid movies={moviesForFacet("languages", slug)} />
    </Section>
  );
}
