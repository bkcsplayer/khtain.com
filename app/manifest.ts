import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Khtain — The Basis Under What Comes Next',
    short_name: 'Khtain',
    description:
      'Khtain Block Technology Ltd. is the parent company behind ai.khtain.com (AI Search Visibility) and labs.khtain.com (AI + Blockchain research).',
    start_url: '/',
    display: 'minimal-ui',
    background_color: '#0B0B10',
    theme_color: '#0B0B10',
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
