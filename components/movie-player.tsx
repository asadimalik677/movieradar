"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

export function MoviePlayer({
  sourceUrl,
  imageUrl,
  title,
}: {
  sourceUrl: string;
  imageUrl?: string;
  title: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!sourceUrl) {
    return (
      <div className="relative aspect-video w-full rounded-xl bg-zinc-900 border border-white/[0.05] grid place-items-center text-zinc-500">
        <p>Video player unavailable</p>
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
      {!isPlaying ? (
        <div className="group relative h-full w-full cursor-pointer" onClick={() => setIsPlaying(true)}>
          {/* Poster background */}
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-[#1a1a1a] to-black" />
          )}

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/20" />

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div
              className="flex size-20 items-center justify-center rounded-full border-2 border-white/80 text-white transition-all duration-300 group-hover:scale-110"
              style={{
                background: "rgba(229,9,20,0.9)",
                boxShadow: "0 0 40px rgba(229,9,20,0.6)",
              }}
            >
              <Play size={36} fill="currentColor" className="ml-1" />
            </div>
            <span className="text-sm font-black tracking-wider text-white/90 uppercase drop-shadow-md">
              Click to Stream / Watch Now
            </span>
          </div>
        </div>
      ) : (
        /* Sandboxed iframe to block redirects but allow standard video interactions */
        <iframe
          src={sourceUrl}
          className="h-full w-full"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-forms"
          referrerPolicy="no-referrer"
          title={`Watch ${title}`}
        />
      )}
    </div>
  );
}
