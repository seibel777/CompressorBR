import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy policy (EN)',
  description: 'English privacy baseline for CompressorBR.'
};

export default function PrivacyEnPage() {
  return (
    <section className="prose prose-slate mx-auto max-w-3xl px-4 py-12">
      <h1>Privacy policy</h1>
      <p>
        CompressorBR runs ffmpeg.wasm entirely in the browser. Media never leaves your device and we
        do not keep any copy of your files.
      </p>
      <p>
        Google Analytics 4 is optional and only collects aggregated usage to measure which campaigns
        bring more creators to the tool. Advertising placeholders follow AdSense/Ezoic policies and
        can be disabled through the <code>NEXT_PUBLIC_HIDE_ADS_FOR_UTM</code> flag.
      </p>
      <p>
        Questions? Open an issue on GitHub and we will be happy to help.
      </p>
    </section>
  );
}
