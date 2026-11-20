import { redirect } from 'next/navigation';

export default function HomePage() {
  // The landing page is the tutorial index — that is what support sends.
  redirect('/ms/docs');
}
