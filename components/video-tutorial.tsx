'use client';

import React, { useState } from 'react';
import { ExternalLink, Maximize2, Minimize2 } from 'lucide-react';
import { TUTORIALS, tiktokEmbedUrl } from '@/lib/tutorials';

/**
 * A TikTok tutorial card that previews and plays the video inline.
 *
 * The preview is the TikTok player itself, not a separate thumbnail: TikTok
 * serves a WAF challenge to the video page, so there is no `og:image` or
 * `thumbnail_url` to fetch server-side. The player renders the video's cover
 * frame with its own play button, which is a real preview rather than a
 * stand-in image that could drift from the video.
 *
 * The iframe is `loading="lazy"`, so a page with eight cards only fetches the
 * ones the visitor actually scrolls to.
 *
 * `locale` drives the labels: this component is shared by the English and Malay
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
  const [expanded, setExpanded] = useState(false);
  const tutorial = step ? TUTORIALS[step] : undefined;
  const resolvedId = videoId ?? tutorial?.videoId;
  const resolvedUrl = videoUrl ?? tutorial?.url;

  const t = (en: string, ms: string) => (locale === 'ms' ? ms : en);

  // Narrow on the id itself, not on a separate boolean: `available` does not
  // tell TypeScript that `resolvedId` is defined.
  if (!resolvedId) {
    return (
      <div className="my-4 flex items-start gap-4 rounded-2xl border border-[#F1F5F9] bg-[#F8FAFC] p-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#E2E8F0]">
          <span className="text-[11px] font-bold text-[#94A3B8]">
            {step ? `#${step}` : '—'}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-extrabold leading-snug text-[#050505]">{title}</h3>
          {subtitle ? (
            <p className="mt-1 text-[12.5px] leading-relaxed text-[#64748B]">{subtitle}</p>
          ) : null}
          <span className="mt-2 inline-flex text-[11.5px] font-bold text-[#94A3B8]">
            {t('Video not available yet', 'Video belum tersedia')}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="my-4 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="flex items-start gap-3 px-4 pt-4">
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#050505] text-[11px] font-extrabold text-white">
          {step}
        </span>
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
        </div>
      </div>

      {/* The player IS the preview: it renders the cover frame with a play
          button. Lazy so eight cards do not fetch eight players on load. */}
      <div
        className={`relative mx-auto mt-3 w-full transition-all ${
          expanded ? 'max-w-[360px]' : 'max-w-[220px]'
        }`}
      >
        <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl bg-[#050505]">
          <iframe
            src={tiktokEmbedUrl(resolvedId)}
            title={title}
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="inline-flex items-center gap-1.5 text-[11.5px] font-bold text-[#64748B] hover:text-[#050505]"
        >
          {expanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          {expanded ? t('Smaller', 'Kecilkan') : t('Larger', 'Besarkan')}
        </button>
        {resolvedUrl ? (
          <a
            href={resolvedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11.5px] font-bold text-[#B45309] hover:underline"
          >
            {t('Open in TikTok', 'Buka di TikTok')}
            <ExternalLink className="h-3 w-3" />
          </a>
        ) : null}
      </div>
    </div>
  );
}
