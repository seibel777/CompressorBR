import type { Metadata } from 'next';
import { Providers } from '@/components/layout/Providers';
import '@/styles/globals.css';
import { AnalyticsHead, AnalyticsScript } from '@/components/AnalyticsScripts';
import { AdsenseHeadMeta, AdsenseScript } from '@/components/AdsenseScripts';

export const metadata: Metadata = {
  metadataBase: new URL('https://compressorbr.com.br'),
  title: {
    default: 'CompressorBR | Comprimir Áudio e Vídeo no Navegador',
    template: '%s | CompressorBR'
  },
  description:
    'CompressorBR comprime arquivos de áudio e vídeo direto no navegador com ffmpeg.wasm. Rápido, privado e gratuito.',
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/icon-192.png',
    apple: '/icons/icon-192.png'
  },
  openGraph: {
    title: 'CompressorBR',
    description:
      'Converta e comprima vídeos e áudios sem enviar para o servidor. Ideal para criadores e equipes remotas.',
    url: 'https://compressorbr.com.br',
    siteName: 'CompressorBR',
    images: ['/og.png'],
    locale: 'pt_BR',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@compressorbr',
    title: 'CompressorBR',
    description:
      'CompressorBR comprime áudio e vídeo diretamente no navegador com ffmpeg.wasm.',
    images: ['/og.png']
  },
  alternates: {
    canonical: 'https://compressorbr.com.br'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <AnalyticsHead />
        <AdsenseHeadMeta />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <Providers>
          {children}
          <AnalyticsScript />
          <AdsenseScript />
        </Providers>
      </body>
    </html>
  );
}
