/**
 * The 8 Risev Academy tutorials, in the order support sends them.
 *
 * These are the videos merchants actually learn from — support has been sending
 * them over WhatsApp one by one. Keeping them in one map means a page only has
 * to say `step={3}` and the right video appears; there is no second copy of a
 * URL to drift out of sync.
 *
 * TikTok cannot be embedded in an iframe, so these open in a new tab.
 */
export const TUTORIAL_VIDEOS: Record<number, string> = {
  1: 'https://vt.tiktok.com/ZSp4c6cJf/',
  2: 'https://vt.tiktok.com/ZSp4c3JQh/',
  3: 'https://vt.tiktok.com/ZSp43GB6J/',
  4: 'https://vt.tiktok.com/ZSp4TjAL3/',
  5: 'https://vt.tiktok.com/ZSp4TQcmY/',
  6: 'https://vt.tiktok.com/ZSp4wbWjM/',
  7: 'https://vt.tiktok.com/ZSp4K6vBe/',
  8: 'https://vt.tiktok.com/ZSpqrhcDJ/',
};

/** Titles, so the index and the section pages cannot disagree either. */
export const TUTORIAL_TITLES: Record<number, string> = {
  1: 'Setup Stand Kali Pertama',
  2: 'Cara Customer Tap & Cara Approve',
  3: 'Custom Design Ikut Brand Sendiri',
  4: 'Setup Reward untuk Customer',
  5: 'Setup Sistem Point Reward',
  6: 'Cara Customer Tebus Point & Voucher',
  7: 'Setup Smart Google Review',
  8: 'Setup Katalog Produk & Servis',
};
