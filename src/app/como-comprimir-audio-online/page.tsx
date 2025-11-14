import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Como comprimir áudio online',
  description:
    'Aprenda a reduzir o tamanho de arquivos MP3/WAV diretamente do navegador usando o CompressorBR.'
};

export default function AudioGuidePage() {
  return (
    <section className="prose prose-slate mx-auto max-w-3xl px-4 py-12">
      <h1>Como comprimir áudio online</h1>
      <p>
        Arquivos de áudio podem crescer rapidamente, especialmente em entrevistas longas. O
        CompressorBR utiliza ffmpeg.wasm para aplicar presets de 128 kbps ou 192 kbps com ótima
        qualidade mesmo em conexões lentas.
      </p>
      <ol>
        <li>Acesse a página principal e arraste o arquivo MP3/WAV.</li>
        <li>Escolha um preset MP3 128 kbps ou 192 kbps.</li>
        <li>Acompanhe a barra de progresso e baixe o novo arquivo.</li>
      </ol>
      <p>
        O processamento é local, então você mantém total controle sobre o conteúdo, ideal para
        entrevistas confidenciais ou aulas privadas.
      </p>
      <Link href="/" className="text-brand">
        Voltar para o compressor
      </Link>
    </section>
  );
}
