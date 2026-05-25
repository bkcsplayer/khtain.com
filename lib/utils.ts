// lib/utils.ts — small utilities
import { clsx, type ClassValue } from 'clsx';

/** Compose className strings, dedupe-safe, undefined-safe. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
