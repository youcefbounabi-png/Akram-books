import { motion } from 'motion/react';
import { BRAND } from '../constants';
import { Menu, X, Phone, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useLanguage } from '../i18n/LanguageContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const { lang, toggleLang } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4',
        scrolled ? 'bg-brand-dark/80 backdrop-blur-xl border-b border-white/5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.2)]' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group" aria-label="Coach Akram Books">
          <img
            src={BRAND.logo}
            alt={BRAND.name}
            className="h-10 w-auto transition-transform duration-500 group-hover:scale-110"
          />
          <div className="hidden sm:block">
            <span className="block text-lg font-display font-bold leading-none tracking-tight">AKRAM</span>
            <span className="block text-[10px] text-brand-red font-bold uppercase tracking-[0.3em]">Books</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          
          <Link to="/nutrition" className={`text-sm font-display font-bold uppercase tracking-widest transition-colors ${location.pathname === '/nutrition' ? 'text-brand-red' : 'text-white/70 hover:text-white'}`}>
            {lang === 'en' ? 'NUTRITION' : 'التغذية'}
          </Link>

          <Link to="/training" className={`text-sm font-display font-bold uppercase tracking-widest transition-colors ${location.pathname === '/training' ? 'text-brand-red' : 'text-white/70 hover:text-white'}`}>
            {lang === 'en' ? 'TRAINING' : 'التدريب'}
          </Link>

          <div className="w-px h-4 bg-white/20 mx-2" />

          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 text-white/50 hover:text-white px-3 py-1.5 rounded-full border border-white/10 glass-panel transition-all text-[10px] font-bold uppercase tracking-wider cursor-pointer"
            aria-label="Toggle language"
          >
            <Globe size={12} />
            {lang === 'en' ? 'AR' : 'EN'}
          </button>

          <Link
            to="/order"
            className="flex items-center gap-2 bg-brand-red hover:bg-brand-red/90 text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_0_20px_rgba(236,54,66,0.4)] cursor-pointer"
            aria-label="Get the Books"
          >
            <Phone size={14} aria-hidden="true" />
            {lang === 'en' ? 'GET THE BOOKS' : 'احصل على الكتب'}
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 right-0 bg-brand-dark/98 backdrop-blur-xl border-b border-white/10 p-6 md:hidden shadow-2xl"
        >
          <nav className="flex flex-col gap-5" aria-label="Mobile navigation">
            <Link 
              to="/nutrition" 
              className={`text-xl font-display font-bold uppercase tracking-widest px-2 py-1 ${location.pathname === '/nutrition' ? 'text-brand-red' : 'text-white/70 hover:text-white'}`}
            >
              {lang === 'en' ? 'Nutrition Protocol' : 'بروتوكول التغذية'}
            </Link>

            <Link 
              to="/training" 
              className={`text-xl font-display font-bold uppercase tracking-widest px-2 py-1 border-b border-white/10 pb-6 ${location.pathname === '/training' ? 'text-brand-red' : 'text-white/70 hover:text-white'}`}
            >
              {lang === 'en' ? 'Training Protocol' : 'بروتوكول التدريب'}
            </Link>

            <Link
              to="/order"
              className="bg-brand-red text-white p-4 rounded-xl text-center font-bold text-lg mt-2 hover:bg-brand-red/90 transition-colors cursor-pointer"
            >
              {lang === 'en' ? 'GET THE BOOKS' : 'احصل على الكتب'}
            </Link>

            <button
              onClick={() => { toggleLang(); setIsOpen(false); }}
              className="glass-panel text-white p-4 rounded-xl text-center font-bold text-sm mt-2 transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Globe size={16} />
              {lang === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
            </button>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
