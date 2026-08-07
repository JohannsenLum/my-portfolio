import React, { useRef } from 'react';
import { motion, useScroll } from 'motion/react';
import { fadeUp, stagger, revealOnce, prefersReducedMotion } from '../hooks/useReveal';
import { ExperienceEntry } from '../types';

const experiences: ExperienceEntry[] = [
  {
    title: 'Software Engineer',
    org: 'Twiss',
    period: '2025 — Present',
    summary:
      "Builds internal and customer-facing products across a venture studio's portfolio — mobile, web and backend.",
    bullets: [
      'Built a fleet operations platform for a vending-machine business: a Laravel/PHP API, a field-operations PWA with task and SLA tracking, and an admin view for sales data.',
      'Built a consumer membership and loyalty app for iOS, native in SwiftUI.',
      'Built a native iOS meeting recorder with live transcription that delivers notes over messaging.',
      "Works on internal agent-orchestration tooling for the team's AI-assisted engineering workflows.",
      'Shipped a digital name card product with Apple Wallet passes and an NFC/QR sharing flow.',
    ],
    tech: ['TypeScript', 'React', 'Next.js', 'Laravel', 'PHP', 'Swift', 'SwiftUI', 'Kotlin', 'Python'],
  },
  {
    title: 'Full-Stack Developer',
    org: 'Health-tech client',
    period: '2025',
    summary: 'Consumer health platform turning lab results into something a patient can actually read.',
    bullets: [
      'Built an OCR pipeline that extracts biomarkers from lab-report PDFs into structured data.',
      'Built the patient-facing web app presenting blood-panel results over time.',
      "Integrated a national digital identity system for onboarding and verification.",
      'Built a membership dashboard and its companion mobile app.',
      'Automated generation of PDF reports from patient data.',
    ],
    tech: ['TypeScript', 'React', 'Python', 'PostgreSQL', 'Node.js'],
  },
  {
    title: 'Open Source',
    org: 'canvas-api-mcp',
    period: '2026 — Present',
    summary:
      "An MCP server that lets an AI assistant read a student's own Canvas LMS data. Published on PyPI and the official MCP registry, with outside contributors shipping merged pull requests.",
    tech: ['Python', 'FastMCP', 'MCP', 'pytest'],
  },
];

const Experience: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduceMotion = prefersReducedMotion();

  // Progress of the timeline through the viewport — drives the line that
  // "draws itself" as the section scrolls past. Guarded below for reduced
  // motion, where the line is simply rendered fully drawn.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.8', 'end 0.35'],
  });

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={stagger()} {...revealOnce} className="text-center mb-16">
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl dark:text-white font-bold mb-4 text-center"
          >
            Work <span className="text-indigo-500">Experience</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="w-20 h-1 bg-indigo-600 mx-auto mt-4" />
          <motion.p variants={fadeUp} className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Where the code has actually shipped.
          </motion.p>
        </motion.div>

        <div ref={timelineRef} className="relative">
          {/* Static track behind the timeline */}
          <div
            aria-hidden="true"
            className="absolute left-4 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700"
          />
          {/* Line that draws itself as you scroll through the section */}
          <motion.div
            aria-hidden="true"
            className="absolute left-4 top-0 w-px bg-indigo-500 origin-top"
            style={
              reduceMotion
                ? { height: '100%' }
                : { height: '100%', scaleY: scrollYProgress }
            }
          />

          <div className="space-y-12">
            {experiences.map((exp) => (
              <motion.div
                key={exp.org}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="relative pl-12"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-4 top-1.5 w-3 h-3 -translate-x-1/2 rounded-full bg-indigo-500 ring-4 ring-gray-50 dark:ring-gray-800"
                />

                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
                  <span className="inline-block text-xs font-semibold tracking-wide text-indigo-600 dark:text-indigo-400 uppercase mb-1">
                    {exp.period}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.title}</h3>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">{exp.org}</p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{exp.summary}</p>

                  {exp.bullets && (
                    <ul className="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
                      {exp.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
