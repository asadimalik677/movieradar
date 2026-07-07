import type { Movie } from "@/lib/types";
import { MovieCard } from "@/components/movie-card";

export function MovieGrid({ movies }: { movies: Movie[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard key={movie.slug} movie={movie} />
      ))}
    </div>
  );
}
