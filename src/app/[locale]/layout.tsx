import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AccessibilityWidget from '@/components/AccessibilityWidget';
import '../globals.css';

export const metadata: Metadata = {
  title: 'MAARS - Modern Akademik Araştırma ve Rehberlik Sistemi',
  description: 'MAARS, bireylerin sosyal, bilişsel ve fiziksel sağlıklarını desteklemek için dijital sağlık çözümleri geliştiren bir platformdur. iShe, TERAKKİ ve MUASIR projelerinden oluşur.',
  keywords: ['MAARS', 'dijital sağlık', 'iShe', 'Ayşe', 'TERAKKİ', 'MUASIR', 'yapay zeka', 'TÜBİTAK', 'yaşlı sağlığı', 'bilişsel sağlık'],
  authors: [{ name: 'MAARS' }],
  openGraph: {
    title: 'MAARS - Modern Academic Advisory Research System',
    description: 'MAARS is a platform that develops digital health solutions to support social, cognitive, and physical health. Featuring iShe, TERAKKİ, and MUASIR projects.',
    url: 'https://maars.tr',
    siteName: 'MAARS',
    images: [
      {
        url: 'https://maars.tr/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MAARS - Modern Academic Advisory Research System',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MAARS - Modern Academic Advisory Research System',
    description: 'Digital health platform featuring iShe (Ayşe) AI assistant for elderly care, TERAKKİ wearables, and MUASIR health kiosks.',
    images: ['https://maars.tr/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.6.6/css/flag-icons.min.css"
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-grow pt-16">
            {children}
          </main>
          <Footer />
          <AccessibilityWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
