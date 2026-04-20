import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowRight, Trophy } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND } from '../constants';
import { buildWaUrl } from '../components/FloatingCTA';

import mensBookImg from '../assets/images/mens-book.png';
import womensBookImg from '../assets/images/womens-book.png';
import mensCoachImg from '../assets/images/coach-mens.png';
import womensCoachImg from '../assets/images/coach-womens.png';

gsap.registerPlugin(ScrollTrigger);

const DiagonalClip = 'polygon(0 8%, 100% 0, 100% 92%, 0 100%)';

const mensFeatures = [
  { title: "تضخيم العضلات", desc: "نطاقات دقيقة للمجموعات والتكرارات لأقصى نمو عضلي" },
  { title: "أداء صحيح وآمن", desc: "إتقان الميكانيكا الحيوية لرفع أثقال أكبر بإصابات أقل" },
  { title: "تصاعد تدريجي مدروس", desc: "تقدم أسبوعي مدمج يجبرك على التقدم في كل جلسة" },
  { title: "تقنية الأداء الصحيح", desc: "تعليمات تفصيلية لكل حركة رئيسية" }
];

const womensFeatures = [
  { title: "نحت الجسم", desc: "عزل المجموعات العضلية الرئيسية للحصول على جسم منحوت دون ضخامة" },
  { title: "في البيت أو الصالة", desc: "روتين كامل للصالة الرياضية والتمرين المنزلي" },
  { title: "كارديو ومرونة", desc: "وحدات مخصصة للكارديو والمرونة وتحسين القوام" },
  { title: "برنامج متصاعد أسبوعياً", desc: "هيكل أسبوعي يتطور مع مستوى لياقتك" }
];

/* ─── Placeholder ─────────────── */
const PlaceholderContent = ({ isEn }: { isEn: boolean }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6 }}
    className="w-full py-24 flex flex-col items-center justify-center text-center relative overflow-hidden bg-[#050505]"
    style={{ overflowX: 'hidden' }}
  >
    <style>{`
      @keyframes text-sweep {
        0% { background-position: 0% 50%; }
        100% { background-position: 200% 50%; }
      }
      .animate-text-sweep {
        background: linear-gradient(90deg, #00B4D8 0%, #FF006E 50%, #00B4D8 100%);
        background-size: 200% auto;
        color: transparent;
        -webkit-background-clip: text;
        background-clip: text;
        animation: text-sweep 4s linear infinite;
      }
    `}</style>
    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-[#00B4D8] blur-[100px] sm:blur-[150px] rounded-full pointer-events-none opacity-[0.08]" />
    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-[#FF006E] blur-[100px] sm:blur-[150px] rounded-full pointer-events-none opacity-[0.08]" />
    <p
      className="font-display font-black uppercase animate-text-sweep relative z-10 px-6 leading-tight"
      style={{ fontSize: 'clamp(1rem, 4vw, 3rem)', letterSpacing: '0.2em', maxWidth: '90vw' }}
    >
      {isEn ? 'SELECT A PROTOCOL ABOVE TO BEGIN' : 'اختر بروتوكولاً من الأعلى للبدء'}
    </p>
  </motion.div>
);

/* ─── Foundation Visual (desktop only) ────── */
const FoundationVisual = ({ color, isEn }: { color: string; isEn: boolean }) => (
  <div className="relative flex flex-col items-center justify-center w-64 h-64">
    <div className="relative w-48 h-48 flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full -rotate-90">
        <circle cx="96" cy="96" r="88" stroke={`${color}33`} strokeWidth="8" fill="transparent" />
        <motion.circle cx="96" cy="96" r="88" stroke={color} strokeWidth="8" fill="transparent" strokeLinecap="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 0.33 }} transition={{ duration: 1.5, ease: 'easeOut' }} viewport={{ once: true }} />
      </svg>
      <span className="text-2xl font-display font-black tracking-widest text-center" style={{ color }}>
        {isEn ? 'WEEK 4' : 'الأسبوع 4'}
      </span>
    </div>
    <motion.div className="absolute -bottom-8 flex gap-3"
      initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.5 }} viewport={{ once: true }}>
      <div className="px-3 py-1 rounded-full text-xs font-bold bg-[#1a1a1a] border" style={{ borderColor: `${color}33`, color }}>
        {isEn ? '3 SETS' : '٣ مجموعات'}
      </div>
      <div className="px-3 py-1 rounded-full text-xs font-bold bg-[#1a1a1a] border" style={{ borderColor: `${color}33`, color }}>
        {isEn ? '8 REPS' : '٨ تكرارات'}
      </div>
    </motion.div>
  </div>
);

const IntensityVisual = ({ color, isEn }: { color: string; isEn: boolean }) => (
  <div className="relative flex flex-col items-center justify-end h-64 w-64">
    <div className="absolute inset-0 blur-3xl opacity-20 pointer-events-none" style={{ background: `radial-gradient(ellipse at bottom, ${color} 0%, transparent 70%)` }} />
    <div className="mb-4 text-xs font-bold tracking-[0.2em]" style={{ color }}>
      {isEn ? 'VOLUME LOAD ↑' : 'حجم التدريب ↑'}
    </div>
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="flex items-end gap-3 h-32">
      {[40, 60, 80, 100, 120].map((height, i) => (
        <motion.div key={i} variants={{ hidden: { height: 0 }, visible: { height } }}
          transition={{ duration: 0.5, ease: 'backOut' }} className="w-6 rounded-t-sm"
          style={{ backgroundColor: i === 4 ? '#FFFFFF' : color }} />
      ))}
    </motion.div>
  </div>
);

const PeakVisual = ({ color, bookImg, isEn }: { color: string; bookImg: string; isEn: boolean }) => (
  <div className="relative flex flex-col items-center justify-center w-full h-[500px]">
    <motion.div initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, type: 'spring' }} viewport={{ once: true }} className="absolute top-10 z-20">
      <Trophy size={48} color={color} strokeWidth={1.5} className="filter drop-shadow-[0_0_15px_currentColor]" />
    </motion.div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 blur-3xl opacity-30 pointer-events-none"
      style={{ background: `radial-gradient(circle, ${color} 0%, transparent 70%)` }} />
    <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
      animate={{ y: [-10, 10, -10] }}
      transition={{ y: { duration: 4, repeat: Infinity, ease: 'easeInOut' }, default: { duration: 0.8, ease: 'easeOut' } }}
      className="relative z-10 mt-12">
      <div className="relative rotate-[5deg] h-[350px]">
        <img src={bookImg} className="h-full w-auto object-contain filter drop-shadow-[0_0_40px_rgba(0,0,0,0.6)]" alt="Protocol Book" />
        <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring' }} viewport={{ once: true }}
          className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-black border-2 flex items-center justify-center rotate-12 z-20 shadow-xl"
          style={{ borderColor: color }}>
          <span className="text-white font-black text-center leading-tight tracking-tighter" style={{ fontSize: '0.65rem' }}>
            {isEn ? <>12<br />WEEKS</> : <>١٢<br />أسبوعًا</>}
          </span>
        </motion.div>
        <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }} viewport={{ once: true }}
          className="absolute top-1/2 -left-8 w-16 h-16 rounded-full bg-black border-2 flex items-center justify-center -rotate-12 z-20 shadow-xl"
          style={{ borderColor: color }}>
          <span className="text-white font-black text-center leading-tight" style={{ fontSize: '0.8rem' }}>100%</span>
        </motion.div>
        <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.7, type: 'spring' }} viewport={{ once: true }}
          className="absolute -bottom-4 right-4 px-4 py-2 bg-white rounded flex items-center justify-center -rotate-6 z-20 shadow-xl">
          <span className="text-black font-black text-center leading-none tracking-widest text-xs">
            {isEn ? 'COMPLETE' : 'مكتمل'}
          </span>
        </motion.div>
      </div>
    </motion.div>
  </div>
);

