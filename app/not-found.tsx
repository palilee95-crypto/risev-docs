import Link from 'next/link';

/**
 * A 404 in Risev's own theme.
 *
 * Without this file Next renders its built-in error page, which hardcodes
 * `@media (prefers-color-scheme: dark)` — so a merchant on a dark-mode phone
 * got a black screen with white text, while the rest of the site is white.
 * That mismatch is what made a stale link look like a broken site.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFC700]">
        <span className="text-2xl font-extrabold text-[#050505]">?</span>
      </div>

      <h1 className="mt-6 text-2xl font-extrabold text-[#050505]">
        Halaman tidak dijumpai
      </h1>
      <p className="mt-2 max-w-md text-[13.5px] leading-relaxed text-[#64748B]">
        Pautan ini mungkin sudah lama, atau panduan itu telah dipindahkan.
        Kembali ke Pusat Bantuan untuk cari panduan yang anda perlukan.
      </p>

      <Link
        href="/ms/docs"
        className="mt-6 rounded-full bg-[#050505] px-6 py-3 text-[13px] font-bold text-white transition-opacity hover:opacity-90"
      >
        Kembali ke Pusat Bantuan
      </Link>

      <p className="mt-4 text-[11.5px] text-[#94A3B8]">
        Page not found ·{' '}
        <Link href="/en/docs" className="underline">
          English
        </Link>
      </p>
    </main>
  );
}
