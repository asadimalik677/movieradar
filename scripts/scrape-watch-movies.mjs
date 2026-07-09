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

async function fetchStreamingServers(moviePageUrl) {
  try {
    const html = fetchHtmlWithCurl(moviePageUrl);
    if (!html) return [];
    const $ = cheerio.load(html);
    
    const servers = [];
    const seen = new Set();
    
    $('.singcont a[href]').each((i, el) => {
      const href = $(el).attr('href') || '';
      const text = $(el).text().trim();
      if (href && text && href.startsWith('http') && !seen.has(href)) {
        seen.add(href);
        
        // Parse server name and quality from text
        let serverName = "Unknown";
        let quality = "";
        
        if (/pkspeed|pkembed/i.test(text) || /pkembed/i.test(href)) serverName = "PkSpeed";
        else if (/mixdrop/i.test(text) || /mixdrop/i.test(href)) serverName = "MixDrop";
        else if (/clvideo|cloudvideo|do7go/i.test(text) || /do7go/i.test(href)) serverName = "CloudVideo";
        else if (/streamtape/i.test(text) || /streamtape/i.test(href)) serverName = "Streamtape";
        else if (/doodstream|dood/i.test(text) || /dood/i.test(href)) serverName = "DoodStream";
        else if (/filelions/i.test(text) || /filelions/i.test(href)) serverName = "FileLions";
        
        if (/720p/i.test(text)) quality = "720p";
        else if (/480p/i.test(text)) quality = "480p";
        else if (/360p/i.test(text)) quality = "360p";
        else if (/1080p/i.test(text)) quality = "1080p";
        
        servers.push({
          name: serverName,
          quality: quality,
          url: href
        });
      }
    });
    
    return servers;
  } catch (err) {
    return [];
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
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        
        const parsedLanguages = [];
        if (/hindi/i.test(title)) parsedLanguages.push("Hindi");
        if (/punjabi/i.test(title)) parsedLanguages.push("Punjabi");
        if (/english/i.test(title)) parsedLanguages.push("English");
        if (/urdu/i.test(title)) parsedLanguages.push("Urdu");
        if (parsedLanguages.length === 0) parsedLanguages.push("Hindi", "Urdu");
        
        const parsedGenres = ["Movie"];
        if (/season|series|show/i.test(title)) parsedGenres.push("TV Show");
        if (/dubbed/i.test(title)) parsedGenres.push("Dubbed");

        if (!allMovies.find(m => m.slug === slug)) {
          allMovies.push({
            id: slug,
            slug: slug,
            title: title,
            seoTitle: `${title} Watch Online Free Download`,
            metaDescription: `Watch ${title} online in HD print quality free download, watch full movie online.`,
            h1: title,
            image: img,
            overview: `Watch ${title} online in HD print quality. High quality print is available free.`,
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
            imdbId: null, // will be filled below
            trendingScore: 100 - allMovies.length
          });
          pageMoviesFound++;
        }
      }
    });

    console.log(`Found ${pageMoviesFound} new movies on page ${page}. Total so far: ${allMovies.length}`);
    await new Promise(r => setTimeout(r, 1000));
  }

  // Now fetch streaming server links from each movie detail page
  console.log(`\nFetching streaming servers from ${allMovies.length} movie pages...`);
  let serversFound = 0;
  for (let i = 0; i < allMovies.length; i++) {
    const movie = allMovies[i];
    const servers = await fetchStreamingServers(movie.sourceUrl);
    if (servers.length > 0) {
      movie.streamingServers = servers;
      serversFound++;
    }
    if ((i + 1) % 10 === 0) {
      console.log(`Server lookup: ${i + 1}/${allMovies.length} done, ${serversFound} movies with servers`);
    }
    await new Promise(r => setTimeout(r, 500));
  }
  console.log(`Server extraction complete. Found servers for ${serversFound}/${allMovies.length} movies.`);

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

