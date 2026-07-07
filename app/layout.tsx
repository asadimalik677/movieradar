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
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/75 backdrop-blur-xl">
          <div className="mx-auto flex max-w-[1500px] items-center gap-4 px-4 py-3">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <span className="grid size-10 place-items-center rounded-xl bg-red-600 text-white shadow-lg shadow-red-950/40">
                <Film size={18} />
              </span>
              <span className="text-xl font-black tracking-tight text-white">MovieRadar</span>
            </Link>
            <nav className="ml-auto hidden items-center gap-1 md:flex">
              {navItems.map(([label, href]) => (
                <Link key={href} href={href} className="rounded px-3 py-2 text-sm font-bold text-zinc-300 hover:bg-white/10 hover:text-white">
                  {label}
                </Link>
              ))}
            </nav>
            <Link href="/search/" className="ml-auto grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5 md:ml-0" aria-label="Search">
              <Search size={18} />
            </Link>
            <Link href="/movies/" className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5 md:hidden" aria-label="Open menu">
              <Menu size={18} />
            </Link>
            <ThemeToggle />
          </div>
        </header>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([websiteJsonLd(), organizationJsonLd()]) }} />
        <main>{children}</main>
        <footer className="border-t border-white/10 bg-black px-4 py-10 text-sm text-zinc-400">
          <div className="mx-auto flex max-w-[1500px] flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p>MovieRadar: recent Hindi and English movie discovery built from verified structured data.</p>
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
