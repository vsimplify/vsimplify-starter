import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(value: number, type?: 'currency' | 'number'): string {
  if (type === 'currency') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  }

  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0
  }).format(value);
}

export function formatPercentage(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 1
  }).format(value);
}

export async function streamToString(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder("utf-8");
  let result = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }
    result += decoder.decode(value);
  }

  reader.releaseLock();
  return result;
}