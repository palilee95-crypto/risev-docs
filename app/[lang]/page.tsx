import { redirect } from 'next/navigation';

export default async function LangRootPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLang = lang === 'ms' ? 'ms' : 'en';
  redirect(`/${currentLang}/docs`);
}
