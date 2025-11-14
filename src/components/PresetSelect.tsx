'use client';

import { PRESETS } from '@/lib/presets';
import type { CompressionPreset } from '@/types';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface PresetSelectProps {
  value: CompressionPreset['id'] | null;
  onChange: (presetId: CompressionPreset['id']) => void;
  disabled?: boolean;
}

export function PresetSelect({ value, onChange, disabled }: PresetSelectProps) {
  return (
    <div className="space-y-3" role="radiogroup" aria-label="Selecione um preset">
      {PRESETS.map((preset) => {
        const isSelected = value === preset.id;
        return (
          <Tooltip key={preset.id}>
            <TooltipTrigger asChild>
              <button
                type="button"
                disabled={disabled}
                onClick={() => onChange(preset.id)}
                className={cn(
                  'w-full rounded-2xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
                  isSelected ? 'border-brand bg-sky-50' : 'border-slate-200 bg-white',
                  disabled && 'opacity-50'
                )}
                role="radio"
                aria-checked={isSelected}
              >
                <p className="text-sm font-semibold text-slate-900">{preset.label}</p>
                <p className="text-xs text-slate-500">{preset.description}</p>
              </button>
            </TooltipTrigger>
            <TooltipContent>{tooltipCopy(preset)}</TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}

function tooltipCopy(preset: CompressionPreset) {
  if (preset.type === 'audio') {
    return `Qualidade MP3 a ${preset.bitrate} kbps, ótimo para música ou voz.`;
  }
  if (preset.type === 'video') {
    return `Renderiza em ${preset.height}p com taxa aproximada de ${preset.bitrate} kbps.`;
  }
  return 'Extrai o áudio AAC com 128 kbps para publicar podcasts.';
}
