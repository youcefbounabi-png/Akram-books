import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useLanguage } from '../i18n/LanguageContext';
import { BRAND, ALGERIAN_STATES } from '../constants';
import { Truck, ChevronRight, ShieldCheck, Zap } from 'lucide-react';

import nutritionBookImg from '../assets/images/nutrition-book-new.png';
import mensBookImg from '../assets/images/mens-book.png';
import womensBookImg from '../assets/images/womens-book.png';

/* ─── Custom Scramble Hook ─── */
const useScramble = (text: string, duration: number = 2) => {
  const [displayText, setDisplayText] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+';

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text.split('')
          .map((_, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / (duration * 5); // slow down to duration
    }, 30);
    return () => clearInterval(interval);
  }, [text, duration]);

  return displayText;
};

/* ─── Grain Noise Component ─── */
const GrainOverlay = () => (
  <svg className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.04] z-[9999]" style={{ mixBlendMode: 'overlay' }}>
    <filter id="noiseFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
  </svg>
);

export default function OrderFormPage() {
  const { lang, isRTL } = useLanguage();
  const isEn = lang === 'en';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    state: '',
    address: '',
    bookChoice: 'bundle', // 'nutrition', 'training', 'bundle'
    genderVariant: 'male', // 'male', 'female'
    quantity: 1,
  });
  const [hoveredBookIndex, setHoveredBookIndex] = useState<number | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  const scrambleSecure = useScramble(isEn ? "SECURE" : "احصل على", 1.5);

  useEffect(() => {
    if (headlineRef.current) {
      gsap.fromTo(headlineRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'expo.out' });
    }
    if (underlineRef.current) {
      gsap.fromTo(underlineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: 'power4.inOut', delay: 1 });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    let bookName = '';
    if (formData.bookChoice === 'nutrition') bookName = isEn ? 'Nutrition Guide' : 'دليل التغذية';
    if (formData.bookChoice === 'training') bookName = isEn ? 'Training Guide' : 'دليل التدريب';
    if (formData.bookChoice === 'bundle') bookName = isEn ? 'Full Bundle (Nutrition + Training)' : 'الباقة الكاملة (تغذية + تدريب)';

    let variantStr = '';
    if (formData.bookChoice === 'training' || formData.bookChoice === 'bundle') {
      variantStr = `\n*Variant*: ${formData.genderVariant === 'male' ? 'Mens' : 'Womens'}`;
    }

    const message = `*NEW BOOK ORDER* 📚
------------------------------
*Name*: ${formData.firstName} ${formData.lastName}
*Phone*: ${formData.phone}
*State*: ${formData.state}
*Address*: ${formData.address}

*Order Details*:
*Item*: ${bookName}${variantStr}
*Quantity*: ${formData.quantity}
------------------------------
*Ready for processing* ✅`;

    const encodedMsg = encodeURIComponent(message);
    const waLink = `https://wa.me/${BRAND.socials.whatsapp.replace('https://wa.me/', '')}?text=${encodedMsg}`;
    
    setTimeout(() => {
      window.location.href = waLink;
      setIsSubmitting(false);
    }, 800);
  };

  const WhatsAppIcon = () => (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className="w-6 h-6"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="bg-[#080808] min-h-screen pt-32 pb-24 relative overflow-hidden selection:bg-brand-red selection:text-white">
      <GrainOverlay />
      
      {/* Ambient Artistic Glows */}
      <div className="absolute top-0 right-[-10%] w-[800px] h-[800px] bg-brand-red/15 rounded-full blur-[150px] pointer-events-none mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-red/8 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24 items-start">
          
          {/* ────── LEFT SIDEBAR: Visual Preview ────── */}
          <div className="hidden md:flex flex-col sticky top-32">
            <div className="relative w-[420px] h-[500px] mb-12">
              {/* Nutrition Book (Left/Back) */}
              <div 
                className="absolute top-[40px] left-0 w-64 h-auto cursor-pointer transition-all duration-500"
                style={{ 
                  zIndex: hoveredBookIndex === 0 ? 50 : 10,
                  opacity: hoveredBookIndex !== null && hoveredBookIndex !== 0 ? 0.5 : 1,
                  transform: hoveredBookIndex !== null && hoveredBookIndex !== 0 ? 'translateX(-20px) scale(0.97)' : 'none',
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.8))'
                }}
                onMouseEnter={() => setHoveredBookIndex(0)}
                onMouseLeave={() => setHoveredBookIndex(null)}
              >
                {hoveredBookIndex === 0 && (
                  <motion.div 
                    layoutId="glow"
                    className="absolute inset-0 bg-brand-red/30 blur-3xl rounded-full scale-110 -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}
                <motion.img 
                  src={nutritionBookImg} 
                  initial={{ rotate: -15, x: -30, opacity: 0 }}
                  animate={{ rotate: -15, x: 0, opacity: 1 }}
                  whileHover={{ y: -16, scale: 1.05 }}
                  transition={{ 
                    rotate: { duration: 1, delay: 0.3 },
                    x: { duration: 1, delay: 0.3 },
                    opacity: { duration: 1, delay: 0.3 },
                    default: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                  className="w-full h-auto rounded-lg"
                />
              </div>

              {/* Men's Book (Center/Elevated) */}
              <div 
                className="absolute top-0 left-1/2 -ml-32 w-64 h-auto cursor-pointer transition-all duration-500"
                style={{ 
                  zIndex: hoveredBookIndex === 1 ? 50 : 20,
                  opacity: hoveredBookIndex !== null && hoveredBookIndex !== 1 ? 0.5 : 1,
                  transform: hoveredBookIndex === 0 ? 'translateX(20px) scale(0.97)' : hoveredBookIndex === 2 ? 'translateX(-20px) scale(0.97)' : 'none',
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.8))'
                }}
                onMouseEnter={() => setHoveredBookIndex(1)}
                onMouseLeave={() => setHoveredBookIndex(null)}
              >
                {hoveredBookIndex === 1 && (
                  <motion.div 
                    layoutId="glow"
                    className="absolute inset-0 bg-[#00B4D8]/30 blur-3xl rounded-full scale-110 -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}
                <motion.img 
                  src={mensBookImg} 
                  initial={{ rotate: -5, x: 20, opacity: 0 }}
                  animate={{ rotate: -5, x: 40, opacity: 1 }}
                  whileHover={{ y: -16, scale: 1.05 }}
                  transition={{ 
                    rotate: { duration: 1, delay: 0.5 },
                    x: { duration: 1, delay: 0.5 },
                    opacity: { duration: 1, delay: 0.5 },
                    default: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                  className="w-full h-auto rounded-lg"
                />
              </div>

              {/* Women's Book (Right/Back) */}
              <div 
                className="absolute top-[80px] right-0 w-64 h-auto cursor-pointer transition-all duration-500"
                style={{ 
                  zIndex: hoveredBookIndex === 2 ? 50 : 30,
                  opacity: hoveredBookIndex !== null && hoveredBookIndex !== 2 ? 0.5 : 1,
                  transform: hoveredBookIndex !== null && hoveredBookIndex !== 2 ? 'translateX(20px) scale(0.97)' : 'none',
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.8))'
                }}
                onMouseEnter={() => setHoveredBookIndex(2)}
                onMouseLeave={() => setHoveredBookIndex(null)}
              >
                {hoveredBookIndex === 2 && (
                  <motion.div 
                    layoutId="glow"
                    className="absolute inset-0 bg-[#FF006E]/30 blur-3xl rounded-full scale-110 -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}
                <motion.img 
                  src={womensBookImg} 
                  initial={{ rotate: 10, x: 60, opacity: 0 }}
                  animate={{ rotate: 10, x: 80, opacity: 1 }}
                  whileHover={{ y: -16, scale: 1.05 }}
                  transition={{ 
                    rotate: { duration: 1, delay: 0.7 },
                    x: { duration: 1, delay: 0.7 },
                    opacity: { duration: 1, delay: 0.7 },
                    default: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                  className="w-full h-auto rounded-lg"
                />
              </div>

              {/* Price Tags Layer */}
              <div className={`absolute bottom-0 ${isRTL ? 'left-0' : 'right-0'} z-40 flex flex-col items-end gap-2`}>
                <span className="bg-brand-red/90 text-white px-4 py-1.5 rounded-full font-display font-black text-xl italic shadow-xl">10,000 DA</span>
                <span className="bg-white/10 backdrop-blur-md text-white/50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{isEn ? 'FULL BUNDLE' : 'الباقة الكاملة'}</span>
              </div>
            </div>

            {/* Trust Section */}
            <div className={`space-y-6 ${isRTL ? 'border-r pr-6' : 'border-l pl-6'} border-white/10 py-4`}>
              {[
                { en: "Free Delivery Across Algeria", ar: "توصيل مجاني عبر الجزائر", Icon: Truck },
                { en: "Instant WhatsApp Delivery", ar: "استلام فوري عبر واتساب", Icon: Zap },
                { en: "Satisfaction Guaranteed", ar: "ضمان الرضا الكامل", Icon: ShieldCheck }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + (i * 0.1) }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-full bg-brand-red/10 border border-brand-red/20 flex items-center justify-center group-hover:bg-brand-red/20 transition-colors">
                    <item.Icon className="text-brand-red w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white text-sm font-bold opacity-80">{isEn ? item.en : item.ar}</span>
                    <span className="text-white/30 text-[10px] uppercase font-bold tracking-widest">{isEn ? "Verified Service" : "خدمة موثوقة"}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ────── RIGHT SIDE: The Form ────── */}
          <div className="w-full">
            <div className={`mb-16 ${isRTL ? 'text-right' : 'text-left'}`}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500/10 to-brand-red/10 border border-yellow-500/30 rounded-full px-6 py-2 mb-8 shadow-[0_0_20px_rgba(234,179,8,0.1)] relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-brand-red opacity-0 group-hover:opacity-10 transition-opacity" />
                <div className="w-2 h-2 rounded-full bg-brand-red animate-ping" />
                <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-[0.25em]">
                  {isEn ? "FREE DELIVERY ACROSS ALL ALGERIA" : "توصيل مجاني لجميع ولايات الجزائر"}
                </span>
                <Truck size={14} className="text-brand-red" />
              </motion.div>

              <div className="relative">
                {/* Mobile Book Preview */}
                <div className="md:hidden flex justify-center items-center h-[120px] mb-4 relative overflow-visible">
                  {/* Ambient Mobile Glow */}
                  <div className="absolute inset-x-0 h-full bg-brand-red/15 blur-2xl rounded-full scale-110" />
                  
                  <div className="relative w-full flex justify-center items-center px-12">
                    {/* Nutrition Book */}
                    <motion.img 
                      src={nutritionBookImg} 
                      className="absolute w-[80px] h-auto rounded shadow-lg -rotate-12 -translate-x-14 z-10 cursor-pointer"
                      whileTap={{ scale: 1.15, zIndex: 40 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      onClick={() => setFormData(prev => ({ ...prev, bookChoice: 'nutrition' }))}
                      animate={{ 
                        filter: formData.bookChoice === 'nutrition' 
                          ? 'drop-shadow(0 0 20px rgba(236,54,66,0.8))' 
                          : 'drop-shadow(0 8px 16px rgba(0,0,0,0.6))',
                        scale: formData.bookChoice === 'nutrition' ? 1.05 : 1
                      }}
                    />
                    
                    {/* Men's Book */}
                    <motion.img 
                      src={mensBookImg} 
                      className="absolute w-[80px] h-auto rounded shadow-lg -translate-y-4 z-20 cursor-pointer"
                      whileTap={{ scale: 1.15, zIndex: 40 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      onClick={() => setFormData(prev => ({ ...prev, bookChoice: 'training', genderVariant: 'male' }))}
                      animate={{ 
                        filter: (formData.bookChoice === 'training' && formData.genderVariant === 'male')
                          ? 'drop-shadow(0 0 20px rgba(0,180,216,0.8))' 
                          : 'drop-shadow(0 8px 16px rgba(0,0,0,0.6))',
                        scale: (formData.bookChoice === 'training' && formData.genderVariant === 'male') ? 1.05 : 1
                      }}
                    />
                    
                    {/* Women's Book */}
                    <motion.img 
                      src={womensBookImg} 
                      className="absolute w-[80px] h-auto rounded shadow-lg rotate-12 translate-x-14 z-10 cursor-pointer"
                      whileTap={{ scale: 1.15, zIndex: 40 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      onClick={() => setFormData(prev => ({ ...prev, bookChoice: 'training', genderVariant: 'female' }))}
                      animate={{ 
                        filter: (formData.bookChoice === 'training' && formData.genderVariant === 'female')
                          ? 'drop-shadow(0 0 20px rgba(255,0,110,0.8))' 
                          : 'drop-shadow(0 8px 16px rgba(0,0,0,0.6))',
                        scale: (formData.bookChoice === 'training' && formData.genderVariant === 'female') ? 1.05 : 1
                      }}
                    />
                  </div>
                </div>

                <h1 ref={headlineRef} className="flex flex-col leading-none mix-blend-screen">
                  <span className="font-bebas text-[70px] md:text-[110px] leading-[0.8] text-white italic tracking-tighter mb-2">
                    {scrambleSecure}
                  </span>
                  <span className="font-display font-black text-[34px] md:text-[54px] leading-tight text-white uppercase">
                    {isEn ? <>YOUR <span className="text-brand-red">COPY</span></> : <><span className="text-brand-red">نسختك</span> المطبوعة</>}
                  </span>
                </h1>
                <div ref={underlineRef} className={`h-1 w-48 bg-brand-red mt-4 origin-${isRTL ? 'right' : 'left'}`} />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
              {/* 1. Book Selection */}
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-8 h-8 rounded-full border border-brand-red/30 flex items-center justify-center font-display font-black text-brand-red text-sm">1</div>
                  <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.35em] text-white/40">
                    {isEn ? "SELECT YOUR PROTOCOL" : "اختر البروتوكول الخاص بك"}
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {[
                    { id: 'nutrition', label: isEn ? "Nutrition Guide" : "دليل التغذية", price: "6,000 DA", originalPrice: "8,000 DA", img: nutritionBookImg },
                    { id: 'training', label: isEn ? "Training Guide" : "دليل التدريب", price: "4,000 DA", img: mensBookImg },
                    { id: 'bundle', label: isEn ? "Full Bundle" : "الباقة الكاملة", ar: "الباقة الكاملة", price: "10,000 DA", originalPrice: "14,000 DA", img: womensBookImg, save: "SAVE 20%" },
                  ].map(opt => (
                    <label 
                      key={opt.id} 
                      className={`relative flex flex-col p-6 rounded-2xl border cursor-pointer transition-all duration-500 overflow-hidden group ${
                        formData.bookChoice === opt.id 
                        ? 'bg-brand-red/[0.08] border-brand-red shadow-[0_0_30px_rgba(212,67,42,0.15)] ring-1 ring-brand-red/50' 
                        : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                      }`}
                    >
                      <input type="radio" className="sr-only" name="bookChoice" value={opt.id} checked={formData.bookChoice === opt.id} onChange={(e) => setFormData({...formData, bookChoice: e.target.value})} />
                      
                      {/* Background Book Preview */}
                      <div className="absolute top-0 right-0 w-32 h-full opacity-[0.1] scale-125 translate-x-10 translate-y-5 rotate-[-15deg] group-hover:scale-150 transition-transform duration-700 pointer-events-none">
                        <img src={opt.img} className="w-full h-full object-contain" />
                      </div>

                      <div className="relative z-10 flex flex-col h-full">
                        <span className="font-display font-black text-lg md:text-xl text-white uppercase mb-1 tracking-tight">{opt.id === 'bundle' && !isEn ? opt.ar : opt.label}</span>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-brand-red font-display font-bold text-lg">{opt.price}</span>
                          {'originalPrice' in opt && (
                            <span className="text-white/20 text-xs line-through font-bold">{opt.originalPrice}</span>
                          )}
                        </div>
                        
                        {'save' in opt && (
                          <span className="bg-brand-red text-white text-[9px] font-black px-2 py-0.5 rounded w-max mb-4">
                            {isEn ? (opt as any).save : "وفر %20"}
                          </span>
                        )}

                        <div className={`mt-auto flex items-center gap-2 text-[10px] font-black tracking-widest uppercase transition-colors ${formData.bookChoice === opt.id ? 'text-brand-red' : 'text-white/20 group-hover:text-white/40'}`}>
                          {formData.bookChoice === opt.id ? (isEn ? "SELECTED" : "تم الاختيار") : (isEn ? "SELECT" : "اختر")}
                          <ChevronRight size={12} className={isRTL ? 'rotate-180' : ''} />
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                <AnimatePresence>
                  {(formData.bookChoice === 'training' || formData.bookChoice === 'bundle') && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-8 p-6 rounded-2xl bg-white/[0.03] border border-white/5 overflow-hidden"
                    >
                      <span className="block text-[10px] font-black text-white/30 uppercase tracking-[0.25em] mb-5">
                        {isEn ? "FOR WHOM?" : "لمن هذا البروتوكول؟"}
                      </span>
                      <div className="flex gap-8">
                        {['male', 'female'].map(g => (
                          <label key={g} className="flex items-center gap-3 cursor-pointer group">
                            <input type="radio" name="gender" value={g} checked={formData.genderVariant === g} onChange={() => setFormData({...formData, genderVariant: g})} className="sr-only" />
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${formData.genderVariant === g ? 'border-brand-red bg-brand-red/20' : 'border-white/20 group-hover:border-white/40'}`}>
                              {formData.genderVariant === g && <div className="w-2 h-2 rounded-full bg-brand-red" />}
                            </div>
                            <span className={`text-sm font-bold uppercase tracking-widest transition-colors ${formData.genderVariant === g ? 'text-white' : 'text-white/40'}`}>
                              {g === 'male' ? (isEn ? 'MENS' : 'للرجال') : (isEn ? 'WOMENS' : 'للنساء')}
                            </span>
                          </label>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                  <label className="text-[10px] font-black text-white/30 uppercase tracking-widest">
                    {isEn ? "Quantity" : "الكمية"}
                  </label>
                  <div className="flex items-center gap-6">
                    <button type="button" onClick={() => setFormData(f => ({...f, quantity: Math.max(1, f.quantity - 1)}))} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-brand-red hover:text-white transition-all">-</button>
                    <span className="text-xl font-display font-black text-white w-4 text-center">{formData.quantity}</span>
                    <button type="button" onClick={() => setFormData(f => ({...f, quantity: f.quantity + 1}))} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-brand-red hover:text-white transition-all">+</button>
                  </div>
                </div>
              </div>

              {/* 2. Delivery Info */}
              <div className="pt-8">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-8 h-8 rounded-full border border-brand-red/30 flex items-center justify-center font-display font-black text-brand-red text-sm">2</div>
                  <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.35em] text-white/40">
                    {isEn ? "DELIVERY DETAILS" : "تفاصيل التوصيل"}
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="relative group">
                    <label className={`absolute -top-6 ${isRTL ? 'right-0' : 'left-0'} text-[9px] font-black uppercase tracking-[0.2em] text-white/30 transition-colors group-focus-within:text-brand-red`}>
                      {isEn ? "First Name" : "الاسم الأول"}
                    </label>
                    <input required type="text" className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-white text-lg font-bold focus:outline-none focus:border-brand-red focus:shadow-[0_10px_10px_-10px_rgba(212,67,42,0.3)] transition-all"
                           value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                  </div>
                  <div className="relative group">
                    <label className={`absolute -top-6 ${isRTL ? 'right-0' : 'left-0'} text-[9px] font-black uppercase tracking-[0.2em] text-white/30 transition-colors group-focus-within:text-brand-red`}>
                      {isEn ? "Last Name" : "اللقب"}
                    </label>
                    <input required type="text" className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-white text-lg font-bold focus:outline-none focus:border-brand-red focus:shadow-[0_10px_10px_-10px_rgba(212,67,42,0.3)] transition-all"
                           value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                  </div>
                  <div className="relative group">
                    <label className={`absolute -top-6 ${isRTL ? 'right-0' : 'left-0'} text-[9px] font-black uppercase tracking-[0.2em] text-white/30 transition-colors group-focus-within:text-brand-red`}>
                      {isEn ? "Phone Number" : "رقم الهاتف"}
                    </label>
                    <input required type="tel" className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-white text-lg font-bold text-left focus:outline-none focus:border-brand-red focus:shadow-[0_10px_10px_-10px_rgba(212,67,42,0.3)] transition-all" dir="ltr"
                           value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div className="relative group">
                    <label className={`absolute -top-6 ${isRTL ? 'right-0' : 'left-0'} text-[9px] font-black uppercase tracking-[0.2em] text-white/30 transition-colors group-focus-within:text-brand-red`}>
                      {isEn ? "State (Wilaya)" : "الولاية"}
                    </label>
                    <select required className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-white text-lg font-bold focus:outline-none focus:border-brand-red focus:shadow-[0_10px_10px_-10px_rgba(212,67,42,0.3)] transition-all cursor-pointer appearance-none"
                            value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})}>
                      <option value="" className="bg-brand-dark">{isEn ? "Select State..." : "اختر الولاية..."}</option>
                      {ALGERIAN_STATES.map((w, i) => (
                        <option key={i} value={w} className="bg-brand-dark">{i+1} - {w}</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2 relative group">
                    <label className={`absolute -top-6 ${isRTL ? 'right-0' : 'left-0'} text-[9px] font-black uppercase tracking-[0.2em] text-white/30 transition-colors group-focus-within:text-brand-red`}>
                      {isEn ? "Full Address / District" : "العنوان الكامل / البلدية"}
                    </label>
                    <input required type="text" className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-white text-lg font-bold focus:outline-none focus:border-brand-red focus:shadow-[0_10px_10px_-10px_rgba(212,67,42,0.3)] transition-all"
                           value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                  </div>
                </div>
              </div>

              {/* Premium CTA Button */}
              <div className="relative pt-8 group">
                <div className="absolute inset-0 bg-brand-red/10 blur-2xl rounded-full scale-75 group-hover:scale-100 transition-transform opacity-50" />
                
                {formData.bookChoice === 'bundle' && (
                  <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-500 text-[10px] md:text-xs font-black mb-6 text-center block animate-pulse uppercase tracking-[0.2em]"
                  >
                    {isEn ? "You saved 4,000 DA by choosing the full bundle!" : "وفرت 4,000 DA باختيارك الباقة الكاملة!"}
                  </motion.span>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-20 bg-brand-red text-white font-display font-black uppercase tracking-[0.2em] text-xl relative overflow-hidden group/btn flex items-center justify-center gap-4 transition-all hover:scale-[1.01] hover:brightness-110 shadow-[0_0_30px_rgba(236,54,66,0.5)] disabled:opacity-50"
                >
                  <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] group-hover/btn:left-[150%] transition-all duration-[1.2s] ease-in-out" />

                  <div className="relative z-10 flex items-center gap-4">
                    <WhatsAppIcon />
                    <span>{isSubmitting ? (isEn ? "PROCESSING..." : "جاري المعالجة...") : (isEn ? "CONFIRM ORDER VIA WHATSAPP" : "تأكيد الطلب عبر واتساب")}</span>
                    <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
                      <ChevronRight size={24} className={isRTL ? 'rotate-180' : ''} />
                    </div>
                  </div>
                </button>
              </div>
            </form>
        </div>
      </div>
    </div>
  </div>
);
}
