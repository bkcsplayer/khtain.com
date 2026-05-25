// app/contact/page.tsx
import type { Metadata } from 'next';
import { ContactBody } from '@/components/sections/ContactBody';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { SiteFooter } from '@/components/sections/SiteFooter';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Pick the right door at Khtain. Reach out for AI Search Visibility inquiries, partnerships, press, or investment. Based in Calgary, Alberta, Canada.',
  openGraph: {
    title: 'Contact · Khtain',
    description:
      'Pick the right door. Client inquiries, partnerships, press, and more. Khtain Block Technology Ltd., Calgary, Alberta.',
    url: 'https://khtain.com/contact',
    siteName: 'Khtain',
    type: 'website',
  },
  alternates: {
    canonical: 'https://khtain.com/contact',
  },
};

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': 'https://khtain.com/contact/#page',
  url: 'https://khtain.com/contact',
  name: 'Contact · Khtain',
  mainEntity: {
    '@type': 'Organization',
    '@id': 'https://khtain.com/#organization',
    name: 'Khtain Block Technology Ltd.',
    email: 'cool@khtain.com',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        name: 'AI Search Visibility — Cool Bao',
        url: 'https://ai.khtain.com',
        email: 'cool@khtain.com',
        availableLanguage: ['English', 'Chinese'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'investor relations',
        name: 'Cool Bao',
        email: 'cool@khtain.com',
        availableLanguage: ['English', 'Chinese'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'public relations',
        name: 'Cool Bao',
        email: 'cool@khtain.com',
        availableLanguage: ['English', 'Chinese'],
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <ContactBody />
      <SectionDivider image="/images/09-texture-detail.png" alt="" heightVh={80} />
      <SiteFooter />
    </>
  );
}
