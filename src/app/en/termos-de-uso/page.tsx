import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of use (EN)',
  description: 'English terms for the CompressorBR OSS project.'
};

export default function TermsEnPage() {
  return (
    <section className="prose prose-slate mx-auto max-w-3xl px-4 py-12">
      <h1>Terms of use</h1>
      <p>
        Use CompressorBR only with media you are legally allowed to process. The software is
        delivered as-is under the MIT license and may change without prior notice.
      </p>
      <p>
        Keep a backup of your original files and make sure your device has enough RAM for extremely
        large media before running a conversion.
      </p>
    </section>
  );
}
