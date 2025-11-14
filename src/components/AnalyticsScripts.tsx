import Script from 'next/script';
import { GA_MEASUREMENT_ID } from '@/lib/analytics';

export function AnalyticsHead() {
  if (!GA_MEASUREMENT_ID) return null;
  return (
    <Script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      strategy="afterInteractive"
    />
  );
}

export function AnalyticsScript() {
  if (!GA_MEASUREMENT_ID) return null;
  return (
    <Script id="ga4-init" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
      `}
    </Script>
  );
}
