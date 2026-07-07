import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MovieGrid } from "@/components/movie-grid";
import { Section } from "@/components/section";
import { directorFacets, moviesForFacet } from "@/lib/movies";

export function generateStaticParams() {
  return directorFacets.slice(0, 500).map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const facet = directorFacets.find((item) => item.slug === slug);
  return {
    title: facet ? `${facet.name} Movies and Filmography` : "Director Filmography",
    description: facet ? `Browse verified movie guides directed by ${facet.name}.` : undefined
  };
}

export default async function DirectorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const facet = directorFacets.find((item) => item.slug === slug);
  if (!facet) notFound();
  return (
    <Section title={`${facet.name} Filmography`} eyebrow="Biography and awards information currently unavailable.">
      <MovieGrid movies={moviesForFacet("directors", slug)} />
    </Section>
  );
}
