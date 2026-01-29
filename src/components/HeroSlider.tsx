'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

const slides = [
  {
    image: '/images/slider/maars-mars-colony.jpg',
    titleKey: 'mars',
  },
  {
    image: '/images/slider/ishe-ayse-seaside.jpg',
    titleKey: 'ishe',
  },
  {
    image: '/images/slider/ai-brain-nlp.jpg',
    titleKey: 'ai',
  },
  {
    image: '/images/slider/terakki-wearables.jpg',
    titleKey: 'terakki',
  },
  {
    image: '/images/slider/muasir-health-kiosk.jpg',
    titleKey: 'muasir',
  },
  {
    image: '/images/slider/academic-research-lab.jpg',
    titleKey: 'research',
  },
  {
    image: '/images/slider/team-mars-station.jpg',
    titleKey: 'team',
  },
  {
    image: '/images/slider/team-ataturk-monument.jpg',
    titleKey: 'ataturk',
  },
];

export default function HeroSlider() {
  const t = useTranslations('slider');
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={slide.image}
            alt={t(`${slide.titleKey}.title`)}
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16 text-white">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
                {t(`${slide.titleKey}.title`)}
              </h2>
              <p className="text-lg md:text-xl text-white/90 drop-shadow-md max-w-2xl">
                {t(`${slide.titleKey}.description`)}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all"
        aria-label="Previous slide"
      >
        <i className="fa-solid fa-chevron-left text-xl"></i>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all"
        aria-label="Next slide"
      >
        <i className="fa-solid fa-chevron-right text-xl"></i>
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === current
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
