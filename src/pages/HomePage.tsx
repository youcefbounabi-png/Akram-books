import { Suspense, useRef, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import type { Application } from '@splinetool/runtime';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useLanguage } from '../i18n/LanguageContext';
import { Dumbbell, UtensilsCrossed } from 'lucide-react';
import booksHero from '../assets/images/books-hero.png';

export default function HomePage() {
  const { t, isRTL, lang } = useLanguage();
  const isEn = lang === 'en';
  const navigate = useNavigate();

  const heroImgRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set([contentRef.current, heroImgRef.current], { 
      opacity: 1,
      scale: 1,
      x: 0,
      xPercent: 0,
      clearProps: 'all' 
    });
  }, []);

  const handleSplineLoad = (splineApp: Application) => {
    const canvas = splineApp.canvas as HTMLCanvasElement | null;
    if (canvas) {
      canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
      }, { passive: false, capture: true });
    }
  };

  const handleTransition = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    const tl = gsap.timeline({ onComplete: () => navigate(path) });
    tl.to(contentRef.current, { opacity: 0, duration: 0.5, ease: 'power2.out' }, 0);
    tl.to(heroImgRef.current, {
      scale: 10,
      xPercent: isRTL ? -150 : 150,
      opacity: 0,
      duration: 1.2,
      ease: 'expo.inOut',
    }, 0);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      dir="ltr"
      className="relative w-full bg-[#050505]"
    >

      <div className="flex flex-col justify-between lg:hidden min-h-[100svh] overflow-hidden">
        <div>
        <div className="relative w-full shrink-0 overflow-hidden" style={{ height: '30vh' }}>
          <Suspense fallback={<div className="w-full h-full bg-[#0a0a0a]" />}>
            <Spline
              scene="/scene.splinecode"
              className="w-full h-full"
              onLoad={handleSplineLoad}
            />
          </Suspense>
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-10" />
        </div>

        <div
          className="relative w-[110%] -ml-[5%] z-10 overflow-hidden"
          style={{ marginTop: '-20px' }}
        >
          <img
            src={booksHero}
            alt="Akram Books Collection"
            loading="eager"
            decoding="async"
            className="w-full object-cover object-center block will-change-transform scale-[1.1]"
            style={{ height: '42vh' }}
          />
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-brand-red/10 blur-[80px] rounded-full pointer-events-none" />
          <div
            className="absolute inset-x-0 bottom-[-2px] h-[25vh] bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent pointer-events-none"
          />
          <div className="absolute inset-x-0 bottom-[-2px] h-8 bg-[#050505] pointer-events-none" />
        </div>
        </div>

        <div className="relative z-20 px-6 pt-[10px] pb-[40px] mt-[-30px]">
          <motion.div
            dir={isRTL ? 'rtl' : 'ltr'}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-start"
          >
            <p className="text-brand-red uppercase tracking-[0.15em] font-bold text-xs mb-2 flex items-center gap-2">
              <span className="w-4 h-4 rounded-full border border-brand-red flex-shrink-0 flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
              </span>
              {t.home.heroBadge}
            </p>

            <h1
              className="font-display font-black leading-[0.85] uppercase text-white mb-2 tracking-tight"
              style={{ fontSize: 'clamp(1.9rem, 7vw, 3.5rem)' }}
            >
              {isRTL ? (
                <>
                  {t.home.heroHeadline1}{' '}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-b from-brand-red to-[#4a080d]">
                    {t.home.heroHeadlinePath}
                  </span>
                </>
              ) : (
                <>
                  {t.home.heroHeadline1}
                  <br />
                  {t.home.heroHeadline2}{' '}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-b from-brand-red to-[#4a080d]">
                    {t.home.heroHeadlinePath}
                  </span>
                </>
              )}
            </h1>

            <div className="flex flex-col gap-[12px] w-full mt-2">
              <a
                href="/nutrition"
                onClick={(e) => handleTransition('/nutrition', e)}
                className="flex justify-center items-center gap-3 bg-brand-red hover:bg-[#ff2031] text-white px-6 py-3.5 rounded-full font-sans font-bold transition-all duration-300 hover:scale-[1.02] shadow-[0_0_25px_rgba(236,54,66,0.35)] min-h-[48px] w-full"
              >
                <UtensilsCrossed size={16} className="shrink-0" />
                {t.home.ctaNutrition}
              </a>
              <a
                href="/training"
                onClick={(e) => handleTransition('/training', e)}
                className="flex justify-center items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/15 backdrop-blur-sm text-white px-6 py-3.5 rounded-full font-sans font-bold transition-all duration-300 hover:scale-[1.02] min-h-[48px] w-full"
              >
                <Dumbbell size={16} className="shrink-0" />
                {t.home.ctaTraining}
              </a>
              
              <p className="mt-4 text-white/30 text-[10px] font-black uppercase tracking-[0.25em] text-center">
                {isEn ? "Books starting from 4,000 DA only" : "الكتب تبدأ من 4,000 DA فقط"}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="hidden lg:block relative h-screen min-h-[600px] overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full w-1/2 z-[1] pointer-events-none overflow-hidden"
        >
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-brand-red/10 blur-[100px] rounded-full" />
          <img
            ref={heroImgRef}
            src={booksHero}
            alt="Akram Books Collection"
            loading="eager"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-center will-change-transform"
          />
          <div
            className="absolute inset-y-0 w-72 bg-gradient-to-r from-transparent to-[#050505] pointer-events-none"
            style={{ right: 0 }}
          />
        </div>

        <div className="absolute top-0 right-0 w-1/2 h-full z-[2] pointer-events-auto">
          <Suspense fallback={<div className="w-full h-full bg-[#0a0a0a]" />}>
            <Spline
              scene="/scene.splinecode"
              className="w-full h-full"
              onLoad={handleSplineLoad}
            />
          </Suspense>
          <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none z-10" />
        </div>

        <div
          ref={contentRef}
          className="absolute inset-0 z-[10] flex items-center pointer-events-none"
        >
          <div className="w-full container max-w-7xl mx-auto px-6 md:px-10 lg:px-16 grid grid-cols-2">
            <div />
            <motion.div
              dir={isRTL ? 'rtl' : 'ltr'}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex flex-col items-start pointer-events-auto"
            >
              <p className="text-brand-red uppercase tracking-[0.15em] font-bold text-sm mb-3 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border border-brand-red flex-shrink-0 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                </span>
                {t.home.heroBadge}
              </p>
              <h1
                className="font-display font-black leading-[0.85] uppercase text-white mb-4 tracking-tight"
                style={{ fontSize: 'clamp(2.25rem, 6vw, 7rem)' }}
              >
                {isRTL ? (
                  <>
                    {t.home.heroHeadline1}{' '}
                    <span className="block text-transparent bg-clip-text bg-gradient-to-b from-brand-red to-[#4a080d]">
                      {t.home.heroHeadlinePath}
                    </span>
                  </>
                ) : (
                  <>
                    {t.home.heroHeadline1}
                    <br />
                    {t.home.heroHeadline2}{' '}
                    <span className="block text-transparent bg-clip-text bg-gradient-to-b from-brand-red to-[#4a080d]">
                      {t.home.heroHeadlinePath}
                    </span>
                  </>
                )}
              </h1>
              <p
                className="text-white/60 font-light max-w-md xl:max-w-lg leading-relaxed mb-6"
                style={{ fontSize: 'clamp(0.8rem, 1.4vw, 1rem)' }}
              >
                {t.home.heroDesc}
              </p>
              <div className="flex flex-row gap-3">
                <a
                  href="/nutrition"
                  onClick={(e) => handleTransition('/nutrition', e)}
                  className="flex items-center gap-3 bg-brand-red hover:bg-[#ff2031] text-white px-6 py-3.5 rounded-full font-sans font-bold transition-all duration-300 hover:scale-[1.02] shadow-[0_0_25px_rgba(236,54,66,0.35)] min-h-[48px]"
                  style={{ fontSize: 'clamp(0.8rem, 1.4vw, 0.9375rem)' }}
                >
                  <UtensilsCrossed size={16} className="shrink-0" />
                  {t.home.ctaNutrition}
                </a>
                <a
                  href="/training"
                  onClick={(e) => handleTransition('/training', e)}
                  className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/15 backdrop-blur-sm text-white px-6 py-3.5 rounded-full font-sans font-bold transition-all duration-300 hover:scale-[1.02] min-h-[48px]"
                  style={{ fontSize: 'clamp(0.8rem, 1.4vw, 0.9375rem)' }}
                >
                  <Dumbbell size={16} className="shrink-0" />
                  {t.home.ctaTraining}
                </a>
              </div>
              
              <p className="mt-8 text-white/30 text-[10px] md:text-sm font-black uppercase tracking-[0.25em]">
                {isEn ? "Books starting from 4,000 DA only" : "الكتب تبدأ من 4,000 DA فقط"}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
