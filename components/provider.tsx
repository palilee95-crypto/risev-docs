'use client';

import { RootProvider as BaseRootProvider } from 'fumadocs-ui/provider/next';
import { usePathname, useRouter } from 'next/navigation';

export function CustomRootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Extract current locale from pathname (first segment). English is the
  // default and has NO prefix, so an unprefixed path is English.
  const segments = pathname.split('/').filter(Boolean);
  const currentLocale = segments[0] === 'ms' ? 'ms' : 'en';

  const handleLocaleChange = (newLocale: string) => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const hasLocalePrefix = pathSegments[0] === 'ms' || pathSegments[0] === 'en';
    if (hasLocalePrefix) pathSegments.shift();
    // English is served unprefixed; only Malay gets a segment.
    if (newLocale !== 'en') pathSegments.unshift(newLocale);
    router.push(`/${pathSegments.join('/')}`);
  };

  return (
    <BaseRootProvider
      theme={{
        // The merchant app is light-only. Forcing dark here made the help centre
        // look like a different product.
        defaultTheme: 'light',
        forcedTheme: 'light',
      }}
      i18n={{
        locale: currentLocale,
        locales: [
          { name: '🇬🇧 English', locale: 'en' },
          { name: '🇲🇾 Bahasa Melayu', locale: 'ms' },
        ],
        onLocaleChange: handleLocaleChange,
      }}
    >
      {children}
    </BaseRootProvider>
  );
}
