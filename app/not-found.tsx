// app/not-found.tsx — 404 page in brand voice
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 — Not Found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-[100vh] flex flex-col items-center justify-center container-x">
      <p className="eyebrow mb-6">404 — NOT FOUND</p>
      <h1
        className="font-display italic text-bone text-center"
        style={{
          fontSize: 'var(--text-display-lg)',
          lineHeight: 'var(--leading-display)',
          letterSpacing: 'var(--tracking-display)',
        }}
      >
        The basis didn&apos;t hold here.
      </h1>
      <p className="mt-8 text-slate max-w-md text-center" style={{ fontSize: '18px' }}>
        This page doesn&apos;t exist. The page you were looking for may have moved, or the link may be wrong.
      </p>
      <Link href="/" className="btn-ghost mt-12">
        ← Return to khtain.com
      </Link>
    </main>
  );
}
