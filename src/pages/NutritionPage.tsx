import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { BookOpen, CheckCircle2, TrendingUp, Brain, HeartPulse, Flame, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import local assets
import img2 from '../assets/images/nutrition-book-new.png';
import img4 from '../assets/images/IMG_2168.JPG.jpeg';
import img5 from '../assets/images/IMG_2161.JPG.jpeg';
import imgFood1 from '../assets/images/1.jpg.jpeg';
import imgFood2 from '../assets/images/1.jpg (1).jpeg';
import heroVideo from '../assets/images/hero-nutrition.mp4';

gsap.registerPlugin(ScrollTrigger);

/* ─── Parallax image wrapper ──────────────────────────── */
function ParallaxImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imgRef.current,
        { yPercent: -15 },
        {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'top bottom',
            end: '+=250%', // Long end accounts for the fact that the parent section gets pinned
            scrub: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className={`overflow-hidden ${className}`}>
      <img ref={imgRef} src={src} alt={alt} className="w-full h-full object-cover scale-[1.3] will-change-transform" />
    </div>
  );
}

/* ─── Split Chars Helper ──────────────────────────── */
const SplitChars = ({ text, className = "" }: { text: string, className?: string }) => {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <span key={i} className="char inline-block whitespace-pre">{char === ' ' ? '\u00A0' : char}</span>
      ))}
    </span>
  );
};

/* ─── Split Words Helper (For Arabic) ──────────────── */
const SplitWords = ({ text, className = "" }: { text: string, className?: string }) => {
  return (
    <span className={className}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="char inline-block whitespace-pre">{word}&nbsp;</span>
      ))}
    </span>
  );
};

