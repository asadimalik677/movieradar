"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { MovieGrid } from "@/components/movie-grid";
import { allMovies, countryFacets, genreFacets, languageFacets, yearFacets } from "@/lib/movies";

export function SearchClient() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [year, setYear] = useState("");
  const [sort, setSort] = useState("popular");
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = allMovies
      .filter((movie) =>
        !q || [movie.title, movie.overview, ...movie.genres, ...movie.cast, ...movie.directors, ...movie.countries]
          .join(" ")
          .toLowerCase()
          .includes(q)
      )
      .filter((movie) => !genre || movie.genres.includes(genre))
      .filter((movie) => !country || movie.countries.includes(country))
      .filter((movie) => !language || movie.languages.includes(language))
      .filter((movie) => !year || movie.releaseDate?.startsWith(`${year}-`));

    return filtered
      .sort((a, b) => {
        if (sort === "latest") return (b.releaseDate || "").localeCompare(a.releaseDate || "");
        if (sort === "title") return a.title.localeCompare(b.title);
        return b.trendingScore - a.trendingScore;
      })
      .slice(0, 60);
  }, [query, genre, country, language, year, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-black md:text-5xl">Search movies</h1>
      <label className="mt-6 flex max-w-2xl items-center gap-3 rounded border border-white/10 bg-white/5 px-4 py-3">
        <Search size={20} className="text-zinc-500" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title, actor, director, genre, or country" className="w-full bg-transparent outline-none" />
      </label>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <Select label="Genre" value={genre} onChange={setGenre} options={genreFacets.slice(0, 80).map((item) => item.name)} />
        <Select label="Country" value={country} onChange={setCountry} options={countryFacets.map((item) => item.name)} />
        <Select label="Language" value={language} onChange={setLanguage} options={languageFacets.map((item) => item.name)} />
        <Select label="Year" value={year} onChange={setYear} options={yearFacets.map((item) => item.name)} />
        <Select label="Sort" value={sort} onChange={setSort} options={["popular", "latest", "title"]} />
      </div>
      <p className="mt-4 text-sm text-zinc-500">{results.length} results shown</p>
      <div className="mt-8">
        <MovieGrid movies={results} />
      </div>
    </div>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <label className="grid gap-1 text-sm text-zinc-400">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="rounded border border-white/10 bg-midnight px-3 py-2 text-zinc-100">
        <option value="">Any</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
