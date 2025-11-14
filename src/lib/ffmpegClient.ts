import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import type { CompressionResult } from '@/types';

const userBaseURL =
  (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_FFMPEG_BASE_URL) || '/ffmpeg/umd/';
const baseURL = userBaseURL.endsWith('/') ? userBaseURL : `${userBaseURL}/`;

let ffmpeg: FFmpeg | null = null;
let loadingPromise: Promise<FFmpeg> | null = null;
let progressListener: ((progress: number) => void) | null = null;

export function setProgressListener(listener: (progress: number) => void) {
  progressListener = listener;
}

async function getFFmpeg() {
  if (ffmpeg) return ffmpeg;
  if (!loadingPromise) {
    loadingPromise = (async () => {
      const instance = new FFmpeg();
      instance.on('progress', ({ progress }) => {
        if (typeof progress === 'number' && progressListener) {
          progressListener(Math.min(100, Math.max(0, Math.round(progress * 100))));
        }
      });
      await loadCore(instance, baseURL);
      ffmpeg = instance;
      return instance;
    })();
  }
  return loadingPromise;
}

function buildOutputName(input: File, suffix: string) {
  const [name] = input.name.split('.').slice(0, -1);
  return `${name || 'compressor'}-${suffix}`;
}

async function runJob({
  input,
  output,
  command
}: {
  input: File;
  output: string;
  command: string[];
}): Promise<CompressionResult> {
  const instance = await getFFmpeg();
  const inputName = `input-${Date.now()}`;
  await instance.writeFile(inputName, await fetchFile(input));
  await instance.exec(['-i', inputName, ...command, output]);
  const data = await instance.readFile(output);
  const blob = new Blob([data.buffer], { type: guessMime(output) });
  await instance.deleteFile?.(inputName);
  await instance.deleteFile?.(output);

  return {
    blob,
    fileName: output,
    beforeSize: input.size,
    afterSize: data.byteLength
  };
}

function guessMime(fileName: string) {
  if (fileName.endsWith('.mp3')) return 'audio/mpeg';
  if (fileName.endsWith('.aac')) return 'audio/aac';
  if (fileName.endsWith('.mp4')) return 'video/mp4';
  return 'application/octet-stream';
}

export function resetFFmpeg() {
  ffmpeg = null;
  loadingPromise = null;
}

async function loadCore(instance: FFmpeg, url: string) {
  const assetBase = resolveAssetBase(url);
  const buildSource = async (file: string, mime: string) =>
    await toBlobURL(`${assetBase}${file}`, mime);

  try {
    await instance.load({
      coreURL: await buildSource('ffmpeg-core.js', 'text/javascript'),
      wasmURL: await buildSource('ffmpeg-core.wasm', 'application/wasm'),
      workerURL: await buildSource('ffmpeg-core.worker.js', 'text/javascript')
    });
  } catch (error) {
    throw new Error(
      `Não foi possível carregar o ffmpeg-core em ${assetBase}. Verifique se você executou “npm run ffmpeg:copy” (ou pnpm/yarn equivalente) e se NEXT_PUBLIC_FFMPEG_BASE_URL aponta para o diretório correto. Erro original: ${error}`
    );
  }
}

function resolveAssetBase(url: string) {
  if (/^https?:\/\//i.test(url)) {
    return url.endsWith('/') ? url : `${url}/`;
  }
  if (typeof window !== 'undefined' && window.location) {
    const base = new URL(url, window.location.origin).toString();
    return base.endsWith('/') ? base : `${base}/`;
  }
  return url.endsWith('/') ? url : `${url}/`;
}

export async function compressAudio(input: File, bitrateKbps: number) {
  const output = `${buildOutputName(input, `${bitrateKbps}kbps`)}.mp3`;
  return runJob({
    input,
    output,
    command: ['-codec:a', 'libmp3lame', '-b:a', `${bitrateKbps}k`, '-vn']
  });
}

export async function compressVideo720p(input: File) {
  const output = `${buildOutputName(input, '720p')}.mp4`;
  return runJob({
    input,
    output,
    command: [
      '-vf',
      'scale=-2:720',
      '-c:v',
      'libx264',
      '-b:v',
      '1600k',
      '-preset',
      'veryfast',
      '-c:a',
      'aac',
      '-b:a',
      '192k'
    ]
  });
}

export async function compressVideo480p(input: File) {
  const output = `${buildOutputName(input, '480p')}.mp4`;
  return runJob({
    input,
    output,
    command: [
      '-vf',
      'scale=-2:480',
      '-c:v',
      'libx264',
      '-b:v',
      '800k',
      '-preset',
      'veryfast',
      '-c:a',
      'aac',
      '-b:a',
      '160k'
    ]
  });
}

export async function extractAudioFromVideo(
  input: File,
  bitrateKbps: number,
  format: 'aac' | 'mp3' = 'aac'
) {
  const extension = format === 'mp3' ? 'mp3' : 'aac';
  const output = `${buildOutputName(input, `audio-${format}`)}.${extension}`;
  const command =
    format === 'mp3'
      ? ['-vn', '-acodec', 'libmp3lame', '-b:a', `${bitrateKbps}k`]
      : ['-vn', '-acodec', 'aac', '-b:a', `${bitrateKbps}k`];
  return runJob({
    input,
    output,
    command
  });
}
