import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description:
    'Entenda como o CompressorBR trata dados em Google Analytics, anúncios e processamento local.'
};

export default function PrivacyPage() {
  return (
    <section className="prose prose-slate mx-auto max-w-3xl px-4 py-12">
      <h1>Política de Privacidade</h1>
      <p>
        O CompressorBR processa todos os arquivos de áudio e vídeo localmente no seu navegador por
        meio do ffmpeg.wasm. Nenhum arquivo é enviado ou armazenado em servidores do projeto.
      </p>
      <h2>Cookies e analytics</h2>
      <p>
        Utilizamos Google Analytics 4 apenas para métricas de uso anônimas. Os parâmetros UTM
        (origem, campanha e mídia) são persistidos no seu navegador para que possamos entender quais
        canais geram mais compressões. Você pode limpar os dados a qualquer momento limpando o cache
        do navegador.
      </p>
      <h2>Anúncios</h2>
      <p>
        Os espaços rotulados como “Publicidade” são reservados para AdSense/Ezoic. Não incluímos IDs
        ou scripts reais no repositório open-source. Quando ativados em produção, respeitamos as
        políticas de privacidade, espaçamento mínimo entre anúncios e nunca sobrepomos botões.
      </p>
      <h2>Contato</h2>
      <p>
        Em caso de dúvidas, abra uma issue no GitHub do projeto ou envie um e-mail para a equipe do
        CompressorBR.
      </p>
    </section>
  );
}
