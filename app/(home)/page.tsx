import { redirect } from 'next/navigation';

export default function HomePage() {
  // English is the default locale, so `/docs` is the Help Centre with no prefix.
  redirect('/docs');
}
