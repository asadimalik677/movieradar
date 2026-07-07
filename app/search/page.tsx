import type { Metadata } from "next";
import { SearchClient } from "@/app/search/search-client";

export const metadata: Metadata = {
  title: "Search Movies",
  description: "Search the movie catalog by title, actor, director, genre, country, or story context."
};

export default function SearchPage() {
  return <SearchClient />;
}
