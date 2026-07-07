import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ENDPOINT = "https://query.wikidata.org/sparql";
const TARGET_COUNT = 1000;
const UNAVAILABLE = "Information currently unavailable.";
const BATCH_SIZE = 100;

const listProperties = {
  genres: "P136",
  countries: "P495",
  languages: "P364",
  directors: "P57",
  writers: "P58",
  cast: "P161",
  productionCompanies: "P272",
  awards: "P166",
  ratings: "P1657"
};

const overviewOpeners = [
  (m) => `${m.title} is a ${joinNatural(m.genres, "film")} connected with ${joinNatural(m.countries, "production")} film history.`,
  (m) => `${m.title} brings together ${joinNatural(m.genres, "genre")} elements with a verified creative record that includes ${joinNatural(m.directors, "director information")}.`,
  (m) => `${m.title} is cataloged as a ${joinNatural(m.genres, "movie")} with documented ties to ${joinNatural(m.languages, "language")} cinema.`,
  (m) => `${m.title} stands out in this index because its verified record links it to ${joinNatural(m.countries, "country information")} and ${joinNatural(m.genres, "genre information")}.`
];

const overviewClosers = [
  "This guide focuses on confirmed credits and context, keeping the story overview spoiler-free.",
  "The page is designed for quick discovery without repeating promotional copy or revealing plot turns.",
  "Use it as a compact reference for credits, classification, related actors, and nearby titles.",
  "Every factual item below is drawn from structured source data when available."
];

const faqTemplates = [
  (m) => ({
    question: `What genre is ${m.title}?`,
    answer: m.genres.length ? `${m.title} is associated with ${joinNatural(m.genres)}.` : UNAVAILABLE
  }),
  (m) => ({
    question: `Who directed ${m.title}?`,
    answer: m.directors.length ? `${joinNatural(m.directors)} ${m.directors.length === 1 ? "is" : "are"} listed as director.` : UNAVAILABLE
  }),
  (m) => ({
    question: `Who is in the main cast of ${m.title}?`,
    answer: m.cast.length ? `The main cast listed here includes ${joinNatural(m.cast.slice(0, 6))}.` : UNAVAILABLE
  }),
  (m) => ({
    question: `Where was ${m.title} produced?`,
    answer: m.countries.length ? `${m.title} is connected with ${joinNatural(m.countries)}.` : UNAVAILABLE
  })
];

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function joinNatural(items, fallback = UNAVAILABLE) {
  const clean = items.filter(Boolean);
  if (!clean.length) return fallback;
  if (clean.length === 1) return clean[0];
  if (clean.length === 2) return `${clean[0]} and ${clean[1]}`;
  return `${clean.slice(0, -1).join(", ")}, and ${clean.at(-1)}`;
}

function compactDate(raw) {
  return raw ? raw.slice(0, 10) : undefined;
}

function runtimeToMinutes(raw) {
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? Math.round(n) : undefined;
}

function idsValues(ids) {
  return ids.map((id) => `wd:${id}`).join(" ");
}

async function sparql(query) {
  const url = `${ENDPOINT}?query=${encodeURIComponent(query)}&format=json`;
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const res = await fetch(url, {
        headers: {
          accept: "application/sparql-results+json",
          "user-agent": "MovieIndexProgrammaticSEO/1.0 (https://example.com)"
        }
      });
      if (!res.ok) throw new Error(`Wikidata request failed: ${res.status} ${res.statusText}`);
      const json = await res.json();
      return json.results.bindings;
    } catch (error) {
      if (attempt === 4) throw error;
      await new Promise((resolve) => setTimeout(resolve, attempt * 1200));
    }
  }
  return [];
}

function value(row, key) {
  return row[key]?.value || "";
}

