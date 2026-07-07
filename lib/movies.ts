import movies from "@/data/movies.json";
import type { FacetItem, Movie } from "@/lib/types";
import { slugify } from "@/lib/slug";

export const allMovies = movies as Movie[];
export const englishMovies = allMovies.filter((movie) => movie.languages.includes("English"));
export const hindiMovies = allMovies.filter((movie) => movie.languages.includes("Hindi") || movie.countries.includes("India"));
export const recentMovies = allMovies.filter((movie) => movie.releaseDate && movie.releaseDate >= "2020-01-01");

export const moviesBySlug = new Map(allMovies.map((movie) => [movie.slug, movie]));

export function getMovie(slug: string) {
  return moviesBySlug.get(slug);
}

export function getLatestMovies(limit?: number) {
  const sorted = [...allMovies].sort((a, b) => {
    const ad = a.releaseDate || "0000-00-00";
    const bd = b.releaseDate || "0000-00-00";
    return bd.localeCompare(ad);
  });
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

export function getHindiMovies(limit?: number) {
  const sorted = [...hindiMovies].sort((a, b) => (b.releaseDate || "").localeCompare(a.releaseDate || ""));
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

export function getEnglishMovies(limit?: number) {
  const sorted = [...englishMovies].sort((a, b) => (b.releaseDate || "").localeCompare(a.releaseDate || ""));
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

export function getTrendingMovies(limit?: number) {
  const sorted = [...allMovies].sort((a, b) => b.trendingScore - a.trendingScore);
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

export function facet(items: string[][]): FacetItem[] {
  const counts = new Map<string, number>();
  for (const group of items) {
    for (const item of group) counts.set(item, (counts.get(item) || 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count, slug: slugify(name) }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export const genreFacets = facet(allMovies.map((movie) => movie.genres));
export const actorFacets = facet(allMovies.map((movie) => movie.cast.slice(0, 8)));
export const countryFacets = facet(allMovies.map((movie) => movie.countries));
export const directorFacets = facet(allMovies.map((movie) => movie.directors));
export const languageFacets = facet(allMovies.map((movie) => movie.languages));
export const studioFacets = facet(allMovies.map((movie) => movie.productionCompanies));
export const yearFacets = facet(allMovies.map((movie) => (movie.releaseDate ? [movie.releaseDate.slice(0, 4)] : [])));

export function moviesForFacet(field: "genres" | "cast" | "countries" | "directors" | "languages" | "productionCompanies", slug: string) {
  return allMovies.filter((movie) => movie[field].some((item) => slugify(item) === slug));
}

export function moviesForYear(year: string) {
  return allMovies.filter((movie) => movie.releaseDate?.startsWith(`${year}-`));
}

export function searchMovies(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return allMovies
    .filter((movie) =>
      [movie.title, movie.overview, ...movie.genres, ...movie.cast, ...movie.directors, ...movie.countries]
        .join(" ")
        .toLowerCase()
        .includes(q)
    )
    .slice(0, 60);
}

export function getSimilarMovies(movie: Movie) {
  return movie.similarMovieSlugs
    .map((slug) => moviesBySlug.get(slug))
    .filter((item): item is Movie => Boolean(item));
}

export function getUpcomingMovies(limit?: number) {
  const today = "2026-07-07";
  const sorted = allMovies
    .filter((movie) => movie.releaseDate && movie.releaseDate > today)
    .sort((a, b) => (a.releaseDate || "").localeCompare(b.releaseDate || ""));
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

export function getPopularMovies(limit?: number) {
  return getTrendingMovies(limit);
}

export function getTopRatedFallback(limit?: number) {
  const sorted = [...allMovies].sort((a, b) => {
    const awardDelta = b.awards.filter((item) => !item.includes("Information")).length - a.awards.filter((item) => !item.includes("Information")).length;
    return awardDelta || b.trendingScore - a.trendingScore;
  });
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}
