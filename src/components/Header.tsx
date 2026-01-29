'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { locales, localeNames, localeFlags, type Locale } from '@/i18n/routing';

const navItems = [
  { href: '#hero', key: 'home' },
  { href: '#about', key: 'about' },
  { href: '#modules', key: 'modules' },
  { href: '#programs', key: 'programs' },
  { href: '#team', key: 'team' },
  { href: '#contact', key: 'contact' },
];

export default function Header() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const t = useTranslations('nav');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const element = document.querySelector(href);
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    } else {
      window.location.href = '/' + locale + '/' + href;
    }
  };

  const handleLocaleChange = (newLocale: string) => {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/^\/(tr|en|fr)/, `/${newLocale}`);
    window.location.href = newPath;
  };

  return (
    <header className={`bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="font-heading text-2xl font-black tracking-wider text-blue-900 hover:text-blue-700 transition-colors"
          >
            MAARS
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm text-gray-600 hover:text-blue-900 transition-colors"
              >
                {t(item.key)}
              </a>
            ))}
          </nav>

          {/* Language & Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Language Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <span className={`fi fi-${localeFlags[locale]}`}></span>
                <span className="uppercase font-medium">{locale}</span>
              </button>

              {isLangOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[140px] z-50">
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        handleLocaleChange(loc);
                        setIsLangOpen(false);
                      }}
                      className={`flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                        locale === loc ? 'font-bold text-blue-900 bg-blue-50' : 'text-gray-600'
                      }`}
                    >
                      <span className={`fi fi-${localeFlags[loc]}`}></span>
                      <span>{localeNames[loc]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-gray-200">
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="block py-2 px-4 text-gray-600 hover:text-blue-900 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {t(item.key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
