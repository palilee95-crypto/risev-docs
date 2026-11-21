/**
 * Design tokens for the Help Centre.
 *
 * Matches the merchant app's Rule of Three — white surface, near-black ink,
 * amber accent — and the reference design's soft grey page background.
 *
 * Kept in one file so a colour is never guessed at a call site.
 */
export const c = {
  /** Page background — the design uses a very light grey, not pure white. */
  page: '#F7F8FA',
  surface: '#FFFFFF',
  ink: '#050505',
  body: '#334155',
  muted: '#64748B',
  faint: '#94A3B8',
  border: '#E8EBF0',
  borderSoft: '#F1F5F9',
  /** Amber accent. */
  amber: '#FFC700',
  amberSoft: '#FFF9E6',
  amberBorder: '#FFE58A',
  amberInk: '#B45309',
  /** Icon tile background on a tutorial row. */
  tile: '#F1F3F7',
} as const;

/** The app's typeface, loaded in `app/layout.tsx`. */
export const font = 'var(--font-plus-jakarta), ui-sans-serif, system-ui, sans-serif';

/** Max content width. The desktop reference is a centred column. */
export const MAX_W = 1120;
