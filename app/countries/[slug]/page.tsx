import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MovieGrid } from "@/components/movie-grid";
import { Section } from "@/components/section";
import { countryFacets, moviesForFacet } from "@/lib/movies";

export function generateStaticParams() {
  return countryFacets.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const facet = countryFacets.find((item) => item.slug === slug);
  return {
    title: facet ? `${facet.name} Movies` : "Country Movies",
    description: facet ? `Browse verified movie pages from ${facet.name}.` : undefined
  };
}

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const facet = countryFacets.find((item) => item.slug === slug);
  if (!facet) notFound();
  return (
    <Section title={`${facet.name} Movies`} eyebrow={`${facet.count} titles`}>
      <MovieGrid movies={moviesForFacet("countries", slug)} />
    </Section>
  );
}
