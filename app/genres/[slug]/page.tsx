import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MovieGrid } from "@/components/movie-grid";
import { Section } from "@/components/section";
import { genreFacets, moviesForFacet } from "@/lib/movies";

export function generateStaticParams() {
  return genreFacets.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const facet = genreFacets.find((item) => item.slug === slug);
  return {
    title: facet ? `${facet.name} Movies` : "Genre Movies",
    description: facet ? `Browse ${facet.count} verified movie pages in the ${facet.name} genre.` : undefined
  };
}

export default async function GenrePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const facet = genreFacets.find((item) => item.slug === slug);
  if (!facet) notFound();
  return (
    <Section title={`${facet.name} Movies`} eyebrow={`${facet.count} titles`}>
      <MovieGrid movies={moviesForFacet("genres", slug)} />
    </Section>
  );
}
