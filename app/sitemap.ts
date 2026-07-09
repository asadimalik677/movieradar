import type { MetadataRoute } from "next";
import { allMovies, actorFacets, countryFacets, directorFacets, genreFacets, languageFacets, studioFacets, yearFacets } from "@/lib/movies";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/movies/",
    "/tv/",
    "/search/",
    "/genres/",
    "/actors/",
    "/directors/",
    "/countries/",
    "/languages/",
    "/years/",
    "/studios/",
    "/latest/",
    "/trending/",
    "/popular/",
    "/upcoming/",
    "/top-rated/",
    "/about/",
    "/privacy/",
    "/terms/",
    "/contact/"
  ].map((path) => ({
    url: siteUrl(path),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8
  }));

  const movieRoutes = allMovies.map((movie) => ({
    url: siteUrl(`/movies/${movie.slug}/`),
    lastModified: movie.releaseDate || undefined,
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  const facetRoutes = [
    ...genreFacets.map((item) => `/genres/${item.slug}/`),
    ...actorFacets.slice(0, 500).map((item) => `/actors/${item.slug}/`),
    ...directorFacets.slice(0, 500).map((item) => `/directors/${item.slug}/`),
    ...countryFacets.map((item) => `/countries/${item.slug}/`),
    ...languageFacets.map((item) => `/languages/${item.slug}/`),
    ...yearFacets.map((item) => `/years/${item.slug}/`),
    ...studioFacets.slice(0, 500).map((item) => `/studios/${item.slug}/`)
  ]
    .filter((path) => !path.includes("unknown-cast") && !path.includes("unknown-director") && !path.includes("unknown-studio"))
    .map((path) => ({
      url: siteUrl(path),
      changeFrequency: "weekly" as const,
      priority: 0.6
    }));

  return [...staticRoutes, ...movieRoutes, ...facetRoutes];
}
