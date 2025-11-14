import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to compress video online',
  description: 'English guide for H.264 presets running entirely on the browser.'
};

export default function VideoGuideEnPage() {
  return (
    <section className="prose prose-slate mx-auto max-w-3xl px-4 py-12">
      <h1>How to compress video online</h1>
      <p>
        Social media approvals rarely need 4K masters. Use the 720p (≈2 Mbps) or 480p (≈1 Mbps)
        presets to generate light MP4 files directly in your browser.
      </p>
      <ol>
        <li>Drop an MP4 or MOV file on CompressorBR.</li>
        <li>Pick the resolution target that matches your workflow.</li>
        <li>Track the progress bar and download the optimized video.</li>
      </ol>
      <p>
        Need just the soundtrack? Choose the “Extract audio AAC 128 kbps” option instead of a video
        preset.
      </p>
      <Link href="/en" className="text-brand">
        Back to English home
      </Link>
    </section>
  );
}