/* ─── Men's Timeline Phases ── shared data to avoid duplication ── */
const mensPhases = (isEn: boolean) => [
  {
    key: 'foundation',
    name: isEn ? 'FOUNDATION' : 'التأسيس',
    weeks: isEn ? 'WEEKS 1–4' : 'الأسابيع ١–٤',
    desc: isEn
      ? 'Structure the central nervous system. Implement base mechanics safely to prime the body for upcoming brutal load volumes.'
      : 'بناء الجهاز العصبي المركزي. تطبيق الميكانيكا الأساسية بأمان لتهيئة الجسم لأحجام التدريب المكثفة القادمة.',
    Visual: FoundationVisual,
  },
  {
    key: 'intensity',
    name: isEn ? 'INTENSITY' : 'الكثافة',
    weeks: isEn ? 'WEEKS 5–8' : 'الأسابيع ٥–٨',
    desc: isEn
      ? 'Force adaptation. Introduce extreme intensity techniques, demanding profound hypertrophic response from the muscular tissue.'
      : 'إجبار التكيّف. إدخال تقنيات الكثافة القصوى للحصول على استجابة تضخيمية عميقة من الأنسجة العضلية.',
    Visual: IntensityVisual,
  },
  {
    key: 'peak',
    name: isEn ? 'PEAK' : 'الذروة',
    weeks: isEn ? 'WEEKS 9–12' : 'الأسابيع ٩–١٢',
    desc: isEn
      ? 'Culmination phase. Extract absolute neural power, final strength PRs, and cement total body mass accretion.'
      : 'مرحلة الذروة. استخراج القوة العصبية القصوى وتحطيم أرقام القوة وترسيخ الكتلة العضلية الإجمالية.',
    Visual: PeakVisual,
  },
];

const womensPhases = (isEn: boolean) => [
  {
    key: 'tone',
    name: isEn ? 'TONE' : 'الشد',
    weeks: isEn ? 'WEEKS 1–3' : 'الأسابيع ١–٣',
    desc: isEn
      ? 'Awaken metabolism and recruit all major muscle fibers with precision-targeted compound movement.'
      : 'إيقاظ الأيض واستجنيد جميع الألياف العضلية الكبرى من خلال حركات مركّبة دقيقة الاستهداف.',
    Visual: FoundationVisual,
  },
  {
    key: 'sculpt',
    name: isEn ? 'SCULPT' : 'النحت',
    weeks: isEn ? 'WEEKS 4–6' : 'الأسابيع ٤–٦',
    desc: isEn
      ? 'Isolate aesthetics. Increase volume to selectively build glutes, tone arms, and cinch the midsection without bulky mass.'
      : 'عزل الجماليات. زيادة الحجم لبناء عضلات المؤخرة وتحديد الأذرع وشد منطقة الوسط دون ضخامة.',
    Visual: IntensityVisual,
  },
  {
    key: 'define',
    name: isEn ? 'DEFINE' : 'التحديد',
    weeks: isEn ? 'WEEKS 7–8' : 'الأسابيع ٧–٨',
    desc: isEn
      ? 'Burn and reveal. High-intensity finishers combined with strict metabolic flow to carve ultimate definition.'
      : 'حرق وكشف. تمارين إنهاء عالية الكثافة مدمجة مع تدفق أيضي صارم لنحت التحديد القصوى.',
    Visual: PeakVisual,
  },
];

/* ─── Generic Protocol Layout ─────────────────────────── */
interface ProtocolProps {
  isEn: boolean;
  isRTL: boolean;
  color: string;
  accentGlass: string;
  bookImg: string;
  coachImg: string;
  prefix: string;
  phases: ReturnType<typeof mensPhases>;
  whatsappMsg: string;
  who1: string;
  who2: string;
  who3: string;
  inside1: string;
  inside2: string;
  inside3: string;
  insideSub: string;
  ctaReady: string;
  ctaTo: string;
  ctaStart: string;
  ctaBuy: string;
  tickerText: string;
  decorWord: string;
  bgWord: string;
  features: { title: string; desc: string }[];
  stats: { val: string; label: string }[];
}

