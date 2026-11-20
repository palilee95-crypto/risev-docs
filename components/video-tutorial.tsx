'use client';

import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { TUTORIAL_VIDEOS } from '@/lib/tutorials';

/**
 * A TikTok tutorial card.
 *
 * This is the primary way merchants learn Risev — the videos are what support
 * sends over WhatsApp. The previous version of this component had a `videoUrl`
 * prop that no page ever passed, so every card was a dead placeholder reading
 * "Panduan video sedia ada".
 *
 * The URL is resolved from `step` against `lib/tutorials.ts`, so a page only
 * writes `step={3}` and there is no second copy of a URL to drift. An explicit
 * `videoUrl` still wins, for a one-off.
 *
 * TikTok cannot be embedded in an iframe, so the card opens the video in a new
 * tab. That is deliberate: a fake inline player that fails to load is worse than
 * an honest link.
 */
interface VideoTutorialProps {
  /** 1-based position, matching the numbering support sends. */
  step?: number;
  title: string;
  subtitle?: string;
  duration?: string;
  /** Overrides the URL for this step. Normally unnecessary. */
  videoUrl?: string;
  posterUrl?: string;
}

export function VideoTutorial({
  step,
  title,
  subtitle,
  duration,
  videoUrl,
  posterUrl,
}: VideoTutorialProps) {
  const [hovered, setHovered] = useState(false);
  const resolvedUrl = videoUrl ?? (step ? TUTORIAL_VIDEOS[step] : undefined);
  const available = Boolean(resolvedUrl);

  const open = () => {
    if (!resolvedUrl) return;
    window.open(resolvedUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      type="button"
      onClick={open}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      disabled={!available}
      aria-label={available ? `Tonton: ${title}` : `${title} — video belum tersedia`}
      className={`group my-4 flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all ${
        available
          ? 'cursor-pointer border-[#E2E8F0] bg-white hover:border-[#FFC700] hover:shadow-md'
          : 'cursor-default border-[#F1F5F9] bg-[#F8FAFC]'
      }`}
    >
      {/* Thumbnail / play affordance */}
      <div
        className={`relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl ${
          available ? 'bg-[#FFC700]' : 'bg-[#E2E8F0]'
        }`}
      >
        {posterUrl ? (
          <img src={posterUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : null}
        <Play
          className={`h-6 w-6 ${available ? 'fill-[#050505] text-[#050505]' : 'text-[#94A3B8]'}`}
          style={{ transform: hovered && available ? 'scale(1.15)' : 'scale(1)', transition: 'transform 200ms' }}
        />
        {step ? (
          <span className="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#050505] text-[10px] font-extrabold text-white">
            {step}
          </span>
        ) : null}
      </div>

      {/* Copy */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[15px] font-extrabold leading-snug text-[#050505]">{title}</h3>
          {duration ? (
            <span className="shrink-0 rounded-full bg-[#F1F5F9] px-2 py-0.5 text-[10px] font-bold text-[#64748B]">
              {duration}
            </span>
          ) : null}
        </div>
        {subtitle ? (
          <p className="mt-1 text-[12.5px] leading-relaxed text-[#64748B]">{subtitle}</p>
        ) : null}
        <span
          className={`mt-2 inline-flex items-center gap-1 text-[11.5px] font-bold ${
            available ? 'text-[#B45309]' : 'text-[#94A3B8]'
          }`}
        >
          {available ? 'Tonton di TikTok →' : 'Video belum tersedia'}
        </span>
      </div>
    </button>
  );
}
