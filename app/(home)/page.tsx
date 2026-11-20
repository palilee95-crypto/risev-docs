import { redirect } from 'next/navigation';

export default function HomePage() {
  // English is the default locale, so `/docs` is the tutorial index with no
  // prefix. Malay lives at `/ms/docs`.
  redirect('/docs');
}
