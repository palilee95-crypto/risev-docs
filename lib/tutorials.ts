/**
 * The 8 Risev Academy tutorials — the single source of truth for the Help
 * Centre UI.
 *
 * The design is a video-first guide: each tutorial is a title, a subtitle, a
 * TikTok video, and three "How it works" steps. There is no prose page, so the
 * MDX files under `content/` are no longer read by the merchant UI. They stay on
 * disk because `/studio` still edits them.
 *
 * `videoId` is the numeric TikTok id, resolved from the short `vt.tiktok` link.
 * The embed player needs the id, not the short link:
 *   https://vt.tiktok.com/ZSp4c6cJf/  ->  .../video/7706783583565876500
 *
 * `url` stays the short link because that is what support sends and what a
 * merchant recognises.
 */

export type Locale = 'en' | 'ms';

export interface TutorialStep {
  title: string;
  body: string;
}

export interface Tutorial {
  step: number;
  /** URL segment: /docs/<slug> */
  slug: string;
  videoId: string;
  url: string;
  /** Lucide icon name, resolved in `components/tutorial-icon.tsx`. */
  icon: string;
  duration: string;
  title: Record<Locale, string>;
  subtitle: Record<Locale, string>;
  steps: Record<Locale, TutorialStep[]>;
}

export const TUTORIALS: Tutorial[] = [
  {
    step: 1,
    slug: 'set-up-your-stand',
    videoId: '7706783583565876500',
    url: 'https://vt.tiktok.com/ZSp4c6cJf/',
    icon: 'radio',
    duration: '~1 min',
    title: {
      en: 'Set up your stand',
      ms: 'Setup stand anda',
    },
    subtitle: {
      en: 'Connect your stand to your business',
      ms: 'Sambungkan stand ke akaun kedai anda',
    },
    steps: {
      en: [
        { title: 'Unbox the stand', body: 'Take the stand and the guide card out of the box.' },
        { title: 'Tap your phone', body: 'Tap your phone on the stand. No app needed.' },
        { title: 'Create an account', body: 'Sign up, then confirm the pairing to finish setup.' },
      ],
      ms: [
        { title: 'Buka bungkusan', body: 'Ambil stand dan kad panduan dari dalam kotak.' },
        { title: 'Tap telefon', body: 'Tap telefon anda pada stand. Tidak perlu app.' },
        { title: 'Cipta akaun', body: 'Daftar, kemudian sahkan pairing untuk selesai setup.' },
      ],
    },
  },
  {
    step: 2,
    slug: 'customer-tap-and-approval',
    videoId: '7708026570186706196',
    url: 'https://vt.tiktok.com/ZSp4c3JQh/',
    icon: 'smartphone',
    duration: '~1 min',
    title: {
      en: 'Customer tap & approval',
      ms: 'Customer tap & kelulusan',
    },
    subtitle: {
      en: 'Learn the flow at your counter',
      ms: 'Fahami aliran di kaunter anda',
    },
    steps: {
      en: [
        { title: 'Customer taps', body: 'Tap a phone on the Risev stand.' },
        { title: 'Customer submits', body: 'Follow the steps on the phone.' },
        { title: 'Staff approves', body: 'Check the purchase, then approve.' },
      ],
      ms: [
        { title: 'Pelanggan tap', body: 'Tap telefon pada stand Risev.' },
        { title: 'Pelanggan hantar', body: 'Ikut langkah pada skrin telefon.' },
        { title: 'Staf luluskan', body: 'Semak pembelian, kemudian luluskan.' },
      ],
    },
  },
  {
    step: 3,
    slug: 'customise-your-design',
    videoId: '7708028144741076244',
    url: 'https://vt.tiktok.com/ZSp43GB6J/',
    icon: 'pen-tool',
    duration: '~1 min',
    title: {
      en: 'Customise your design',
      ms: 'Ubah design anda',
    },
    subtitle: {
      en: 'Make it match your brand',
      ms: 'Sesuaikan dengan brand anda',
    },
    steps: {
      en: [
        { title: 'Open Card Design', body: 'Go to Rewards, then Card Design.' },
        { title: 'Pick your colours', body: 'Set the card, stamp and text colours.' },
        { title: 'Add your images', body: 'Upload your own front and back artwork.' },
      ],
      ms: [
        { title: 'Buka Card Design', body: 'Pergi ke Rewards, kemudian Card Design.' },
        { title: 'Pilih warna', body: 'Tetapkan warna kad, cop dan tulisan.' },
        { title: 'Muat naik gambar', body: 'Muat naik gambar depan dan belakang anda sendiri.' },
      ],
    },
  },
  {
    step: 4,
    slug: 'set-up-stamp-rewards',
    videoId: '7708030157172346132',
    url: 'https://vt.tiktok.com/ZSp4TjAL3/',
    icon: 'stamp',
    duration: '~1 min',
    title: {
      en: 'Set up stamp rewards',
      ms: 'Setup ganjaran cop',
    },
    subtitle: {
      en: 'Create your digital stamp card',
      ms: 'Bina kad cop digital anda',
    },
    steps: {
      en: [
        { title: 'Choose the goal', body: 'Set how many stamps unlock the reward.' },
        { title: 'Name the reward', body: 'Pick the item the customer receives.' },
        { title: 'Save and test', body: 'Run one test claim at the counter.' },
      ],
      ms: [
        { title: 'Tetapkan sasaran', body: 'Tetapkan berapa cop untuk buka ganjaran.' },
        { title: 'Pilih hadiah', body: 'Pilih item yang pelanggan dapat.' },
        { title: 'Simpan dan uji', body: 'Buat satu tuntutan ujian di kaunter.' },
      ],
    },
  },
  {
    step: 5,
    slug: 'set-up-point-rewards',
    videoId: '7708031424615468309',
    url: 'https://vt.tiktok.com/ZSp4TQcmY/',
    icon: 'coins',
    duration: '~1 min',
    title: {
      en: 'Set up point rewards',
      ms: 'Setup ganjaran mata',
    },
    subtitle: {
      en: 'Choose how customers earn points',
      ms: 'Pilih cara pelanggan kumpul mata',
    },
    steps: {
      en: [
        { title: 'Set the earn rate', body: 'Decide how many ringgit equal one point.' },
        { title: 'Set the value', body: 'Decide how many points equal one ringgit off.' },
        { title: 'Set the minimum', body: 'Choose the lowest points before redemption.' },
      ],
      ms: [
        { title: 'Tetapkan kadar', body: 'Tentukan berapa ringgit untuk satu mata.' },
        { title: 'Tetapkan nilai', body: 'Tentukan berapa mata untuk satu ringgit diskaun.' },
        { title: 'Tetapkan minima', body: 'Pilih mata paling rendah sebelum tebus.' },
      ],
    },
  },
  {
    step: 6,
    slug: 'redeem-points-and-vouchers',
    videoId: '7708033420831558933',
    url: 'https://vt.tiktok.com/ZSp4wbWjM/',
    icon: 'ticket',
    duration: '~1 min',
    title: {
      en: 'Redeem points & vouchers',
      ms: 'Tebus mata & baucar',
    },
    subtitle: {
      en: 'Help customers claim rewards',
      ms: 'Bantu pelanggan tebus ganjaran',
    },
    steps: {
      en: [
        { title: 'Open Issue & Redeem', body: 'Press the yellow button in the bottom menu.' },
        { title: 'Scan or type', body: 'Scan the QR code, or enter the voucher code.' },
        { title: 'Confirm', body: 'Check the discount, then confirm the redemption.' },
      ],
      ms: [
        { title: 'Buka Issue & Redeem', body: 'Tekan butang kuning di menu bawah.' },
        { title: 'Imbas atau taip', body: 'Imbas kod QR, atau masukkan kod baucar.' },
        { title: 'Sahkan', body: 'Semak diskaun, kemudian sahkan tebusan.' },
      ],
    },
  },
  {
    step: 7,
    slug: 'set-up-google-review',
    videoId: '7708035077120347412',
    url: 'https://vt.tiktok.com/ZSp4K6vBe/',
    icon: 'star',
    duration: '~1 min',
    title: {
      en: 'Set up Google Review',
      ms: 'Setup Google Review',
    },
    subtitle: {
      en: 'Connect your business review link',
      ms: 'Sambungkan pautan ulasan kedai anda',
    },
    steps: {
      en: [
        { title: 'Open Google Reviews', body: 'Go to Profile, then Google Reviews.' },
        { title: 'Connect your location', body: 'Link your Google Business profile.' },
        { title: 'Let customers review', body: 'They are asked after a completed tap.' },
      ],
      ms: [
        { title: 'Buka Google Reviews', body: 'Pergi ke Profil, kemudian Google Reviews.' },
        { title: 'Sambung lokasi', body: 'Pautkan profil Google Business anda.' },
        { title: 'Pelanggan ulas', body: 'Mereka ditanya selepas tap selesai.' },
      ],
    },
  },
  {
    step: 8,
    slug: 'set-up-your-catalogue',
    videoId: '7708036169790983445',
    url: 'https://vt.tiktok.com/ZSpqrhcDJ/',
    icon: 'tag',
    duration: '~1 min',
    title: {
      en: 'Set up your catalogue',
      ms: 'Setup katalog anda',
    },
    subtitle: {
      en: 'Add products and services',
      ms: 'Tambah produk dan servis',
    },
    steps: {
      en: [
        { title: 'Add a service', body: 'Go to Bookings, then Manage Services.' },
        { title: 'Set the price', body: 'Enter the price and how long it takes.' },
        { title: 'Add options', body: 'Add any extras the customer can choose.' },
      ],
      ms: [
        { title: 'Tambah servis', body: 'Pergi ke Bookings, kemudian Manage Services.' },
        { title: 'Tetapkan harga', body: 'Masukkan harga dan tempoh servis.' },
        { title: 'Tambah pilihan', body: 'Tambah add-on yang pelanggan boleh pilih.' },
      ],
    },
  },
];

export function getTutorial(slug: string): Tutorial | undefined {
  return TUTORIALS.find((t) => t.slug === slug);
}

export function getNextTutorial(step: number): Tutorial | undefined {
  return TUTORIALS.find((t) => t.step === step + 1);
}

/**
 * The official TikTok embed player.
 *
 * `autoplay=0` so it does not start on load, and `music_info=0&description=0`
 * to drop the player's own caption chrome — the reference design shows a clean
 * video frame, not TikTok's username and like counts.
 */
export function tiktokEmbedUrl(videoId: string): string {
  return `https://www.tiktok.com/player/v1/${videoId}?autoplay=0&loop=0&music_info=0&description=0`;
}

/** Support WhatsApp, used by the "Need a hand?" card. */
export const SUPPORT_URL =
  'https://wa.me/60104648598?text=Hi%20Risev%20Support%2C%20I%20need%20help%20with%20my%20merchant%20account.';
