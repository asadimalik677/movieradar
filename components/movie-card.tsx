import Image from "next/image";
import Link from "next/link";
import type { Movie } from "@/lib/types";

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <article className="group overflow-hidden rounded border border-white/10 bg-white/[0.04] shadow-sm">
      <Link href={`/movies/${movie.slug}/`} className="block">
        <div className="relative aspect-[16/10] bg-zinc-800">
          {movie.image ? (
            <Image src={movie.image} alt={movie.title} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" loading="lazy" />
          ) : (
            <div className="grid h-full place-items-center px-6 text-center text-sm text-zinc-500">Information currently unavailable.</div>
          )}
        </div>
        <div className="space-y-3 p-4">
          <div>
            <h2 className="line-clamp-2 text-base font-bold group-hover:text-ember">{movie.title}</h2>
            <p className="mt-1 text-xs text-zinc-500">{movie.releaseDate || "Information currently unavailable."}</p>
          </div>
          <p className="line-clamp-3 text-sm leading-6 text-zinc-300">{movie.overview}</p>
          <div className="flex flex-wrap gap-2">
            {movie.genres.slice(0, 3).map((genre) => (
              <span key={genre} className="rounded bg-moss/30 px-2 py-1 text-xs font-medium text-emerald-100">
                {genre}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}

