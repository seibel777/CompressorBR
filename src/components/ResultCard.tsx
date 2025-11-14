'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { formatBytes } from '@/lib/utils';
import { sendGaEvent } from '@/lib/analytics';
import type { CompressionResult } from '@/types';

interface ResultCardProps {
  result: CompressionResult;
  onReset: () => void;
}

export function ResultCard({ result, onReset }: ResultCardProps) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!result) return;
    const url = URL.createObjectURL(result.blob);
    setObjectUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [result]);

  const savings = useMemo(() => {
    if (!result.beforeSize || !result.afterSize) return null;
    const diff = result.beforeSize - result.afterSize;
    const pct = (diff / result.beforeSize) * 100;
    return {
      diff,
      pct
    };
  }, [result]);

  const handleDownload = () => {
    if (!objectUrl) return;
    sendGaEvent('download_clicked', { file: result.fileName });
    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = result.fileName;
    anchor.click();
    anchor.remove();
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-inner">
      <h3 className="text-lg font-semibold text-slate-900">Arquivo pronto 🎉</h3>
      <p className="text-sm text-slate-500">
        Baixe o arquivo comprimido. Tudo ocorreu localmente no seu navegador.
      </p>
      <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <dt className="text-slate-500">Antes</dt>
          <dd className="font-semibold text-slate-900">{formatBytes(result.beforeSize)}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Depois</dt>
          <dd className="font-semibold text-slate-900">{formatBytes(result.afterSize)}</dd>
        </div>
        {savings && (
          <div className="col-span-2 rounded-2xl bg-slate-50 px-4 py-3 text-center text-sm">
            Economia aproximada de {formatBytes(savings.diff)} ({savings.pct.toFixed(1)}%).
          </div>
        )}
      </dl>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button onClick={handleDownload} disabled={!objectUrl}>
          Baixar arquivo
        </Button>
        <Button variant="outline" onClick={onReset}>
          Refazer
        </Button>
        <Button variant="ghost" disabled title="Integração futura">
          Salvar no Google Drive (em breve)
        </Button>
      </div>
    </div>
  );
}
