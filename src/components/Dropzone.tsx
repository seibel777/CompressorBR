'use client';

import { ChangeEvent, DragEvent, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { formatBytes, estimateProcessingTime } from '@/lib/utils';
import { sendGaEvent } from '@/lib/analytics';

interface DropzoneProps {
  file: File | null;
  onFileAccepted: (file: File | null) => void;
  disabled?: boolean;
  onError: (message: string) => void;
}

export function Dropzone({ file, onFileAccepted, disabled, onError }: DropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const validateFile = (candidate: File | null) => {
    if (!candidate) return false;
    if (!candidate.type.startsWith('audio/') && !candidate.type.startsWith('video/')) {
      onError('Envie apenas arquivos de áudio ou vídeo.');
      return false;
    }
    return true;
  };

  const handleFiles = (files: FileList | null) => {
    if (!files?.length) return;
    const candidate = files[0];
    if (validateFile(candidate)) {
      sendGaEvent('upload_started', { file_type: candidate.type, file_size: candidate.size });
      onFileAccepted(candidate);
    }
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(false);
    if (disabled) return;
    handleFiles(event.dataTransfer?.files ?? null);
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFiles(event.target.files);
    event.target.value = '';
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Selecione ou arraste um arquivo de áudio ou vídeo"
      onClick={() => inputRef.current?.click()}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          inputRef.current?.click();
        }
      }}
      onDragOver={(event) => {
        event.preventDefault();
        if (!disabled) setIsDragActive(true);
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        setIsDragActive(false);
      }}
      onDrop={onDrop}
      className={`flex flex-col rounded-3xl border-2 border-dashed px-6 py-10 text-center transition ${
        isDragActive ? 'border-brand bg-sky-50/80' : 'border-slate-200 bg-white'
      } ${disabled ? 'opacity-60' : 'cursor-pointer'} `}
    >
      <input
        ref={inputRef}
        type="file"
        accept="audio/*,video/*"
        multiple={false}
        onChange={onInputChange}
        hidden
        disabled={disabled}
      />
      <p className="text-lg font-semibold text-slate-900">
        {file ? file.name : 'Arraste um arquivo ou clique para selecionar'}
      </p>
      <p className="mt-2 text-sm text-slate-500">
        {file
          ? `Tamanho: ${formatBytes(file.size)} • ${estimateProcessingTime(file.size)}`
          : 'Compatível com MP3, WAV, MP4, MOV e mais formatos.'}
      </p>
      {file && (
        <p className="mt-1 text-xs text-slate-400">
          Processamento 100% local. Arquivos grandes podem demorar, mas não há limite imposto.
        </p>
      )}
      <div className="mt-6 flex items-center justify-center gap-3">
        <Button type="button" disabled={disabled}>
          Selecionar arquivo
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={(event) => {
            event.stopPropagation();
            sendGaEvent('upload_started', { action: 'reset_click' });
            onFileAccepted(null);
          }}
        >
          Limpar
        </Button>
      </div>
    </div>
  );
}
