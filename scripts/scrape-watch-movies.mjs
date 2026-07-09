import * as cheerio from "cheerio";
import { execSync } from "child_process";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import path from "path";

const PAGES_TO_SCRAPE = 10;
const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

function fetchHtmlWithCurl(url) {
  try {
    const cmd = `curl.exe -s -A "${USER_AGENT}" -H "Accept: text/html" "${url}"`;
    const result = execSync(cmd, { encoding: "utf-8", stdio: ["pipe", "pipe", "ignore"] });
    return result;
  } catch (err) {
    console.error(`Failed to curl ${url}:`, err.message);
    return null;
  }
}

async function scrapeMovies() {
  const allMovies = [];
  console.log(`Starting to scrape up to ${PAGES_TO_SCRAPE} pages from watch-movies.com.pk...`);

  for (let page = 1; page <= PAGES_TO_SCRAPE; page++) {
    const url = page === 1 ? "https://www.watch-movies.com.pk/" : `https://www.watch-movies.com.pk/page/${page}/`;
    console.log(`Scraping Page ${page}: ${url}`);
    
    const html = fetchHtmlWithCurl(url);
    if (!html) {
      console.log(`Skipping page ${page} due to fetch error.`);
      continue;
    }

    const $ = cheerio.load(html);
    let pageMoviesFound = 0;

    $('img.wp-post-image').each((i, el) => {
      const parentLink = $(el).closest('a');
      const link = parentLink.attr('href');
      let title = $(el).attr('alt') || "";
      
      // Remove generic text from alt
      title = title.replace(/Watch Online Movies/gi, "").trim();
      
      const img = $(el).attr('data-wpfc-original-src') || $(el).attr('src');

      if (link && title && img) {
        // Generate a slug from title
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        
        // Parse languages from title
        const parsedLanguages = [];
        if (/hindi/i.test(title)) parsedLanguages.push("Hindi");
        if (/punjabi/i.test(title)) parsedLanguages.push("Punjabi");
        if (/english/i.test(title)) parsedLanguages.push("English");
        if (/urdu/i.test(title)) parsedLanguages.push("Urdu");
        if (parsedLanguages.length === 0) parsedLanguages.push("Hindi", "Urdu"); // default
        
        // Parse genres from title (e.g. Dubbed, Season, Series, Show)
        const parsedGenres = ["Movie"];
        if (/season|series|show/i.test(title)) parsedGenres.push("TV Show");
        if (/dubbed/i.test(title)) parsedGenres.push("Dubbed");

        // Ensure no duplicates
        if (!allMovies.find(m => m.slug === slug)) {
          allMovies.push({
            id: slug,
            slug: slug,
            title: title,
            seoTitle: `${title} Watch Online Free Download`,
            metaDescription: `Watch ${title} online in HD print quality free download, watch full movie online.`,
            h1: title,
            image: img,
            overview: `Watch ${title} online. Source: watch-movies.com.pk. High quality print is available.`,
            releaseDate: title.match(/\d{4}/) ? title.match(/\d{4}/)[0] : "2024",
            runtimeMinutes: 120,
            genres: parsedGenres,
            languages: parsedLanguages,
            countries: parsedLanguages.includes("Hindi") ? ["India"] : ["Pakistan"],
            productionCompanies: ["Unknown Studio"],
            directors: ["Unknown Director"],
            writers: ["Unknown Writer"],
            cast: ["Unknown Cast"],
            keyHighlights: [],
            interestingFacts: [],
            awards: [],
            similarMovieSlugs: [],
            relatedActors: [],
            faqs: [],
            sourceUrl: link,
            trendingScore: 100 - allMovies.length // Give earlier scraped movies higher trending score
          });
          pageMoviesFound++;
        }
      }
    });

    console.log(`Found ${pageMoviesFound} new movies on page ${page}. Total so far: ${allMovies.length}`);
    
    // Slight delay to avoid being rate limited
    await new Promise(r => setTimeout(r, 1000));
  }

  // Save to data/movies.json
  const dataDir = path.join(process.cwd(), "data");
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }

  const outputPath = path.join(dataDir, "movies.json");
  writeFileSync(outputPath, JSON.stringify(allMovies, null, 2), "utf-8");
  console.log(`\nSuccessfully scraped ${allMovies.length} movies and saved to data/movies.json`);
}

scrapeMovies();
