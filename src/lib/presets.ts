import type { CompressionPreset } from '@/types';

export const PRESETS: CompressionPreset[] = [
  {
    id: 'audio-128',
    label: 'MP3 128 kbps',
    description: 'Qualidade padrão para podcasts e aulas menores.',
    type: 'audio',
    bitrate: 128
  },
  {
    id: 'audio-192',
    label: 'MP3 192 kbps',
    description: 'Melhor para música com mais detalhes.',
    type: 'audio',
    bitrate: 192
  },
  {
    id: 'video-720',
    label: 'H.264 720p ~1.6 Mbps',
    description: 'Ideal para YouTube e redes sociais com arquivos enxutos.',
    type: 'video',
    height: 720,
    bitrate: 1600
  },
  {
    id: 'video-480',
    label: 'H.264 480p ~0.8 Mbps',
    description: 'Para envios rápidos e mobile.',
    type: 'video',
    height: 480,
    bitrate: 800
  },
  {
    id: 'extract-audio',
    label: 'Extrair áudio AAC 128 kbps',
    description: 'Perfeito para publicar apenas a faixa de áudio.',
    type: 'extract',
    bitrate: 128,
    format: 'aac'
  },
  {
    id: 'extract-mp3',
    label: 'Extrair áudio MP3 128 kbps',
    description: 'Converta vídeos MP4/MOV em MP3 leves.',
    type: 'extract',
    bitrate: 128,
    format: 'mp3'
  }
];
