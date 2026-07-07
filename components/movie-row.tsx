import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { MovieCard } from "@/components/movie-card";
import type { Movie } from "@/lib/types";

export function MovieRow({ title, href, movies }: { title: string; href: string; movies: Movie[] }) {
  return (
    <section className="mx-auto max-w-[1500px] px-4 py-7">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-xl font-black text-white md:text-2xl">{title}</h2>
        <Link href={href} className="inline-flex items-center gap-1 text-sm font-bold text-red-400">
          See All <ChevronRight size={16} />
        </Link>
      </div>
      <div className="poster-row flex gap-4 overflow-x-auto pb-4">
        {movies.map((movie) => (
          <div key={movie.slug} className="w-[190px] shrink-0 sm:w-[220px]">
            <MovieCard movie={movie} compact />
          </div>
        ))}
      </div>
    </section>
  );
}
