import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';

export default async function DocsLangLayout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}) {
  const { lang } = await params;
  const currentLang = lang === 'ms' ? 'ms' : 'en';
  const tree = source.getPageTree(currentLang);

  return (
    <DocsLayout 
      tree={tree} 
      i18n={true}
      {...baseOptions(currentLang)}
    >
      {children}
    </DocsLayout>
  );
}
