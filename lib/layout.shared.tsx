import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

/**
 * The nav is shared by both locales, so the label has to come from the locale
 * rather than being hardcoded. It used to say "Pusat Bantuan" on the English
 * pages too.
 */
export function baseOptions(locale: string = 'en'): BaseLayoutProps {
  const label = locale === 'ms' ? 'Pusat Bantuan' : 'Help Centre';

  return {
    nav: {
      title: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src="/logo.png"
            alt="Risev"
            style={{ height: '24px', objectFit: 'contain' }}
          />
          <span
            style={{
              fontWeight: 800,
              fontSize: '15px',
              letterSpacing: '-0.02em',
              color: '#050505',
            }}
          >
            {label}
          </span>
        </div>
      ),
    },
    // No "Studio Editor" link here: this nav is what merchants see. The editor
    // stays reachable at /studio for whoever writes the guides.
    links: [],
  };
}
