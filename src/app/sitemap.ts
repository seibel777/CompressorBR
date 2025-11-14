import type { MetadataRoute } from 'next';

const routes = [
  '/',
  '/como-comprimir-audio-online',
  '/como-comprimir-video-online',
  '/politica-de-privacidade',
  '/termos-de-uso',
  '/en',
  '/en/como-comprimir-audio-online',
  '/en/como-comprimir-video-online',
  '/en/politica-de-privacidade',
  '/en/termos-de-uso'
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://compressorbr.com.br';
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date()
  }));
}
