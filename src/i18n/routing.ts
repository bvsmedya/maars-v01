import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const locales = ['tr', 'en', 'fr'] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: 'tr',
  localePrefix: 'always'
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

// Dil bilgileri
export const localeNames: Record<Locale, string> = {
  tr: 'Türkçe',
  en: 'English',
  fr: 'Français'
};

// Bayrak kodları (flag-icons için)
export const localeFlags: Record<Locale, string> = {
  tr: 'tr',
  en: 'gb',
  fr: 'fr'
};
