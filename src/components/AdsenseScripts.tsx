import Script from 'next/script';

const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID;

export function AdsenseHeadMeta() {
  if (!ADSENSE_ID) return null;
  return <meta name="google-adsense-account" content={ADSENSE_ID} />;
}

export function AdsenseScript() {
  if (!ADSENSE_ID) return null;
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
      data-ad-client={ADSENSE_ID}
    />
  );
}
