import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { VideoTutorial } from '@/components/video-tutorial';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    VideoTutorial,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
