/**
 * The 8 Risev Academy tutorials, in the order support sends them.
 *
 * These are the videos merchants actually learn from — support has been sending
 * them over WhatsApp one by one. Keeping them in one map means a page only has
 * to say `step={3}` and the right video appears; there is no second copy of a
 * URL to drift out of sync.
 *
 * `videoId` is the numeric TikTok video id, resolved from the short `vt.tiktok`
 * link. The embed player needs the id, not the short link:
 *   https://vt.tiktok.com/ZSp4c6cJf/  ->  .../video/7706783583565876500
 *
 * `url` stays the short link because that is what support sends and what a
 * merchant recognises.
 */
export interface Tutorial {
  step: number;
  videoId: string;
  url: string;
  /** English title. The Malay title lives in the .ms.mdx content. */
  title: string;
}

export const TUTORIALS: Record<number, Tutorial> = {
  1: {
    step: 1,
    videoId: '7706783583565876500',
    url: 'https://vt.tiktok.com/ZSp4c6cJf/',
    title: 'Setting Up Your Stand',
  },
  2: {
    step: 2,
    videoId: '7708026570186706196',
    url: 'https://vt.tiktok.com/ZSp4c3JQh/',
    title: 'How Customers Tap & How You Approve',
  },
  3: {
    step: 3,
    videoId: '7708028144741076244',
    url: 'https://vt.tiktok.com/ZSp43GB6J/',
    title: 'Custom Design for Your Brand',
  },
  4: {
    step: 4,
    videoId: '7708030157172346132',
    url: 'https://vt.tiktok.com/ZSp4TjAL3/',
    title: 'Setting Up Customer Rewards',
  },
  5: {
    step: 5,
    videoId: '7708031424615468309',
    url: 'https://vt.tiktok.com/ZSp4TQcmY/',
    title: 'Setting Up the Points System',
  },
  6: {
    step: 6,
    videoId: '7708033420831558933',
    url: 'https://vt.tiktok.com/ZSp4wbWjM/',
    title: 'How Customers Redeem Points & Vouchers',
  },
  7: {
    step: 7,
    videoId: '7708035077120347412',
    url: 'https://vt.tiktok.com/ZSp4K6vBe/',
    title: 'Setting Up Smart Google Review',
  },
  8: {
    step: 8,
    videoId: '7708036169790983445',
    url: 'https://vt.tiktok.com/ZSpqrhcDJ/',
    title: 'Setting Up Your Product & Service Catalogue',
  },
};

/** The official TikTok embed player. `autoplay=0` so it does not start on load. */
export function tiktokEmbedUrl(videoId: string): string {
  return `https://www.tiktok.com/player/v1/${videoId}?autoplay=0&loop=0`;
}
