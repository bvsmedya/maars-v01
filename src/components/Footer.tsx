'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center">
          <h3 className="text-3xl font-black tracking-wider mb-2">MAARS</h3>
          <p className="text-gray-400 text-sm mb-8">{t('tagline')}</p>

          <div className="flex justify-center gap-6 mb-8">
            <a href="mailto:info@maars.tr" className="text-gray-400 hover:text-white transition-colors">
              <i className="fa-solid fa-envelope text-xl"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-xs">
            © {currentYear} MAARS. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
