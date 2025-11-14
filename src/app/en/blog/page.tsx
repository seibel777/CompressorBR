import type { Metadata } from 'next';

const posts = [
  {
    title: 'Client-side compression checklist',
    excerpt: 'Keep uploads small for reviewers and automate presets with CompressorBR.',
    href: '#client-side-checklist',
    date: '2024-07-01'
  },
  {
    title: 'Why ffmpeg.wasm is perfect for privacy-first tooling',
    excerpt: 'WebAssembly sandboxes the heavy lifting, so teams avoid vendor lock-in.',
    href: '#ffmpeg-wasm-explained',
    date: '2024-06-20'
  }
];

export const metadata: Metadata = {
  title: 'CompressorBR Blog (EN)',
  description: 'News and experiments for the English-speaking community.'
};

export default function BlogEnPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Blog (EN)</h1>
      <p className="mt-2 text-slate-500">Ideas and experiments for the international community.</p>
      <div className="mt-8 grid gap-6">
        {posts.map((post) => (
          <article key={post.title} className="rounded-3xl border border-slate-200 bg-white p-6">
            <p className="text-xs uppercase tracking-wide text-slate-400">{post.date}</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">{post.title}</h2>
            <p className="mt-1 text-slate-500">{post.excerpt}</p>
            <a href={post.href} className="mt-3 inline-flex items-center text-sm font-semibold text-brand">
              Read post
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
