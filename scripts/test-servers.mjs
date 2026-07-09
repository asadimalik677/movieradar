import * as cheerio from "cheerio";
import { readFileSync } from "fs";

const html = readFileSync("temp_movie2.html", "utf-8");
const $ = cheerio.load(html);

// Find all download/streaming links
const servers = [];
$('.singcont a[href]').each((i, el) => {
  const href = $(el).attr('href') || '';
  const text = $(el).text().trim();
  if (href && text && href.startsWith('http')) {
    servers.push({ text, href });
  }
});

console.log(`Found ${servers.length} server links:`);
console.log(JSON.stringify(servers, null, 2));
