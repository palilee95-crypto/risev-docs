import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
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
            Pusat Bantuan
          </span>
        </div>
      ),
    },
    // No "Studio Editor" link here: this nav is what merchants see. The editor
    // stays reachable at /studio for whoever writes the guides.
    links: [],
  };
}