async function fetchSeeds() {
  const query = `
SELECT ?film ?filmLabel ?imdb ?sitelinks WHERE {
  ?film wdt:P31 wd:Q11424;
        wdt:P345 ?imdb;
        wikibase:sitelinks ?sitelinks.
  FILTER(STRSTARTS(?imdb, "tt"))
  FILTER(?sitelinks >= 18)
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". ?film rdfs:label ?filmLabel. }
}
ORDER BY DESC(?sitelinks) ?filmLabel
LIMIT ${TARGET_COUNT + 50}`;
  const rows = await sparql(query);
  return rows.map((row) => ({
    id: value(row, "film").split("/").pop(),
    title: value(row, "filmLabel"),
    imdbId: value(row, "imdb"),
    sourceUrl: value(row, "film"),
    trendingScore: Number(value(row, "sitelinks")) || 0
  })).filter((row) => row.id && row.title && !/^Q\d+$/i.test(row.title)).slice(0, TARGET_COUNT);
}

async function fetchScalars(ids) {
  const query = `
SELECT ?film (SAMPLE(?dateValue) AS ?date) (SAMPLE(?durationValue) AS ?duration) (SAMPLE(?imageValue) AS ?image) WHERE {
  VALUES ?film { ${idsValues(ids)} }
  OPTIONAL { ?film wdt:P577 ?dateValue. }
  OPTIONAL { ?film wdt:P2047 ?durationValue. }
  OPTIONAL { ?film wdt:P18 ?imageValue. }
}
GROUP BY ?film`;
  const rows = await sparql(query);
  const map = new Map();
  for (const row of rows) {
    map.set(value(row, "film").split("/").pop(), {
      releaseDate: compactDate(value(row, "date")),
      runtimeMinutes: runtimeToMinutes(value(row, "duration")),
      image: value(row, "image") || undefined
    });
  }
  return map;
}

async function fetchList(ids, property) {
  const query = `
SELECT ?film ?itemLabel WHERE {
  VALUES ?film { ${idsValues(ids)} }
  ?film wdt:${property} ?item.
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". ?item rdfs:label ?itemLabel. }
}`;
  const rows = await sparql(query);
  const map = new Map();
  for (const row of rows) {
    const id = value(row, "film").split("/").pop();
    const label = value(row, "itemLabel");
    if (!label) continue;
    const list = map.get(id) || [];
    if (!list.includes(label)) list.push(label);
    map.set(id, list);
  }
  return map;
}

function buildMovie(seed, facts, index, slugCounts) {
  const releaseDate = facts.releaseDate;
  const baseSlug = slugify(`${seed.title}-${releaseDate ? releaseDate.slice(0, 4) : seed.id}`);
  const seen = slugCounts.get(baseSlug) || 0;
  slugCounts.set(baseSlug, seen + 1);
  const slug = seen ? `${baseSlug}-${seen + 1}` : baseSlug;
  const opener = overviewOpeners[index % overviewOpeners.length];
  const closer = overviewClosers[(index + seed.title.length) % overviewClosers.length];
  const cast = facts.cast.slice(0, 10);

  const overview = `${opener({
    title: seed.title,
    genres: facts.genres,
    countries: facts.countries,
    languages: facts.languages,
    directors: facts.directors
  })} ${closer}`;

  const sourceFacts = [
    releaseDate ? `Verified release date: ${releaseDate}.` : "",
    facts.runtimeMinutes ? `Verified runtime: ${facts.runtimeMinutes} minutes.` : "",
    facts.directors.length ? `Verified director credit: ${joinNatural(facts.directors)}.` : "",
    facts.productionCompanies.length ? `Verified production company information includes ${joinNatural(facts.productionCompanies.slice(0, 3))}.` : ""
  ].filter(Boolean);

  return {
    id: seed.id,
    slug,
    title: seed.title,
    seoTitle: `${seed.title}${releaseDate ? ` (${releaseDate.slice(0, 4)})` : ""}: Cast, Story, Facts and Similar Movies`,
    metaDescription: `Explore ${seed.title} with verified credits, spoiler-free story context, genres, cast, countries, FAQs, and related movie recommendations.`,
    h1: `${seed.title}: verified movie guide`,
    releaseDate,
    runtimeMinutes: facts.runtimeMinutes,
    genres: facts.genres.slice(0, 12),
    languages: facts.languages.slice(0, 8),
    countries: facts.countries.slice(0, 8),
    productionCompanies: facts.productionCompanies.slice(0, 8),
    directors: facts.directors.slice(0, 8),
    writers: facts.writers.slice(0, 8),
    cast,
    overview,
    keyHighlights: [
      facts.genres.length ? `Genre signals: ${joinNatural(facts.genres.slice(0, 4))}.` : UNAVAILABLE,
      facts.countries.length ? `Country context: ${joinNatural(facts.countries.slice(0, 4))}.` : UNAVAILABLE,
      facts.directors.length ? `Director listing: ${joinNatural(facts.directors.slice(0, 3))}.` : UNAVAILABLE,
      cast.length ? `Recognized cast entries: ${joinNatural(cast.slice(0, 5))}.` : UNAVAILABLE
    ],
    interestingFacts: sourceFacts.length ? sourceFacts : [UNAVAILABLE],
    awards: facts.awards.length ? facts.awards.slice(0, 5) : [UNAVAILABLE],
    ageRating: facts.ratings[0],
    similarMovieSlugs: [],
    relatedActors: cast.slice(0, 6),
    faqs: faqTemplates.map((template) =>
      template({
        title: seed.title,
        genres: facts.genres,
        countries: facts.countries,
        directors: facts.directors,
        cast
      })
    ),
    sourceUrl: seed.sourceUrl,
    imdbId: seed.imdbId,
    image: facts.image,
    trendingScore: seed.trendingScore
  };
}

