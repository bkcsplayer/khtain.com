// app/layout.tsx — root layout for khtain.com
// Loads all 5 fonts via next/font and injects them as CSS variables.

import type { Metadata, Viewport } from 'next';
import {
  Instrument_Serif,
  Geist,
  Geist_Mono,
  Noto_Serif_SC,
  Noto_Sans_SC,
} from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { GrainOverlay } from '@/components/layout/GrainOverlay';
import { Nav } from '@/components/layout/Nav';

// ============================================================
// FONTS — load once at root, exposed as CSS variables
// ============================================================
const fontDisplay = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const fontCjkSerif = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-cjk-serif',
  display: 'swap',
});

const fontCjkSans = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-cjk-sans',
  display: 'swap',
});

// ============================================================
// METADATA — see docs/SEO.md for the full spec
// ============================================================
export const metadata: Metadata = {
  metadataBase: new URL('https://khtain.com'),
  title: {
    default: 'Khtain — The Basis Under What Comes Next',
    template: '%s · Khtain',
  },
  description:
    'Khtain Block Technology Ltd. is the parent company behind ai.khtain.com (AI Search Visibility) and labs.khtain.com (AI + Blockchain research). Calgary, Alberta.',
  keywords: [
    'Khtain',
    'Khtain Block Technology',
    'AI Search Visibility',
    'AEO',
    'GEO',
    'LLMO',
    'AI SEO Calgary',
    'AI optimization Alberta',
  ],
  authors: [{ name: 'Khtain Block Technology Ltd.', url: 'https://khtain.com' }],
  creator: 'Khtain Block Technology Ltd.',
  publisher: 'Khtain Block Technology Ltd.',
  formatDetection: { email: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    alternateLocale: ['zh_CN'],
    url: 'https://khtain.com',
    siteName: 'Khtain',
    title: 'Khtain — The Basis Under What Comes Next',
    description:
      'Parent company behind ai.khtain.com and labs.khtain.com. Based in Calgary, Alberta.',
    images: [
      {
        url: '/images/06-og.png',
        width: 1456,
        height: 816,
        alt: 'Khtain Block Technology Ltd.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Khtain — The Basis Under What Comes Next',
    description: 'Parent company behind ai.khtain.com and labs.khtain.com.',
    images: ['/images/06-og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: 'https://khtain.com',
    languages: {
      'en-CA': '/',
      'zh-CN': '/?lang=zh',
    },
  },
  category: 'technology',
};

export const viewport: Viewport = {
  themeColor: '#0B0B10',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

// ============================================================
// JSON-LD — structured data for AI crawlers
// ============================================================
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://khtain.com/#organization',
  name: 'Khtain Block Technology Ltd.',
  url: 'https://khtain.com',
  logo: 'https://khtain.com/icon.png',
  foundingDate: '2026',
  foundingLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Calgary',
      addressRegion: 'AB',
      addressCountry: 'CA',
    },
  },
  email: 'cool@khtain.com',
  sameAs: ['https://ai.khtain.com', 'https://labs.khtain.com'],
  knowsAbout: [
    'AI Search Visibility',
    'Answer Engine Optimization',
    'Generative Engine Optimization',
    'Large Language Model Optimization',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://khtain.com/#website',
  url: 'https://khtain.com',
  name: 'Khtain',
  publisher: { '@id': 'https://khtain.com/#organization' },
  inLanguage: ['en-CA', 'zh-CN'],
};

// ============================================================
// LAYOUT
// ============================================================
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fontClassNames = [
    fontDisplay.variable,
    fontSans.variable,
    fontMono.variable,
    fontCjkSerif.variable,
    fontCjkSans.variable,
  ].join(' ');

  return (
    <html lang="en" className={fontClassNames}>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="bg-obsidian text-bone antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-ember focus:text-obsidian focus:px-3 focus:py-2">
          Skip to content
        </a>
        <SmoothScroll>
          <Nav />
          <main id="main">{children}</main>
        </SmoothScroll>
        <GrainOverlay />
      </body>
    </html>
  );
}
