import Image from "next/image";
import Link from "next/link";
import { Info, Play, Plus, Star } from "lucide-react";
import { MovieRow } from "@/components/movie-row";
import { allMovies, genreFacets, getEnglishMovies, getHindiMovies, getLatestMovies, getPopularMovies, getTrendingMovies } from "@/lib/movies";

export default function HomePage() {
  const latest = getLatestMovies(14);
  const trending = getTrendingMovies(14);
  const popular = getPopularMovies(14);
  const hindi = getHindiMovies(14);
  const english = getEnglishMovies(14);
  const hero = hindi[0] || latest[0];

  return (
    <>
      <section className="relative min-h-[78vh] overflow-hidden border-b border-white/10 bg-black">
        {hero?.image ? (
          <Image src={hero.image} alt={hero.title} fill priority sizes="100vw" className="object-cover opacity-45" />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(220,38,38,0.38),transparent_34%),radial-gradient(circle_at_75%_10%,rgba(245,158,11,0.18),transparent_30%),linear-gradient(135deg,#111827,#050507_55%,#000)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#050507] to-transparent" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-[1500px] items-center px-4 py-24">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-600/15 px-4 py-2 text-sm font-bold text-red-100">
              <Star size={16} fill="currentColor" /> Premium Hindi & English discovery
            </div>
            <h1 className="text-5xl font-black leading-tight text-white md:text-7xl">{hero?.title || "MovieRadar"}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-200 md:text-xl">
              {hero?.overview || "Discover fresh Hindi and English movies with verified basics, spoiler-free summaries, and fast streaming-style browsing."}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-bold text-zinc-300">
              <span className="rounded bg-red-600 px-2 py-1 text-white">HD</span>
              <span>{hero?.releaseDate?.slice(0, 4) || "2026"}</span>
              <span>{hero?.languages.join(" / ") || "Hindi / English"}</span>
              <span>{hero?.runtimeMinutes ? `${hero.runtimeMinutes} min` : "Runtime info on detail page"}</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={hero ? `/movies/${hero.slug}/` : "/movies/"} className="inline-flex items-center gap-2 rounded bg-white px-6 py-3 font-black text-black hover:bg-zinc-200">
                <Play size={18} fill="currentColor" /> Play
              </Link>
              <Link href={hero ? `/movies/${hero.slug}/` : "/search/"} className="inline-flex items-center gap-2 rounded bg-white/15 px-6 py-3 font-black text-white ring-1 ring-white/15 backdrop-blur hover:bg-white/25">
                <Info size={18} /> More Info
              </Link>
              <Link href="/search/" className="inline-flex items-center gap-2 rounded bg-red-600 px-6 py-3 font-black text-white hover:bg-red-500">
                <Plus size={18} /> Browse All
              </Link>
            </div>
          </div>
        </div>
      </section>

      <MovieRow title="Trending Movies" href="/trending/" movies={trending} />
      {hindi.length ? <MovieRow title="New Hindi Movies" href="/languages/hindi/" movies={hindi} /> : null}
      <MovieRow title="New English Movies" href="/languages/english/" movies={english} />
      <MovieRow title="Latest Releases" href="/latest/" movies={latest} />
      <MovieRow title="Popular Right Now" href="/popular/" movies={popular} />

      <section className="mx-auto max-w-[1500px] px-4 py-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-black">Browse Genres</h2>
          <Link href="/genres/" className="text-sm font-bold text-red-400">See All</Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {genreFacets.slice(0, 12).map((genre) => (
            <Link key={genre.slug} href={`/genres/${genre.slug}/`} className="rounded-xl border border-white/10 bg-white/[0.055] px-5 py-4 font-bold text-zinc-100 transition hover:border-red-500/60 hover:bg-red-600/10">
              {genre.name}
            </Link>
          ))}
        </div>
        <p className="mt-8 text-sm text-zinc-500">{allMovies.length} recent Hindi/English movie guides available.</p>
      </section>
    </>
  );
}
