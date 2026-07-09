import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AdSlot } from "@/components/ad-slot";
import { MovieGrid } from "@/components/movie-grid";
import { getMovie, getSimilarMovies, allMovies } from "@/lib/movies";
import { breadcrumbJsonLd, faqJsonLd, movieJsonLd, movieMetadata, movieUrl, siteUrl } from "@/lib/seo";
import { slugify } from "@/lib/slug";

const UNAVAILABLE = "Information currently unavailable.";

export function generateStaticParams() {
  return allMovies.map((movie) => ({ slug: movie.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const movie = getMovie(slug);
  if (!movie) return {};
  return movieMetadata(movie);
}

export default async function MoviePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const movie = getMovie(slug);
  if (!movie) notFound();
  const similarMovies = getSimilarMovies(movie);
  const schemas = [
    movieJsonLd(movie),
    faqJsonLd(movie),
    breadcrumbJsonLd([
      { name: "Home", url: siteUrl("/") },
      { name: "Movies", url: siteUrl("/movies/") },
      { name: movie.title, url: movieUrl(movie) }
    ])
  ];
  const readingTime = `${Math.max(2, Math.ceil((movie.overview.split(/\s+/).length + 650) / 220))} min read`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
      <article>
        <section className="border-b border-white/10 bg-black">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="relative aspect-[2/3] max-w-sm overflow-hidden rounded bg-zinc-800 shadow-soft">
              {movie.image ? (
                <Image src={movie.image} alt={movie.title} fill priority sizes="(min-width: 1024px) 32vw, 100vw" className="object-cover" />
              ) : (
                <div className="grid h-full place-items-center px-8 text-center text-zinc-400">Information currently unavailable.</div>
              )}
            </div>
            <div>
              <Breadcrumbs items={[{ label: "Movies" }, { label: movie.title }]} />
              <h1 className="text-4xl font-black md:text-6xl">{movie.h1}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">{movie.overview}</p>
              
              {movie.sourceUrl && (
                <div className="mt-6 flex flex-wrap gap-4">
                  <a
                    href={movie.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-center gap-2 rounded-lg px-8 py-4 font-black text-white text-lg transition-all duration-300 hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, #E50914 0%, #B8070F 100%)",
                      boxShadow: "0 0 30px rgba(229,9,20,0.45)"
                    }}
                  >
                    🎬 Watch &amp; Download Movie
                  </a>
                </div>
              )}

              <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                <Fact label="Release Date" value={movie.releaseDate} />
                <Fact label="Runtime" value={movie.runtimeMinutes ? `${movie.runtimeMinutes} minutes` : undefined} />
                <Fact label="Age Rating" value={movie.ageRating} />
                <Fact label="Reading Time" value={readingTime} />
                <Fact label="IMDb Rating" />
                <Fact label="TMDB Rating" />
                <Fact label="Popularity Score" value={String(movie.trendingScore)} />
                <Fact label="Last Updated" value="2026-07-07" />
                <Fact label="Canonical URL" value={movieUrl(movie)} />
              </dl>
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-10">
            <Block title="Story Overview">
              <p>{movie.overview}</p>
            </Block>
            <AdSlot />
            <Block title="Key Highlights">
              <List items={movie.keyHighlights} />
            </Block>
            <Block title="Movie Analysis">
              <p>
                This page positions {movie.title} through verified discovery signals: genre, country, language, credited creative roles, and related titles. Ratings, budget, revenue, trailers, and streaming links are shown only when official verified data is available.
              </p>
            </Block>
            <Block title="Viewing Recommendation">
              <p>
                Consider {movie.title} if you are exploring {movie.genres.slice(0, 2).join(" and ") || "this type of cinema"} or following work connected to {movie.directors[0] || movie.cast[0] || "its verified creative record"}.
              </p>
            </Block>
            <Block title="Credits and Details">
              <div className="grid gap-4 md:grid-cols-2">
                <Detail label="Genres" items={movie.genres} base="/genres" />
                <Detail label="Languages" items={movie.languages} base="/languages" />
                <Detail label="Countries" items={movie.countries} base="/countries" />
                <Detail label="Production Companies" items={movie.productionCompanies} base="/studios" />
                <Detail label="Director(s)" items={movie.directors} base="/directors" />
                <Detail label="Writer(s)" items={movie.writers} />
                <Detail label="Producer(s)" items={[]} />
                <Detail label="Main Cast" items={movie.cast} base="/actors" />
                <Detail label="Supporting Cast" items={[]} />
                <Detail label="Awards" items={movie.awards} />
                <Detail label="Keywords" items={movie.genres.slice(0, 6)} base="/genres" />
              </div>
            </Block>
            <Block title="Production and Availability">
              <div className="grid gap-4 md:grid-cols-2">
                <Fact label="Original Title" value={movie.title} />
                <Fact label="Tagline" />
                <Fact label="Budget" />
                <Fact label="Revenue" />
                <Fact label="Production Status" />
                <Fact label="Official Trailer" />
                <Fact label="Streaming Availability" />
                <Fact label="Gallery" value={movie.image ? "Poster image available from verified source data." : undefined} />
              </div>
            </Block>
            <Block title="Interesting Facts">
              <List items={movie.interestingFacts} />
            </Block>
            <Block title="FAQs">
              <div className="space-y-4">
                {movie.faqs.map((faq) => (
                  <div key={faq.question} className="rounded border border-white/10 bg-white/5 p-4">
                    <h2 className="font-bold">{faq.question}</h2>
                    <p className="mt-2 text-zinc-300">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </Block>
            {similarMovies.length ? (
              <Block title="Similar Movies">
                <MovieGrid movies={similarMovies.slice(0, 4)} />
              </Block>
            ) : null}
          </div>
          <aside className="space-y-6">
            <SidePanel title="Internal Links">
              <SideLink href="/latest/" label="Latest Movies" />
              <SideLink href="/trending/" label="Trending Movies" />
              <SideLink href="/popular/" label="Popular Movies" />
              <SideLink href="/top-rated/" label="Top Rated Movies" />
              <SideLink href="/genres/" label="All Genres" />
              <SideLink href="/actors/" label="All Actors" />
              <SideLink href="/directors/" label="All Directors" />
              <SideLink href="/countries/" label="All Countries" />
              <SideLink href="/languages/" label="All Languages" />
            </SidePanel>
            <SidePanel title="Share">
              <SideLink href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(movieUrl(movie))}`} label="Share on X" />
              <SideLink href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(movieUrl(movie))}`} label="Share on Facebook" />
            </SidePanel>
            <SidePanel title="Related Actors">
              {movie.relatedActors.length ? (
                movie.relatedActors.map((actor) => <SideLink key={actor} href={`/actors/${slugify(actor)}/`} label={actor} />)
              ) : (
                <p className="text-sm text-zinc-500">{UNAVAILABLE}</p>
              )}
            </SidePanel>
            <SidePanel title="Source">
              <a href={movie.sourceUrl} className="text-sm font-semibold text-ember" rel="nofollow">Verified Wikidata record</a>
              {movie.imdbId ? <a href={`https://www.imdb.com/title/${movie.imdbId}/`} className="block text-sm font-semibold text-ember" rel="nofollow">IMDb identifier</a> : null}
            </SidePanel>
          </aside>
        </div>
      </article>
    </>
  );
}

function Fact({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded border border-white/15 bg-white/5 p-4">
      <dt className="text-sm text-zinc-400">{label}</dt>
      <dd className="mt-1 break-words font-bold">{value || UNAVAILABLE}</dd>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-black">{title}</h2>
      <div className="leading-7 text-zinc-300">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3">
      {items.length ? items.map((item) => <li key={item} className="rounded border border-white/10 bg-white/5 p-4">{item}</li>) : <li>{UNAVAILABLE}</li>}
    </ul>
  );
}

function Detail({ label, items, base }: { label: string; items: string[]; base?: string }) {
  return (
    <div className="rounded border border-white/10 bg-white/5 p-4">
      <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-500">{label}</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.length ? items.map((item) => base ? (
          <Link key={item} href={`${base}/${slugify(item)}/`} className="rounded bg-white/10 px-2 py-1 text-sm font-medium hover:text-ember">{item}</Link>
        ) : (
          <span key={item} className="rounded bg-white/10 px-2 py-1 text-sm font-medium">{item}</span>
        )) : <span>{UNAVAILABLE}</span>}
      </div>
    </div>
  );
}

function SidePanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded border border-white/10 bg-white/5 p-4">
      <h2 className="mb-3 font-black">{title}</h2>
      <div className="grid gap-2">{children}</div>
    </section>
  );
}

function SideLink({ href, label }: { href: string; label: string }) {
  return <Link href={href} className="text-sm font-semibold text-ember">{label}</Link>;
}
