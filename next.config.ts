import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Desteklenen diller
  i18n: undefined, // next-intl middleware kullanıyoruz
};

export default withNextIntl(nextConfig);
