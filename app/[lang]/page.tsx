import { redirect } from 'next/navigation';

export default async function LangRootPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLang = lang === 'en' ? 'en' : 'ms';
  // `/docs` is the tutorial index. This used to redirect to
  // `merchant/unboxing-stand`, which no longer exists — so every entry point
  // (`/`, `/ms`, `/en`) landed on a 404.
  redirect(`/${currentLang}/docs`);
}
