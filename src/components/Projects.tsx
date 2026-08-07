import React from 'react';
import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { Project } from '../types';
import { fadeUp, stagger, revealOnce, prefersReducedMotion } from '../hooks/useReveal';
import financeplanner from '../assets/financeplanner.jpg';
import tutorfirst from '../assets/tutorfirst.png';
import reservemate from '../assets/reservemate.png';
import erel from '../assets/erel.png';

// Same cubic-bezier as useReveal's EASE — kept local since it isn't exported,
// and hover states here are bespoke (not covered by the shared reveal variants).
const EASE = [0.22, 1, 0.36, 1] as const;

/** A lighter reveal for tech badges — a 24px rise reads as too much motion for a small pill. */
const badgeReveal: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
};

const projects: Project[] = [
  {
    id: 0,
    title: 'canvas-api-mcp',
    description: "An MCP server that lets AI assistants read your own Canvas LMS data — deadlines, grades, submissions, course files — so you can just ask what's due this week. 16 tools plus a gateway reaching all 1,116 Canvas endpoints. Published on PyPI and the official MCP registry, with outside contributors already shipping merged PRs.",
    technologies: ['Python', 'FastMCP', 'MCP', 'httpx', 'pytest'],
    githubUrl: 'https://github.com/JohannsenLum/canvas-api-mcp',
    liveUrl: 'https://mcp.johannsenlum.com/canvas-lms',
  },
  {
    id: 1,
    title: 'FinancePlanner',
    description: 'A modern financial planning web application designed to help users manage their finances effectively.',
    technologies: ['React', 'Tailwind CSS', 'Vercel'],
    githubUrl: 'https://github.com/JohannsenLum/FinancePlanner',
    // liveUrl removed: the Vercel deployment 404s (DEPLOYMENT_NOT_FOUND) — GitHub is the only live link for now.
    imageUrl: financeplanner
  },
  {
    id: 2,
    title: 'TutorFirst',
    description: 'A comprehensive tuition booking app designed to connect students with tutors for personalized learning experiences.',
    technologies: ['React Native', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Supabase Auth'],
    githubUrl: 'https://github.com/JohannsenLum/TutorFirst',
    liveUrl: 'https://www.youtube.com/watch?v=W1L4ROGF3NM',
    imageUrl: tutorfirst
  },
  {
    id: 3,
    title: 'ReserveMate',
    description: 'A desktop application designed for restaurant managers to manage reservations. It is optimized for use via a Command Line Interface (CLI)',
    technologies: ['Java', 'JavaFX', 'JUnit', 'Gradle', 'GitHub Actions'],
    githubUrl: 'https://github.com/AY2425S2-CS2103-F08-1/tp',
    liveUrl: 'https://ay2425s2-cs2103-f08-1.github.io/tp/UserGuide.html',
    imageUrl: reservemate
  },
  {
    id: 4,
    title: 'Erel Task Manager Bot',
    description: 'Erel is a Personal Assistant Chatbot that allows you to manage tasks and events efficiently.',
    technologies: ['Java', 'JavaFX', 'JUnit', 'Gradle'],
    githubUrl: 'https://github.com/JohannsenLum/ip',
    liveUrl: 'https://github.com/JohannsenLum/ip/releases/tag/A-NewRelease',
    imageUrl: erel
  },
];

const Projects: React.FC = () => {
  const reduced = prefersReducedMotion();

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12" variants={stagger()} {...revealOnce}>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl dark:text-white font-bold mb-4 text-center">
            My <span className="text-indigo-500">Projects</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="w-20 h-1 bg-indigo-600 mx-auto mt-4" />
          <motion.p variants={fadeUp} className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Here are some of my recent projects. Each one was built to solve a specific problem or explore a new technology.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={stagger(0.1)}
          {...revealOnce}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={fadeUp}
              whileHover={
                reduced
                  ? undefined
                  : { y: -6, scale: 1.02, transition: { duration: 0.4, ease: EASE } }
              }
              className="group flex flex-col h-full rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 shadow-lg dark:shadow-black/30 hover:shadow-2xl dark:hover:shadow-black/50 transition-shadow duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer"
            >
              {project.imageUrl ? (
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:motion-safe:scale-110"
                  />
                </div>
              ) : (
                <div
                  aria-hidden="true"
                  className="relative flex h-48 w-full items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-800 dark:from-indigo-600 dark:via-indigo-800 dark:to-gray-900 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:motion-safe:scale-110"
                >
                  <span className="pointer-events-none select-none font-mono text-7xl font-black text-white/10">
                    {'</>'}
                  </span>
                  <span className="absolute font-mono text-2xl md:text-3xl font-bold tracking-[0.2em] text-white">
                    MCP
                  </span>
                </div>
              )}

              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{project.description}</p>

                <motion.div
                  className="flex flex-wrap gap-2 mb-4"
                  variants={stagger(0.04)}
                >
                  {project.technologies.map((tech) => (
                    <motion.span
                      key={tech}
                      variants={badgeReveal}
                      whileHover={reduced ? undefined : { scale: 1.04, y: -2 }}
                      className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-sm rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors duration-300"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>

                <div className="flex flex-wrap gap-3 mt-auto">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-gray-800 dark:text-gray-100 bg-gray-200 dark:bg-gray-700 hover:bg-indigo-100 dark:hover:bg-indigo-900 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      <FontAwesomeIcon icon={faGithub} className="w-4 h-4" aria-hidden="true" />
                      Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3.5 h-3.5" aria-hidden="true" />
                      View Live
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
