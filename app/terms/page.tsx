import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for Movie Index."
};

export default function TermsPage() {
  return (
    <PageHero
      title="Terms"
      eyebrow="Usage"
      description="Movie Index provides informational movie discovery pages. Availability, ratings, release data, and credits should be checked against official sources before commercial or editorial use."
    />
  );
}
