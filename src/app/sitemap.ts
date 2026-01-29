import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://maars.tr'
  const locales = ['en', 'tr', 'fr']
  const lastModified = new Date()

  // Generate sitemap entries for each locale
  const entries: MetadataRoute.Sitemap = []

  locales.forEach((locale) => {
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    })
  })

  return entries
}
