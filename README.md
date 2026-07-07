# Movie Index Programmatic SEO

A production-oriented Next.js 15 App Router website that generates 1,000 static movie pages from verified Wikidata fields and original page copy.

## Commands

```bash
npm install
npm run generate:data
npm run build
```

Cloudflare Pages can build with:

```bash
npm install && npm run generate:data && npm run build
```

Set `NEXT_PUBLIC_SITE_URL` to your production domain for canonical URLs, sitemap entries, and feed links.

## Automated Updates

`.github/workflows/catalog-update.yml` runs every 6 hours. It regenerates verified catalog data, builds the static export, logs update status in `work/update-logs`, and uploads the `out` folder as a deployable Cloudflare Pages artifact. Connect the repository to Cloudflare Pages for automatic deployment after successful builds.
