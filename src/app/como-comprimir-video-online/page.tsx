import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Como comprimir vídeo online',
  description:
    'Guia rápido para reduzir MP4 usando presets H.264 720p/480p diretamente do navegador.'
};

export default function VideoGuidePage() {
  return (
    <section className="prose prose-slate mx-auto max-w-3xl px-4 py-12">
      <h1>Como comprimir vídeo online</h1>
      <p>
        Vídeos em 4K podem ocupar gigabytes. Quando você precisa enviar versões rápidas para revisão,
        aplicar um preset com bitrate controlado resolve grande parte do problema.
      </p>
      <h2>Passos</h2>
      <ol>
        <li>Arraste um MP4/MOV para o CompressorBR.</li>
        <li>Selecione H.264 720p (~2 Mbps) ou 480p (~1 Mbps).</li>
        <li>Espere o processamento local e baixe a nova versão.</li>
      </ol>
      <p>
        O aplicativo também permite extrair apenas o áudio (AAC 128 kbps) para publicar podcasts.
      </p>
      <Link href="/" className="text-brand">
        Voltar para o compressor
      </Link>
    </section>
  );
}
