import { MetadataRoute } from 'next';

/**
 * Dynamic sitemap generation for Next.js 15
 * https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 *
 * Note: For single-page landing, we only include the main URL.
 * Section anchors (#features, #pricing, etc.) are part of the same page
 * and don't need separate sitemap entries as they're not distinct URLs.
 *
 * Future: When creating separate pages (/about, /pricing, etc.),
 * add them here as proper routes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://astra.ai';
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // Future routes can be added here:
    // {
    //   url: `${baseUrl}/features`,
    //   lastModified,
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
    // {
    //   url: `${baseUrl}/pricing`,
    //   lastModified,
    //   changeFrequency: 'weekly',
    //   priority: 0.9,
    // },
  ];
}
