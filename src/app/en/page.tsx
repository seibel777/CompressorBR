import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CompressorBR in English',
  description: 'English landing page for the CompressorBR browser-based media compressor.'
};

export default function HomeEnPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <p className="text-sm uppercase tracking-wide text-brand">Welcome</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">
        Compress audio & video directly in your browser
      </h1>
      <p className="mt-3 text-slate-600">
        CompressorBR is a privacy-first ffmpeg.wasm interface. Drag media files, pick a preset and
        download the optimized version without uploading anything to servers.
      </p>
      <ul className="mt-6 list-disc space-y-2 pl-6 text-slate-600">
        <li>MP3 128/192 kbps presets for podcasts.</li>
        <li>H.264 720p and 480p video targets for social media.</li>
        <li>GA4 + AdSense ready, open-source and deployable on Vercel or Cloudflare Pages.</li>
      </ul>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/" className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white">
          Open the compressor (PT-BR)
        </Link>
        <Link href="/en/blog" className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700">
          Read the English blog
        </Link>
      </div>
    </section>
  );
}
