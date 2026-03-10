import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@components/ui';
import styles from './HeroSlider.module.scss';

export interface HeroSlide {
  id: string;
  image: string;
  imageAlt: string;
  label: string;
  title: string;
  titleAccent: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  proof?: string;
}

const DEFAULT_SLIDES: HeroSlide[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=1920',
    imageAlt: 'Skincare Luméa Beauty - Produtos premium',
    label: 'Nova coleção',
    title: 'Cuidar de si é',
    titleAccent: 'luxo acessível',
    description: 'Skincare pensado para quem valoriza resultados visíveis. Fórmulas premium, texturas que encantam.',
    primaryCta: { label: 'Explorar coleção', href: '/categoria/skincare' },
    secondaryCta: { label: 'Ver kits', href: '/categoria/kits' },
    proof: '+50 mil clientes satisfeitas',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1920',
    imageAlt: 'Rotina de cuidados Luméa',
    label: 'Vitamina C',
    title: 'Ilumine sua pele',
    titleAccent: 'em 14 dias',
    description: 'Sérum concentrado com vitamina C pura. Reduz manchas, uniformiza o tom e traz radiance natural.',
    primaryCta: { label: 'Conhecer o sérum', href: '/produto/serum-vitamina-c-iluminador' },
    secondaryCta: { label: 'Ver skincare', href: '/categoria/skincare' },
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1920',
    imageAlt: 'Body care Luméa Beauty',
    label: 'Body care',
    title: 'Nutrição e',
    titleAccent: 'brilho rose gold',
    description: 'Óleo corporal seco multifuncional. Partículas iluminadoras para uma pele irresistível.',
    primaryCta: { label: 'Explorar body care', href: '/categoria/body-care' },
    proof: 'Frete grátis acima de R$199',
  },
];

const AUTOPLAY_INTERVAL = 6000;

export interface HeroSliderProps {
  slides?: HeroSlide[];
  autoplay?: boolean;
}

export const HeroSlider = ({
  slides = DEFAULT_SLIDES,
  autoplay = true,
}: HeroSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + slides.length) % slides.length);
    },
    [slides.length]
  );

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  useEffect(() => {
    if (!autoplay || isPaused) return;
    const timer = setInterval(goNext, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [autoplay, isPaused, goNext]);

  return (
    <section
      className={styles.slider}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      <div className={styles.slides}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${index === activeIndex ? styles.active : ''}`}
          >
            <div className={styles.slideImage}>
              <img src={slide.image} alt={slide.imageAlt} loading={index === 0 ? 'eager' : 'lazy'} />
              <div className={styles.slideOverlay} />
            </div>
            <div className={styles.slideContent}>
              <div className={styles.slideContentInner}>
                <span className={styles.slideLabel}>{slide.label}</span>
                <h2 className={styles.slideTitle}>
                  {slide.title}
                  <span className={styles.slideTitleAccent}>{slide.titleAccent}</span>
                </h2>
                <p className={styles.slideDescription}>{slide.description}</p>
                <div className={styles.slideActions}>
                  <Link to={slide.primaryCta.href}>
                    <Button variant="secondary" size="lg">
                      {slide.primaryCta.label}
                    </Button>
                  </Link>
                  {slide.secondaryCta && (
                    <Link to={slide.secondaryCta.href}>
                      <Button variant="outline" size="lg" className={styles.heroBtnOutline}>
                        {slide.secondaryCta.label}
                      </Button>
                    </Link>
                  )}
                </div>
                {slide.proof && (
                  <span className={styles.slideProof}>{slide.proof}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowPrev}`}
        aria-label="Slide anterior"
        onClick={goPrev}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowNext}`}
        aria-label="Próximo slide"
        onClick={goNext}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dots */}
      <div className={styles.dots}>
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ''}`}
            aria-label={`Ir para slide ${index + 1}`}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </section>
  );
};