const ProtocolLayout = (props: ProtocolProps) => {
  const {
    isEn, isRTL, color, accentGlass, bookImg, coachImg, prefix, phases,
    whatsappMsg, who1, who2, who3,
    inside1, inside2, inside3, insideSub,
    ctaReady, ctaTo, ctaStart, ctaBuy,
    tickerText, decorWord, bgWord, features
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cinematic reveal: natively scroll to the newly mounted protocol section 
    // immediately after the AnimatePresence wait duration completes and it is injected.
    const scrollTimeout = setTimeout(() => {
      if (containerRef.current) {
        const offset = 80;
        const elementPos = containerRef.current.getBoundingClientRect().top;
        window.scrollTo({ top: elementPos + window.scrollY - offset, behavior: 'smooth' });
      }
    }, 50);

    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        // Book parallax
        gsap.fromTo(`.${prefix}-book-massive`,
          { rotate: 12, y: 100 },
          { rotate: -2, y: -50, scrollTrigger: { trigger: `.brutalist-${prefix}`, start: 'top bottom', end: 'bottom top', scrub: 0.5 } }
        );

        // Timeline stroke
        gsap.to(`.timeline-stroke-${prefix}`, {
          strokeDashoffset: 0, ease: 'none',
          scrollTrigger: { trigger: `#${prefix}-timeline`, start: 'top 50%', end: 'bottom 80%', scrub: 0.5 }
        });

        // Node entrance
        const nodes = gsap.utils.toArray(`.${prefix}-node-content`);
        const dots = gsap.utils.toArray(`.${prefix}-dot`);
        nodes.forEach((node: any, i) => {
          gsap.fromTo(node, 
            { opacity: 0, y: 50 }, 
            { opacity: 1, y: 0, ease: 'power2.out', scrollTrigger: { trigger: node, start: 'top 75%', end: 'top 30%', scrub: 0.5 } }
          );
          gsap.fromTo(dots[i] as any, 
            { scale: 0 }, 
            { scale: 1, ease: 'back.out(2)', scrollTrigger: { trigger: node, start: 'top 75%', end: 'top 30%', scrub: 0.5 } }
          );
        });

        // Theater pin — only on desktop
        const tl = gsap.timeline({ scrollTrigger: { trigger: `#${prefix}-theater`, start: 'top top', end: '+=3000', scrub: 1, pin: true } });
        tl.fromTo(`.${prefix}-who-1`, { x: isRTL ? '100vw' : '-100vw', opacity: 0 }, { x: 0, opacity: 1, duration: 1 })
          .to(`.${prefix}-who-1`, { x: isRTL ? '-100vw' : '100vw', opacity: 0, duration: 1 }, '+=1')
          .fromTo(`.${prefix}-who-2`, { x: isRTL ? '-100vw' : '100vw', opacity: 0 }, { x: 0, opacity: 1, duration: 1 })
          .to(`.${prefix}-who-2`, { x: isRTL ? '100vw' : '-100vw', opacity: 0, duration: 1 }, '+=1')
          .fromTo(`.${prefix}-who-3`, { scale: 4, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: 'power3.inOut' })
          .to(`.${prefix}-who-3`, { scale: 8, opacity: 0, duration: 2, ease: 'power2.in' }, '+=1');

        tl.to(`.${prefix}-theater-glow`, { backgroundColor: '#8B0000', duration: 1 }, 0);
        tl.to(`.${prefix}-theater-glow`, { backgroundColor: '#004C4C', duration: 1 }, 2);
        tl.to(`.${prefix}-theater-glow`, { backgroundColor: color, duration: 1 }, 4);

        // CTA
        gsap.fromTo(`.${prefix}-flood-bg`, { y: '100%' }, { y: '0%', ease: 'none', scrollTrigger: { trigger: `.${prefix}-cta`, start: 'top bottom', end: 'top top', scrub: true } });
        gsap.fromTo(`.${prefix}-cta-book`, { x: isRTL ? -200 : 200, opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out', scrollTrigger: { trigger: `.${prefix}-cta`, start: 'top 60%', end: 'top 20%', scrub: 1 } });

        // CTA READY entrance — owns the clipPath fully, no inline style conflict
        gsap.set(`.${prefix}-ready-text`, { clipPath: isRTL ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' });
        const ctaEnterTl = gsap.timeline({ scrollTrigger: { trigger: `.${prefix}-cta`, start: 'top 80%', once: true } });
        ctaEnterTl
          .to(`.${prefix}-shooting-line`, { scaleX: 1, duration: 0.6, ease: 'power3.inOut' })
          .to(`.${prefix}-ready-text`,
            { clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power2.out' }
          );

        gsap.to(`.btn-line-${prefix}`, { width: '100%', duration: 1.5, ease: 'power2.out', scrollTrigger: { trigger: `.${prefix}-cta`, start: 'top 80%' } });

        // Feature cards
        const fm = gsap.utils.toArray(`.${prefix}-feature-card`);
        if (fm.length) {
           gsap.fromTo(fm, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.2)', scrollTrigger: { trigger: `.${prefix}-features-grid`, start: 'top 85%', once: true } });
        }

        // Stats
        const statNums = gsap.utils.toArray(`.${prefix}-stat-num`);
        statNums.forEach((el: any) => {
           const target = parseFloat(el.getAttribute('data-target'));
           gsap.fromTo(el, { innerText: 0 }, { innerText: target, duration: 2, ease: 'power2.out', snap: { innerText: 1 }, scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
        });
      });

      mm.add('(max-width: 767px)', () => {
         const nodes = gsap.utils.toArray(`.${prefix}-node-content`);
         nodes.forEach((node: any) => {
           gsap.fromTo(node, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: node, start: 'top 85%', once: true } });
         });
         gsap.fromTo(`.${prefix}-cta-book`, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: `.${prefix}-cta`, start: 'top 80%', once: true } });
      });
    }, containerRef);
    return () => ctx.revert();
  }, [isEn, isRTL, prefix, color]);

  const waUrl = buildWaUrl(whatsappMsg);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full relative overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >

      {/* ── 01 WHAT'S INSIDE ── */}
      <div
        className={`brutalist-${prefix} relative w-full min-h-screen bg-[#0c0c0c] flex items-center overflow-hidden`}
        style={{ clipPath: 'none', ...(window.innerWidth >= 768 ? { clipPath: DiagonalClip } : {}) }}
      >
        {/* Big watermark number - Centered and resized */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06] z-0">
          <span className="font-black font-display text-white italic leading-none select-none" style={{ fontSize: '280px' }}>01</span>
        </div>

        {/* Coach image panel — right half, desktop only */}
        <div 
          className={`absolute ${isRTL ? 'left-10' : 'right-10'} top-1/2 -translate-y-1/2 w-[480px] h-[600px] pointer-events-none hidden md:block rounded-2xl`} 
          style={{ 
            zIndex: 1,
            clipPath: isRTL ? 'polygon(0% 0%, 92% 0%, 100% 100%, 0% 100%)' : 'polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)'
          }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            {/* Coach image — fixed size, centered, clear */}
            <img
              src={coachImg}
              alt="Coach"
              className="absolute inset-0 w-full h-full z-10"
              style={{
                objectFit: 'cover',
                objectPosition: 'left center',
                filter: 'none',
              }}
            />
            {/* Left fade — subtle blend to text side */}
            <div
              className={`absolute inset-y-0 ${isRTL ? 'right-0' : 'left-0'} w-[120px] z-20`}
              style={{
                background: isRTL
                  ? 'linear-gradient(to left, #0c0c0c, transparent)'
                  : 'linear-gradient(to right, #0c0c0c, transparent)',
                opacity: 0.9
              }}
            />
            {/* Bottom fade — subtle blend to base */}
            <div
              className="absolute bottom-0 left-0 right-0 z-20"
              style={{ 
                height: '40%', 
                background: 'linear-gradient(to top, #080808 20%, transparent 40%)' 
              }}
            />
            {/* Rim light line on the left edge */}
            <div 
              className={`absolute top-0 bottom-0 ${isRTL ? 'right-0' : 'left-0'} w-[3px] z-30`}
              style={{ 
                backgroundColor: color,
                boxShadow: `0 0 20px ${color}`,
              }}
            />
          </div>

          {/* Floating stat pills - stickers */}
          <motion.div
            initial={{ x: isRTL ? -30 : 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={`absolute ${isRTL ? 'right-[5%] top-8' : 'left-[5%] top-8'} z-50 bg-[#121212]/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-3 shadow-2xl`}
          >
            <div className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: color, color }} />
            <span className="text-[11px] font-black text-white tracking-[0.2em] uppercase whitespace-nowrap">
              {prefix === 'mens' ? '120+ EXERCISES' : '90+ MOVEMENTS'}
            </span>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className={`absolute ${isRTL ? 'left-4 bottom-8' : 'right-4 bottom-8'} z-50 bg-[#121212]/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-3 shadow-2xl`}
          >
            <div className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: color, color }} />
            <span className="text-[11px] font-black text-white tracking-[0.2em] uppercase whitespace-nowrap">
              {prefix === 'mens' ? '12 WEEKS' : '8 WEEKS'}
            </span>
          </motion.div>

          {/* Accent corners - L-shapes (24px, glow) */}
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'backOut', delay: 0.4 }}
            className={`absolute top-[-10px] ${isRTL ? 'right-[-10px]' : 'left-[-10px]'} w-6 h-6 z-40`}
            style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          >
             <div className="absolute top-0 left-0 w-full h-[2px]" style={{ backgroundColor: color }} />
             <div className="absolute top-0 left-0 w-[2px] h-full" style={{ backgroundColor: color }} />
          </motion.div>
          
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'backOut', delay: 0.5 }}
            className={`absolute bottom-[-10px] ${isRTL ? 'left-[-10px]' : 'right-[-10px]'} w-6 h-6 z-40 rotate-180`}
            style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          >
             <div className="absolute top-0 left-0 w-full h-[2px]" style={{ backgroundColor: color }} />
             <div className="absolute top-0 left-0 w-[2px] h-full" style={{ backgroundColor: color }} />
          </motion.div>
        </div>
        {/* Text content — left 50%, high z-index to sit over gradient */}
        <div className={`relative z-10 w-full md:w-[50%] ${isRTL ? 'pr-5 md:pr-20 text-right' : 'pl-5 md:pl-20 text-left'} pt-32 md:pt-0 px-5 md:px-0 pb-16 md:pb-0`}>
          <h3 style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }} className="font-black font-display text-white uppercase leading-[0.85] mb-0 tracking-tighter">
            {inside1}
          </h3>
          <div className={`flex items-center gap-4 mt-4 mb-4 ${isRTL ? 'mr-4 md:mr-10 flex-row-reverse' : 'ml-4 md:ml-10'}`}>
            <div className="w-10 md:w-16 h-[3px] shrink-0" style={{ backgroundColor: color }} />
            <h3 style={{ fontSize: 'clamp(1.5rem, 5vw, 4rem)', color }} className="font-black font-display uppercase leading-none tracking-widest">
              {inside2}
            </h3>
          </div>
          <h3 style={{ fontSize: 'clamp(0.75rem, 2vw, 1.5rem)' }} className={`font-bold text-white/50 uppercase tracking-[0.3em] ${isRTL ? 'mr-8 md:mr-20' : 'ml-8 md:ml-20'} mb-6`}>
            {insideSub}
          </h3>
          <h3 style={{ fontSize: 'clamp(3rem, 10vw, 10rem)' }} className="font-black font-display text-transparent !bg-clip-text bg-gradient-to-br from-white to-white/10 uppercase leading-[0.75]">
            {inside3}
          </h3>

          {/* Features Grid - Filling the empty column space */}
          <div className="mt-12 grid grid-cols-2 gap-4 max-w-xl">
            {features.slice(0, 4).map((f, i) => (
              <div key={i} className="bg-[#121212]/50 backdrop-blur-sm p-4 border-t-2 rounded-b-lg group hover:bg-[#1a1a1a] transition-all duration-300" style={{ borderColor: color }}>
                <h4 className="text-white font-black text-sm mb-1 uppercase tracking-wider">{f.title}</h4>
                <p className="text-white/40 text-[11px] leading-relaxed font-bold">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Coach Image Panel (Relocated below What's Inside) */}
      <div className="md:hidden relative w-full h-[320px] -mb-16 z-20">
        <div className="absolute inset-0 z-0 bg-[#050505]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)' }}>
          <img src={coachImg} alt="Coach" className="w-full h-full object-cover object-top" />
          
          {/* Teal Glow */}
          <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20" style={{ backgroundColor: color }} />
          
          {/* Bottom Gradient Fade */}
          <div className="absolute inset-x-0 bottom-0 h-[40%] pointer-events-none" style={{ background: 'linear-gradient(to top, #050505 10%, transparent 100%)' }} />
        </div>

        {/* Floating stat pills */}
        <motion.div
          initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-50 bg-[#121212]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2 shadow-2xl`}
        >
          <div className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: color, color }} />
          <span className="text-[10px] font-black text-white tracking-[0.1em] uppercase whitespace-nowrap">
            {prefix === 'mens' ? '120+ EXERCISES' : '90+ MOVEMENTS'}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          className={`absolute bottom-8 ${isRTL ? 'right-4' : 'left-4'} z-50 bg-[#121212]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2 shadow-2xl`}
        >
          <div className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: color, color }} />
          <span className="text-[10px] font-black text-white tracking-[0.1em] uppercase whitespace-nowrap">
            {prefix === 'mens' ? '12 WEEKS' : '8 WEEKS'}
          </span>
        </motion.div>
      </div>

      {/* ── 02 TIMELINE ── */}
      <div id={`${prefix}-timeline`} className="relative w-full py-20 md:py-40 bg-[#050505] overflow-x-hidden" style={{ marginTop: '-2px' }}>
        {/* Watermark word */}
        <div className={`absolute inset-y-0 ${isRTL ? 'right-0' : 'left-0'} flex items-center opacity-[0.02] pointer-events-none overflow-hidden`}>
          <span className="text-[20vh] md:text-[25vh] font-black font-display text-white rotate-90 uppercase whitespace-nowrap tracking-tighter select-none">
            {bgWord}
          </span>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* Mobile: simple stacked list with left line */}
          <div className="md:hidden flex">
            {/* Left line always on mobile */}
            <div className="w-8 relative flex justify-center shrink-0">
              <svg className="absolute top-0 w-2 h-full" preserveAspectRatio="none">
                <line x1="1" y1="0" x2="1" y2="100%" className={`timeline-stroke-${prefix}`} stroke={color} strokeWidth="2" strokeDasharray="2000" strokeDashoffset="2000" fill="none" />
              </svg>
            </div>
            <div className="flex-1 flex flex-col gap-16 py-8 pl-6">
              {phases.map((phase) => (
                <div key={phase.key} className={`${prefix}-node-content relative flex flex-col`}>
                  {/* Dot */}
                  <div className={`${prefix}-dot absolute -left-[38px] top-2 w-4 h-4 rounded-full shadow-[0_0_16px_currentColor]`} style={{ backgroundColor: color, color }} />
                  <h4 style={{ fontSize: 'clamp(2rem, 8vw, 5rem)', color: 'white' }} className="font-display font-black uppercase mb-1 leading-none">
                    {phase.name}
                  </h4>
                  <p style={{ fontSize: 'clamp(0.75rem, 3vw, 1.25rem)', color }} className="font-black tracking-widest uppercase mb-3">
                    {phase.weeks}
                  </p>
                  <p className="text-white/50 text-base font-light leading-relaxed mb-6">
                    {phase.desc}
                  </p>
                  <div className="flex justify-center w-full transform origin-center scale-90 md:scale-100 opacity-90 my-4 border border-white/5 py-4 rounded-3xl" style={{ backgroundColor: `${color}05` }}>
                    {phase.key === 'foundation' || phase.key === 'tone' ? (
                      <FoundationVisual color={color} isEn={isEn} />
                    ) : phase.key === 'intensity' || phase.key === 'sculpt' ? (
                      <IntensityVisual color={color} isEn={isEn} />
                    ) : (
                      <PeakVisual color={color} bookImg={bookImg} isEn={isEn} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: split grid layout with RTL-aware line position */}
          <div className="hidden md:flex">
            {isRTL ? (
              <>
                {/* Content right, line right */}
                <div className="flex-1 flex flex-col gap-64 py-32 mr-10 md:mr-20">
                  {phases.map((phase) => (
                    <div key={phase.key} className={`${prefix}-node-content relative grid grid-cols-2 items-center gap-12`}>
                      <div className="flex justify-center relative order-2">
                        {phase.key === 'foundation' || phase.key === 'tone' ? (
                          <FoundationVisual color={color} isEn={isEn} />
                        ) : phase.key === 'intensity' || phase.key === 'sculpt' ? (
                          <IntensityVisual color={color} isEn={isEn} />
                        ) : (
                          <PeakVisual color={color} bookImg={bookImg} isEn={isEn} />
                        )}
                      </div>
                      <div className="relative text-right order-1">
                        <div className={`${prefix}-dot absolute -right-[94px] top-6 w-5 h-5 rounded-full`} style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}` }} />
                        <h4 style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }} className="font-display font-black text-white uppercase mb-2 leading-none">{phase.name}</h4>
                        <p className="text-xl md:text-3xl font-black tracking-widest uppercase mb-6" style={{ color }}>{phase.weeks}</p>
                        <p className="text-white/50 text-xl max-w-2xl font-light">{phase.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="w-16 relative flex justify-center shrink-0 border-l border-white/5">
                  <svg className="absolute top-0 w-2 h-full" preserveAspectRatio="none">
                    <line x1="1" y1="0" x2="1" y2="100%" className={`timeline-stroke-${prefix}`} stroke={color} strokeWidth="2" strokeDasharray="2000" strokeDashoffset="2000" fill="none" />
                  </svg>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 relative flex justify-center shrink-0 border-r border-white/5">
                  <svg className="absolute top-0 w-2 h-full" preserveAspectRatio="none">
                    <line x1="1" y1="0" x2="1" y2="100%" className={`timeline-stroke-${prefix}`} stroke={color} strokeWidth="2" strokeDasharray="2000" strokeDashoffset="2000" fill="none" />
                  </svg>
                </div>
                <div className="flex-1 flex flex-col gap-64 py-32 ml-10 md:ml-20">
                  {phases.map((phase) => (
                    <div key={phase.key} className={`${prefix}-node-content relative grid grid-cols-2 items-center gap-12`}>
                      <div className="relative">
                        <div className={`${prefix}-dot absolute -left-[94px] top-6 w-5 h-5 rounded-full`} style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}` }} />
                        <h4 style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }} className="font-display font-black text-white uppercase mb-2 leading-none">{phase.name}</h4>
                        <p className="text-xl md:text-3xl font-black tracking-widest uppercase mb-6" style={{ color }}>{phase.weeks}</p>
                        <p className="text-white/50 text-xl max-w-2xl font-light">{phase.desc}</p>
                      </div>
                      <div className="flex justify-center relative">
                        {phase.key === 'foundation' || phase.key === 'tone' ? (
                          <FoundationVisual color={color} isEn={isEn} />
                        ) : phase.key === 'intensity' || phase.key === 'sculpt' ? (
                          <IntensityVisual color={color} isEn={isEn} />
                        ) : (
                          <PeakVisual color={color} bookImg={bookImg} isEn={isEn} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── 03 WHO IS THIS FOR ── */}
      {/* Desktop: pinned theater; Mobile: stacked simple sections */}
      <div className="md:hidden bg-[#0a0a0a] overflow-hidden">
        {[who1, who2, who3].map((statement, i) => (
          <div key={i} className="min-h-[60vh] flex items-center justify-center px-6 py-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at center, ${color}08 0%, transparent 70%)` }} />
            <h2 style={{ fontSize: 'clamp(2rem, 8vw, 5rem)', color: i === 2 ? color : 'white' }}
              className="font-display font-black uppercase leading-[0.9] relative z-10">
              {statement}
            </h2>
          </div>
        ))}
      </div>

      {/* Desktop theater pin */}
      <div id={`${prefix}-theater`} className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden items-center justify-center hidden md:flex">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vh] h-[80vh] rounded-full blur-[100px]" style={{ backgroundColor: `${color}0D` }} />
        </div>
        <div className={`${prefix}-who-1 absolute w-full text-center px-4`}>
          <h2 className="text-5xl md:text-[7vw] font-display font-black text-white uppercase leading-none mix-blend-difference italic tracking-tighter">{who1}</h2>
        </div>
        <div className={`${prefix}-who-2 absolute w-full text-center px-4`}>
          <h2 className="text-5xl md:text-[7vw] font-display font-black text-transparent bg-clip-text uppercase leading-none tracking-tight"
            style={{ backgroundImage: `linear-gradient(to bottom, white, ${color})` }}>{who2}</h2>
        </div>
        <div className={`${prefix}-who-3 absolute w-full text-center px-4`}>
          <h2 className="text-[20vw] font-display font-black uppercase leading-[0.8]" style={{ color }}>{who3}</h2>
        </div>
      </div>

      {/* ── 04 CTA ── */}
      <div className={`${prefix}-cta relative w-full min-h-[80vh] md:min-h-[90vh] bg-[#050505] flex flex-col md:flex-row md:items-center overflow-hidden pb-24 md:pb-32`}>
        <div className="absolute inset-0 bg-[#050505] pointer-events-none" />
        <div className={`${prefix}-flood-bg absolute inset-0 pointer-events-none`} style={{ background: `linear-gradient(to top, ${accentGlass}, transparent)` }} />
        <div className={`${prefix}-shooting-line absolute top-0 ${isRTL ? 'right-0 origin-right' : 'left-0 origin-left'} w-full h-[1px] scale-x-0 z-50 pointer-events-none`} style={{ backgroundColor: color }} />

        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay z-40"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />

        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] blur-[150px] pointer-events-none opacity-20" style={{ backgroundColor: color }} />

        {/* Watermark word */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] pointer-events-none opacity-[0.05] select-none text-center leading-none overflow-hidden"
          style={{ fontSize: 'clamp(6rem, 25vw, 22rem)', color: 'white', fontWeight: 900 }}>
          {decorWord}
        </div>

        {/* Text block */}
        <div className={`w-full md:w-1/2 px-6 md:px-20 relative z-20 flex flex-col ${isRTL ? 'items-end text-right' : 'items-start text-left'} pt-16 md:pt-20 pb-8 md:pb-20`}>
          <h2 className="font-display font-black uppercase leading-[0.85] mb-8 md:mb-12 flex flex-col relative z-20 mix-blend-screen">
            <span
              style={{ color, fontSize: 'clamp(3rem, 12vw, 10rem)' }}
              className={`${prefix}-ready-text glitch-text drop-shadow-[0_0_60px_currentColor]`}
              data-text={ctaReady}
            >
              {ctaReady}
            </span>
            <span style={{ fontSize: 'clamp(1.5rem, 5vw, 4rem)' }} className={`text-white/50 my-2 tracking-widest ${isRTL ? 'pr-2' : 'pl-2'} font-black italic mix-blend-normal`}>
              {ctaTo}
            </span>
            <span style={{ fontSize: 'clamp(3rem, 12vw, 10rem)' }} className="text-white drop-shadow-[0_0_60px_rgba(255,255,255,0.3)]">
              {ctaStart}
            </span>
          </h2>

          <div className="mb-4 text-white/40 font-bold tracking-widest" style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)' }}>
            {isEn ? '4,000 DA' : '4000 دج'}
          </div>

          <a href={waUrl} target="_blank" rel="noreferrer"
            className="relative group z-30 w-full md:w-auto"
            style={{ filter: `drop-shadow(0 0 20px ${color}50)` }}>
            <div className="relative px-6 py-4 md:py-4 overflow-hidden w-full">
              <span style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)' }}
                className={`relative z-10 font-display font-black text-white group-hover:text-[#050505] transition-colors duration-500 uppercase tracking-widest leading-none block ${isRTL ? 'text-right' : 'text-left'}`}>
                {ctaBuy}
              </span>
              <div className={`absolute bottom-0 ${isRTL ? 'right-0' : 'left-0'} h-[5px] w-0 btn-line-${prefix} z-20 pointer-events-none`} style={{ backgroundColor: color }} />
              <div className="absolute inset-0 scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 z-0" style={{ backgroundColor: color }} />
            </div>
          </a>

          <div className="mt-6 md:mt-8 relative z-30">
            <p className={`text-white/40 text-sm md:text-base font-bold italic tracking-wide ${isRTL ? 'text-right' : 'text-left'}`}>
              <span className="text-white/20">——</span> {isEn ? "Or get all 3 books for only 10,000 DA" : "أو احصل على الثلاثة كتب بـ 10,000 DA فقط"}
            </p>
          </div>
        </div>

        {/* Book — mobile: stacked below text; desktop: absolute side panel */}
        <div className={`md:hidden w-full flex items-center justify-center pointer-events-none opacity-40 mt-4 mb-8 relative z-10`}>
          <img src={bookImg} className={`${prefix}-cta-book h-[35vh] object-contain -rotate-6 filter opacity-0`}
            style={{ filter: `drop-shadow(0 0 60px ${color}90)` }} alt="Protocol book" />
        </div>
        <div className={`hidden md:flex md:w-1/2 h-full absolute top-0 ${isRTL ? 'left-0' : 'right-0'} pointer-events-none items-center justify-end z-10 opacity-80`}>
          <img src={bookImg} className={`${prefix}-cta-book h-[85vh] object-contain rotate-6 filter opacity-0 relative z-10`}
            style={{ filter: `drop-shadow(0 0 80px ${color}90)` }} alt="Protocol book CTA" />
        </div>

        {/* Ticker tape */}
        <div className="absolute bottom-0 left-[-10%] w-[120%] py-4 md:py-5 z-50 shadow-2xl flex overflow-hidden" style={{ backgroundColor: color }}>
          <style>{`
            @keyframes ticker-${prefix} { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            @keyframes ticker-${prefix}-rtl { 0% { transform: translateX(0); } 100% { transform: translateX(50%); } }
            .ticker-${prefix} { display: flex; width: max-content; animation: ticker-${prefix} 22s linear infinite; }
            .ticker-${prefix}-rtl { display: flex; width: max-content; animation: ticker-${prefix}-rtl 22s linear infinite; }
          `}</style>
          <div className={isRTL ? `ticker-${prefix}-rtl` : `ticker-${prefix}`}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <span key={i} className="font-display font-black uppercase mx-4 tracking-widest whitespace-nowrap text-black"
                style={{ fontSize: 'clamp(0.875rem, 2.5vw, 1.5rem)' }}>
                {tickerText}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Main Page ─────────────────────────────── */
export default function TrainingPage({ onProtocolSelect }: { onProtocolSelect?: (p: 'mens' | 'womens' | null) => void }) {
  const { lang, isRTL } = useLanguage();
  const isEn = lang === 'en';

  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);
  const [selectedProtocol, setSelectedProtocol] = useState<'mens' | 'womens' | null>(null);

  const pageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleSelectProtocol = (protocol: 'mens' | 'womens') => {
    setHoveredSide(protocol === 'mens' ? 'left' : 'right');
    setSelectedProtocol(protocol);
    onProtocolSelect?.(protocol);
  };

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;
    const ctx = gsap.context(() => {
      gsap.to('.book-float-left', { y: 10, repeat: -1, yoyo: true, duration: 3, ease: 'sine.inOut' });
      gsap.to('.book-float-right', { y: -10, repeat: -1, yoyo: true, duration: 3, ease: 'sine.inOut' });
    }, pageRef);
    return () => ctx.revert();
  }, [isRTL]);

  return (
    <div
      ref={pageRef}
      dir={isRTL ? 'rtl' : 'ltr'}
      className="bg-[#050505] min-h-screen relative overflow-x-hidden"
      style={{ fontFamily: isRTL ? 'Cairo, sans-serif' : undefined }}
    >
      {/* Global grain */}
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none z-[100] select-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '256px', mixBlendMode: 'overlay' }} />

      {/* ── SPLIT HERO — Desktop: side by side | Mobile: stacked ── */}
      <style>{`
        @keyframes pulse-heartbeat {
          0% { transform: scale(1); opacity: 0.15; }
          14% { transform: scale(1.1); opacity: 0.25; }
          28% { transform: scale(1); opacity: 0.15; }
          42% { transform: scale(1.1); opacity: 0.25; }
          70% { transform: scale(1); opacity: 0.15; }
          100% { transform: scale(1); opacity: 0.15; }
        }
        .animate-heartbeat { animation: pulse-heartbeat 3s ease-in-out infinite; }
      `}</style>

      {/* MOBILE: stacked hero */}
      <div className="md:hidden">
        {/* Men's */}
        <div className="relative w-full min-h-[80vh] flex flex-col justify-center items-center bg-[#050505] overflow-hidden pt-24 pb-12 px-6">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,180,216,0.25)_0%,transparent_65%)] animate-heartbeat pointer-events-none" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-white/[0.04] uppercase pointer-events-none select-none" style={{ fontSize: 'clamp(4rem, 22vw, 12rem)' }}>PPAH</span>
          <span className="text-[#00B4D8] font-bold tracking-[0.25em] text-sm uppercase mb-5 relative z-10">
            {isEn ? 'FOR HIM' : 'للرجال'}
          </span>
          <div className="book-float-left mb-6 w-[200px] relative z-10" style={{ rotate: '-6deg' }}>
            <img src={mensBookImg} alt={isEn ? "Men's Protocol" : 'بروتوكول الرجال'} className="w-full h-auto object-contain drop-shadow-[0_0_30px_rgba(0,180,216,0.3)]" />
          </div>
          <h1 className="font-display font-black text-white uppercase leading-none tracking-tight mb-6 text-center relative z-10" style={{ fontSize: 'clamp(2.25rem, 10vw, 5rem)' }}>
            {isEn ? <><span className="block">TRAIN LIKE</span><span className="block text-[#00B4D8]">A MACHINE</span></> : <><span className="block">تدرّب كأنك</span><span className="block text-[#00B4D8]">آلة</span></>}
          </h1>
          <button onClick={() => handleSelectProtocol('mens')}
            className="relative z-10 w-full flex items-center justify-center gap-3 border-2 border-[#00B4D8] text-white font-display font-bold uppercase tracking-widest py-4 px-6 text-base min-h-[56px] overflow-hidden group"
            style={{ fontSize: 'clamp(0.75rem, 3vw, 1.1rem)' }}>
            <span className="absolute inset-0 bg-[#00B4D8] -translate-x-full group-active:translate-x-0 transition-transform duration-300" />
            <span className="relative z-10">{isEn ? "MEN'S PROTOCOL" : 'بروتوكول الرجال'}</span>
            <span className="relative z-10 text-[#00B4D8] text-[10px] font-black uppercase tracking-widest">
              {isEn ? "START FOR 4,000 DA ONLY" : "ابدأ بـ 4,000 DA فقط"}
            </span>
          </button>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-[#00B4D8] via-white/20 to-[#FF006E]" />

        {/* Women's */}
        <div className="relative w-full min-h-[80vh] flex flex-col justify-center items-center bg-[#050505] overflow-hidden pb-12 pt-12 px-6">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,110,0.25)_0%,transparent_65%)] animate-heartbeat pointer-events-none" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-white/[0.04] uppercase pointer-events-none select-none" style={{ fontSize: 'clamp(4rem, 22vw, 12rem)' }}>HER</span>
          <span className="text-[#FF006E] font-bold tracking-[0.25em] text-sm uppercase mb-5 relative z-10">
            {isEn ? 'FOR HER' : 'للنساء'}
          </span>
          <div className="book-float-right mb-6 w-[200px] relative z-10" style={{ rotate: '6deg' }}>
            <img src={womensBookImg} alt={isEn ? "Women's Protocol" : 'بروتوكول النساء'} className="w-full h-auto object-contain drop-shadow-[0_0_30px_rgba(255,0,110,0.3)]" />
          </div>
          <h1 className="font-display font-black text-white uppercase leading-none tracking-tight mb-6 text-center relative z-10" style={{ fontSize: 'clamp(2.25rem, 10vw, 5rem)' }}>
            {isEn ? <><span className="block">SCULPT YOUR</span><span className="block text-[#FF006E]">BEST SELF</span></> : <><span className="block">انحتي</span><span className="block text-[#FF006E]">أفضل نسخة</span></>}
          </h1>
          <button onClick={() => handleSelectProtocol('womens')}
            className="relative z-10 w-full flex items-center justify-center gap-3 border-2 border-[#FF006E] text-white font-display font-bold uppercase tracking-widest py-4 px-6 text-base min-h-[56px] overflow-hidden group"
            style={{ fontSize: 'clamp(0.75rem, 3vw, 1.1rem)' }}>
            <span className="absolute inset-0 bg-[#FF006E] translate-x-full group-active:translate-x-0 transition-transform duration-300" />
            <span className="relative z-10">{isEn ? "WOMEN'S PROTOCOL" : 'بروتوكول النساء'}</span>
            <span className="relative z-10 text-[#FF006E] text-[10px] font-black uppercase tracking-widest">
              {isEn ? "START FOR 4,000 DA ONLY" : "ابدئي بـ 4,000 DA فقط"}
            </span>
          </button>
        </div>
      </div>

      {/* DESKTOP: animated side-by-side hero */}
      <section className="relative w-full min-h-[100vh] hidden md:flex overflow-hidden z-20 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
        {/* Men's side */}
        <motion.div
          initial={{ x: isRTL ? '100vw' : '-100vw', width: '50%' }}
          animate={{ x: 0, width: hoveredSide === 'left' ? '65%' : hoveredSide === 'right' ? '35%' : '50%' }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          onMouseEnter={() => setHoveredSide('left')}
          onMouseLeave={() => setHoveredSide(null)}
          className="relative h-full min-h-screen flex flex-col justify-center items-center z-10 bg-[#050505] pt-20"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,180,216,0.3)_0%,transparent_60%)] animate-heartbeat pointer-events-none" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/[0.04] uppercase pointer-events-none select-none">PPAH</span>
          <div className="relative z-20 flex flex-col items-center text-center px-10 pt-20 pb-20">
            <span className="text-[#00B4D8] font-bold tracking-[0.3em] text-base uppercase mb-6">{isEn ? 'FOR HIM' : 'للرجال'}</span>
            <div className="book-float-left mb-8 w-[320px] drop-shadow-[0_0_40px_rgba(0,180,216,0.2)]" style={{ rotate: '-6deg' }}>
              <img src={mensBookImg} alt="Men's Protocol" className="w-full h-auto object-contain" />
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black text-white uppercase leading-none tracking-tight mb-8">
              {isEn ? <><span className="block">TRAIN LIKE</span><span className="block text-[#00B4D8]">A MACHINE</span></> : <><span className="block">تدرّب كأنك</span><span className="block text-[#00B4D8]">آلة</span></>}
            </h1>
            <button onClick={() => handleSelectProtocol('mens')}
              className="group relative inline-flex items-center gap-4 bg-transparent border-2 border-[#00B4D8] text-white px-8 py-4 font-display font-bold uppercase tracking-widest text-lg overflow-hidden shadow-[0_0_20px_rgba(0,180,216,0.2)] hover:shadow-[0_0_40px_rgba(0,180,216,0.4)] transition-all duration-300 min-h-[56px]">
              <span className="absolute inset-0 bg-[#00B4D8] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 mix-blend-difference group-hover:mix-blend-normal">{isEn ? "MEN'S PROTOCOL" : 'بروتوكول الرجال'}</span>
              <ArrowRight className={`relative z-10 w-5 h-5 mix-blend-difference group-hover:mix-blend-normal ${isRTL ? 'rotate-180' : ''}`} />
              <span className="relative z-10 text-[#00B4D8] group-hover:text-black text-[10px] font-black uppercase tracking-widest">
                {isEn ? "START FOR 4,000 DA ONLY" : "ابدأ بـ 4,000 DA فقط"}
              </span>
            </button>
          </div>
        </motion.div>

        {/* Women's side */}
        <motion.div
          initial={{ x: isRTL ? '-100vw' : '100vw', width: '50%' }}
          animate={{ x: 0, width: hoveredSide === 'right' ? '65%' : hoveredSide === 'left' ? '35%' : '50%' }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          onMouseEnter={() => setHoveredSide('right')}
          onMouseLeave={() => setHoveredSide(null)}
          className="relative h-full min-h-screen flex flex-col justify-center items-center z-10 bg-[#050505] pt-20"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,110,0.3)_0%,transparent_60%)] animate-heartbeat pointer-events-none" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/[0.04] uppercase pointer-events-none select-none">HER</span>
          <div className="relative z-20 flex flex-col items-center text-center px-10 pt-20 pb-20">
            <span className="text-[#FF006E] font-bold tracking-[0.3em] text-base uppercase mb-6">{isEn ? 'FOR HER' : 'للنساء'}</span>
            <div className="book-float-right mb-8 w-[320px] drop-shadow-[0_0_40px_rgba(255,0,110,0.2)]" style={{ rotate: '6deg' }}>
              <img src={womensBookImg} alt="Women's Protocol" className="w-full h-auto object-contain" />
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black text-white uppercase leading-none tracking-tight mb-8">
              {isEn ? <><span className="block">SCULPT YOUR</span><span className="block text-[#FF006E]">BEST SELF</span></> : <><span className="block">انحتي</span><span className="block text-[#FF006E]">أفضل نسخة</span></>}
            </h1>
            <button onClick={() => handleSelectProtocol('womens')}
              className="group relative inline-flex items-center gap-4 bg-transparent border-2 border-[#FF006E] text-white px-8 py-4 font-display font-bold uppercase tracking-widest text-lg overflow-hidden shadow-[0_0_20px_rgba(255,0,110,0.2)] hover:shadow-[0_0_40px_rgba(255,0,110,0.4)] transition-all duration-300 min-h-[56px]">
              <span className="absolute inset-0 bg-[#FF006E] translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <ArrowRight className={`relative z-10 w-5 h-5 mix-blend-difference group-hover:mix-blend-normal ${!isRTL ? 'rotate-180' : ''}`} />
              <span className="relative z-10 mix-blend-difference group-hover:mix-blend-normal">{isEn ? "WOMEN'S PROTOCOL" : 'بروتوكول النساء'}</span>
              <span className="relative z-10 text-[#FF006E] group-hover:text-black text-[10px] font-black uppercase tracking-widest">
                {isEn ? "START FOR 4,000 DA ONLY" : "ابدئي بـ 4,000 DA فقط"}
              </span>
            </button>
          </div>
        </motion.div>

        {/* Divider logo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full z-30 pointer-events-none flex items-center justify-center">
          <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.8, duration: 1.5, ease: 'circOut' }}
            className="w-full h-full origin-top relative"
            style={{ backgroundImage: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.8), rgba(212,67,42,0.8), transparent)' }}>
            <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 0.8, type: 'spring', bounce: 0.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050505] p-3 rounded-full border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] pointer-events-auto cursor-pointer group">
              <img src={BRAND.logo} alt="Logo" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Separator */}
      <div className="w-full h-[1px] bg-gradient-to-r from-[#00B4D8] via-purple-500 to-[#FF006E] opacity-50" />

      {/* Protocol content */}
      <div ref={contentRef} className="w-full relative overflow-x-hidden">
        <AnimatePresence mode="wait">
          {selectedProtocol === null && <PlaceholderContent key="placeholder" isEn={isEn} />}
          {selectedProtocol === 'mens' && (
            <ProtocolLayout
              key="mens"
              isEn={isEn}
              isRTL={isRTL}
              color="#00B4D8"
              accentGlass="rgba(0,180,216,0.18)"
              bookImg={mensBookImg}
              coachImg={mensCoachImg}
              prefix="mens"
              phases={mensPhases(isEn)}
              whatsappMsg="مرحبا، أريد الحصول على دليل تدريب الرجال - 4000 DA"
              who1={isEn ? 'The serious lifter.' : 'الرياضي الجاد.'}
              who2={isEn ? 'Zero excuses. Zero compromise.' : 'لا أعذار. لا تنازلات.'}
              who3={isEn ? 'YOU.' : 'أنتَ.'}
              inside1={isEn ? 'HYPERTROPHY' : 'بناء'}
              inside2={isEn ? 'DRIVEN' : 'احترافي'}
              inside3={isEn ? 'SYSTEM' : 'للعضلات'}
              insideSub={isEn ? 'Progressive Overload' : 'ضخامة عضلية وقوة صافية'}
              ctaReady={isEn ? 'READY' : 'مستعد'}
              ctaTo={isEn ? 'TO' : 'للـ'}
              ctaStart={isEn ? 'START?' : 'انطلاق؟'}
              ctaBuy={isEn ? 'BUY PROTOCOL' : 'اطلب عبر واتساب'}
              tickerText={isEn ? 'GET THE PROTOCOL • TRANSFORM YOUR BODY • 4000 DA • START TODAY • ' : 'احصل على البروتوكول • حوّل جسمك • 4000 DA • ابدأ اليوم • '}
              decorWord={isEn ? 'GO' : 'ابدأ'}
              bgWord={isEn ? 'EVOLUTION' : 'تطور'}
              features={mensFeatures}
              stats={[]}
            />
          )}
          {selectedProtocol === 'womens' && (
            <ProtocolLayout
              key="womens"
              isEn={isEn}
              isRTL={isRTL}
              color="#FF006E"
              accentGlass="rgba(255,0,110,0.18)"
              bookImg={womensBookImg}
              coachImg={womensCoachImg}
              prefix="womens"
              phases={womensPhases(isEn)}
              whatsappMsg="مرحبا، أريد الحصول على دليل تدريب النساء - 4000 DA"
              who1={isEn ? 'The woman who wants results.' : 'المرأة التي تريد النتائج.'}
              who2={isEn ? 'Home or gym – no obstacles.' : 'المنزل أو الجيم — لا عقبات.'}
              who3={isEn ? 'YOU.' : 'أنتِ.'}
              inside1={isEn ? 'SCULPTING' : 'نحت'}
              inside2={isEn ? 'FOCUSED' : 'مكثف'}
              inside3={isEn ? 'ROUTINE' : 'نمط'}
              insideSub={isEn ? 'Aesthetic Definition' : 'التحديد الجمالي'}
              ctaReady={isEn ? 'READY' : 'مستعدة'}
              ctaTo={isEn ? 'TO' : 'للـ'}
              ctaStart={isEn ? 'START?' : 'انطلاق؟'}
              ctaBuy={isEn ? 'BUY PROTOCOL' : 'اطلبي عبر واتساب'}
              tickerText={isEn ? 'GET THE PROTOCOL • SCULPT YOUR BODY • 4000 DA • START TODAY • ' : 'احصلي على البروتوكول • انحتي جسمك • 4000 DA • ابدئي اليوم • '}
              decorWord={isEn ? 'GO' : 'ابدئي'}
              bgWord={isEn ? 'TRANSFORM' : 'تحوّل'}
              features={womensFeatures}
              stats={[]}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
