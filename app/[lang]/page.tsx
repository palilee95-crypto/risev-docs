import { redirect } from 'next/navigation';

export default async function LangRootPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLang = lang === 'en' ? 'en' : 'ms';
  redirect(`/${currentLang}/docs/merchant/unboxing-stand`);
}
