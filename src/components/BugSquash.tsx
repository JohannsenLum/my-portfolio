import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { prefersReducedMotion } from '../hooks/useReveal';

/**
 * "It works on my end" — a 20-second bug-squashing game.
 *
 * Design notes, since a portfolio toy earns its place or it doesn't:
 *
 *  - The addictive loop is COMBO, not score. Consecutive hits multiply; one miss
 *    resets you to 1x. That turns a clicking exercise into a thing you can be bad
 *    at, which is the only reason anyone presses "again".
 *  - Bugs get faster every 5 seconds, so the last third is where runs are lost.
 *  - Best score persists in localStorage. Having a number to beat is most of why
 *    anyone plays twice.
 *  - Every timer is tracked and cleared. A game that leaks intervals into a
 *    portfolio page is worse than no game.
 *  - Fully keyboard playable: each hole is a real <button>. Reduced-motion users
 *    get the game without the shake and particles.
 */

const HOLES = 9;
const ROUND_MS = 20_000;
const BEST_KEY = 'jl-bugsquash-best';

const SPAWN_STEPS = [900, 760, 620, 500] as const;
const LIFETIME_STEPS = [1100, 950, 800, 680] as const;

type Phase = 'idle' | 'playing' | 'over';
type Pop = { id: number; hole: number; text: string };

const QUIPS = [
  'it works on my end',
  'cannot reproduce',
  'works locally',
  'ship it',
  'merged',
  'LGTM',
];

