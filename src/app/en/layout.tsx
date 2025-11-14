import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'CompressorBR | Compress audio and video in the browser',
    template: '%s | CompressorBR'
  },
  description: 'English resources for CompressorBR, the open-source media compressor built on ffmpeg.wasm.'
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <div lang="en">{children}</div>;
}
