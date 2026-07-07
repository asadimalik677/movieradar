import type { Metadata } from "next";
import type { Movie } from "@/lib/types";

export const siteName = "MovieRadar";
export const siteDescription =
  "Discover recent Hindi and English movies with verified basics, original spoiler-free summaries, cast guides, genres, countries, and related films.";

export function siteUrl(path = "") {
  const root = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  return `${root.replace(/\/$/, "")}${path}`;
}

export function movieUrl(movie: Movie) {
  return siteUrl(`/movies/${movie.slug}/`);
}

export function movieMetadata(movie: Movie): Metadata {
  const url = movieUrl(movie);
  const image = movie.image || siteUrl("/og-default.svg");

  return {
    title: movie.seoTitle,
    description: movie.metaDescription,
    alternates: {
      canonical: url
    },
    openGraph: {
      type: "video.movie",
      title: movie.seoTitle,
      description: movie.metaDescription,
      url,
      siteName,
      images: [{ url: image, alt: movie.title }]
    },
    twitter: {
      card: "summary_large_image",
      title: movie.seoTitle,
      description: movie.metaDescription,
      images: [image]
    }
  };
}

export function movieJsonLd(movie: Movie) {
  return {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: movie.title,
    url: movieUrl(movie),
    description: movie.overview,
    datePublished: movie.releaseDate,
    duration: movie.runtimeMinutes ? `PT${movie.runtimeMinutes}M` : undefined,
    genre: movie.genres.length ? movie.genres : undefined,
    inLanguage: movie.languages.length ? movie.languages : undefined,
    countryOfOrigin: movie.countries.length
      ? movie.countries.map((name) => ({ "@type": "Country", name }))
      : undefined,
    productionCompany: movie.productionCompanies.length
      ? movie.productionCompanies.map((name) => ({ "@type": "Organization", name }))
      : undefined,
    director: movie.directors.length
      ? movie.directors.map((name) => ({ "@type": "Person", name }))
      : undefined,
    author: movie.writers.length
      ? movie.writers.map((name) => ({ "@type": "Person", name }))
      : undefined,
    actor: movie.cast.length
      ? movie.cast.map((name) => ({ "@type": "Person", name }))
      : undefined,
    contentRating: movie.ageRating,
    image: movie.image,
    sameAs: [movie.sourceUrl, movie.imdbId ? `https://www.imdb.com/title/${movie.imdbId}/` : undefined].filter(Boolean)
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function faqJsonLd(movie: Movie) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: movie.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl("/"),
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl("/search/")}?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl("/"),
    logo: siteUrl("/og-default.svg")
  };
}
