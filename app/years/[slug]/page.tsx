import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MovieGrid } from "@/components/movie-grid";
import { Section } from "@/components/section";
import { moviesForYear, yearFacets } from "@/lib/movies";

export function generateStaticParams() {
  return yearFacets.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const facet = yearFacets.find((item) => item.slug === slug);
  return {
    title: facet ? `${facet.name} Movies` : "Year Movies",
    description: facet ? `Browse verified movie guides released in ${facet.name}.` : undefined
  };
}

export default async function YearPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const facet = yearFacets.find((item) => item.slug === slug);
  if (!facet) notFound();
  return (
    <Section title={`${facet.name} Movies`} eyebrow={`${facet.count} titles`}>
      <MovieGrid movies={moviesForYear(facet.name)} />
    </Section>
  );
}
