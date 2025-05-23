'use client'; // Explicitly declare this as a client component

import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';
import { usePageTransition } from '@/hooks/usePageTransition';
import { useLocaleStore } from '@/store/useLocaleStore';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Check if the current page is the home screen (used to float the footer)
  const isHomeScreenPage = pathname === '/Pg001';

  const LOADING_DURATION = 400;

  // Custom hook to control loading state during page transitions
  const { loading } = usePageTransition(LOADING_DURATION);

  // Handle first-load animation
  const [isFirstLoadFinished, setIsFirstLoadFinished] = useState(false);

  // Zustand: language initialization
  const setLocale = useLocaleStore((state) => state.setLocale);

  // ✅ Always unlock scroll on route change (prevents stuck scroll after leaving Pg001)
  useEffect(() => {
    const unlockScroll = () => {
      document.documentElement.style.overflow = '';
      document.documentElement.style.paddingRight = '';
      document.body.style.overflow = '';
    };
    unlockScroll();
  }, [pathname]);

  // ✅ MutationObserver fallback: auto-fix scroll lock if caused by 3rd-party animation or transitions
  useEffect(() => {
    const unlockScroll = () => {
      document.documentElement.style.overflow = '';
      document.documentElement.style.paddingRight = '';
    };

    const observer = new MutationObserver(() => {
      const html = document.documentElement;
      if (html.style.overflow === 'hidden' || html.style.paddingRight) {
        console.warn('[Fix] Detected scroll lock. Unlocking.');
        unlockScroll();
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style'],
    });

    return () => observer.disconnect();
  }, []);

  // ✅ Initialize default language on first load
  useEffect(() => {
    const handleInitialLoad = () => {
      // Set default language (e.g., Japanese). You can read from localStorage instead if needed.
      setLocale('ja');

      // Delay content appearance for loading animation
      setTimeout(() => {
        setIsFirstLoadFinished(true);
      }, LOADING_DURATION);
    };

    if (document.readyState === 'complete') {
      handleInitialLoad();
    } else {
      window.addEventListener('load', handleInitialLoad);
      return () => window.removeEventListener('load', handleInitialLoad);
    }
  }, [setLocale]);

  // Header menu toggle state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  useEffect(() => {
  const unlockScroll = () => {
    document.documentElement.style.overflow = '';
    document.documentElement.style.paddingRight = '';
    document.body.style.overflow = '';
  };
  unlockScroll();
}, [pathname]);

  // Show loading screen on first load
  if (!isFirstLoadFinished) {
    return <LoadingScreen />;
  }




  return (
    <>
      {/* Header with menu toggle */}
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

      {/* Animate page transitions */}
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" />}

        {!loading && (
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1"
          >
            <main className="flex-1 w-full">{children}</main>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer (floats if on home screen) */}
      <Footer floating={isHomeScreenPage} />
    </>
  );
}