const BugSquash: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('idle');
  const [active, setActive] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [best, setBest] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_MS);
  const [pops, setPops] = useState<Pop[]>([]);
  const [shake, setShake] = useState(false);

  // Every timer lives here so cleanup is total — no stray intervals after unmount.
  const timers = useRef<number[]>([]);
  const popId = useRef(0);
  const reduced = prefersReducedMotion();

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  useEffect(() => {
    const stored = Number(localStorage.getItem(BEST_KEY) ?? 0);
    if (!Number.isNaN(stored)) setBest(stored);
    return clearTimers;
  }, [clearTimers]);

  // Difficulty ramps in four steps across the round.
  const tier = Math.min(3, Math.floor((ROUND_MS - timeLeft) / 5000));

  useEffect(() => {
    if (phase !== 'playing') return;

    let cancelled = false;

    const spawn = () => {
      if (cancelled) return;
      setActive((prev) => {
        let next = Math.floor(Math.random() * HOLES);
        if (next === prev) next = (next + 1 + Math.floor(Math.random() * (HOLES - 1))) % HOLES;
        return next;
      });
      // A bug that escapes is only a miss if you never hit it — handled in onHit.
      const despawn = window.setTimeout(() => {
        if (!cancelled) setActive(null);
      }, LIFETIME_STEPS[tier]);
      const nextSpawn = window.setTimeout(spawn, SPAWN_STEPS[tier]);
      timers.current.push(despawn, nextSpawn);
    };

    const first = window.setTimeout(spawn, 350);
    timers.current.push(first);

    const tick = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 100) return 0;
        return t - 100;
      });
    }, 100);

    return () => {
      cancelled = true;
      window.clearInterval(tick);
      clearTimers();
    };
    // `tier` intentionally re-runs the loop so difficulty actually escalates.
  }, [phase, tier, clearTimers]);

  useEffect(() => {
    if (phase !== 'playing' || timeLeft > 0) return;
    setPhase('over');
    setActive(null);
    clearTimers();
    if (score > best) {
      localStorage.setItem(BEST_KEY, String(score));
      setBest(score);
    }
  }, [timeLeft, phase, score, best, clearTimers]);

  const start = () => {
    clearTimers();
    setScore(0);
    setCombo(1);
    setTimeLeft(ROUND_MS);
    setPops([]);
    setActive(null);
    setPhase('playing');
  };

  const addPop = (hole: number, text: string) => {
    const id = popId.current++;
    setPops((p) => [...p, { id, hole, text }]);
    const t = window.setTimeout(() => setPops((p) => p.filter((x) => x.id !== id)), 700);
    timers.current.push(t);
  };

  const onHit = (hole: number) => {
    if (phase !== 'playing') return;

    if (hole === active) {
      const gained = combo;
      setScore((s) => s + gained);
      setCombo((c) => Math.min(c + 1, 99));
      setActive(null);
      addPop(hole, gained > 4 ? `+${gained} ${QUIPS[gained % QUIPS.length]}` : `+${gained}`);
      if (gained >= 5 && !reduced) {
        setShake(true);
        const t = window.setTimeout(() => setShake(false), 220);
        timers.current.push(t);
      }
    } else {
      // Missing is the whole game — losing a 12x combo is what makes you retry.
      setCombo(1);
      addPop(hole, 'miss');
    }
  };

  const seconds = Math.ceil(timeLeft / 1000);

  return (
    <section
      id="bugsquash"
      className="py-20 px-6 bg-white dark:bg-gray-900 transition-colors duration-500"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Squash the <span className="text-indigo-500">Bugs</span>
          </h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mt-4" />
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Twenty seconds. Consecutive hits build a multiplier, one miss resets it.
            They get faster. Good luck.
          </p>
        </div>

        <motion.div
          animate={shake ? { x: [0, -5, 5, -3, 0] } : { x: 0 }}
          transition={{ duration: 0.22 }}
          className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-5 md:p-7 shadow-lg"
        >
          <div className="flex items-center justify-between mb-5 font-mono text-sm md:text-base">
            <span className="text-gray-700 dark:text-gray-300">
              score <span className="font-bold text-indigo-500">{score}</span>
            </span>
            <motion.span
              key={combo}
              initial={combo > 1 && !reduced ? { scale: 1.5 } : false}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 18 }}
              className={combo > 4 ? 'font-bold text-pink-500' : 'text-gray-700 dark:text-gray-300'}
            >
              {combo}x
            </motion.span>
            <span className="text-gray-700 dark:text-gray-300">
              {phase === 'playing' ? `${seconds}s` : `best ${best}`}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {Array.from({ length: HOLES }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onHit(i)}
                disabled={phase !== 'playing'}
                aria-label={`hole ${i + 1}${active === i ? ', bug present' : ''}`}
                className="relative aspect-square rounded-xl bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 overflow-hidden
                           disabled:cursor-default enabled:cursor-pointer
                           enabled:hover:border-indigo-400 transition-colors
                           focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                <AnimatePresence>
                  {active === i && phase === 'playing' && (
                    <motion.span
                      className="absolute inset-0 flex items-center justify-center text-3xl md:text-4xl select-none"
                      initial={reduced ? { opacity: 0 } : { scale: 0, rotate: -25, opacity: 0 }}
                      animate={reduced ? { opacity: 1 } : { scale: 1, rotate: 0, opacity: 1 }}
                      exit={reduced ? { opacity: 0 } : { scale: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 520, damping: 22 }}
                    >
                      🐛
                    </motion.span>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {pops
                    .filter((p) => p.hole === i)
                    .map((p) => (
                      <motion.span
                        key={p.id}
                        className="absolute inset-x-0 top-1 text-[10px] md:text-xs font-mono font-bold text-indigo-500 pointer-events-none"
                        initial={{ y: 8, opacity: 0 }}
                        animate={{ y: -14, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.45 }}
                        aria-hidden="true"
                      >
                        {p.text}
                      </motion.span>
                    ))}
                </AnimatePresence>
              </button>
            ))}
          </div>

          <div className="mt-6 text-center min-h-[3.5rem]">
            {phase !== 'playing' && (
              <motion.button
                type="button"
                onClick={start}
                whileHover={reduced ? undefined : { scale: 1.04 }}
                whileTap={reduced ? undefined : { scale: 0.97 }}
                className="px-7 py-3 rounded-lg bg-indigo-500 text-white font-semibold shadow hover:bg-indigo-600 transition-colors
                           focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                {phase === 'idle' ? 'Start' : 'Again'}
              </motion.button>
            )}

            <div aria-live="polite" className="mt-3 text-sm text-gray-600 dark:text-gray-400 font-mono">
              {phase === 'over' &&
                (score > 0 && score >= best
                  ? `new best — ${score}. it works on my end.`
                  : `${score}. best is ${best}.`)}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BugSquash;
