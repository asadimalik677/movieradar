export type TvShow = {
  id: string;
  slug: string;
  title: string;
  overview: string;
  seasons?: number;
  episodes?: number;
  network?: string;
  creators: string[];
  cast: string[];
};

export const tvShows: TvShow[] = [];

export function getTvShow(slug: string) {
  return tvShows.find((show) => show.slug === slug);
}
