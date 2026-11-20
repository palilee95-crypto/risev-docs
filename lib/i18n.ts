import { defineI18n } from 'fumadocs-core/i18n';

/**
 * English is the default, Malay is the translation.
 *
 * `hideLocale: 'default-locale'` serves English at `/docs` (no prefix) and
 * Malay at `/ms/docs`. Without it every URL carries a locale segment, which
 * makes the link support sends longer and harder to read out loud.
 *
 * Content convention that follows from this: `page.mdx` is English and
 * `page.ms.mdx` is Malay. Getting that backwards silently serves Malay to
 * English readers, because the default locale reads the unprefixed file.
 */
export const i18n = defineI18n({
  defaultLanguage: 'en',
  languages: ['en', 'ms'],
  hideLocale: 'default-locale',
});
