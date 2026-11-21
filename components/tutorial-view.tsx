'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ExternalLink, HelpCircle, ArrowRight, ChevronUp, Play } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { TutorialIcon } from '@/components/tutorial-icon';
import { c, MAX_W } from '@/lib/design';
import {
  TUTORIALS,
  SUPPORT_URL,
  getNextTutorial,
  tiktokEmbedUrl,
  type Locale,
  type Tutorial,
} from '@/lib/tutorials';

/**
 * A tutorial page.
 *
 * Two layouts from one tree, matching the reference design:
 *   - phone (<900px):  video, then How it works, then Up next
 *   - tablet/desktop:  video on the left, How it works + Up next + All
 *                      tutorials on the right
 *
 * The split is CSS-only (`flex-wrap` + a min width), so there is no JS
 * breakpoint to get wrong and no layout shift on resize.
 */
export function TutorialView({ tutorial, locale }: { tutorial: Tutorial; locale: Locale }) {
  const [listOpen, setListOpen] = useState(true);
  const t = (en: string, ms: string) => (locale === 'ms' ? ms : en);
  const next = getNextTutorial(tutorial.step);
  const prefix = locale === 'ms' ? '/ms' : '';
  const steps = tutorial.steps[locale];

  return (
    <div style={{ background: c.page, minHeight: '100vh' }}>
      <SiteHeader locale={locale} showBack showHelp />

      <main style={{ maxWidth: MAX_W, margin: '0 auto', padding: '18px 16px 40px' }}>
        {/* Title block */}
        <div style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: '0.08em', color: c.muted }}>
          {t(`TUTORIAL ${String(tutorial.step).padStart(2, '0')}`, `PANDUAN ${String(tutorial.step).padStart(2, '0')}`)}
        </div>
        <h1
          style={{
            margin: '4px 0 0',
            fontSize: 27,
            lineHeight: 1.15,
            fontWeight: 800,
            letterSpacing: '-0.035em',
            color: c.ink,
          }}
        >
          {tutorial.title[locale]}
        </h1>
        <p style={{ margin: '5px 0 0', fontSize: 14, color: c.muted, fontWeight: 500 }}>
          {tutorial.subtitle[locale]}
        </p>

        {/* Two columns on wide screens, stacked on phones. */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            marginTop: 16,
            alignItems: 'flex-start',
          }}
        >
          {/* ── Left: the video ─────────────────────────────────────────── */}
          <div style={{ flex: '1 1 320px', minWidth: 0 }}>
            <div
              style={{
                background: c.surface,
                border: `1px solid ${c.border}`,
                borderRadius: 16,
                padding: 12,
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: 300,
                  margin: '0 auto',
                  aspectRatio: '9 / 16',
                  borderRadius: 12,
                  overflow: 'hidden',
                  background: c.ink,
                }}
              >
                <iframe
                  src={tiktokEmbedUrl(tutorial.videoId)}
                  title={tutorial.title[locale]}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                  paddingTop: 12,
                }}
              >
                <a
                  href={tutorial.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 7,
                    fontSize: 12.5,
                    fontWeight: 700,
                    color: c.body,
                  }}
                >
                  <ExternalLink size={15} color={c.body} />
                  {t('Watch on TikTok', 'Tonton di TikTok')}
                </a>
                <a
                  href={SUPPORT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 7,
                    fontSize: 12.5,
                    fontWeight: 700,
                    color: c.body,
                  }}
                >
                  <HelpCircle size={15} color={c.body} />
                  {t('Need help?', 'Perlu bantuan?')}
                </a>
              </div>
            </div>
          </div>

          {/* ── Right: How it works, Up next, All tutorials ─────────────── */}
          <div style={{ flex: '1 1 320px', minWidth: 0, display: 'grid', gap: 14 }}>
            {/* How it works */}
            <div
              style={{
                background: c.surface,
                border: `1px solid ${c.border}`,
                borderRadius: 16,
                padding: 16,
              }}
            >
              <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800, letterSpacing: '-0.02em', color: c.ink }}>
                {t('How it works', 'Cara ia berfungsi')}
              </h2>
              <div style={{ marginTop: 12, display: 'grid', gap: 12 }}>
                {steps.map((step, i) => (
                  <div key={step.title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 999,
                        background: c.amberSoft,
                        border: `1px solid ${c.amberBorder}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 11,
                        fontWeight: 800,
                        color: c.amberInk,
                        flexShrink: 0,
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 800, color: c.ink }}>{step.title}</div>
                      <div style={{ fontSize: 12.5, color: c.muted, marginTop: 1 }}>{step.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Up next */}
            {next ? (
              <div
                style={{
                  background: c.amberSoft,
                  border: `1.5px solid ${c.amberBorder}`,
                  borderRadius: 16,
                  padding: 16,
                }}
              >
                <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '0.08em', color: c.amberInk }}>
                  {t('UP NEXT', 'SETERUSNYA')}
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    marginTop: 4,
                  }}
                >
                  <div style={{ fontSize: 16.5, fontWeight: 800, color: c.ink, letterSpacing: '-0.02em' }}>
                    {next.title[locale]}
                  </div>
                  <Link
                    href={`${prefix}/docs/${next.slug}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      background: c.amber,
                      color: c.ink,
                      borderRadius: 999,
                      padding: '9px 16px',
                      fontSize: 12.5,
                      fontWeight: 800,
                      flexShrink: 0,
                    }}
                  >
                    {t('Next tutorial', 'Panduan seterusnya')}
                    <ArrowRight size={14} color={c.ink} />
                  </Link>
                </div>
              </div>
            ) : null}

            {/* All tutorials */}
            <div
              style={{
                background: c.surface,
                border: `1px solid ${c.border}`,
                borderRadius: 16,
                overflow: 'hidden',
              }}
            >
              <button
                type="button"
                onClick={() => setListOpen((v) => !v)}
                aria-expanded={listOpen}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                  padding: '14px 16px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                <span style={{ fontSize: 16, fontWeight: 800, color: c.ink, letterSpacing: '-0.02em' }}>
                  {t('All tutorials', 'Semua panduan')}
                </span>
                <ChevronUp
                  size={18}
                  color={c.muted}
                  style={{ transform: listOpen ? 'none' : 'rotate(180deg)', transition: 'transform 150ms' }}
                />
              </button>

              {listOpen ? (
                <div style={{ borderTop: `1px solid ${c.borderSoft}` }}>
                  {TUTORIALS.map((item, i) => {
                    const active = item.slug === tutorial.slug;
                    return (
                      <Link
                        key={item.slug}
                        href={`${prefix}/docs/${item.slug}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          padding: '11px 16px',
                          borderTop: i === 0 ? 'none' : `1px solid ${c.borderSoft}`,
                          background: active ? c.amberSoft : 'transparent',
                          textDecoration: 'none',
                        }}
                      >
                        <div
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: 8,
                            background: active ? c.amber : c.tile,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          {active ? (
                            <Play size={12} color={c.ink} fill={c.ink} />
                          ) : (
                            <TutorialIcon name={item.icon} size={14} color={c.ink} />
                          )}
                        </div>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 800,
                            color: active ? c.amberInk : c.faint,
                            flexShrink: 0,
                          }}
                        >
                          {String(item.step).padStart(2, '0')}
                        </span>
                        <span
                          style={{
                            fontSize: 13.5,
                            fontWeight: active ? 800 : 600,
                            color: c.ink,
                            minWidth: 0,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {item.title[locale]}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
