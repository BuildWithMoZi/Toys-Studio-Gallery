"use client";

import { useEffect, useRef, useState } from "react";
import { TRENDING_SHORTS } from "@/data/images";
import { getVideoEmbedUrl } from "@/lib/utils";
import { homeFullSection, homeFullTitle } from "./homeStyles";

function ShortEmbed({
  embedUrl,
  title,
  eager,
}: {
  embedUrl: string;
  title: string;
  eager?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [src, setSrc] = useState<string | null>(eager ? embedUrl : null);

  useEffect(() => {
    if (eager) {
      setSrc(embedUrl);
      return;
    }

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setSrc(entry.isIntersecting ? embedUrl : null);
      },
      { threshold: 0.35, rootMargin: "120px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [embedUrl, eager]);

  return (
    <div ref={containerRef} className="relative aspect-[9/16] w-full bg-gray-50">
      {src ? (
        <iframe
          src={src}
          title={title}
          className="absolute inset-0 h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading={eager ? "eager" : "lazy"}
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : null}
    </div>
  );
}

export function TrendingShorts() {
  const videos = TRENDING_SHORTS.map((item) => ({
    ...item,
    embedUrl: getVideoEmbedUrl(item.url, { autoplay: false }),
  })).filter((item) => item.embedUrl);

  if (videos.length === 0) return null;

  return (
    <section className={homeFullSection} aria-label="Trending shorts">
      <h2 className={homeFullTitle}>Trending Shorts</h2>

      <div className="flex gap-3 overflow-x-auto overscroll-x-contain px-2 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-4 sm:px-3 lg:px-4 [&::-webkit-scrollbar]:hidden">
        {videos.map((video, i) => (
          <div
            key={video.url}
            className="w-[min(72vw,280px)] shrink-0 overflow-hidden rounded-2xl shadow-sm sm:w-[240px] md:w-[260px] md:rounded-3xl lg:w-[min(18vw,280px)]"
          >
            <ShortEmbed
              embedUrl={video.embedUrl!}
              title={video.title ?? `Trending short ${i + 1}`}
              eager={i < 2}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
