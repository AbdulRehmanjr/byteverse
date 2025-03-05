import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import DOMPurify from 'isomorphic-dompurify';
import parse from 'html-react-parser';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parseHtml = (content: string) => parse(DOMPurify.sanitize(content))
