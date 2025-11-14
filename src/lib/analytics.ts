'use client';

import { useEffect } from 'react';

type GAEventName =
  | 'upload_started'
  | 'preset_selected'
  | 'compression_completed'
  | 'download_clicked'
  | 'error';

type GAEventParams = Record<string, string | number | undefined>;

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const HIDE_ADS_UTM = process.env.NEXT_PUBLIC_HIDE_ADS_FOR_UTM ?? 'psychofly';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign'] as const;

export function persistUtmFromSearch(search: string | null | undefined) {
  if (typeof window === 'undefined' || !search) return;
  const params = new URLSearchParams(search);
  let changed = false;
  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) {
      localStorage.setItem(key, value);
      changed = true;
    }
  });
  if (changed) {
    localStorage.setItem('utm_updated_at', Date.now().toString());
  }
}

export function getStoredUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const result: Record<string, string> = {};
  UTM_KEYS.forEach((key) => {
    const value = localStorage.getItem(key);
    if (value) result[key] = value;
  });
  return result;
}

export function sendGaEvent(eventName: GAEventName, params: GAEventParams = {}) {
  if (typeof window === 'undefined') return;
  const utmParams = getStoredUtmParams();
  const eventPayload: GAEventParams = { ...params, ...utmParams };
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventPayload);
  }
}

export function useUtmPersistence(search: string | null | undefined) {
  useEffect(() => {
    persistUtmFromSearch(search);
  }, [search]);
}

export function shouldHideAds() {
  if (typeof window === 'undefined') return false;
  const utmSource = localStorage.getItem('utm_source');
  return utmSource === HIDE_ADS_UTM;
}
