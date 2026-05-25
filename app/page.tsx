// app/page.tsx — Home (all 8 sections)

import { Loading } from '@/components/sections/Loading';
import { Hero } from '@/components/sections/Hero';
import { Wordmark } from '@/components/sections/Wordmark';
import { Statement } from '@/components/sections/Statement';
import { Divisions } from '@/components/sections/Divisions';
import { Methodology } from '@/components/sections/Methodology';
import { Philosophy } from '@/components/sections/Philosophy';
import { SiteFooter } from '@/components/sections/SiteFooter';
import { SectionDivider } from '@/components/ui/SectionDivider';

export default function HomePage() {
  return (
    <>
      <Loading />
      <Hero />
      <Wordmark />
      <Statement />
      <Divisions />
      <SectionDivider image="/images/07-divider.png" alt="Section divider" />
      <Methodology />
      <Philosophy />
      <SiteFooter />
    </>
  );
}
