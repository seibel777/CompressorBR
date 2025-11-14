'use client';

import { useEffect, useMemo, useState } from 'react';
import { Download, Headphones, ShieldCheck, Smartphone, Video, Zap } from 'lucide-react';
import { Dropzone } from '@/components/Dropzone';
import { PresetSelect } from '@/components/PresetSelect';
import { ProgressBar } from '@/components/ProgressBar';
import { ResultCard } from '@/components/ResultCard';
import { Toast } from '@/components/Toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PRESETS } from '@/lib/presets';
import type { CompressionPreset, CompressionResult } from '@/types';
import { sendGaEvent, shouldHideAds, useUtmPersistence } from '@/lib/analytics';
import { AdTop } from '@/components/ads/AdTop';
import { AdInArticle } from '@/components/ads/AdInArticle';
import { AdAnchorMobile } from '@/components/ads/AdAnchorMobile';
import { useSearchParams } from 'next/navigation';

export default function HomePage() {
  const searchParams = useSearchParams();
  useUtmPersistence(searchParams?.toString() ? `?${searchParams.toString()}` : null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPresetId, setSelectedPresetId] = useState<CompressionPreset['id'] | null>(null);
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [adsHidden, setAdsHidden] = useState(false);

  const stepItems = [
    { title: 'Enviar arquivo', description: 'Arraste ou selecione um MP3, WAV, MP4 ou MOV.' },
    { title: 'Escolher preset', description: 'Defina se deseja vídeo otimizado ou apenas áudio.' },
    { title: 'Baixar resultado', description: 'Acompanhe o progresso e exporte o arquivo final.' }
  ];

  const quickTips = [
    {
      icon: <Video className="h-4 w-4 text-brand" />,
      label: 'Vídeo → vídeo comprimido',
      text: 'Use os presets H.264 720p/480p para reduzir drasticamente o tamanho.'
    },
    {
      icon: <Headphones className="h-4 w-4 text-brand" />,
      label: 'Vídeo → MP3/AAC',
      text: 'Selecione “Extrair áudio” para gerar MP3 ou AAC diretamente de MP4/MOV.'
    },
    {
      icon: <Download className="h-4 w-4 text-brand" />,
      label: 'Áudio → áudio',
      text: 'Os presets MP3 128/192 kbps funcionam apenas com arquivos de áudio.'
    }
  ];

  useEffect(() => {
    const syncAds = () => setAdsHidden(shouldHideAds());
    syncAds();
    window.addEventListener('storage', syncAds);
    return () => window.removeEventListener('storage', syncAds);
  }, []);

  const preset = useMemo(
    () => PRESETS.find((item) => item.id === selectedPresetId) ?? null,
    [selectedPresetId]
  );

  const fileIsAudio = selectedFile?.type.startsWith('audio/') ?? false;
  const fileIsVideo = selectedFile?.type.startsWith('video/') ?? false;

  const compatibilityError = useMemo(() => {
    if (!selectedFile || !preset) return null;
    if (preset.type === 'audio' && !fileIsAudio) {
      if (fileIsVideo) {
        return 'Para transformar um vídeo em MP3, use os presets “Extrair áudio”.';
      }
      return 'Use um arquivo de áudio (MP3/WAV) com presets de áudio.';
    }
    if (preset.type === 'video' && !fileIsVideo) {
      return 'Presets de vídeo aceitam apenas arquivos MP4/MOV.';
    }
    if (preset.type === 'extract' && !fileIsVideo) {
      return 'Selecione um vídeo para extrair o áudio.';
    }
    return null;
  }, [fileIsAudio, fileIsVideo, preset, selectedFile]);

  useEffect(() => {
    if (compatibilityError) {
      console.warn('[CompressorBR] Compatibilidade inválida:', compatibilityError);
    }
  }, [compatibilityError]);

  const disableActions = !selectedFile || !preset || isProcessing || Boolean(compatibilityError);

  const startCompression = async () => {
    if (!selectedFile || !preset) {
      setToast({ message: 'Selecione um arquivo e um preset.', type: 'error' });
      return;
    }
    if (compatibilityError) {
      setToast({ message: compatibilityError, type: 'error' });
      return;
    }

    setIsProcessing(true);
    setResult(null);
    setToast(null);
    setProgress(5);

    let ffmpegModule: typeof import('@/lib/ffmpegClient') | null = null;

    try {
      ffmpegModule = await import('@/lib/ffmpegClient');
      const {
        setProgressListener,
        compressAudio,
        compressVideo720p,
        compressVideo480p,
        extractAudioFromVideo
      } = ffmpegModule;
      setProgressListener((value) => setProgress(value));
      let newResult: CompressionResult | null = null;

      if (preset.type === 'audio') {
        newResult = await compressAudio(selectedFile, preset.bitrate);
      } else if (preset.type === 'video') {
        newResult =
          preset.height === 720
            ? await compressVideo720p(selectedFile)
            : await compressVideo480p(selectedFile);
      } else {
        newResult = await extractAudioFromVideo(selectedFile, preset.bitrate, preset.format);
      }

      if (newResult) {
        setResult(newResult);
        sendGaEvent('compression_completed', {
          preset: preset.id,
          before: newResult.beforeSize,
          after: newResult.afterSize
        });
        setToast({ message: 'Arquivo comprimido com sucesso!', type: 'success' });
      }
    } catch (error) {
      console.error(error);
      sendGaEvent('error', { message: String(error) });
      setToast({ message: 'Algo saiu errado. Tente novamente.', type: 'error' });
    } finally {
      ffmpegModule?.setProgressListener?.(() => {});
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const handlePresetChange = (presetId: CompressionPreset['id']) => {
    setSelectedPresetId(presetId);
    sendGaEvent('preset_selected', { preset: presetId });
  };

  const handleReset = () => {
    setSelectedFile(null);
    setSelectedPresetId(null);
    setResult(null);
    setProgress(0);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <AdTop hidden={adsHidden} />
      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-medium tracking-wide text-brand">Processamento local</p>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">
          Comprimir Áudio e Vídeo no Navegador
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-base text-slate-500">
          Use presets otimizados para reduzir o tamanho de MP3 e MP4 com ffmpeg.wasm. Privacidade total:
          nenhum arquivo sai do seu navegador.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-600">
          <span className="inline-flex items-center gap-2">
            <Zap className="h-4 w-4 text-brand" /> Sem upload • processamento local
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-brand" /> Privacidade garantida
          </span>
          <span className="inline-flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-brand" /> Mobile friendly
          </span>
        </div>
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <Card className="p-6">
            <Dropzone
              file={selectedFile}
              onFileAccepted={(file) => {
                setSelectedFile(file);
                if (!file) {
                  setResult(null);
                }
              }}
              disabled={isProcessing}
              onError={(message) => setToast({ message, type: 'error' })}
            />
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">Presets inteligentes</p>
                <p className="text-xs text-slate-500">
                  Escolha a saída ideal para seu projeto (vídeo, áudio ou extração).
                </p>
              </div>
              <p className="text-xs text-slate-400">Ctrl/Cmd + K abre o seletor</p>
            </div>
            <div className="mt-4">
              <PresetSelect value={selectedPresetId} onChange={handlePresetChange} disabled={isProcessing} />
            </div>
          </Card>
          <Card className="p-6">
            <p className="text-sm font-semibold text-slate-900">Dicas rápidas</p>
            <p className="text-xs text-slate-500">Como combinar arquivos e presets sem erro.</p>
            <div className="mt-4 space-y-3">
              {quickTips.map((tip) => (
                <div
                  key={tip.label}
                  className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 text-sm text-slate-600"
                >
                  <div className="flex items-center gap-2 font-semibold text-slate-900">
                    {tip.icon}
                    {tip.label}
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{tip.text}</p>
                </div>
              ))}
            </div>
          </Card>
          <AdInArticle hidden={adsHidden} />
        </div>
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">Etapas</p>
                <p className="text-xs text-slate-500">Tudo acontece localmente no navegador.</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">Beta v1</span>
            </div>
            <div className="mt-4 space-y-3">
              {stepItems.map((step, index) => (
                <div key={step.title} className="flex gap-3">
                  <span className="mt-1 h-6 w-6 shrink-0 rounded-full bg-brand/10 text-center text-xs font-bold text-brand">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{step.title}</p>
                    <p className="text-xs text-slate-500">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <p className="text-sm font-semibold text-slate-900">Pipeline</p>
            <p className="text-xs text-slate-500">Confirme as etapas e execute.</p>
            <div className="mt-4 space-y-4">
              <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                <p>1. Carregue um arquivo • 2. Escolha um preset • 3. Clique em “Comprimir”.</p>
                <p className="mt-1 text-xs text-slate-500">
                  Processamento local no seu navegador via ffmpeg.wasm. Nenhum arquivo é enviado ao servidor.
                </p>
              </div>
              <ProgressBar progress={progress} label={isProcessing ? 'Comprimindo...' : 'Pronto para começar'} />
              <Button onClick={startCompression} disabled={disableActions} className="w-full">
                {isProcessing ? 'Processando...' : 'Comprimir agora'}
              </Button>
              <Button variant="outline" onClick={handleReset} className="w-full">
                Resetar
              </Button>
            </div>
          </Card>
          {result && <ResultCard result={result} onReset={handleReset} />}
        </div>
      </section>

      <footer className="mt-16 flex flex-col items-center gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 md:flex-row md:justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <a href="/politica-de-privacidade" className="hover:text-brand">
            Política de privacidade
          </a>
          <a href="/termos-de-uso" className="hover:text-brand">
            Termos de uso
          </a>
        </div>
        <a href="https://github.com/seibel777/CompressorBR" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs">
          Open Source: GitHub
        </a>
      </footer>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <AdAnchorMobile hidden={adsHidden} />
    </div>
  );
}
