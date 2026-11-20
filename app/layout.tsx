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

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={plusJakarta.variable} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen bg-white text-[#0f172a] antialiased selection:bg-[#FFC700]/30 selection:text-[#050505]">
        <CustomRootProvider>
          {children}
        </CustomRootProvider>
      </body>
    </html>
  );
}
