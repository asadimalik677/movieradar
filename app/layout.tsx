import type { Metadata } from "next";
import Link from "next/link";
import { Film, Menu, Search } from "lucide-react";
import "@/app/globals.css";
import { ThemeToggle } from "@/components/theme-toggle";
import { organizationJsonLd, siteDescription, siteName, siteUrl, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: siteName,
    template: `%s | ${siteName}`
  },
  description: siteDescription,
  verification: {
    google: "RsRnJ6MiyVuT3vXX0MWKYgjFi9yZOJ9i4jVqtrAfWvU"
  }
};

const navItems = [
  ["Movies", "/movies/"],
  ["TV Shows", "/tv/"],
  ["Search", "/search/"],
  ["Genres", "/genres/"],
  ["Actors", "/actors/"],
  ["Directors", "/directors/"],
  ["Countries", "/countries/"],
  ["Languages", "/languages/"],
  ["Studios", "/studios/"]
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <header className="sticky top-0 z-40 border-b border-white/10 bg-midnight/90 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <span className="grid size-9 place-items-center rounded bg-ember text-white">
                <Film size={18} />
              </span>
              <span>Movie Index</span>
            </Link>
            <nav className="ml-auto hidden items-center gap-1 md:flex">
              {navItems.map(([label, href]) => (
                <Link key={href} href={href} className="rounded px-3 py-2 text-sm font-medium text-zinc-200 hover:bg-white/10">
                  {label}
                </Link>
              ))}
            </nav>
            <Link href="/search/" className="ml-auto grid size-9 place-items-center rounded border border-white/10 md:ml-0" aria-label="Search">
              <Search size={18} />
            </Link>
            <Link href="/movies/" className="grid size-9 place-items-center rounded border border-white/10 md:hidden" aria-label="Open menu">
              <Menu size={18} />
            </Link>
            <ThemeToggle />
          </div>
        </header>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([websiteJsonLd(), organizationJsonLd()]) }} />
        <main>{children}</main>
        <footer className="border-t border-white/10 px-4 py-10 text-sm text-zinc-400">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p>Original movie guides built from verified structured data.</p>
            <div className="flex gap-4">
              <Link href="/sitemap.xml">Sitemap</Link>
              <Link href="/rss.xml">RSS</Link>
              <Link href="/robots.txt">Robots</Link>
              <Link href="/privacy/">Privacy</Link>
              <Link href="/terms/">Terms</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
