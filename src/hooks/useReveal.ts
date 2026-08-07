import type { Variants } from 'motion/react';

/**
 * Shared motion variants for scroll reveals.
 *
 * Kept in one place so every section eases identically — mismatched easing
 * between sections is the thing that makes a site feel assembled rather than
 * designed. The custom cubic-bezier is a soft overshoot-free ease-out.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/** Parent wrapper: children reveal one after another rather than all at once. */
export const stagger = (gap = 0.08): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap } },
});

/**
 * Spread onto a motion element to reveal it when scrolled into view.
 * `once` matters: re-animating on every scroll-past is nauseating, and it makes
 * the page feel like it is fighting you when you scroll back up.
 */
export const revealOnce = {
  initial: 'hidden' as const,
  whileInView: 'show' as const,
  viewport: { once: true, amount: 0.2 },
};

/**
 * Read the OS-level reduced-motion preference.
 *
 * Lives here rather than in a component so every consumer agrees — a splash that
 * respects it and a game that doesn't is worse than neither respecting it.
 */
export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
