import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import type { Movie } from "@/lib/types";

export function MovieCard({ movie, compact = false }: { movie: Movie; compact?: boolean }) {
  return (
    <article className="group min-w-0 overflow-hidden rounded-xl border border-white/10 bg-[#121217] shadow-2xl shadow-black/30 transition duration-300 hover:-translate-y-1 hover:border-red-500/60 hover:shadow-red-950/30">
      <Link href={`/movies/${movie.slug}/`} className="block">
        <div className={compact ? "relative aspect-[2/3] bg-zinc-900" : "relative aspect-[16/10] bg-zinc-900"}>
          {movie.image ? (
            <Image src={movie.image} alt={movie.title} fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 42vw, 86vw" className="object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
          ) : (
            <div className="grid h-full place-items-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-black px-6 text-center text-sm text-zinc-500">Information currently unavailable.</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
          <div className="absolute left-3 top-3 rounded-full bg-black/70 px-2 py-1 text-xs font-bold text-amber-300">
            {movie.releaseDate?.slice(0, 4) || "New"}
          </div>
          <div className="absolute bottom-3 right-3 grid size-9 place-items-center rounded-full bg-red-600 text-white opacity-0 shadow-lg transition group-hover:opacity-100">
            <Play size={16} fill="currentColor" />
          </div>
        </div>
        <div className="space-y-3 p-4">
          <div>
            <h2 className="line-clamp-2 text-base font-black text-white group-hover:text-red-400">{movie.title}</h2>
            <p className="mt-1 text-xs text-zinc-500">{movie.genres.slice(0, 2).join(" / ") || "Movie"}</p>
          </div>
          {!compact ? <p className="line-clamp-2 text-sm leading-6 text-zinc-300">{movie.overview}</p> : null}
          <div className="flex flex-wrap gap-2">
            <span className="rounded bg-white/10 px-2 py-1 text-xs font-bold text-zinc-200">{movie.runtimeMinutes ? `${movie.runtimeMinutes}m` : "HD"}</span>
            <span className="rounded bg-red-600/20 px-2 py-1 text-xs font-bold text-red-200">{movie.languages[0] || "Info"}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