function attachSimilarMovies(movies) {
  for (const movie of movies) {
    movie.similarMovieSlugs = movies
      .filter((candidate) => candidate.slug !== movie.slug)
      .map((candidate) => {
        const genreOverlap = candidate.genres.filter((item) => movie.genres.includes(item)).length;
        const countryOverlap = candidate.countries.filter((item) => movie.countries.includes(item)).length;
        const actorOverlap = candidate.cast.filter((item) => movie.cast.includes(item)).length;
        return { slug: candidate.slug, score: genreOverlap * 5 + actorOverlap * 3 + countryOverlap * 2 + candidate.trendingScore / 1000 };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((item) => item.slug);
  }
}

async function main() {
  const seeds = await fetchSeeds();
  console.log(`Fetched ${seeds.length} movie seeds`);
  const allFacts = new Map(seeds.map((seed) => [seed.id, {
    releaseDate: undefined,
    runtimeMinutes: undefined,
    image: undefined,
    genres: [],
    countries: [],
    languages: [],
    directors: [],
    writers: [],
    cast: [],
    productionCompanies: [],
    awards: [],
    ratings: []
  }]));

  for (let offset = 0; offset < seeds.length; offset += BATCH_SIZE) {
    const ids = seeds.slice(offset, offset + BATCH_SIZE).map((seed) => seed.id);
    const scalars = await fetchScalars(ids);
    for (const [id, scalar] of scalars) Object.assign(allFacts.get(id), scalar);

    for (const [field, property] of Object.entries(listProperties)) {
      const values = await fetchList(ids, property);
      for (const [id, list] of values) allFacts.get(id)[field] = list;
    }
    console.log(`Fetched facts for ${Math.min(offset + BATCH_SIZE, seeds.length)} movies`);
  }

  const slugCounts = new Map();
  const movies = seeds.slice(0, TARGET_COUNT).map((seed, index) => buildMovie(seed, allFacts.get(seed.id), index, slugCounts));
  attachSimilarMovies(movies);
  await mkdir(path.resolve("data"), { recursive: true });
  await writeFile(path.resolve("data", "movies.json"), `${JSON.stringify(movies, null, 2)}\n`);
  console.log(`Wrote ${movies.length} movies to data/movies.json`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