export default function NutritionPage() {
  const { lang, isRTL } = useLanguage();
  const isEn = lang === 'en';

  const pageRef = useRef<HTMLDivElement>(null);
  const coachImgRef = useRef<HTMLDivElement>(null);
  const bigTextRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaHeroRef = useRef<HTMLDivElement>(null);
  const floatBall1Ref = useRef<HTMLDivElement>(null);
  const floatBall2Ref = useRef<HTMLDivElement>(null);
  const floatBall3Ref = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const imagineTitleRef = useRef<HTMLDivElement>(null);
  const featureCardsRef = useRef<HTMLDivElement>(null);
  const bookImgRef = useRef<HTMLDivElement>(null);
  const bookTextRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const parallaxTextRef = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLElement>(null);
  const svgLineRef = useRef<SVGLineElement>(null);
  const ctaHeadlineRef = useRef<HTMLHeadingElement>(null);
  const magneticButtonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Hero coach image: slam in from below ── */
      gsap.fromTo(coachImgRef.current,
        { yPercent: 15, opacity: 0, scale: 1.08 },
        { yPercent: 0, opacity: 1, scale: 1, duration: 1.3, ease: 'expo.out', delay: 0.1 }
      );

      /* ── Big text: staggered split entrance ── */
      if (bigTextRef.current) {
        const lines = bigTextRef.current.querySelectorAll('.hero-line');
        gsap.fromTo(lines,
          { opacity: 0, y: 80, skewX: -4 },
          { opacity: 1, y: 0, skewX: 0, duration: 1, stagger: 0.12, ease: 'expo.out', delay: 0.25 }
        );
      }

      /* ── Label ── */
      gsap.fromTo(labelRef.current,
        { opacity: 0, letterSpacing: '0.6em', x: -20 },
        { opacity: 1, letterSpacing: '0.2em', x: 0, duration: 0.9, ease: 'power3.out', delay: 0.5 }
      );

      /* ── Subtitle + CTA ── */
      gsap.fromTo([subtitleRef.current, ctaHeroRef.current],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out', delay: 0.7 }
      );

      /* ── Floating food circles: staggered pop in ── */
      const balls = [floatBall1Ref.current, floatBall2Ref.current, floatBall3Ref.current];
      gsap.fromTo(balls,
        { scale: 0, opacity: 0, rotation: -15 },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.8, stagger: 0.18, ease: 'back.out(1.5)', delay: 0.6 }
      );

      /* ── Continual float animation for food circles ── */
      gsap.to(floatBall1Ref.current, { y: -18, duration: 2.8, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      gsap.to(floatBall2Ref.current, { y: 14, duration: 3.2, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 0.4 });
      gsap.to(floatBall3Ref.current, { y: -10, duration: 2.5, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 0.9 });

      /* ── Rotation drift ── */
      gsap.to(floatBall1Ref.current, { rotation: 8, duration: 5, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      gsap.to(floatBall2Ref.current, { rotation: -6, duration: 4.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });

      /* ── Scroll hint bounce ── */
      gsap.fromTo(scrollHintRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 1.2 });
      gsap.to(scrollHintRef.current, { y: 10, repeat: -1, yoyo: true, duration: 1, ease: 'sine.inOut' });

      /* ── Marquee ── */
      if (marqueeRef.current) {
        const track = marqueeRef.current.querySelector('.marquee-track');
        if (track) {
          gsap.to(track, { xPercent: -50, ease: 'none', duration: 20, repeat: -1 });
        }
        gsap.fromTo(marqueeRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1, scrollTrigger: { trigger: marqueeRef.current, start: 'top 90%', once: true } }
        );
      }

      /* ── Imagine title ── */
      if (imagineTitleRef.current) {
        gsap.fromTo(imagineTitleRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: imagineTitleRef.current, start: 'top 82%', once: true } }
        );
      }

      /* ── Feature cards parallax background ── */
      if (parallaxTextRef.current) {
        gsap.to(parallaxTextRef.current, {
          y: '30vh', // 0.3x scroll speed effect
          ease: 'none',
          scrollTrigger: {
            trigger: parallaxTextRef.current.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });
      }

      /* ── Feature cards (Spring-like entrance) ── */
      if (featureCardsRef.current) {
        const cards = featureCardsRef.current.querySelectorAll('.nut-card');
        cards.forEach((card, i) => {
          gsap.fromTo(card,
            { opacity: 0, x: i % 2 === 0 ? -200 : 200 },
            { opacity: 1, x: 0, duration: 1.2, ease: 'elastic.out(1, 0.75)', scrollTrigger: { trigger: card, start: 'top 85%', once: true } }
          );
        });
      }

      /* ── Section 3 Pin & Scrub (What's Inside) ── */
      if (section3Ref.current && bookImgRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section3Ref.current,
            start: 'top top',
            end: '+=150%',
            pin: true,
            scrub: 0.5
          }
        });

        // Initial book state
        gsap.set(bookImgRef.current, { rotateY: 25, transformPerspective: 1200 });
        // The book rotates over the whole timeline
        tl.to(bookImgRef.current, { rotateY: -25, ease: 'none', duration: 1 }, 0);

        // The items animate sequentially
        if (bookTextRef.current) {
           const items = bookTextRef.current.querySelectorAll('.book-item-row');
           gsap.set(items, { clipPath: isRTL ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)' });
           
           if (svgLineRef.current) {
              gsap.set(svgLineRef.current, { strokeDasharray: 1000, strokeDashoffset: 1000 });
              tl.to(svgLineRef.current, { strokeDashoffset: 0, ease: 'none', duration: 1 }, 0);
           }

           items.forEach((item, i) => {
              tl.to(item, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.3, ease: 'power2.out' }, i * 0.3);
           });
        }
      }

      /* ── CTA panel & Headline ── */
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current,
          { opacity: 0, scale: 0.7, rotateX: 20 },
          { opacity: 1, scale: 1, rotateX: 0, duration: 1.2, ease: 'back.out(2)', scrollTrigger: { trigger: ctaRef.current, start: 'top 85%', once: true } }
        );
      }
      if (ctaHeadlineRef.current) {
         const chars = ctaHeadlineRef.current.querySelectorAll('.char');
         gsap.fromTo(chars,
            { opacity: 0, y: -60 },
            { opacity: 1, y: 0, stagger: 0.03, duration: 0.8, ease: 'back.out(1.5)', scrollTrigger: { trigger: ctaRef.current, start: 'top 80%', once: true } }
         );
      }

    }, pageRef);

    return () => ctx.revert();
  }, [isRTL]);

  const features = [
    {
      text: isEn ? "Understand nutrition deeply without complexity" : "تفهم التغذية بعمق وبدون تعقيد",
      icon: <Brain className="text-[#ec3642] w-7 h-7" />,
      desc: isEn ? "No fluff. Pure, actionable science." : "لا حشو. علم خالص وقابل للتطبيق."
    },
    {
      text: isEn ? "Calculate your exactly required macros" : "تحسب احتياجاتك الغذائية بدقة",
      icon: <CheckCircle2 className="text-[#ec3642] w-7 h-7" />,
      desc: isEn ? "Precision nutrition programmed for you." : "تغذية دقيقة مبرمجة خصيصًا لك."
    },
    {
      text: isEn ? "Design your own programs (shred, bulk, maintenance)" : "تصمّم برامجك بنفسك (تنشيف – تضخيم – زيادة أو خسارة وزن)",
      icon: <TrendingUp className="text-[#ec3642] w-7 h-7" />,
      desc: isEn ? "Flexible and fully customizable." : "مرن وقابل للتخصيص بالكامل."
    },
    {
      text: isEn ? "Start training others professionally!" : "بل وتبدأ في تدريب الآخرين باحتراف!",
      icon: <HeartPulse className="text-[#ec3642] w-7 h-7" />,
      desc: isEn ? "Become the coach you never had." : "كن المدرب الذي لم تجده من قبل."
    },
  ];

  const marqueeWords = isEn
    ? ['NUTRITION', 'HEALTH', 'MACROS', 'RECIPES', 'RESULTS', 'SCIENCE', 'BODY', 'MIND']
    : ['التغذية', 'الصحة', 'الوجبات', 'النتائج', 'العلم', 'الجسم', 'العقل', 'الحياة'];

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(card, {
      rotateY: (x / rect.width) * 16, // max 8 deg
      rotateX: -(y / rect.height) * 10, // max -5 deg
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 1200
    });
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'power2.out' });
  };

  const handleMagneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    gsap.to(btn, { x: x * 0.4, y: y * 0.4, duration: 0.3, ease: 'power2.out' });
  };

  const handleMagneticLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
  };

  return (
    <motion.div
      ref={pageRef}
      dir={isRTL ? 'rtl' : 'ltr'}
      className="bg-[#070707] min-h-screen relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
    >

      {/* ══════════════════════════════════════════════════════
          HERO — CLEAN TWO-COLUMN SPLIT
          Left  50% : book/coach image fills full height
          Right 50% : solid red #ec3642, text stacked vertically
          Navbar is fixed at ~72px, so we use padding-top on the section
      ══════════════════════════════════════════════════════ */}
      <section
        className="w-full flex flex-col lg:flex-row overflow-hidden"
        style={{ minHeight: '100vh', paddingTop: '72px' }}
      >
        {/* ── LEFT COLUMN: Book / Coach image ── */}
        <div
          ref={coachImgRef}
          className="lg:w-[60%] w-full relative overflow-hidden flex-shrink-0 flex-1"
          style={{ minHeight: '50vh' }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover object-top will-change-transform"
          >
            <source src={heroVideo} type="video/mp4" />
            {/* Fallback for browsers that don't support video */}
            <img src={img2} loading="lazy" decoding="async" alt="Coach Akram — Nutrition Guide" className="w-full h-full object-cover object-top will-change-transform" />
          </video>

          {/* Subtle dark gradient at bottom so it blends cleanly */}
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

          {/* Chapter tag — top-left corner over image */}
          <div className="absolute top-6 left-6 flex items-center gap-2 z-10">
            <div className="w-2 h-2 rounded-full bg-[#ec3642]" />
            <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.3em]">
              {isEn ? 'Chapter 01 — Nutrition' : 'الفصل 01 — التغذية'}
            </span>
          </div>

          {/* Floating food circles — contained inside the left column, no overflow */}
          {/* Circle 1 — top right of image */}
          <div
            ref={floatBall1Ref}
            className="absolute will-change-transform"
            style={{ top: '12%', right: '8%', width: '110px', height: '110px', opacity: 0 }}
          >
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-[0_0_30px_rgba(212,67,42,0.7)]">
              <img src={imgFood1} alt="Food" loading="lazy" decoding="async" className="w-full h-full object-cover scale-125 will-change-transform" />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#ec3642] text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full whitespace-nowrap">
              {isEn ? '100+ Recipes' : '+100 وصفة'}
            </div>
          </div>

          {/* Circle 2 — mid right */}
          <div
            ref={floatBall2Ref}
            className="absolute will-change-transform"
            style={{ top: '42%', right: '4%', width: '90px', height: '90px', opacity: 0 }}
          >
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#ec3642] shadow-[0_0_30px_rgba(212,67,42,0.5)]">
              <img src={imgFood2} alt="Food" loading="lazy" decoding="async" className="w-full h-full object-cover scale-110 will-change-transform" />
            </div>
          </div>

          {/* Circle 3 — lower right */}
          <div
            ref={floatBall3Ref}
            className="absolute will-change-transform"
            style={{ bottom: '20%', right: '9%', width: '75px', height: '75px', opacity: 0 }}
          >
            <div className="w-full h-full rounded-full overflow-hidden border-[3px] border-white/70 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <img src={img5} alt="Food" loading="lazy" decoding="async" className="w-full h-full object-cover object-top scale-150 will-change-transform" />
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: Red background + stacked text ── */}
        <div
          className="lg:w-[40%] w-full flex flex-col justify-center relative overflow-hidden"
          style={{
            backgroundColor: '#ec3642',
            padding: 'clamp(2.5rem, 6vw, 5rem) clamp(2rem, 5vw, 4rem)',
          }}
        >
          {/* Ghost watermark — purely decorative, behind content, clipped */}
          <div
            className="absolute inset-0 flex items-center overflow-hidden pointer-events-none select-none"
            aria-hidden="true"
          >
            <span
              className="font-display font-black text-black/10 leading-none whitespace-nowrap"
              style={{ fontSize: 'clamp(100px, 16vw, 220px)', letterSpacing: '-0.04em' }}
            >
              {isEn ? 'NUTRITION' : 'التغذية'}
            </span>
          </div>

          {/* ── Stacked content — z-10 so it's always above the ghost text ── */}
          <div className="relative z-10 flex flex-col gap-6" dir={isRTL ? 'rtl' : 'ltr'}>

            {/* 1. Overline label */}
            <p
              ref={labelRef}
              className="flex items-center gap-3 text-black/60 font-bold uppercase text-xs tracking-[0.28em]"
            >
              <span className="w-8 h-[2px] bg-black/40 inline-block flex-shrink-0" />
              {isEn ? 'The Complete Guide' : 'الدليل الشامل'}
            </p>

            {/* 2. Main headline */}
            <div ref={bigTextRef}>
              {isEn ? (
                <h1
                  className="font-display font-black uppercase leading-[0.9] text-white"
                  style={{ fontSize: 'clamp(52px, 8vw, 108px)', letterSpacing: '-0.03em' }}
                >
                  THE<br />
                  <span style={{ color: '#070707' }}>COMPLETE</span><br />
                  NUTRITION<br />
                  <span
                    style={{
                      fontSize: 'clamp(36px, 5vw, 70px)',
                      color: 'transparent',
                      WebkitTextStroke: '2px rgba(7,7,7,0.35)',
                    }}
                  >
                    GUIDE
                  </span>
                </h1>
              ) : (
                <h1
                  className="font-black leading-[0.95] text-white"
                  style={{ fontSize: 'clamp(52px, 8vw, 100px)', fontFamily: 'var(--font-arabic)' }}
                >
                  <span style={{ color: '#070707' }}>الشامل</span><br />
                  في التغذية<br />
                  <span style={{ fontSize: 'clamp(36px, 5vw, 68px)', color: '#070707' }}>
                    والوصفات
                  </span>
                </h1>
              )}
            </div>

            {/* 3. Divider */}
            <div className="w-14 h-1 bg-black/30 rounded" />

            {/* 4. Paragraph */}
            <div ref={subtitleRef} className="max-w-sm">
              <p className="text-black/75 font-sans text-base leading-relaxed">
                {isEn
                  ? 'Not just a book — a roadmap to transform your body. 100+ precision recipes. Full macro calculations. Clinical meal plans.'
                  : 'ليس مجرد كتاب — خارطة طريق لتحويل جسمك. +100 وصفة محسوبة. حسابات الماكرو كاملة. أنظمة غذائية علاجية.'}
              </p>
            </div>

            {/* 5. CTA button + Price Anchor */}
            <div ref={ctaHeroRef} className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-black/40 text-sm line-through font-bold">8,000 DA</span>
                  <span className="text-white text-2xl font-black">6,000 DA</span>
                </div>
                <div className="bg-green-500/20 border border-green-500/50 px-3 py-1 rounded-full text-[10px] font-black text-green-400 uppercase tracking-widest animate-pulse">
                  {isEn ? "SAVE 2,000 DA" : "وفر 2,000 DA"}
                </div>
              </div>

              <Link
                to="/order"
                className="group relative inline-flex items-center gap-3 text-white font-display font-bold uppercase tracking-widest text-sm overflow-hidden transition-all duration-300 hover:scale-[1.03] w-max"
                style={{
                  backgroundColor: '#070707',
                  padding: '1rem 2.25rem',
                  letterSpacing: '0.14em',
                  boxShadow: '0 8px 28px rgba(0,0,0,0.35)',
                }}
              >
                <span className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <BookOpen size={18} className="relative z-10 flex-shrink-0" />
                <span className="relative z-10">{isEn ? 'GET THE GUIDE' : 'احصل عليه الآن'}</span>
              </Link>
            </div>

            {/* 6. Social proof + scroll hint */}
            <div ref={scrollHintRef} className="flex items-center gap-4 flex-wrap">
              <div className="flex -space-x-2">
                {[img4, img5, imgFood1].map((src, i) => (
                  <div key={i} className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/70" style={{ zIndex: 3 - i }}>
                    <img src={src} loading="lazy" decoding="async" alt="" className="w-full h-full object-cover object-top" />
                  </div>
                ))}
              </div>
              <div className="text-black/70 text-xs font-bold uppercase tracking-wider leading-tight">
                <span className="text-black font-black text-base">500+</span>
                <br />
                {isEn ? 'Readers' : 'قارئ'}
              </div>
              <div className="flex items-center gap-1.5 text-black/60">
                <Flame size={14} />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {isEn ? '3× Champion · Dr. Pharmacy' : 'بطل × 3 · دكتور صيدلة'}
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────── */}
      <div ref={marqueeRef} className="relative overflow-hidden py-5 border-y border-white/[0.06] bg-[#070707] opacity-0">
        <div className="marquee-track flex gap-10 whitespace-nowrap will-change-transform" style={{ width: 'max-content' }}>
          {[...marqueeWords, ...marqueeWords].map((word, i) => (
            <span key={i} className="text-2xl font-display font-black uppercase text-white/10 tracking-[0.15em] inline-flex items-center gap-10">
              {word}
              <span className="text-[#ec3642] text-lg">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── IMAGINE THAT ─────────────────────────────────── */}
      <section className="container max-w-7xl mx-auto px-6 py-32 relative overflow-hidden">
        <div ref={parallaxTextRef} className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] z-0">
          <span className="text-[25vw] font-black leading-none whitespace-nowrap text-white">التغذية</span>
        </div>
        
        <div ref={imagineTitleRef} className="text-center mb-16 opacity-0 relative z-10">
          <p className="text-[#ec3642] uppercase tracking-[0.25em] text-sm font-bold mb-3">{isEn ? "The Vision" : "التصور"}</p>
          <h2 className="text-4xl md:text-6xl font-display font-black uppercase text-white mb-4">
            {isEn ? "IMAGINE THAT:" : "تخيّل أن:"}
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#ec3642] to-transparent mx-auto" />
        </div>

        <div ref={featureCardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10" style={{ perspective: '1200px' }}>
          {features.map((feature, idx) => (
            <div
              key={idx}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="nut-card group relative glass-panel p-8 rounded-2xl border border-white/5 hover:border-[#ec3642]/30 transition-all duration-500 overflow-hidden opacity-0 cursor-pointer will-change-transform"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Red Light Sweep */}
              <div className="absolute top-0 -left-[100%] w-[50%] h-[200%] bg-gradient-to-r from-transparent via-[#ec3642]/10 to-transparent rotate-[30deg] group-hover:translate-x-[400%] transition-transform duration-[1.5s] ease-in-out pointer-events-none" />
              <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-[#ec3642] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute bottom-3 right-5 text-8xl font-display font-black text-white/[0.03] group-hover:text-white/[0.06] transition-colors duration-500 leading-none select-none">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div className="relative z-10">
                <div className="bg-[#ec3642]/10 p-3 rounded-xl w-fit mb-5 group-hover:bg-[#ec3642]/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-400">
                  {feature.icon}
                </div>
                <p className="text-xl md:text-2xl text-white font-bold leading-snug mb-2">{feature.text}</p>
                <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/65 transition-colors duration-300">{feature.desc}</p>
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#ec3642] to-red-300 group-hover:w-full transition-all duration-700 ease-out" />
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT'S INSIDE ─────────────────────────────────── */}
      <section ref={section3Ref} className="container max-w-7xl mx-auto px-6 pb-32">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          <div ref={bookImgRef} className="lg:w-1/2 w-full order-2 lg:order-1 overflow-hidden flex-shrink-0 relative z-10" style={{ transformStyle: 'preserve-3d' }}>
            <div className="glass-panel p-2 rounded-3xl shadow-[0_0_50px_rgba(212,67,42,0.1)] relative group overflow-hidden">
              <div className="overflow-hidden rounded-2xl aspect-[4/5]">
                <ParallaxImage src={img5} alt="Healthy Recipes" className="w-full h-full" />
              </div>
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute top-5 left-5 glass-panel px-4 py-2 rounded-xl border border-[#ec3642]/30 flex items-center gap-2">
                <Sparkles className="text-[#ec3642] w-4 h-4" />
                <span className="text-white text-xs font-bold uppercase tracking-wider">{isEn ? "Premium Content" : "محتوى متميز"}</span>
              </div>
            </div>
          </div>

          <div ref={bookTextRef} className="lg:w-1/2 order-1 lg:order-2 relative z-10">
            <p className="book-item text-[#ec3642] uppercase tracking-[0.2em] text-sm font-bold mb-4">{isEn ? "Inside The Book" : "داخل الكتاب"}</p>
            <h2 className="book-item text-4xl md:text-5xl font-display font-black uppercase mb-10 leading-tight">
              {isEn ? (
                <><span className="text-[#ec3642]">WHAT'S</span> INSIDE<br />THE BOOK?</>
              ) : (
                <><span className="text-[#ec3642]">ماذا</span> ستجد<br />داخل الكتاب؟</>
              )}
            </h2>

            <div className="relative space-y-6">
              {/* Vertical connecting line */}
              <svg className="absolute top-[40px] w-[2px] h-[calc(100%-80px)] z-0 hidden lg:block" style={{ right: isRTL ? '35px' : 'auto', left: isRTL ? 'auto' : '35px' }}>
                <line ref={svgLineRef} x1="0" y1="0" x2="0" y2="100%" stroke="#ec3642" strokeOpacity="0.5" strokeWidth="2" strokeDasharray="1000" strokeDashoffset="1000" />
              </svg>

              {[
                {
                  title: isEn ? "Clinical Meals" : "وجبات علاجية لأمراض شائعة",
                  desc: isEn ? "Specialized diets for Anemia, Celiac, and Colon issues." : "(فقر الدم، السيلياك، القولون)",
                  n: '01'
                },
                {
                  title: isEn ? "Diverse & Delicious Recipes" : "وصفات صحية متنوعة ولذيذة",
                  desc: isEn ? "Meals calculated properly so you can enjoy eating while dieting." : "كلها محسوبة القيمة الغذائية مما يمكنك من الاستمتاع بوجبات متنوعة خلال الدايت",
                  n: '02'
                },
                {
                  title: isEn ? "Precision Calculated Plans" : "خطط غذائية محسوبة القيم",
                  desc: isEn ? "To guarantee real results without random starvation." : "لتضمن نتائج حقيقية! لن تحتاج بعد اليوم لتجربة أنظمة عشوائية أو حرمان قاسٍ!",
                  n: '03'
                },
              ].map((item, i) => (
                <div key={i} className="book-item-row relative z-10 flex gap-5 items-start p-5 rounded-2xl bg-[#070707]/60 backdrop-blur-sm border border-transparent">
                  <span className="text-4xl font-display font-black text-[#ec3642] leading-none select-none shrink-0 pt-1">{item.n}</span>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#ec3642] transition-colors duration-300">{item.title}</h3>
                    <p className="text-white/45 font-light text-base leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="shrink-0 pt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-auto">
                    <div className="w-6 h-6 rounded-full border border-[#ec3642]/50 flex items-center justify-center">
                      <div className="w-2 h-2 border-t border-r border-[#ec3642] rotate-45 -translate-x-[1px]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section className="container max-w-5xl mx-auto px-6 pb-32 text-center">
        <style>{`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-shift {
            background-size: 200% 200%;
            animation: gradientShift 10s ease infinite;
          }
        `}</style>
        <div ref={ctaRef} className="relative glass-panel p-14 md:p-24 rounded-3xl border border-[#ec3642]/20 overflow-hidden opacity-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,67,42,0.15)_0%,transparent_65%)] animate-gradient-shift" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#ec3642] to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#ec3642] to-transparent" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#ec3642]/10 border border-[#ec3642]/30 rounded-full px-5 py-2 mb-6">
              <Sparkles className="text-[#ec3642] w-4 h-4" />
              <span className="text-[#ec3642] text-sm font-bold uppercase tracking-widest">{isEn ? "Limited Offer" : "عرض محدود"}</span>
            </div>

            <h2 ref={ctaHeadlineRef} className="text-4xl md:text-6xl font-display font-black uppercase text-white mb-6 leading-tight">
              {isEn ? (
                <><SplitChars text="BE YOUR" className="text-[#ec3642]"/> <br/> <SplitChars text="OWN COACH" /></>
              ) : (
                <><SplitWords text="ابدأ" className="text-[#ec3642]"/> <br/> <SplitWords text="رحلتك الآن" /></>
              )}
            </h2>
            <p className="text-xl text-white/55 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
              {isEn
                ? "Because true knowledge is the first step to the results you deserve."
                : "لأن المعرفة الصحيحة هي أول خطوة للنتيجة التي تستحقها. احصل عليه الآن وكن أنت مدرب نفسك!"}
            </p>

            <div className="flex flex-col items-center gap-6 mb-12">
              <div className="flex items-center gap-6 bg-white/[0.03] px-8 py-4 rounded-3xl border border-white/5">
                <div className="flex flex-col items-start leading-none">
                  <span className="text-white/30 text-lg line-through font-bold mb-1">8,000 DA</span>
                  <span className="text-[#ec3642] text-4xl font-black">6,000 DA</span>
                </div>
                <div className="w-[1px] h-10 bg-white/10 mx-2" />
                <div className="bg-green-500 text-black px-4 py-2 rounded-xl text-sm font-black uppercase tracking-widest shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                  {isEn ? "SAVE 2,000 DA" : "وفر 2,000 DA"}
                </div>
              </div>

              <Link 
                to="/order" 
                ref={magneticButtonRef}
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                className="group relative inline-flex items-center gap-4 bg-[#ec3642] text-white px-12 py-5 rounded-full font-display font-bold uppercase tracking-widest text-xl overflow-hidden shadow-[0_0_50px_rgba(212,67,42,0.35)] hover:shadow-[0_0_80px_rgba(212,67,42,0.55)] transition-shadow duration-500 will-change-transform"
              >
                <span className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out skew-x-12" />
                <BookOpen size={26} className="relative z-10 group-hover:scale-110 transition-transform duration-400 pointer-events-none" />
                <span className="relative z-10 pointer-events-none">{isEn ? "START NOW" : "احصل عليه الآن"}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </motion.div>
  );
}
