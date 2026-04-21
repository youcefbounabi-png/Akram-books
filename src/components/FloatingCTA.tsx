import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

type CTAContext = 'nutrition' | 'mens' | 'womens' | null;

interface FloatingCTAProps {
  trainingProtocol?: CTAContext;
}

const WA_NUMBER = '213783766209';

function buildWaUrl(message: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Motion-wrapped Link for animated navigation
const MotionLink = motion(Link);

export default function FloatingCTA({ trainingProtocol }: FloatingCTAProps) {
  const { t } = useLanguage();
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  const isNutrition = location.pathname === '/nutrition';
  const isTraining = location.pathname === '/training';

  // Show after a short delay on Nutrition/Training pages
  useEffect(() => {
    if (!isNutrition && !isTraining) {
      setVisible(false);
      return;
    }
    const timer = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(timer);
  }, [isNutrition, isTraining]);

  // On training page, only show after protocol is selected
  const shouldShow = isNutrition ? visible : visible && !!trainingProtocol;

  let label = '';
  let pulseClass = '';
  let bgStyle = '';
  let orderTo = '';

  if (isNutrition) {
    label = t.home.stickyNutrition;
    pulseClass = 'cta-pulse-red';
    bgStyle = 'bg-brand-red';
    orderTo = '/order?book=nutrition';
  } else if (trainingProtocol === 'mens') {
    label = t.home.stickyMens;
    pulseClass = 'cta-pulse-teal';
    bgStyle = 'bg-[#00B4D8]';
    orderTo = '/order?book=training&variant=mens';
  } else if (trainingProtocol === 'womens') {
    label = t.home.stickyWomens;
    pulseClass = 'cta-pulse-pink';
    bgStyle = 'bg-[#FF006E]';
    orderTo = '/order?book=training&variant=womens';
  }

  return (
    <AnimatePresence>
      {shouldShow && (
        <MotionLink
          to={orderTo}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className={[
            // Mobile: bottom-center full-width; Desktop: bottom-right corner
            'fixed z-[9999] flex items-center justify-center gap-3',
            'bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:w-auto',
            'px-6 py-4 rounded-2xl',
            'font-black text-base md:text-lg text-white',
            'cursor-pointer select-none',
            'min-h-[56px] md:min-h-[52px]',
            bgStyle,
            pulseClass,
            'transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]',
          ].join(' ')}
          style={{ fontFamily: 'Cairo, sans-serif' }}
        >
          <ShoppingBag size={20} className="shrink-0" />
          <span>{label}</span>
        </MotionLink>
      )}
    </AnimatePresence>
  );
}

// Hook to use floating CTA context across Training page
export { buildWaUrl, WA_NUMBER };
export type { CTAContext };
