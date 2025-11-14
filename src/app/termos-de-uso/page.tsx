import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termos de uso',
  description: 'Condições de uso do CompressorBR e responsabilidades do usuário.'
};

export default function TermsPage() {
  return (
    <section className="prose prose-slate mx-auto max-w-3xl px-4 py-12">
      <h1>Termos de uso</h1>
      <p>
        Ao utilizar o CompressorBR você concorda em processar apenas conteúdos que possui direito de
        uso. O projeto é oferecido como está, sem garantias de disponibilidade ou resultado.
      </p>
      <h2>Uso aceitável</h2>
      <ul>
        <li>Não enviar materiais ilegais ou protegidos por direitos autorais sem autorização.</li>
        <li>Certificar-se de que seu dispositivo suporta o processamento do arquivo desejado.</li>
        <li>Não tentar burlar as camadas de segurança ou coletar dados de outros usuários.</li>
      </ul>
      <h2>Responsabilidade</h2>
      <p>
        Os desenvolvedores não se responsabilizam por perdas de dados decorrentes de uso incorreto da
        ferramenta. Sempre mantenha um backup do arquivo original antes de iniciar a compressão.
      </p>
      <h2>Licença</h2>
      <p>
        O código é distribuído sob licença MIT e pode ser reutilizado em projetos comerciais,
        observando os termos da licença disponíveis no repositório.
      </p>
    </section>
  );
}
