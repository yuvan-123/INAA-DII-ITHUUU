// lib/utils.ts

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRotationStyle(deg: number): React.CSSProperties {
  return { transform: `rotate(${deg}deg)` };
}
