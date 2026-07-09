import Image from "next/image";
import Link from "next/link";
import { Info, Play, Star, TrendingUp } from "lucide-react";
import { MovieRow } from "@/components/movie-row";
import {
  allMovies,
  genreFacets,
  getEnglishMovies,
  getHindiMovies,
  getLatestMovies,
  getPopularMovies,
  getTrendingMovies,
} from "@/lib/movies";

export default function HomePage() {
  const latest  = getLatestMovies(14);
  const trending = getTrendingMovies(14);
  const popular  = getPopularMovies(14);
  const hindi    = getHindiMovies(14);
  const english  = getEnglishMovies(14);
  const hero     = hindi[0] || latest[0];

  return (
    <div className="bg-black min-h-screen">

      {/* ══════════════════════════════════════════════
          HERO — Netflix-style cinematic section
      ══════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] overflow-hidden bg-black">
        {/* Background image */}
        {hero?.image ? (
          <Image
            src={hero.image}
            alt={hero.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 25% 20%, rgba(229,9,20,0.35) 0%, transparent 40%), radial-gradient(circle at 75% 10%, rgba(245,158,11,0.15) 0%, transparent 30%), linear-gradient(135deg, #1a0a0a, #0a0a0a 55%, #000)",
            }}
          />
        )}

        {/* Left gradient overlay — Netflix style */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.75) 45%, rgba(0,0,0,0.05) 100%)",
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-56"
          style={{
            background: "linear-gradient(to top, #000000 0%, rgba(0,0,0,0.5) 50%, transparent 100%)",
          }}
        />

        {/* Hero content */}
        <div className="relative mx-auto flex min-h-[90vh] max-w-[1500px] items-center px-4 py-28">
          <div className="max-w-2xl space-y-5 animate-fade-in">

            {/* Category pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-netflix-red/40 px-4 py-1.5 text-xs font-bold text-red-200"
              style={{ background: "rgba(229,9,20,0.12)" }}
            >
              <TrendingUp size={13} />
              #1 in Hindi Movies Today
            </div>

            {/* Title */}
            <h1
              className="text-5xl font-black leading-tight text-white md:text-7xl"
              style={{ textShadow: "2px 4px 20px rgba(0,0,0,0.8)" }}
            >
              {hero?.title || "MovieRadar"}
            </h1>

            {/* Meta info row */}
            <div className="flex flex-wrap items-center gap-3 text-sm font-semibold">
              <span className="text-green-400 font-bold">97% Match</span>
              <span className="text-zinc-300">{hero?.releaseDate?.slice(0, 4) || "2026"}</span>
              <span className="rounded border border-zinc-500 px-1.5 py-0.5 text-xs text-zinc-300">HD</span>
              <span className="text-zinc-300">{hero?.languages?.join(" / ") || "Hindi / English"}</span>
              {hero?.runtimeMinutes && (
                <span className="text-zinc-300">{hero.runtimeMinutes} min</span>
              )}
            </div>

            {/* Overview */}
            <p className="max-w-lg text-base leading-7 text-zinc-200 line-clamp-3">
              {hero?.overview ||
                "Discover fresh Hindi and English movies with verified basics, spoiler-free summaries, and fast streaming-style browsing."}
            </p>

            {/* Buttons — Netflix style */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href={hero ? `/movies/${hero.slug}/` : "/movies/"}
                className="inline-flex items-center gap-2 rounded-md bg-white px-7 py-3 font-black text-black text-base transition-all duration-200 hover:bg-zinc-200"
              >
                <Play size={20} fill="currentColor" /> Play
              </Link>
              <Link
                href={hero ? `/movies/${hero.slug}/` : "/search/"}
                className="inline-flex items-center gap-2 rounded-md px-7 py-3 font-bold text-white text-base transition-all duration-200 hover:bg-white/20"
                style={{ background: "rgba(109,109,110,0.65)", backdropFilter: "blur(4px)" }}
              >
                <Info size={20} /> More Info
              </Link>
              <Link
                href="/search/"
                className="inline-flex items-center gap-2 rounded-md px-7 py-3 font-bold text-white text-base transition-all duration-200 hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #E50914 0%, #B8070F 100%)", boxShadow: "0 0 20px rgba(229,9,20,0.35)" }}
              >
                Browse All
              </Link>
            </div>
          </div>
        </div>

        {/* Netflix-style rating badge — bottom left */}
        <div className="absolute bottom-28 left-4 hidden md:flex items-center gap-2 text-sm font-bold text-zinc-300">
          <Star size={14} className="text-amber-400" fill="currentColor" />
          <span>Premium Hindi &amp; English Discovery</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          MOVIE ROWS
      ══════════════════════════════════════════════ */}
      <div className="space-y-2 py-4">
        <MovieRow title="🔥 Trending Now" href="/trending/" movies={trending} />
        {hindi.length > 0 && (
          <MovieRow title="🎬 New Hindi Movies" href="/languages/hindi/" movies={hindi} />
        )}
        <MovieRow title="🌍 New English Movies" href="/languages/english/" movies={english} />
        <MovieRow title="🆕 Latest Releases" href="/latest/" movies={latest} />
        <MovieRow title="⭐ Popular Right Now" href="/popular/" movies={popular} />
      </div>

      {/* ══════════════════════════════════════════════
          BROWSE GENRES — Netflix-style grid
      ══════════════════════════════════════════════ */}
      <section className="mx-auto max-w-[1500px] px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className="h-6 w-1 rounded-full"
              style={{ background: "linear-gradient(180deg, #E50914, #B8070F)" }}
            />
            <h2 className="text-2xl font-black text-white">Browse Genres</h2>
          </div>
          <Link
            href="/genres/"
            className="text-sm font-bold text-zinc-400 hover:text-netflix-red transition-colors"
          >
            See All →
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {genreFacets.slice(0, 12).map((genre) => (
            <Link
              key={genre.slug}
              href={`/genres/${genre.slug}/`}
              className="group relative overflow-hidden rounded-xl border border-white/[0.07] px-5 py-4 font-bold text-zinc-200 transition-all duration-300 hover:border-netflix-red/60 hover:-translate-y-1"
              style={{ background: "#141414" }}
            >
              <span className="relative z-10">{genre.name}</span>
              {/* Hover gradient */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(135deg, rgba(229,9,20,0.12) 0%, transparent 60%)" }}
              />
              <div
                className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300 rounded-full"
                style={{ background: "linear-gradient(90deg, #E50914, transparent)" }}
              />
            </Link>
          ))}
        </div>

        <p className="mt-8 text-sm text-zinc-600">
          {allMovies.length} recent Hindi/English movie guides available.
        </p>
      </section>
    </div>
  );
}
