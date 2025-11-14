'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

const AD_CLIENT = 'ca-pub-8871450664559424';
const AD_SLOT = '1665267623';

interface AdProps {
  hidden?: boolean;
}

export function AdTop({ hidden }: AdProps) {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (hidden || !scriptLoaded) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('[AdTop] Erro ao renderizar AdSense', error);
    }
  }, [hidden, scriptLoaded]);

  if (hidden) return null;

  return (
    <section className="w-full rounded-3xl border border-slate-200 bg-white/90 p-4 text-center text-xs text-slate-500">
      <Script
        id="adsense-adtop"
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`}
        strategy="afterInteractive"
        crossOrigin="anonymous"
        onLoad={() => setScriptLoaded(true)}
      />
      <p className="font-semibold text-slate-600">Publicidade</p>
      <div className="mt-2 w-full rounded-2xl">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={AD_CLIENT}
          data-ad-slot={AD_SLOT}
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </section>
  );
}
