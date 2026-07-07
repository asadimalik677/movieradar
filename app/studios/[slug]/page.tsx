import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MovieGrid } from "@/components/movie-grid";
import { Section } from "@/components/section";
import { moviesForFacet, studioFacets } from "@/lib/movies";

export function generateStaticParams() {
  return studioFacets.slice(0, 500).map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const facet = studioFacets.find((item) => item.slug === slug);
  return {
    title: facet ? `${facet.name} Movies` : "Studio Movies",
    description: facet ? `Browse verified movie guides from ${facet.name}.` : undefined
  };
}

export default async function StudioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const facet = studioFacets.find((item) => item.slug === slug);
  if (!facet) notFound();
  return (
    <Section title={`${facet.name} Movies`} eyebrow={`${facet.count} titles`}>
      <MovieGrid movies={moviesForFacet("productionCompanies", slug)} />
    </Section>
  );
}
