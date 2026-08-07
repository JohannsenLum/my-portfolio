import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';
import resumePDF from '../assets/resume.pdf'; // Replace with your resume path
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fadeUp, stagger, revealOnce, prefersReducedMotion } from '../hooks/useReveal';

import image1 from '../assets/about.jpg';
import image2 from '../assets/about2.jpg';
import image3 from '../assets/about3.jpg';
import image4 from '../assets/about4.jpg';
import image5 from '../assets/about5.jpg';

// Same soft ease-out used everywhere else on the site (see useReveal.ts) — kept
// local here because it drives the carousel's imperative `animate` prop rather
// than a scroll-triggered variant.
const EASE = [0.22, 1, 0.36, 1] as const;

const About: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const reduceMotion = prefersReducedMotion();
      // Inside your component:
    const images = [image1, image2, image3, image4, image5];
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

    React.useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // change every 3 seconds

      return () => clearInterval(interval); // cleanup on unmount
    }, [images.length]);

    const handleNext = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    // The deck never gains or loses cards, it just reshuffles — so the
    // per-slot transition (position/opacity/scale tweening smoothly instead of
    // snapping) is what reads as "animated" here, cross-faded and slid at once.
    const stackTransition = reduceMotion
      ? { duration: 0 }
      : { duration: 0.6, ease: EASE };

    return (
      <section
        id="about"
        className={`py-20 px-6 transition-colors duration-500 ${
          isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
        }`}
      >
        <div className="container mx-auto">
          <motion.div variants={stagger()} {...revealOnce}>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-12 text-center">
              About <span className="text-indigo-500">Me</span>
            </motion.h2>

            <motion.div variants={fadeUp} className="flex flex-col lg:flex-row items-center">
              {/* Profile Image */}
              <div className="mt-8 w-full lg:w-1/3 flex flex-col items-center">
                <div className="relative w-full h-[28rem] flex items-center justify-center mb-4 overflow-x-visible">
                  <AnimatePresence initial={false}>
                    {images.map((_, i) => {
                      const index = (currentImageIndex + i) % images.length;
                      const slotImg = images[index];
                      return (
                        <motion.img
                          key={slotImg}
                          src={slotImg}
                          alt={`Johannsen — photo ${index + 1} of ${images.length}`}
                          className="absolute w-[28rem] h-[28rem] object-cover rounded-xl border-4 border-white dark:border-gray-800 shadow-lg"
                          style={{ zIndex: images.length - i }}
                          initial={false}
                          animate={{
                            left: i * 15,
                            opacity: i === 0 ? 1 : 0.8 - i * 0.1,
                            scale: 1 - i * 0.03,
                          }}
                          transition={stackTransition}
                        />
                      );
                    })}
                  </AnimatePresence>
                </div>
                <div className="flex gap-4 justify-center w-full mt-4">
                  <motion.button
                    onClick={handlePrev}
                    whileHover={{ scale: reduceMotion ? 1 : 1.02 }}
                    whileTap={{ scale: reduceMotion ? 1 : 0.97 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition"
                  >
                    Previous
                  </motion.button>
                  <motion.button
                    onClick={handleNext}
                    whileHover={{ scale: reduceMotion ? 1 : 1.02 }}
                    whileTap={{ scale: reduceMotion ? 1 : 0.97 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition"
                  >
                    Next
                  </motion.button>
                </div>
              </div>


              {/* Text Content */}
              <motion.div variants={stagger()} className="lg:w-2/3 lg:pl-12">
                <motion.h3 variants={fadeUp} className="text-2xl font-semibold mb-4">Who I Am</motion.h3>
                <motion.p variants={fadeUp} className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Builder. Year 4 Computer Science student at the National University of Singapore (NUS).
                  Turning 0s to 1s is basically my whole thing — I like taking an idea from nothing to something that actually runs.
                  Addicted to solving problems, and doing my best for a living.
                </motion.p>

                <motion.p variants={fadeUp} className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Right now I'm building open source. My main project is canvas-api-mcp, an MCP server that lets an AI assistant
                  read your own Canvas LMS data — what's due this week, grades, submissions, course files — instead of you digging
                  through Canvas yourself. It's published on PyPI and the official Model Context Protocol registry, and in its
                  first few days it already has outside contributors with merged PRs. If that sounds like something you want to
                  poke at, come join me!
                </motion.p>

                <motion.p variants={fadeUp} className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Outside of that: working out and shipping new ideas — always learning and building. Code, gym, Claude, repeat.
                  And if something breaks after I ship it: it works on my end.
                </motion.p>

                {/* Details Grid */}
                <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                  <motion.div
                    whileHover={{ scale: reduceMotion ? 1 : 1.02 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className={`px-4 py-2 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
                  >
                    <span className="font-medium">Education:</span> BComp in Computer Science, NUS
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: reduceMotion ? 1 : 1.02 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className={`px-4 py-2 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
                  >
                    <span className="font-medium">Graduation:</span> Expected 2027
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: reduceMotion ? 1 : 1.02 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className={`px-4 py-2 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
                  >
                    <span className="font-medium">Focus Areas:</span> Software Engineering, Artificial Intelligence
                  </motion.div>
                </motion.div>

                {/* Resume Button */}
                <motion.div variants={fadeUp} className="mt-8">
                  <motion.a
                    href={resumePDF}
                    download="resume.pdf"
                    whileHover={{ scale: reduceMotion ? 1 : 1.02 }}
                    whileTap={{ scale: reduceMotion ? 1 : 0.98 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    className={`inline-block px-6 py-3 text-lg font-semibold text-white bg-indigo-500 rounded-lg shadow hover:bg-indigo-600 transition duration-300`}
                  >
                    <FontAwesomeIcon icon={faDownload} className="inline-block mr-2" />
                    Download Resume
                  </motion.a>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  };

  export default About;