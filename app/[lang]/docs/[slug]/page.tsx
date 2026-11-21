import { notFound } from 'next/navigation';
import { TutorialView } from '@/components/tutorial-view';
import { getTutorial } from '@/lib/tutorials';

export default async function TutorialPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = lang === 'ms' ? 'ms' : 'en';
  const tutorial = getTutorial(slug);
  if (!tutorial) notFound();
  return <TutorialView tutorial={tutorial} locale={locale} />;
}
