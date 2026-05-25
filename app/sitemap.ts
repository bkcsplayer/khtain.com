// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://khtain.com';
  return [
    { url: base,            lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${base}/about`,   lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.6 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.5 },
  ];
}
