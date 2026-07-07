import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact information for Movie Index."
};

export default function ContactPage() {
  return (
    <PageHero
      title="Contact"
      eyebrow="Corrections and partnerships"
      description="For corrections, source updates, partnerships, or rights questions, connect this page to your production support inbox before launch."
    />
  );
}
