import type { Metadata } from 'next';

const posts = [
  {
    title: 'Workflow de compressão para creators remotos',
    excerpt:
      'Combine presets do CompressorBR com Google Drive para entregar conteúdo rápido para aprovação.',
    href: '#workflow-creators',
    date: '2024-07-01'
  },
  {
    title: 'Como o ffmpeg.wasm mantém os arquivos privados',
    excerpt: 'Entenda o sandbox WebAssembly e porque você não precisa enviar mídia para servidores.',
    href: '#ffmpeg-wasm-privacidade',
    date: '2024-06-20'
  }
];

export const metadata: Metadata = {
  title: 'Blog CompressorBR',
  description: 'Artigos rápidos sobre compressão de mídia e produtividade no navegador.'
};

export default function BlogPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Blog</h1>
      <p className="mt-2 text-slate-500">
        Atualizações curtas para marketing de conteúdo e dúvidas da comunidade.
      </p>
      <div className="mt-8 grid gap-6">
        {posts.map((post) => (
          <article key={post.title} className="rounded-3xl border border-slate-200 bg-white p-6">
            <p className="text-xs uppercase tracking-wide text-slate-400">{post.date}</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">{post.title}</h2>
            <p className="mt-1 text-slate-500">{post.excerpt}</p>
            <a href={post.href} className="mt-3 inline-flex items-center text-sm font-semibold text-brand">
              Ler artigo
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
