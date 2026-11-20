'use client';

import React, { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { TUTORIALS, tiktokEmbedUrl } from '@/lib/tutorials';

/**
 * A TikTok tutorial card that plays inline.
 *
 * The previous version only linked out to TikTok, which meant a merchant
 * watching a guide had to leave the help centre and come back. TikTok's official
 * `player/v1` embed works in an iframe, so the video now plays here.
 *
 * The iframe is only mounted once the card is clicked. Eight TikTok players
 * loading on page load would be several megabytes of third-party JS for videos
 * most visitors never watch.
 *
 * `locale` drives the label: this component is shared by the English and Malay
 * pages, and it used to say "Tonton di TikTok" on both.
 */
interface VideoTutorialProps {
  /** 1-based position, matching the numbering support sends. */
  step?: number;
  title: string;
  subtitle?: string;
  duration?: string;
  /** Overrides the video for this step. Normally unnecessary. */
  videoId?: string;
  /** Overrides the outbound link. Normally unnecessary. */
  videoUrl?: string;
  locale?: 'en' | 'ms';
}

export function VideoTutorial({
  step,
  title,
  subtitle,
  duration,
  videoId,
  videoUrl,
  locale = 'en',
}: VideoTutorialProps) {
  const [playing, setPlaying] = useState(false);
  const tutorial = step ? TUTORIALS[step] : undefined;
  const resolvedId = videoId ?? tutorial?.videoId;
  const resolvedUrl = videoUrl ?? tutorial?.url;
  const available = Boolean(resolvedId);

  const t = (en: string, ms: string) => (locale === 'ms' ? ms : en);

  if (playing && resolvedId) {
    return (
      <div className="my-4 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#050505]">
        <div className="relative mx-auto aspect-[9/16] max-h-[560px] w-full max-w-[315px]">
          <iframe
            src={tiktokEmbedUrl(resolvedId)}
            title={title}
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
        <div className="flex items-center justify-between gap-2 border-t border-white/10 px-4 py-2.5">
          <span className="text-[11.5px] font-semibold text-white/70">
            {t('Now playing', 'Sedang dimainkan')}
          </span>
          <div className="flex items-center gap-3">
            {resolvedUrl ? (
              <a
                href={resolvedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11.5px] font-bold text-[#FFC700] hover:underline"
              >
                {t('Open in TikTok', 'Buka di TikTok')}
                <ExternalLink className="h-3 w-3" />
              </a>
            ) : null}
            <button
              type="button"
              onClick={() => setPlaying(false)}
              className="text-[11.5px] font-semibold text-white/60 hover:text-white"
            >
              {t('Close', 'Tutup')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => available && setPlaying(true)}
      disabled={!available}
      aria-label={available ? `${t('Play', 'Main')}: ${title}` : `${title} — ${t('video not available', 'video belum tersedia')}`}
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
        <Play
          className={`h-6 w-6 ${available ? 'fill-[#050505] text-[#050505]' : 'text-[#94A3B8]'} transition-transform group-hover:scale-110`}
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
          {available
            ? t('Play video →', 'Main video →')
            : t('Video not available yet', 'Video belum tersedia')}
        </span>
      </div>
    </button>
  );
}
