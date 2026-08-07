import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { prefersReducedMotion } from '../hooks/useReveal';

/**
 * First-visit splash.
 *
 * Three rules keep this from becoming a toll booth in front of the site:
 *
 *  1. Once per tab. A `sessionStorage` flag means a refresh, a back-nav or an
 *     anchor jump never replays it — the animation is a greeting, not a gate.
 *  2. It never blocks content. The page renders underneath from the first frame;
 *     this is an overlay that leaves, not a screen the app waits on.
 *  3. Anyone who has asked their OS to reduce motion skips it entirely, along
 *     with every other animation on the site.
 */

const SESSION_KEY = 'jl-splash-seen';
const HOLD_MS = 900;

const Splash: React.FC = () => {
  // Decided once, synchronously, before first paint — checking this in an effect
  // would flash the splash for a frame at users who asked not to see it.
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (prefersReducedMotion()) return false;
    return sessionStorage.getItem(SESSION_KEY) !== '1';
  });

  useEffect(() => {
    if (!visible) return;
    sessionStorage.setItem(SESSION_KEY, '1');
    const t = setTimeout(() => setVisible(false), HOLD_MS);
    return () => clearTimeout(t);
  }, [visible]);

  // Lock scroll only while the overlay is up, and always give it back.
  useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [visible]);

  const letters = 'Johannsen'.split('');

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-gray-900"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center">
            <div className="flex overflow-hidden">
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{
                    delay: i * 0.035,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {letter}
                </motion.span>
              ))}
              <motion.span
                className="text-4xl md:text-6xl font-bold text-indigo-500"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: letters.length * 0.035 + 0.1, duration: 0.35 }}
              >
                .
              </motion.span>
            </div>

            <motion.div
              className="mt-5 h-[2px] bg-indigo-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ delay: 0.25, duration: 0.55, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Splash;
