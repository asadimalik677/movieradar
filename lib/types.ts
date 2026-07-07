export type Movie = {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  releaseDate?: string;
  runtimeMinutes?: number;
  genres: string[];
  languages: string[];
  countries: string[];
  productionCompanies: string[];
  directors: string[];
  writers: string[];
  cast: string[];
  overview: string;
  keyHighlights: string[];
  interestingFacts: string[];
  awards: string[];
  ageRating?: string;
  similarMovieSlugs: string[];
  relatedActors: string[];
  faqs: Array<{ question: string; answer: string }>;
  sourceUrl: string;
  imdbId?: string;
  image?: string;
  trendingScore: number;
};

export type FacetItem = {
  name: string;
  slug: string;
  count: number;
};
