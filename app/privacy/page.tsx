import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy information for Movie Index."
};

export default function PrivacyPage() {
  return (
    <PageHero
      title="Privacy Policy"
      eyebrow="User trust"
      description="Movie Index is designed as a static discovery website. Analytics, advertising, and account features are not currently enabled in this project. If those features are added later, this policy should be updated before launch."
    />
  );
}
