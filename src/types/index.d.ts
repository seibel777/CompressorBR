declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export {};

export type CompressionPreset =
  | {
      id: 'audio-128' | 'audio-192';
      label: string;
      description: string;
      type: 'audio';
      bitrate: number;
    }
  | {
      id: 'video-720' | 'video-480';
      label: string;
      description: string;
      type: 'video';
      height: number;
      bitrate: number;
    }
  | {
      id: 'extract-audio' | 'extract-mp3';
      label: string;
      description: string;
      type: 'extract';
      bitrate: number;
      format?: 'aac' | 'mp3';
    };

export interface CompressionResult {
  blob: Blob;
  fileName: string;
  beforeSize?: number;
  afterSize?: number;
}
