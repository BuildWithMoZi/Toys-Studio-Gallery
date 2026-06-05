"use client";

import { getAnnouncementText } from "@/data/site";

const HERO_RED = "#c8102e";

const ANNOUNCEMENT_TEXT = getAnnouncementText();

function MarqueeContent() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <span
          key={i}
          className="flex shrink-0 items-center px-8 text-xs font-medium tracking-wide text-white"
        >
          {ANNOUNCEMENT_TEXT}
          <span aria-hidden className="pl-8 opacity-50">
            •
          </span>
        </span>
      ))}
    </>
  );
}

export function AnnouncementBar() {
  return (
    <div
      className="fixed left-0 right-0 top-0 z-[60] h-7 overflow-hidden"
      style={{ backgroundColor: HERO_RED }}
      role="marquee"
      aria-label={ANNOUNCEMENT_TEXT}
    >
      <div className="announcement-marquee flex h-full w-max items-center">
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </div>
  );
}
