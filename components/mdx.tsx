import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { VideoTutorial } from '@/components/video-tutorial';

/**
 * `locale` is injected here rather than written on every `<VideoTutorial>` in
 * the MDX. The component is shared by both languages, and without this the
 * English pages rendered Malay labels.
 */
export function getMDXComponents(
  components?: MDXComponents,
  locale: 'en' | 'ms' = 'en'
) {
  return {
    ...defaultMdxComponents,
    VideoTutorial: (props: Record<string, unknown>) => (
      <VideoTutorial {...(props as any)} locale={locale} />
    ),
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
