import { clsx, type ClassValue } from 'clsx';

/**
 * Utility function to merge Tailwind classes
 * Prevents class conflicts and handles conditional classes
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}