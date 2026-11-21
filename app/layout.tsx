import { CustomRootProvider } from '@/components/provider';
import './global.css';
import { Plus_Jakarta_Sans } from 'next/font/google';

// The merchant app's typeface. Inter was the docs default and is not used
// anywhere in Risev — `Inter_` appears zero times in the app repo.
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
});

export const metadata = {
  title: 'Risev Help Centre',
  description: 'Short video guides for your Risev business.',
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={plusJakarta.variable} suppressHydrationWarning>
      <body
        style={{
          margin: 0,
          background: '#F7F8FA',
          color: '#050505',
          fontFamily: 'var(--font-plus-jakarta), ui-sans-serif, system-ui, sans-serif',
          WebkitFontSmoothing: 'antialiased',
        }}
      >
        <CustomRootProvider>{children}</CustomRootProvider>
      </body>
    </html>
  );
}
