import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import HeroSlider from '@/components/HeroSlider';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <MainContent />;
}

function MainContent() {
  const t = useTranslations();

  return (
    <>
      {/* HERO SLIDER */}
      <HeroSlider />

      {/* ABOUT */}
      <section id="about" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">{t('about.title')}</h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>{t('about.description1')}</p>
            <p>{t('about.description2')}</p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <p className="text-blue-900 font-medium">{t('about.keyMessage')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section id="whatwedo" className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">{t('whatWeDo.title')}</h2>
          <p className="text-center text-gray-600 mb-12">{t('whatWeDo.intro')}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['measure', 'analyze', 'guide', 'model'].map((key) => (
              <div key={key} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-blue-900 mb-3">{t(`whatWeDo.items.${key}.title`)}</h3>
                <p className="text-gray-600">{t(`whatWeDo.items.${key}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section id="modules" className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">{t('modules.title')}</h2>
          <p className="text-center text-gray-600 mb-12">{t('modules.subtitle')}</p>
          <div className="grid md:grid-cols-3 gap-8">
            {['ishe', 'terakki', 'muasir'].map((key) => (
              <div key={key} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{t(`modules.items.${key}.title`)}</h3>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${key === 'ishe' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    {t(`modules.items.${key}.badge`)}
                  </span>
                </div>
                <p className="text-gray-600">{t(`modules.items.${key}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" className="py-20 px-4 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">{t('programs.title')}</h2>
          <p className="text-center text-slate-300 mb-12">{t('programs.subtitle')}</p>
          <div className="grid md:grid-cols-3 gap-8">
            {['istanbul', 'izmir', 'yozgat'].map((key) => (
              <div key={key} className="bg-white/10 backdrop-blur p-6 rounded-xl border border-white/20">
                <span className="inline-block px-3 py-1 bg-white/20 text-white text-sm rounded-full mb-4">{t(`programs.items.${key}.location`)}</span>
                <h3 className="text-xl font-bold mb-3">{t(`programs.items.${key}.title`)}</h3>
                <p className="text-slate-300">{t(`programs.items.${key}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">{t('team.title')}</h2>
          <p className="text-center text-gray-600 mb-4">{t('team.subtitle')}</p>
          <p className="text-center text-gray-500 max-w-3xl mx-auto mb-12">{t('team.description')}</p>
          <div className="grid md:grid-cols-3 gap-6">
            {['ozgur', 'asli', 'feryal', 'sebnem', 'yalcin', 'hilal'].map((key) => (
              <div key={key} className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-blue-600">👤</span>
                </div>
                <h3 className="font-bold text-gray-900">{t(`team.members.${key}.name`)}</h3>
                <p className="text-sm text-gray-500">{t(`team.members.${key}.title`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section id="principles" className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">{t('principles.title')}</h2>
          <p className="text-center text-gray-600 mb-12">{t('principles.subtitle')}</p>
          <div className="grid md:grid-cols-5 gap-4">
            {['human', 'evidence', 'modular', 'ethics', 'field'].map((key) => (
              <div key={key} className="text-center p-4 bg-white rounded-xl shadow-sm">
                <h3 className="font-bold text-blue-900 mb-2">{t(`principles.items.${key}.title`)}</h3>
                <p className="text-sm text-gray-600">{t(`principles.items.${key}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t('faq.title')}</h2>
          <div className="space-y-4">
            {['q1', 'q2', 'q3', 'q4', 'q5'].map((key) => (
              <div key={key} className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-2">{t(`faq.items.${key}.question`)}</h3>
                <p className="text-gray-600">{t(`faq.items.${key}.answer`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 px-4 bg-blue-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{t('contact.title')}</h2>
          <p className="text-blue-200 mb-8">{t('contact.description')}</p>
          <a href="mailto:info@maars.tr" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
            <span>✉️</span>
            info@maars.tr
          </a>
        </div>
      </section>
    </>
  );
}
