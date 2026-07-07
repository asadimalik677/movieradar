import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { tvShows } from "@/lib/tv";

export const metadata: Metadata = {
  title: "TV Shows",
  description: "Browse TV show discovery pages when verified TV data is available."
};

export default function TvPage() {
  return (
    <>
      <PageHero title="TV Shows" eyebrow="Discovery catalog" description="The TV-show architecture is ready for seasons, episodes, networks, creators, ratings, trailers, streaming availability, related shows, and FAQs." />
      <Section title="Popular TV Shows" eyebrow={`${tvShows.length} verified TV records`}>
        <div className="cinematic-panel rounded p-6 text-zinc-300">Information currently unavailable.</div>
      </Section>
    </>
  );
}
