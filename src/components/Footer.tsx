'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-8">{t('tagline')}</p>

          <div className="flex justify-center gap-6 mb-8">
            <a href="mailto:info@maars.tr" className="text-gray-400 hover:text-white transition-colors">
              <i className="fa-solid fa-envelope text-xl"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-8">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-xs mb-4">
            © {currentYear} MAARS. {t('rights')}
          </p>
          <img src="/images/MAARS - footer.png" alt="MAARS" className="h-24 md:h-32 lg:h-40 mx-auto mt-6" />
        </div>
      </div>
    </footer>
  );
}
