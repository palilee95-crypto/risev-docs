import { CustomRootProvider } from '@/components/provider';
import './global.css';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ms" className={`dark ${inter.className}`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen bg-[#090a0f] text-[#f8fafc] antialiased selection:bg-cyan-500/20 selection:text-cyan-300">
        <CustomRootProvider>
          {children}
        </CustomRootProvider>
      </body>
    </html>
  );
}
