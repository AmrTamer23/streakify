import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function daysBetweenDates(date1: number, date2: number): number {
  const MILLISINDAY = 1000 * 60 * 60 * 24;
  return Math.abs(date1 - date2) / MILLISINDAY;
}
