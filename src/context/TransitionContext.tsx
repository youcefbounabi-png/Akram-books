import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

export interface TransitionSourceRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface TransitionContextValue {
  triggerTransition: (to: string, sourceRect: TransitionSourceRect, imageSrc: string) => void;
  isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextValue>({
  triggerTransition: () => {},
  isTransitioning: false,
});

export function usePageTransition() {
  return useContext(TransitionContext);
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const triggerTransition = useCallback(
    (to: string, sourceRect: TransitionSourceRect, imageSrc: string) => {
      if (isTransitioning) return;
      setIsTransitioning(true);

      // Create overlay container
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 9999;
        pointer-events: all;
        overflow: hidden;
        background: transparent;
      `;

      // Create the book image clone
      const img = document.createElement('img');
      img.src = imageSrc;
      img.style.cssText = `
        position: absolute;
        top: ${sourceRect.top}px;
        left: ${sourceRect.left}px;
        width: ${sourceRect.width}px;
        height: ${sourceRect.height}px;
        object-fit: cover;
        object-position: center;
        border-radius: 24px;
        will-change: transform;
        transform-origin: center center;
      `;

      // Red flash overlay (sits behind the image, fades in at the end)
      const flash = document.createElement('div');
      flash.style.cssText = `
        position: absolute;
        inset: 0;
        background: #050505;
        opacity: 0;
      `;

      overlay.appendChild(flash);
      overlay.appendChild(img);
      document.body.appendChild(overlay);
      overlayRef.current = overlay;

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Centre of source image
      const cx = sourceRect.left + sourceRect.width / 2;
      const cy = sourceRect.top + sourceRect.height / 2;

      // Scale factor to fill the screen
      const scaleX = vw / sourceRect.width;
      const scaleY = vh / sourceRect.height;
      const scale = Math.max(scaleX, scaleY) * 1.05; // slight overshoot

      // Translation to move image centre to screen centre
      const tx = vw / 2 - cx;
      const ty = vh / 2 - cy;

      const tl = gsap.timeline({
        onComplete: () => {
          navigate(to);
          // After navigation, fade out overlay
          gsap.to(overlay, {
            opacity: 0,
            duration: 0.5,
            delay: 0.1,
            ease: 'power2.in',
            onComplete: () => {
              overlay.remove();
              setIsTransitioning(false);
            },
          });
        },
      });

      // Phase 1: scale the book image to fill screen
      tl.to(img, {
        x: tx,
        y: ty,
        scale: scale,
        borderRadius: '0px',
        duration: 0.9,
        ease: 'expo.inOut',
      });

      // Phase 2: simultaneously clip the image revealing it is "the screen" and fade to black
      tl.to(
        flash,
        {
          opacity: 1,
          duration: 0.35,
          ease: 'power2.in',
        },
        '-=0.15'
      );
    },
    [isTransitioning, navigate]
  );

  return (
    <TransitionContext.Provider value={{ triggerTransition, isTransitioning }}>
      {children}
    </TransitionContext.Provider>
  );
}
