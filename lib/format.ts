/**
 * Deterministic formatting utilities pinned to 'id-ID' locale
 * to prevent SSR vs client hydration mismatches.
 */

export function formatNumber(
  value: number,
  options?: Intl.NumberFormatOptions
): string {
  if (typeof value !== 'number' || isNaN(value)) {
    return '0';
  }
  return value.toLocaleString('id-ID', options);
}

export function formatTime(date: Date = new Date()): string {
  return date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

export function formatDate(
  date: Date = new Date(),
  options?: Intl.DateTimeFormatOptions
): string {
  return date.toLocaleDateString(
    'id-ID',
    options || {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  );
}
