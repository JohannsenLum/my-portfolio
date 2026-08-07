import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { prefersReducedMotion } from '../hooks/useReveal';

// Same cubic-bezier as every other reveal on the site (see useReveal.ts).
const EASE = [0.22, 1, 0.36, 1] as const;

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'bugsquash', label: 'Play' },
] as const;

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('home');
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Decided once — consistent with how Splash treats the same setting.
  const reduceMotion = prefersReducedMotion();
  const underlineTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: EASE };
  const iconTransition = { duration: reduceMotion ? 0.01 : 0.3, ease: EASE };

  // Transparent at the top of the page, frosted once the visitor scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: whichever section sits in the middle band of the
  // viewport owns the active underline. Sections that don't exist yet
  // (e.g. "experience", wired up by another agent) are simply skipped.
  useEffect(() => {
    const elements = NAV_LINKS.map(({ id }) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const top = visible.reduce((a, b) => (b.intersectionRatio > a.intersectionRatio ? b : a));
        setActive(top.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lock page scroll while the mobile menu is open, always give it back.
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const highlighted = hovered ?? active;

  const themeIcon = (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={theme}
        aria-hidden="true"
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, rotate: -90, scale: 0.6 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: 90, scale: 0.6 }}
        transition={iconTransition}
        className="flex items-center justify-center"
      >
        <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} className="w-5 h-5" />
      </motion.span>
    </AnimatePresence>
  );

  return (
    <nav
      className={`fixed w-full z-20 transition-colors duration-300 ease-signature ${
        scrolled
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/70 dark:border-gray-800/70 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a
              href="#top"
              className="text-lg sm:text-xl md:text-2xl font-bold text-indigo-500 dark:text-indigo-400 whitespace-nowrap"
            >
              Lum Yi Ren Johannsen
            </a>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onMouseEnter={() => setHovered(link.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(link.id)}
                onBlur={() => setHovered(null)}
                onClick={() => setActive(link.id)}
                aria-current={active === link.id ? 'page' : undefined}
                className="relative px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-md transition-colors duration-200 ease-signature"
              >
                {link.label}
                {highlighted === link.id && (
                  <motion.span
                    layoutId="navbar-underline"
                    aria-hidden="true"
                    className="absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full bg-indigo-500 dark:bg-indigo-400"
                    transition={underlineTransition}
                  />
                )}
              </a>
            ))}

            <button
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              className="relative w-9 h-9 ml-2 flex items-center justify-center rounded-full text-gray-800 dark:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 ease-signature"
            >
              {themeIcon}
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              className="relative w-9 h-9 mr-1 flex items-center justify-center rounded-full text-gray-800 dark:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 ease-signature"
            >
              {themeIcon}
            </button>

            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className="w-9 h-9 flex items-center justify-center rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 ease-signature"
            >
              <FontAwesomeIcon icon={mobileOpen ? faXmark : faBars} className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu: slides/fades open rather than snapping. */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={reduceMotion ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.35, ease: EASE }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200/70 dark:border-gray-800/70"
          >
            <div className="px-4 pb-4 pt-2 flex flex-col">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => {
                    setActive(link.id);
                    closeMobile();
                  }}
                  aria-current={active === link.id ? 'page' : undefined}
                  className={`px-3 py-3 text-base font-medium rounded-md transition-colors duration-200 ease-signature ${
                    active === link.id
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
