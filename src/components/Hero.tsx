import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useTheme } from '../contexts/ThemeContext';
import profileImage from '../assets/profile.jpg';
import { Typewriter } from 'react-simple-typewriter'; // Importing Typewriter component
import { fadeUp } from '../hooks/useReveal';

// Same soft overshoot-free ease used across the site (see useReveal.ts) —
// duplicated locally because this file drives its own bespoke transitions
// (button hovers, the image float loop) that fall outside the shared
// scroll-reveal variants.
const EASE = [0.22, 1, 0.36, 1] as const;

// The splash overlay holds for ~900ms then fades over ~500ms. This is not
// a delay long enough to *wait out* the splash — it's a small handoff so the
// hero doesn't start moving at the exact same instant the splash appears.
// Kept under ~400ms so a returning visitor (splash skipped via sessionStorage)
// never feels a sluggish page.
const HERO_DELAY = 0.25;
const STAGGER_GAP = 0.08;

const Hero: React.FC = () => {
  const { theme } = useTheme(); // Using theme from context
  const reduceMotion = !!useReducedMotion();

  // Local orchestration parent: the shared `stagger()` helper doesn't take an
  // initial delay, and the hero needs one (see HERO_DELAY above) while every
  // other section reveals on scroll with no such handoff to account for.
  const container: Variants = {
    hidden: {},
    show: {
      transition: { delayChildren: HERO_DELAY, staggerChildren: STAGGER_GAP },
    },
  };

  // Six items share the stagger, in render order: heading, typewriter line,
  // tagline, button row, social row, profile image. The image's own float
  // loop is timed to pick up right after its entrance settles.
  const imageLoopDelay = HERO_DELAY + STAGGER_GAP * 5 + 0.55;

  return (
    <section
      id="home"
      className={`min-h-screen flex items-center justify-center px-6 transition-colors duration-500
        ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'}`}
    >
      <motion.div
        className="flex flex-col-reverse md:flex-row items-center justify-between text-center max-w-7xl mx-auto"
        initial={reduceMotion ? false : 'hidden'}
        animate="show"
        variants={container}
      >
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left mb-6 md:mb-0">
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-4">
            Hi, I'm <span className="text-indigo-600 dark:text-indigo-400">Johannsen</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg md:text-xl mb-6">
            I'm a{' '}
            <span className="text-3xl text-indigo-600 dark:text-indigo-400 font-semibold">
                <Typewriter
                words={['Turning 0s to 1s', 'Addicted to solving problems', 'Doing my best for a living', 'Always learning and building', 'Code, gym, Claude, repeat']}
                loop={0} // Infinite loop
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={100}
                delaySpeed={1500}
                />
            </span>
            </motion.p>

          <motion.p variants={fadeUp} className="text-lg md:text-xl mb-6">
          Year 4 CS student at NUS. Right now, most of my time goes into building open source.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mb-6 flex flex-wrap items-center justify-center md:justify-start gap-4"
          >
            <motion.a
                href="#projects"
                whileHover={{ scale: 1.045 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="relative inline-flex items-center justify-center px-6 py-3 border-2 border-transparent bg-indigo-400 text-white rounded-lg shadow-md hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-500/40 transition duration-300 overflow-hidden w-[200px] md:w-auto text-center"
            >
                <span className="relative z-10">View Projects</span>
                {!reduceMotion && (
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    initial={{ x: '-120%' }}
                    animate={{ x: '320%' }}
                    transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2.6, ease: 'easeInOut', delay: imageLoopDelay }}
                  />
                )}
            </motion.a>
            <motion.a
                href="#contact"
                whileHover={{ scale: 1.035 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-indigo-400 border-2 border-indigo-400 rounded-lg hover:bg-indigo-100 hover:shadow-lg hover:shadow-indigo-400/20 transition duration-300 w-[200px] md:w-auto text-center"
            >
                Contact Me
            </motion.a>
            </motion.div>

          <motion.div variants={fadeUp} className="flex justify-center md:justify-start space-x-6 mb-6">
            <motion.a
              href="https://github.com/JohannsenLum"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
              whileHover={reduceMotion ? undefined : { scale: 1.05, y: -3 }}
              whileTap={reduceMotion ? undefined : { scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 320, damping: 14 }}
            >
              <FontAwesomeIcon
                icon={faGithub}
                className="w-6 h-6 text-gray-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 hover:drop-shadow-md transition"
              />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/johannsenlum"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
              whileHover={reduceMotion ? undefined : { scale: 1.05, y: -3 }}
              whileTap={reduceMotion ? undefined : { scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 320, damping: 14 }}
            >
              <FontAwesomeIcon
                icon={faLinkedin}
                className="w-6 h-6 text-gray-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 hover:drop-shadow-md transition"
              />
            </motion.a>
            <motion.a
              href="https://instagram.com/lumboyboy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
              whileHover={reduceMotion ? undefined : { scale: 1.05, y: -3 }}
              whileTap={reduceMotion ? undefined : { scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 320, damping: 14 }}
            >
              <FontAwesomeIcon
                icon={faInstagram}
                className="w-6 h-6 text-gray-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 hover:drop-shadow-md transition"
              />
            </motion.a>
          </motion.div>
        </div>

        {/* Profile Image */}
        <motion.div variants={fadeUp} className="md:w-1/2 flex justify-center mb-6 md:mb-0">
          <motion.img
            src={profileImage}
            alt="Profile"
            className={`mx-auto w-64 h-64 md:w-96 md:h-96 rounded-full object-cover border-4
              ${theme === 'light' ? 'border-indigo-300' : 'border-white'}`}
            animate={reduceMotion ? { y: 0 } : { y: [0, -10, 0] }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: imageLoopDelay }
            }
            whileHover={
              reduceMotion ? { scale: 1.02 } : { scale: 1.035, rotate: 1.5, transition: { duration: 0.4, ease: EASE } }
            }
          />
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        aria-hidden="true"
        tabIndex={-1}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-indigo-500 hover:text-indigo-700 transition duration-300"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduceMotion ? undefined : { delay: imageLoopDelay - 0.3, duration: 0.6 }}
      >
        <motion.svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: imageLoopDelay }
          }
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.a>
    </section>

  );
};

export default Hero;
