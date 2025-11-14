export function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(' ');
}

export function formatBytes(bytes?: number) {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / Math.pow(1024, exponent);
  return `${value.toFixed(1)} ${units[exponent]}`;
}

export function estimateProcessingTime(size: number) {
  if (!size) return '~';
  if (size < 50 * 1024 * 1024) return 'Alguns segundos';
  if (size < 200 * 1024 * 1024) return '1-2 minutos';
  return 'Pode levar alguns minutos';
}
