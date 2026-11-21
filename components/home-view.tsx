'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Search, ChevronRight, PlayCircle, Headphones, ArrowRight } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { TutorialIcon } from '@/components/tutorial-icon';
import { c, MAX_W } from '@/lib/design';
import { TUTORIALS, SUPPORT_URL, type Locale } from '@/lib/tutorials';

/**
 * The Help Centre home page.
 *
 * Layout follows the reference design: a hero, a search field, a highlighted
 * "New to Risev?" card, the eight tutorial rows, and a support card.
 *
 * Search filters the rows in place rather than navigating — with only eight
 * items a results page would be more clicks for less.
 */
export function HomeView({ locale }: { locale: Locale }) {
  const [query, setQuery] = useState('');
  const t = (en: string, ms: string) => (locale === 'ms' ? ms : en);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TUTORIALS;
    return TUTORIALS.filter(
      (item) =>
        item.title[locale].toLowerCase().includes(q) ||
        item.subtitle[locale].toLowerCase().includes(q) ||
        String(item.step) === q
    );
  }, [query, locale]);

  const first = TUTORIALS[0];

  return (
    <div style={{ background: c.page, minHeight: '100vh' }}>
      <SiteHeader locale={locale} />

      <main style={{ maxWidth: MAX_W, margin: '0 auto', padding: '20px 16px 40px' }}>
        {/* Hero */}
        <h1
          style={{
            margin: 0,
            fontSize: 30,
            lineHeight: 1.15,
            fontWeight: 800,
            letterSpacing: '-0.035em',
            color: c.ink,
          }}
        >
          {t("Let's get you started", 'Mari kita mula')}
        </h1>
        <p style={{ margin: '6px 0 0', fontSize: 14.5, color: c.muted, fontWeight: 500 }}>
          {t('Short guides for your Risev business.', 'Panduan ringkas untuk bisnes Risev anda.')}
        </p>

        {/* Search */}
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginTop: 18,
            background: c.surface,
            border: `1px solid ${c.border}`,
            borderRadius: 14,
            padding: '0 14px',
            height: 48,
          }}
        >
          <Search size={18} color={c.faint} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('Search tutorials', 'Cari panduan')}
            aria-label={t('Search tutorials', 'Cari panduan')}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: 14.5,
              color: c.ink,
              fontFamily: 'inherit',
              minWidth: 0,
            }}
          />
        </label>

        {/* New to Risev? Constrained on wide screens: stretched to 1120px the
            copy sat in a sea of amber. */}
        <div
          style={{
            marginTop: 16,
            background: c.amberSoft,
            border: `1.5px solid ${c.amberBorder}`,
            borderRadius: 16,
            padding: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            maxWidth: 560,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: c.amber,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <PlayCircle size={26} color={c.ink} strokeWidth={2} />
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: c.ink, letterSpacing: '-0.02em' }}>
              {t('New to Risev?', 'Baru dengan Risev?')}
            </div>
            <div style={{ fontSize: 13, color: c.body, marginTop: 2 }}>
              {t('Set up your first stand in a few steps.', 'Setup stand pertama anda dalam beberapa langkah.')}
            </div>
            <Link
              href={`${locale === 'ms' ? '/ms' : ''}/docs/${first.slug}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                marginTop: 10,
                background: c.amber,
                color: c.ink,
                borderRadius: 999,
                padding: '8px 16px',
                fontSize: 12.5,
                fontWeight: 800,
              }}
            >
              {t('Start setup', 'Mula setup')}
              <ArrowRight size={14} color={c.ink} />
            </Link>
          </div>
        </div>

        {/* Video tutorials */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginTop: 26,
            marginBottom: 12,
          }}
        >
          <h2 style={{ margin: 0, fontSize: 21, fontWeight: 800, letterSpacing: '-0.03em', color: c.ink }}>
            {t('Video tutorials', 'Panduan video')}
          </h2>
          <span style={{ fontSize: 13, color: c.muted, fontWeight: 600 }}>
            {t(`${filtered.length} guides`, `${filtered.length} panduan`)}
          </span>
        </div>

        <div
          style={{
            background: c.surface,
            border: `1px solid ${c.border}`,
            borderRadius: 16,
            overflow: 'hidden',
          }}
        >
          {filtered.length === 0 ? (
            <div style={{ padding: 24, textAlign: 'center', fontSize: 13.5, color: c.muted }}>
              {t('No tutorials match that search.', 'Tiada panduan sepadan dengan carian itu.')}
            </div>
          ) : (
            filtered.map((item, i) => (
              <Link
                key={item.slug}
                href={`${locale === 'ms' ? '/ms' : ''}/docs/${item.slug}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '14px 16px',
                  borderTop: i === 0 ? 'none' : `1px solid ${c.borderSoft}`,
                  textDecoration: 'none',
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: c.tile,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <TutorialIcon name={item.icon} size={20} color={c.ink} />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: c.ink, letterSpacing: '-0.01em' }}>
                    {item.title[locale]}
                  </div>
                  <div style={{ fontSize: 12.5, color: c.muted, marginTop: 1 }}>
                    {item.subtitle[locale]}
                  </div>
                </div>
                <ChevronRight size={18} color={c.faint} style={{ flexShrink: 0 }} />
              </Link>
            ))
          )}
        </div>

        {/* Need a hand? */}
        <div
          style={{
            marginTop: 16,
            background: c.surface,
            border: `1px solid ${c.border}`,
            borderRadius: 16,
            padding: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: c.tile,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Headphones size={20} color={c.ink} />
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 15.5, fontWeight: 800, color: c.ink }}>
              {t('Need a hand?', 'Perlukan bantuan?')}
            </div>
            <div style={{ fontSize: 12.5, color: c.muted, marginTop: 1 }}>
              {t("We're here to help.", 'Kami sedia membantu.')}
            </div>
          </div>
          <a
            href={SUPPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
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
            {t('Contact us', 'Hubungi kami')}
            <ArrowRight size={14} color={c.ink} />
          </a>
        </div>
      </main>
    </div>
  );
}
