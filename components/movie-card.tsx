import Image from "next/image";
import Link from "next/link";
import { Play, Star } from "lucide-react";
import type { Movie } from "@/lib/types";

/** Convert Wikimedia Special:FilePath redirect → direct upload.wikimedia.org URL */
function fixImageUrl(url?: string): string | undefined {
  if (!url) return undefined;
  // Already a direct upload URL
  if (url.includes("upload.wikimedia.org")) return url;
  // Convert Special:FilePath to thumb URL
  if (url.includes("Special:FilePath/") || url.includes("commons.wikimedia.org")) {
    try {
      const decoded = decodeURIComponent(url.split("Special:FilePath/").pop() || url.split("/").pop() || "");
      const filename = decoded.replace(/ /g, "_");
      // Use Wikimedia thumbnail API: /thumb/hash/hash/filename/400px-filename
      return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=400`;
    } catch {
      return url;
    }
  }
  return url;
}

export function MovieCard({ movie, compact = false }: { movie: Movie; compact?: boolean }) {
  const imageUrl = fixImageUrl(movie.image);
  return (
    <article className="group min-w-0 overflow-hidden rounded-xl bg-[#141414] border border-white/[0.07] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_0_1px_rgba(229,9,20,0.35)]">
      <Link href={`/movies/${movie.slug}/`} className="block">
        {/* Poster / Thumbnail */}
        <div className={compact ? "relative aspect-[2/3] bg-zinc-900" : "relative aspect-[16/10] bg-zinc-900"}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={movie.title}
              fill
              sizes="(min-width: 1024px) 22vw, (min-width: 640px) 42vw, 86vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="grid h-full place-items-center bg-gradient-to-br from-zinc-900 via-[#1a1a1a] to-black px-6 text-center text-sm text-zinc-600">
              <div>
                <div className="text-netflix-red text-2xl mb-2">🎬</div>
                <span>Coming Soon</span>
              </div>
            </div>
          )}

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

          {/* Year Badge */}
          <div className="absolute left-2.5 top-2.5 rounded-md bg-black/70 px-2 py-0.5 text-xs font-bold text-amber-300 backdrop-blur-sm border border-amber-300/20">
            {movie.releaseDate?.slice(0, 4) || "New"}
          </div>

          {/* Rating / Genre badge */}
          {movie.genres?.[0] && (
            <div className="absolute right-2.5 top-2.5 rounded-md bg-netflix-red/80 px-2 py-0.5 text-xs font-bold text-white backdrop-blur-sm">
              {movie.genres[0]}
            </div>
          )}

          {/* Play button on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div
              className="flex size-14 items-center justify-center rounded-full border-2 border-white/80 text-white transition-transform duration-200 hover:scale-110"
              style={{ background: "rgba(229,9,20,0.85)", boxShadow: "0 0 30px rgba(229,9,20,0.5)" }}
            >
              <Play size={22} fill="currentColor" />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-2 p-3">
          <h2 className="line-clamp-2 text-sm font-bold text-white group-hover:text-netflix-red transition-colors duration-200 leading-snug">
            {movie.title}
          </h2>

          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Star size={10} className="text-amber-400" fill="currentColor" />
            <span>{movie.genres.slice(0, 2).join(" · ") || "Movie"}</span>
          </div>

          {!compact && (
            <p className="line-clamp-2 text-xs leading-5 text-zinc-400">{movie.overview}</p>
          )}

          <div className="flex flex-wrap gap-1.5 pt-0.5">
            <span className="rounded bg-white/[0.08] px-2 py-0.5 text-[11px] font-semibold text-zinc-300">
              {movie.runtimeMinutes ? `${movie.runtimeMinutes}m` : "HD"}
            </span>
            <span
              className="rounded px-2 py-0.5 text-[11px] font-semibold text-red-200"
              style={{ background: "rgba(229,9,20,0.2)" }}
            >
              {movie.languages[0] || "Info"}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
