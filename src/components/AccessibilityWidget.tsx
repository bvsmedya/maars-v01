'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

// Haptic feedback for mobile
const haptic = (pattern: number) => {
  if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
    window.navigator.vibrate(pattern)
  }
}

export default function AccessibilityWidget() {
  const t = useTranslations('accessibility')
  const params = useParams()
  const currentLocale = params.locale as string

  const [isOpen, setIsOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Listen for mobile menu state changes
  useEffect(() => {
    const handleMenuChange = (e: CustomEvent) => {
      setMobileMenuOpen(e.detail.isOpen)
    }
    window.addEventListener('mobileMenuChange' as any, handleMenuChange)
    return () => window.removeEventListener('mobileMenuChange' as any, handleMenuChange)
  }, [])
  const [voiceGuide, setVoiceGuide] = useState(false)
  const [fontSize, setFontSize] = useState<'small' | 'normal' | 'large'>('normal')
  const [highContrast, setHighContrast] = useState(false)
  const [highlightLinks, setHighlightLinks] = useState(false)
  const [lineHeight, setLineHeight] = useState<'normal' | 'large'>('normal')

  // Voice guide function
  const speak = useCallback((text: string) => {
    if (!voiceGuide || typeof window === "undefined" || !window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = currentLocale === 'tr' ? 'tr-TR' : currentLocale === 'fr' ? 'fr-FR' : 'en-US'
    utterance.rate = 0.9
    window.speechSynthesis.speak(utterance)
  }, [voiceGuide, currentLocale])

  // Voice guide welcome message
  useEffect(() => {
    if (voiceGuide) {
      const messages: Record<string, string> = {
        tr: "Sesli rehber açıldı. Size yardımcı olmaktan mutluluk duyarım.",
        en: "Voice guide enabled. Happy to help you.",
        fr: "Guide vocal activé. Heureux de vous aider."
      }
      speak(messages[currentLocale] || messages.tr)
    }
  }, [voiceGuide, speak, currentLocale])

  // Apply font size
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement
      if (fontSize === 'small') {
        root.style.fontSize = '14px'
      } else if (fontSize === 'large') {
        root.style.fontSize = '20px'
      } else {
        root.style.fontSize = '16px'
      }
    }
  }, [fontSize])

  // Apply high contrast
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (highContrast) {
        document.body.classList.add('high-contrast')
      } else {
        document.body.classList.remove('high-contrast')
      }
    }
  }, [highContrast])

  // Apply highlight links
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (highlightLinks) {
        document.body.classList.add('highlight-links')
      } else {
        document.body.classList.remove('highlight-links')
      }
    }
  }, [highlightLinks])

  // Apply line height
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (lineHeight === 'large') {
        document.body.classList.add('large-line-height')
      } else {
        document.body.classList.remove('large-line-height')
      }
    }
  }, [lineHeight])

  // Reset all settings
  const resetAll = () => {
    haptic(30)
    setVoiceGuide(false)
    setFontSize('normal')
    setHighContrast(false)
    setHighlightLinks(false)
    setLineHeight('normal')
    window.speechSynthesis?.cancel()
    speak(currentLocale === 'tr' ? 'Tüm ayarlar sıfırlandı' : currentLocale === 'fr' ? 'Tous les paramètres réinitialisés' : 'All settings reset')
  }

  // Keyboard shortcut (Alt + A for Accessibility)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'a') {
        e.preventDefault()
        setIsOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Hide when mobile menu is open
  if (mobileMenuOpen) return null

  return (
    <>
      {/* Floating Button - Sol Alt - Standart Accessibility Sembolü */}
      <button
        onClick={() => {
          haptic(20)
          setIsOpen(!isOpen)
        }}
        className="fixed bottom-6 left-6 z-[80] bg-blue-600 text-white p-3.5 rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110 group"
        aria-label={t('title')}
        title={t('title')}
      >
        {/* Universal Access İkonu - Kolları ve bacakları açık insan figürü */}
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="4.5" r="2.5"/>
          <path d="M12 21v-7m0 0l-3.5 4m3.5-4l3.5 4M12 14V9m0 0l5-2m-5 2l-5-2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
        {/* Tooltip */}
        <span className="absolute left-full ml-3 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {t('title')}
        </span>
      </button>

      {/* Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/30 z-[75] backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel Content - high-contrast modundan muaf */}
          <div
            data-accessibility-widget="true"
            className="fixed bottom-24 left-6 z-[80] w-80 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-300"
          >
            {/* Header */}
            <div className="bg-blue-600 text-white px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
                </svg>
                <span className="font-bold">{t('title')}</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">

              {/* Voice Guide */}
              <div>
                <p className="text-xs font-semibold mb-2 flex items-center gap-1.5" style={{ color: '#6b7280' }}>
                  <span>🔊</span> {t('voiceGuide')}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      haptic(20)
                      setVoiceGuide(false)
                      window.speechSynthesis?.cancel()
                    }}
                    className="py-2.5 rounded-xl border-2 flex items-center justify-center gap-2 font-medium text-sm transition"
                    style={{
                      backgroundColor: !voiceGuide ? '#3b82f6' : '#f9fafb',
                      borderColor: !voiceGuide ? '#3b82f6' : '#e5e7eb',
                      color: !voiceGuide ? '#ffffff' : '#4b5563'
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                    {t('off')}
                  </button>
                  <button
                    onClick={() => {
                      haptic(20)
                      setVoiceGuide(true)
                    }}
                    className="py-2.5 rounded-xl border-2 flex items-center justify-center gap-2 font-medium text-sm transition"
                    style={{
                      backgroundColor: voiceGuide ? '#3b82f6' : '#f9fafb',
                      borderColor: voiceGuide ? '#3b82f6' : '#e5e7eb',
                      color: voiceGuide ? '#ffffff' : '#4b5563'
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                    {t('on')}
                  </button>
                </div>
              </div>

              {/* Font Size */}
              <div>
                <p className="text-xs font-semibold mb-2 flex items-center gap-1.5" style={{ color: '#6b7280' }}>
                  <span>📝</span> {t('fontSize')}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      haptic(20)
                      setFontSize('small')
                      speak(currentLocale === 'tr' ? 'Küçük yazı' : currentLocale === 'fr' ? 'Petit texte' : 'Small text')
                    }}
                    className="py-2.5 rounded-xl border-2 font-medium text-xs transition"
                    style={{
                      backgroundColor: fontSize === 'small' ? '#3b82f6' : '#f9fafb',
                      borderColor: fontSize === 'small' ? '#3b82f6' : '#e5e7eb',
                      color: fontSize === 'small' ? '#ffffff' : '#4b5563'
                    }}
                  >
                    {t('small')}
                  </button>
                  <button
                    onClick={() => {
                      haptic(20)
                      setFontSize('normal')
                      speak(currentLocale === 'tr' ? 'Normal yazı' : currentLocale === 'fr' ? 'Texte normal' : 'Normal text')
                    }}
                    className="py-2.5 rounded-xl border-2 font-medium text-sm transition"
                    style={{
                      backgroundColor: fontSize === 'normal' ? '#3b82f6' : '#f9fafb',
                      borderColor: fontSize === 'normal' ? '#3b82f6' : '#e5e7eb',
                      color: fontSize === 'normal' ? '#ffffff' : '#4b5563'
                    }}
                  >
                    {t('normal')}
                  </button>
                  <button
                    onClick={() => {
                      haptic(20)
                      setFontSize('large')
                      speak(currentLocale === 'tr' ? 'Büyük yazı' : currentLocale === 'fr' ? 'Grand texte' : 'Large text')
                    }}
                    className="py-2.5 rounded-xl border-2 font-medium text-base transition"
                    style={{
                      backgroundColor: fontSize === 'large' ? '#3b82f6' : '#f9fafb',
                      borderColor: fontSize === 'large' ? '#3b82f6' : '#e5e7eb',
                      color: fontSize === 'large' ? '#ffffff' : '#4b5563'
                    }}
                  >
                    {t('large')}
                  </button>
                </div>
              </div>

              {/* Line Height */}
              <div>
                <p className="text-xs font-semibold mb-2 flex items-center gap-1.5" style={{ color: '#6b7280' }}>
                  <span>📏</span> {t('lineHeight')}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      haptic(20)
                      setLineHeight('normal')
                    }}
                    className="py-2.5 rounded-xl border-2 font-medium text-sm transition"
                    style={{
                      backgroundColor: lineHeight === 'normal' ? '#3b82f6' : '#f9fafb',
                      borderColor: lineHeight === 'normal' ? '#3b82f6' : '#e5e7eb',
                      color: lineHeight === 'normal' ? '#ffffff' : '#4b5563'
                    }}
                  >
                    {t('normal')}
                  </button>
                  <button
                    onClick={() => {
                      haptic(20)
                      setLineHeight('large')
                    }}
                    className="py-2.5 rounded-xl border-2 font-medium text-sm transition"
                    style={{
                      backgroundColor: lineHeight === 'large' ? '#3b82f6' : '#f9fafb',
                      borderColor: lineHeight === 'large' ? '#3b82f6' : '#e5e7eb',
                      color: lineHeight === 'large' ? '#ffffff' : '#4b5563'
                    }}
                  >
                    {t('large')}
                  </button>
                </div>
              </div>

              {/* High Contrast */}
              <div>
                <p className="text-xs font-semibold mb-2 flex items-center gap-1.5" style={{ color: '#6b7280' }}>
                  <span>🎨</span> {t('contrast')}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      haptic(20)
                      setHighContrast(false)
                    }}
                    className="py-2.5 rounded-xl border-2 font-medium text-sm transition"
                    style={{
                      backgroundColor: !highContrast ? '#3b82f6' : '#f9fafb',
                      borderColor: !highContrast ? '#3b82f6' : '#e5e7eb',
                      color: !highContrast ? '#ffffff' : '#4b5563'
                    }}
                  >
                    {t('normal')}
                  </button>
                  <button
                    onClick={() => {
                      haptic(20)
                      setHighContrast(true)
                    }}
                    className="py-2.5 rounded-xl border-2 font-medium text-sm transition"
                    style={{
                      backgroundColor: highContrast ? '#111827' : '#f9fafb',
                      borderColor: highContrast ? '#111827' : '#e5e7eb',
                      color: highContrast ? '#facc15' : '#4b5563'
                    }}
                  >
                    {t('highContrast')}
                  </button>
                </div>
              </div>

              {/* Highlight Links */}
              <div>
                <p className="text-xs font-semibold mb-2 flex items-center gap-1.5" style={{ color: '#6b7280' }}>
                  <span>🔗</span> {t('highlightLinks')}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      haptic(20)
                      setHighlightLinks(false)
                    }}
                    className="py-2.5 rounded-xl border-2 font-medium text-sm transition"
                    style={{
                      backgroundColor: !highlightLinks ? '#3b82f6' : '#f9fafb',
                      borderColor: !highlightLinks ? '#3b82f6' : '#e5e7eb',
                      color: !highlightLinks ? '#ffffff' : '#4b5563'
                    }}
                  >
                    {t('off')}
                  </button>
                  <button
                    onClick={() => {
                      haptic(20)
                      setHighlightLinks(true)
                    }}
                    className="py-2.5 rounded-xl border-2 font-medium text-sm transition"
                    style={{
                      backgroundColor: highlightLinks ? '#fbbf24' : '#f9fafb',
                      borderColor: highlightLinks ? '#fbbf24' : '#e5e7eb',
                      color: highlightLinks ? '#111827' : '#4b5563'
                    }}
                  >
                    {t('on')}
                  </button>
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={resetAll}
                className="w-full py-3 rounded-xl border-2 font-semibold text-sm transition flex items-center justify-center gap-2"
                style={{
                  backgroundColor: '#fef2f2',
                  borderColor: '#fecaca',
                  color: '#dc2626'
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                {t('reset')}
              </button>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t text-center" style={{ backgroundColor: '#f9fafb' }}>
              <p className="text-xs" style={{ color: '#9ca3af' }}>
                Alt + A {t('shortcut')}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  )
}
