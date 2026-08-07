import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate as animateValue } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';
import { fadeUp, stagger, revealOnce, prefersReducedMotion } from '../hooks/useReveal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faLaptopCode, faDatabase, faTools } from '@fortawesome/free-solid-svg-icons';
import {
  faJs, faJava, faPython, faHtml5, faReact, faNodeJs, faGitAlt,
  faAws, faDocker, faBootstrap
} from '@fortawesome/free-brands-svg-icons';

// Same soft ease-out used everywhere else on the site (see useReveal.ts) — kept
// local because it drives an imperative counter and a whileHover/whileInView
// combo rather than the shared scroll-reveal variants.
const EASE = [0.22, 1, 0.36, 1] as const;

const skills = [
    { name: 'TypeScript', icon: faCode, level: 85, category: 'programming' },
    { name: 'JavaScript', icon: faJs, level: 90, category: 'programming' },
    { name: 'Java', icon: faJava, level: 85, category: 'programming' },
    { name: 'Python', icon: faPython, level: 88, category: 'programming' },
    { name: 'HTML/CSS', icon: faHtml5, level: 90, category: 'programming' },

    { name: 'React', icon: faReact, level: 85, category: 'frameworks' },
    { name: 'Next.js', icon: faCode, level: 78, category: 'frameworks' },
    { name: 'Node.js', icon: faNodeJs, level: 80, category: 'frameworks' },
    { name: 'Tailwind CSS', icon: faCode, level: 82, category: 'frameworks' },
    { name: 'FastAPI', icon: faCode, level: 72, category: 'frameworks' },
    { name: 'Bootstrap', icon: faBootstrap, level: 75, category: 'frameworks' },

    { name: 'MongoDB', icon: faDatabase, level: 80, category: 'databases' },
    { name: 'Supabase', icon: faDatabase, level: 75, category: 'databases' },
    { name: 'PostgreSQL', icon: faDatabase, level: 80, category: 'databases' },

    { name: 'Git', icon: faGitAlt, level: 90, category: 'tools' },
    { name: 'AWS', icon: faAws, level: 70, category: 'tools' },
    { name: 'Docker', icon: faDocker, level: 75, category: 'tools' },
  ];

type SkillItem = (typeof skills)[number];

interface SkillCardProps {
  skill: SkillItem;
  isDark: boolean;
  reduceMotion: boolean;
}

// One card owns its own "has this scrolled into view yet" observer, so the bar
// fill and the counting percentage both fire off the same trigger, once, the
// first time the card is actually visible — not on mount.
const SkillCard: React.FC<SkillCardProps> = ({ skill, isDark, reduceMotion }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, amount: 0.4 });
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setPercent(skill.level);
      return;
    }
    const controls = animateValue(0, skill.level, {
      duration: 0.9,
      ease: EASE,
      onUpdate: (v) => setPercent(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, skill.level]);

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      whileHover={{ scale: reduceMotion ? 1 : 1.02 }}
      transition={{ duration: 0.3, ease: EASE }}
      className={`skill-badge p-6 rounded-lg text-center shadow-sm hover:shadow-lg transition-shadow duration-300 ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
    >
      <motion.div
        whileHover={{ scale: reduceMotion ? 1 : 1.15 }}
        transition={{ duration: 0.25, ease: EASE }}
        className="inline-block"
      >
        <FontAwesomeIcon icon={skill.icon} className={`text-4xl mb-3 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
      </motion.div>
      <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
      <div className={`w-full rounded-full h-2.5 overflow-hidden ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`}>
        <motion.div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: inView ? `${skill.level}%` : 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.9, ease: EASE }}
        />
      </div>
      <p className={`mt-2 text-sm font-medium tabular-nums ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
        {percent}%
      </p>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const reduceMotion = prefersReducedMotion();

  // Tab selection state
  const [selectedTab, setSelectedTab] = useState('programming');

  // Function to filter skills by category
  const filterSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  const tabs: { key: string; label: string; icon: typeof faCode }[] = [
    { key: 'programming', label: 'Programming', icon: faCode },
    { key: 'frameworks', label: 'Frameworks', icon: faLaptopCode },
    { key: 'databases', label: 'Databases', icon: faDatabase },
    { key: 'tools', label: 'Tools', icon: faTools },
  ];

  return (
    <section
      id="skills"
      className={`py-20 px-6 transition-colors duration-500 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
    >
      <div className="container mx-auto">
        <motion.div variants={stagger()} {...revealOnce}>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl dark:text-white font-bold mb-4 text-center">
            My <span className="text-indigo-500">Skills</span>
          </motion.h2>
          <motion.p variants={fadeUp} className={`text-xl mb-12 text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Technologies I work with
          </motion.p>

          {/* Navigation bar */}
          <motion.div variants={fadeUp} className="flex justify-center mb-8">
            {tabs.map((tab) => (
              <motion.button
                key={tab.key}
                onClick={() => setSelectedTab(tab.key)}
                whileHover={{ scale: reduceMotion ? 1 : 1.02 }}
                whileTap={{ scale: reduceMotion ? 1 : 0.97 }}
                transition={{ duration: 0.2, ease: EASE }}
                className={`px-4 py-2 mx-2 rounded-md flex items-center ${
                  selectedTab === tab.key
                    ? 'bg-indigo-500 text-white'
                    : isDark
                    ? 'bg-gray-700 text-gray-200'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                <FontAwesomeIcon icon={tab.icon} className="mr-2" /> {tab.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Display skills based on selected tab */}
          <motion.div
            key={selectedTab}
            variants={stagger()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {filterSkillsByCategory(selectedTab).map((skill) => (
              <SkillCard key={skill.name} skill={skill} isDark={isDark} reduceMotion={reduceMotion} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
