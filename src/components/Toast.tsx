'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
}

export function Toast({ message, type = 'success', onClose }: ToastProps) {
  useEffect(() => {
    const timeout = setTimeout(onClose, 5000);
    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6 backdrop-blur-sm">
      <div
        role="alertdialog"
        aria-modal="true"
        className={cn(
          'w-full max-w-md rounded-3xl border px-6 py-5 text-sm shadow-2xl',
          type === 'success'
            ? 'border-emerald-200 bg-white text-emerald-900'
            : 'border-rose-200 bg-white text-rose-900'
        )}
      >
        <p className="text-base font-semibold">{type === 'success' ? 'Tudo certo!' : 'Ops, algo deu errado'}</p>
        <p className="mt-2 text-sm text-slate-600">{message}</p>
        <div className="mt-4 flex justify-end">
          <Button variant="ghost" className="h-9 px-3 text-xs font-semibold" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
}
