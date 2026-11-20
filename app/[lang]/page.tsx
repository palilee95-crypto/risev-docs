import { redirect } from 'next/navigation';

export default async function LangRootPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLang = lang === 'ms' ? 'ms' : 'en';
  // `/docs` is the tutorial index. This used to redirect to
  // `merchant/unboxing-stand`, which no longer exists — so every entry point
  // (`/`, `/en`, `/ms`) landed on a 404.
  redirect(`/${currentLang}/docs`);
}
