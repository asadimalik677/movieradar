import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "About",
  description: "Learn how Movie Index builds original discovery pages from verified structured data."
};

export default function AboutPage() {
  return (
    <PageHero
      title="About Movie Index"
      eyebrow="Verified discovery"
      description="Movie Index is a programmatic discovery platform that turns structured movie records into original, spoiler-free guides. Factual claims are shown only when they are available from verified source data."
    />
  );
}
