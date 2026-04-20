import { BRAND } from '../constants';
import { MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

const Instagram = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const Facebook = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const Youtube = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7.1C2 8.7 1.9 10.4 1.9 12s.1 3.3.6 4.9C3.6 19.3 5.3 20 12 20s8.4-.7 9.5-3.1c.5-1.6.6-3.3.6-4.9s-.1-3.3-.6-4.9C20.4 4.7 18.7 4 12 4s-8.4.7-9.5 3.1z"/><polygon points="9.7 15.3 15.3 12 9.7 8.7 9.7 15.3"/></svg>
);

export default function Footer() {
  const { t, isRTL } = useLanguage();
  const tf = t.footer;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] pt-32 pb-12 relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Massive Background Text */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none select-none flex justify-center opacity-[0.03]">
        <span className="text-[20vw] font-display font-black leading-[0.7] whitespace-nowrap">AKRAM</span>
      </div>

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <img src={BRAND.logo} alt={BRAND.name} className="h-12 w-auto" />
              <div>
                <span className="block text-2xl font-display font-bold leading-none tracking-tight">AKRAM</span>
                <span className="block text-xs text-brand-red font-bold uppercase tracking-[0.3em]">Books</span>
              </div>
            </div>
            <p className="text-white/50 max-w-md mb-8 leading-relaxed font-light">
              {tf.desc}
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: Instagram, href: BRAND.socials.instagram },
                { icon: Facebook, href: BRAND.socials.facebook },
                { icon: Youtube, href: BRAND.socials.youtube },
                { icon: MessageCircle, href: BRAND.socials.whatsapp },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-red hover:border-brand-red hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(236,54,66,0.3)]"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-8">{tf.quickLinks}</h4>
            <ul className="space-y-4 text-white/70 font-light">
              <li><Link to="/" className="hover:text-brand-red transition-colors">{tf.links.home}</Link></li>
              <li><Link to="/nutrition" className="hover:text-brand-red transition-colors">{t.nav.books} - {isRTL ? "التغذية" : "Nutrition"}</Link></li>
              <li><Link to="/training" className="hover:text-brand-red transition-colors">{t.nav.books} - {isRTL ? "التدريب" : "Training"}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-8">{tf.contact}</h4>
            <ul className="space-y-6 text-white/70 font-light">
              <li className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-red mb-2">WhatsApp</span>
                <a href={BRAND.socials.whatsapp} className="text-lg hover:text-white transition-colors">+213 783 76 62 09</a>
              </li>
              <li className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-red mb-2">{tf.location}</span>
                <span className="text-lg">{tf.locationVal}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col gap-6 text-white/40 text-sm font-light">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <p>© {currentYear} Coach Akram Books. {tf.rights}</p>
              <span className="hidden sm:block text-white/20">·</span>
              <p className="text-white/25 text-xs tracking-wide">
                Designed &amp; Built with <span className="text-brand-red/60">♥</span> by{' '}
                <a href="https://wa.me/213560684042" target="_blank" rel="noopener noreferrer" className="text-white/40 font-medium hover:text-brand-red transition-colors duration-300">
                  Youcef.dev_
                </a>
              </p>
            </div>
            <div className="flex items-center gap-8">
              <a href="#" className="hover:text-white transition-colors">{tf.privacy}</a>
              <a href="#" className="hover:text-white transition-colors">{tf.terms}</a>
            </div>
          </div>
          <div className="text-center text-xs text-white/30">
            <p>Official Commercial Name: <strong>EURL IKNI M KARAN LILISTIRAD</strong> | Operating as: <strong>Coaching Dz</strong></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
