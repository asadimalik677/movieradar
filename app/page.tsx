import Link from "next/link";
import { ArrowRight, Clapperboard, Globe2, Sparkles } from "lucide-react";
import { AdSlot } from "@/components/ad-slot";
import { MovieGrid } from "@/components/movie-grid";
import { Section } from "@/components/section";
import { allMovies, genreFacets, getLatestMovies, getPopularMovies, getTopRatedFallback, getTrendingMovies, getUpcomingMovies } from "@/lib/movies";

export default function HomePage() {
  const latest = getLatestMovies(8);
  const trending = getTrendingMovies(8);
  const popular = getPopularMovies(8);
  const topRated = getTopRatedFallback(8);
  const upcoming = getUpcomingMovies(8);

  return (
    <>
      <section className="border-b border-black/10 bg-ink text-paper dark:border-white/10 dark:bg-black">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-300">Verified programmatic movie guides</p>
            <h1 className="max-w-4xl text-4xl font-black md:text-6xl">Browse {allMovies.length.toLocaleString()} movie pages built for clean discovery.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
              Search films by cast, genre, country, release context, and related titles using source-backed data and original spoiler-free summaries.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/search/" className="rounded bg-ember px-5 py-3 font-bold text-white">Search movies</Link>
              <Link href="/trending/" className="rounded border border-white/20 px-5 py-3 font-bold">Trending movies</Link>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
            <Stat icon={<Clapperboard size={18} />} label="Movies" value={allMovies.length.toLocaleString()} />
            <Stat icon={<Sparkles size={18} />} label="Genres" value={genreFacets.length.toLocaleString()} />
            <Stat icon={<Globe2 size={18} />} label="Static pages" value="Cloudflare ready" />
          </div>
        </div>
      </section>

      <Section title="Latest Movies" eyebrow="Fresh by release date">
        <MovieGrid movies={latest} />
        <More href="/latest/" />
      </Section>

      <Section title="Trending Movies" eyebrow="Most connected titles">
        <MovieGrid movies={trending} />
        <More href="/trending/" />
      </Section>

      <section className="mx-auto max-w-7xl px-4">
        <AdSlot />
      </section>

      <Section title="Popular Movies" eyebrow="Audience discovery">
        <MovieGrid movies={popular} />
        <More href="/popular/" />
      </Section>

      <Section title="Top Rated" eyebrow="Verified ratings shown when available">
        <MovieGrid movies={topRated} />
        <More href="/top-rated/" />
      </Section>

      <Section title="Upcoming Movies" eyebrow="Future verified release dates">
        {upcoming.length ? <MovieGrid movies={upcoming} /> : <div className="cinematic-panel rounded p-6 text-zinc-300">Information currently unavailable.</div>}
        <More href="/upcoming/" />
      </Section>

      <Section title="Popular TV Shows" eyebrow="TV architecture ready">
        <div className="cinematic-panel rounded p-6 text-zinc-300">Information currently unavailable.</div>
        <More href="/tv/" />
      </Section>

      <Section title="Genres" eyebrow="Browse cinematic categories">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {genreFacets.slice(0, 12).map((genre) => (
            <Link key={genre.slug} href={`/genres/${genre.slug}/`} className="rounded border border-white/10 bg-white/[0.04] px-4 py-3 font-semibold hover:border-ember">
              {genre.name}
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded border border-white/15 bg-white/5 p-4">
      <div className="mb-3 text-amber-300">{icon}</div>
      <p className="text-sm text-zinc-400">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

function More({ href }: { href: string }) {
  return (
    <div className="mt-6">
      <Link href={href} className="inline-flex items-center gap-2 font-bold text-ember">
        View all <ArrowRight size={16} />
      </Link>
    </div>
  );
}
