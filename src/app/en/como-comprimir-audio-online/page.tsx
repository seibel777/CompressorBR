import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to compress audio online',
  description: 'English tutorial for shrinking MP3/WAV files with CompressorBR.'
};

export default function AudioGuideEnPage() {
  return (
    <section className="prose prose-slate mx-auto max-w-3xl px-4 py-12">
      <h1>How to compress audio online</h1>
      <p>
        The CompressorBR workflow keeps every MP3/WAV on the browser, so legal and confidential audio
        never leaves your device.
      </p>
      <ol>
        <li>Head over to the home page and drop your audio file.</li>
        <li>Pick the 128 kbps or 192 kbps preset depending on the target platform.</li>
        <li>Wait for the progress bar to hit 100% and download the new file.</li>
      </ol>
      <p>
        Tip: very large recordings may consume plenty of RAM; if the browser becomes sluggish, run the
        workflow in smaller chunks or a desktop-class device.
      </p>
      <Link href="/en" className="text-brand">
        Back to English home
      </Link>
    </section>
  );
}
