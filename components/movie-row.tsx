import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { MovieCard } from "@/components/movie-card";
import type { Movie } from "@/lib/types";

export function MovieRow({ title, href, movies }: { title: string; href: string; movies: Movie[] }) {
  return (
    <section className="mx-auto max-w-[1500px] px-4 py-8">
      {/* Section Header */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Red accent bar */}
          <span
            className="h-6 w-1 rounded-full"
            style={{ background: "linear-gradient(180deg, #E50914, #B8070F)" }}
          />
          <h2 className="text-xl font-black text-white md:text-2xl tracking-tight">{title}</h2>
        </div>
        <Link
          href={href}
          className="group inline-flex items-center gap-1 text-sm font-bold text-zinc-400 transition-all duration-200 hover:text-netflix-red"
        >
          See All
          <ChevronRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>

      {/* Movie Cards Row */}
      <div className="poster-row flex gap-4 overflow-x-auto pb-3">
        {movies.map((movie) => (
          <div key={movie.slug} className="w-[160px] shrink-0 sm:w-[200px]">
            <MovieCard movie={movie} compact />
          </div>
        ))}
      </div>
    </section>
  );
}
