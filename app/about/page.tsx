// app/about/page.tsx
import type { Metadata } from 'next';
import { Statement } from '@/components/sections/Statement';
import { SiteFooter } from '@/components/sections/SiteFooter';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { AboutBody } from '@/components/sections/AboutBody';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Khtain Block Technology Ltd. is an Alberta corporation founded in 2026. The company holds two operating divisions: AI Search Visibility and Khtain Labs. Based in Calgary, Alberta, Canada.',
  openGraph: {
    title: 'About · Khtain',
    description:
      'Why Khtain exists. An Alberta corporation with two divisions: AI Search Visibility and Labs. Founded 2026, Calgary, Alberta.',
    url: 'https://khtain.com/about',
    siteName: 'Khtain',
    type: 'website',
  },
  alternates: {
    canonical: 'https://khtain.com/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutBody />
      <SectionDivider image="/images/09-texture-detail.png" alt="" heightVh={80} />
      <Statement />
      <SiteFooter />
    </>
  );
}
