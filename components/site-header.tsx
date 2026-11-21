'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import { c, MAX_W } from '@/lib/design';
import type { Locale } from '@/lib/tutorials';

/**
 * The Help Centre header.
 *
 * Two states, matching the reference design:
 *   - home:    logo | "Help Centre"            + BM/EN toggle
 *   - tutorial: back | logo | "Help Centre"    + BM/EN toggle + Help
 *
 * The locale toggle is a segmented control, not a dropdown: there are only two
 * languages, and a merchant should see both options at once.
 */
export function SiteHeader({
  locale,
  showBack = false,
  showHelp = false,
}: {
  locale: Locale;
  showBack?: boolean;
  showHelp?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();

  /** Swap the locale segment, keeping the rest of the path. */
  const switchTo = (next: Locale) => {
    const segs = pathname.split('/').filter(Boolean);
    if (segs[0] === 'ms' || segs[0] === 'en') segs.shift();
    // English is the default locale and has no prefix.
    if (next !== 'en') segs.unshift(next);
    router.push(`/${segs.join('/')}`);
  };

  const homeHref = locale === 'ms' ? '/ms/docs' : '/docs';

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: c.surface,
        borderBottom: `1px solid ${c.border}`,
      }}
    >
      <div
        style={{
          maxWidth: MAX_W,
          margin: '0 auto',
          padding: '0 16px',
          height: 56,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        {showBack ? (
          <Link
            href={homeHref}
            aria-label={locale === 'ms' ? 'Kembali' : 'Back'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              borderRadius: 999,
              background: c.tile,
              flexShrink: 0,
            }}
          >
            <ArrowLeft size={16} color={c.ink} />
          </Link>
        ) : null}

        {/* Wordmark + divider + label. The label must not shrink: on a 390px
            phone the toggle and Help link squeezed it to "Help Ce…". */}
        <Link href={homeHref} style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <span
            style={{
              fontSize: 19,
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: c.ink,
              lineHeight: 1,
            }}
          >
            risev
          </span>
          <span style={{ width: 1, height: 18, background: c.border, flexShrink: 0 }} />
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: c.ink,
              whiteSpace: 'nowrap',
            }}
          >
            {locale === 'ms' ? 'Pusat Bantuan' : 'Help Centre'}
          </span>
        </Link>

        <div style={{ flex: 1 }} />

        {/* BM / EN segmented toggle */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: c.tile,
            borderRadius: 999,
            padding: 3,
            gap: 2,
          }}
        >
          {(['ms', 'en'] as const).map((code) => {
            const active = locale === code;
            return (
              <button
                key={code}
                type="button"
                onClick={() => switchTo(code)}
                aria-pressed={active}
                style={{
                  border: 'none',
                  cursor: active ? 'default' : 'pointer',
                  borderRadius: 999,
                  padding: '5px 12px',
                  fontSize: 11.5,
                  fontWeight: 800,
                  letterSpacing: '0.02em',
                  background: active ? c.surface : 'transparent',
                  color: active ? c.ink : c.muted,
                  boxShadow: active ? '0 1px 2px rgba(15,23,42,0.10)' : 'none',
                  fontFamily: 'inherit',
                }}
              >
                {code === 'ms' ? 'BM' : 'EN'}
              </button>
            );
          })}
        </div>

        {showHelp ? (
          <Link
            href={SUPPORT_HREF}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 13,
              fontWeight: 700,
              color: c.ink,
              flexShrink: 0,
            }}
          >
            <HelpCircle size={17} color={c.ink} />
            {locale === 'ms' ? 'Bantuan' : 'Help'}
          </Link>
        ) : null}
      </div>
    </header>
  );
}

const SUPPORT_HREF =
  'https://wa.me/60104648598?text=Hi%20Risev%20Support%2C%20I%20need%20help%20with%20my%20merchant%20account.';
