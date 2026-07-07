import { getLatestMovies } from "@/lib/movies";
import { movieUrl, siteDescription, siteName, siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const items = getLatestMovies(50)
    .map((movie) => `
      <item>
        <title>${escapeXml(movie.title)}</title>
        <link>${movieUrl(movie)}</link>
        <guid>${movieUrl(movie)}</guid>
        <description>${escapeXml(movie.metaDescription)}</description>
        ${movie.releaseDate ? `<pubDate>${new Date(movie.releaseDate).toUTCString()}</pubDate>` : ""}
      </item>`)
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>${escapeXml(siteName)}</title>
        <link>${siteUrl("/")}</link>
        <description>${escapeXml(siteDescription)}</description>
        ${items}
      </channel>
    </rss>`;

  return new Response(xml, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8"
    }
  });
}
