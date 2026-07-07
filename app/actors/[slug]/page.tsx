import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MovieGrid } from "@/components/movie-grid";
import { Section } from "@/components/section";
import { actorFacets, moviesForFacet } from "@/lib/movies";

export function generateStaticParams() {
  return actorFacets.slice(0, 500).map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const facet = actorFacets.find((item) => item.slug === slug);
  return {
    title: facet ? `${facet.name} Movies` : "Actor Movies",
    description: facet ? `Browse verified movie pages featuring ${facet.name}.` : undefined
  };
}

export default async function ActorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const facet = actorFacets.find((item) => item.slug === slug);
  if (!facet) notFound();
  return (
    <Section title={`${facet.name} Movies`} eyebrow={`${facet.count} titles`}>
      <MovieGrid movies={moviesForFacet("cast", slug)} />
    </Section>
  );
}
