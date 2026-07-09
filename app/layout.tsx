import type { Metadata } from "next";
import Link from "next/link";
import { Film, Search } from "lucide-react";
import "@/app/globals.css";
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-white font-inter">
        {/* ─── Netflix-style Glassmorphism Header ─── */}
        <header
          className="sticky top-0 z-50 border-b border-white/[0.08]"
          style={{
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
          }}
        >
          <div className="mx-auto flex max-w-[1500px] items-center gap-6 px-4 py-3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 font-black shrink-0 group">
              <span
                className="grid size-9 place-items-center rounded-lg text-white font-black text-lg transition-all duration-300 group-hover:scale-110"
                style={{
                  background: "linear-gradient(135deg, #E50914 0%, #B8070F 100%)",
                  boxShadow: "0 0 15px rgba(229,9,20,0.4)",
                }}
              >
                <Film size={17} />
              </span>
              <span
                className="text-xl font-black tracking-tight text-white transition-all duration-300 group-hover:text-netflix-red"
                style={{ letterSpacing: "-0.02em" }}
              >
                MovieRadar
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="ml-4 hidden items-center gap-1 md:flex">
              {navItems.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="relative px-3 py-2 text-sm font-semibold text-zinc-300 rounded transition-all duration-200 hover:text-white hover:bg-white/10 group"
                >
                  {label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-netflix-red rounded-full transition-all duration-300 group-hover:w-4/5" />
                </Link>
              ))}
            </nav>

            {/* Search + Mobile menu */}
            <div className="ml-auto flex items-center gap-2">
              <Link
                href="/search/"
                aria-label="Search"
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-zinc-300 transition-all duration-200 hover:bg-white/15 hover:text-white hover:border-netflix-red/40"
              >
                <Search size={16} />
                <span className="hidden sm:inline">Search</span>
              </Link>
              {/* Mobile hamburger — simplified to search */}
              <Link
                href="/movies/"
                className="grid size-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/15 hover:text-white md:hidden"
                aria-label="Open menu"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              </Link>
            </div>
          </div>
        </header>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([websiteJsonLd(), organizationJsonLd()]) }}
        />

        <main>{children}</main>

        {/* ─── Netflix-style Footer ─── */}
        <footer className="border-t border-white/[0.08] bg-black px-4 py-12 text-sm">
          <div className="mx-auto max-w-[1500px]">
            {/* Logo row */}
            <div className="mb-8 flex items-center gap-2">
              <span
                className="grid size-8 place-items-center rounded-lg text-white"
                style={{ background: "linear-gradient(135deg, #E50914 0%, #B8070F 100%)" }}
              >
                <Film size={14} />
              </span>
              <span className="font-black text-white">MovieRadar</span>
            </div>

            {/* Links grid */}
            <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4 text-zinc-500">
              {navItems.map(([label, href]) => (
                <Link key={href} href={href} className="hover:text-white transition-colors duration-200">
                  {label}
                </Link>
              ))}
            </div>

            {/* Bottom bar */}
            <div className="flex flex-col gap-3 border-t border-white/[0.08] pt-6 md:flex-row md:items-center md:justify-between">
              <p className="text-zinc-600">
                MovieRadar — Hindi &amp; English movie discovery built from verified structured data.
              </p>
              <div className="flex gap-5 text-zinc-500">
                <Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
                <Link href="/rss.xml" className="hover:text-white transition-colors">RSS</Link>
                <Link href="/robots.txt" className="hover:text-white transition-colors">Robots</Link>
                <Link href="/privacy/" className="hover:text-white transition-colors">Privacy</Link>
                <Link href="/terms/" className="hover:text-white transition-colors">Terms</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
