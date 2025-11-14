'use client';

import { TooltipProvider } from '@radix-ui/react-tooltip';
import { ReactNode, useEffect } from 'react';

function useRegisterServiceWorker() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .catch((err) => console.error('SW registration failed', err));
    }
  }, []);
}

export function Providers({ children }: { children: ReactNode }) {
  useRegisterServiceWorker();

  return <TooltipProvider delayDuration={150}>{children}</TooltipProvider>;
}
