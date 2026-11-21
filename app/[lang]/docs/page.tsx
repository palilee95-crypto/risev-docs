import { HomeView } from '@/components/home-view';

export default async function DocsHomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang === 'ms' ? 'ms' : 'en';
  return <HomeView locale={locale} />;
}
