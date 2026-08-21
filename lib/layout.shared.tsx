import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img 
            src="/logo.png" 
            alt="Risev" 
            style={{ 
              height: '24px', 
              objectFit: 'contain',
              filter: 'brightness(0) invert(1)'
            }} 
          />
          <span style={{ fontWeight: 800, fontSize: '15px', letterSpacing: '-0.02em', opacity: 0.9 }}>
            Pusat Bantuan
          </span>
        </div>
      ),
    },
    links: [
      {
        text: 'Studio Editor ✨',
        url: '/studio',
        active: 'nested-url',
      },
    ],
  };
}
