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

  // Extract current locale from pathname (first segment)
  const segments = pathname.split('/').filter(Boolean);
  const currentLocale = segments[0] === 'en' ? 'en' : 'ms';

  const handleLocaleChange = (newLocale: string) => {
    const pathSegments = pathname.split('/').filter(Boolean);
    if (pathSegments.length > 0 && (pathSegments[0] === 'ms' || pathSegments[0] === 'en')) {
      pathSegments[0] = newLocale;
    } else {
      pathSegments.unshift(newLocale);
    }
    router.push(`/${pathSegments.join('/')}`);
  };

  return (
    <BaseRootProvider
      theme={{
        defaultTheme: 'dark',
        forcedTheme: 'dark',
      }}
      i18n={{
        locale: currentLocale,
        locales: [
          { name: '🇲🇾 Bahasa Melayu', locale: 'ms' },
          { name: '🇬🇧 English', locale: 'en' },
        ],
        onLocaleChange: handleLocaleChange,
      }}
    >
      {children}
    </BaseRootProvider>
  );
}
