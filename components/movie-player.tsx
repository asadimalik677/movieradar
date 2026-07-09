"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Server, Download, MonitorPlay } from "lucide-react";

type StreamingServer = {
  name: string;
  quality: string;
  url: string;
};

export function MoviePlayer({
  sourceUrl,
  imageUrl,
  title,
  streamingServers,
}: {
  sourceUrl: string;
  imageUrl?: string;
  title: string;
  streamingServers?: StreamingServer[];
}) {
  const [activeServer, setActiveServer] = useState<StreamingServer | null>(null);
  const [showServers, setShowServers] = useState(false);

  const servers = streamingServers || [];

  // Group servers by name
  const serverGroups: Record<string, StreamingServer[]> = {};
  for (const s of servers) {
    if (!serverGroups[s.name]) serverGroups[s.name] = [];
    serverGroups[s.name].push(s);
  }

  const serverColors: Record<string, string> = {
    PkSpeed: "#E50914",
    MixDrop: "#3B82F6",
    CloudVideo: "#10B981",
    Streamtape: "#F59E0B",
    DoodStream: "#8B5CF6",
    FileLions: "#EC4899",
    Unknown: "#6B7280",
  };

  return (
    <div className="w-full space-y-4">
      {/* Player Area */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
        {activeServer ? (
          <iframe
            src={activeServer.url}
            className="h-full w-full"
            allowFullScreen
            allow="autoplay; fullscreen; picture-in-picture"
            referrerPolicy="no-referrer"
            title={`Watch ${title} - ${activeServer.name} ${activeServer.quality}`}
          />
        ) : (
          <div
            className="group relative h-full w-full cursor-pointer"
            onClick={() => {
              if (servers.length > 0) {
                setShowServers(true);
              } else {
                window.open(sourceUrl, "_blank");
              }
            }}
          >
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover opacity-50 transition-transform duration-700 group-hover:scale-105"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-[#1a1a1a] to-black" />
            )}

            <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/20" />

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
                {servers.length > 0 ? "Click to Choose Server" : "Watch Full Movie"}
              </span>
              {servers.length > 0 && (
                <span className="text-xs text-zinc-400">
                  {Object.keys(serverGroups).length} servers available
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Server Selector — always visible if servers exist */}
      {servers.length > 0 && (showServers || activeServer) && (
        <div
          className="rounded-xl border border-white/[0.08] p-4"
          style={{ background: "rgba(20,20,20,0.95)" }}
        >
          <div className="mb-3 flex items-center gap-2 text-sm font-bold text-zinc-300">
            <Server size={15} />
            <span>Select Server & Quality</span>
          </div>

          <div className="space-y-3">
            {Object.entries(serverGroups).map(([name, group]) => (
              <div key={name}>
                <div
                  className="mb-2 text-xs font-bold uppercase tracking-widest"
                  style={{ color: serverColors[name] || "#9CA3AF" }}
                >
                  <MonitorPlay size={12} className="mr-1 inline" />
                  {name}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.map((server, idx) => {
                    const isActive = activeServer?.url === server.url;
                    return (
                      <button
                        key={`${server.url}-${idx}`}
                        onClick={() => setActiveServer(server)}
                        className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold text-white transition-all duration-200 hover:scale-105"
                        style={{
                          background: isActive
                            ? serverColors[name] || "#6B7280"
                            : "rgba(255,255,255,0.08)",
                          border: `1px solid ${
                            isActive
                              ? serverColors[name] || "#6B7280"
                              : "rgba(255,255,255,0.12)"
                          }`,
                          boxShadow: isActive
                            ? `0 0 15px ${serverColors[name] || "#6B7280"}40`
                            : "none",
                        }}
                      >
                        <Play size={11} fill="currentColor" />
                        {server.quality || "Watch"}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Download / Source buttons */}
      <div className="flex flex-wrap gap-3">
        {servers.length > 0 && !showServers && !activeServer && (
          <button
            onClick={() => setShowServers(true)}
            className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-black text-white transition-all duration-200 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #E50914 0%, #B8070F 100%)",
              boxShadow: "0 0 20px rgba(229,9,20,0.35)",
            }}
          >
            <Play size={16} fill="currentColor" /> Watch Movie
          </button>
        )}
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:opacity-90"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <Download size={15} /> Download / Watch HD
        </a>
      </div>
    </div>
  );
}
