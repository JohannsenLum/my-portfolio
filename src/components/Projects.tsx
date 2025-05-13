import React from 'react';
import { Project } from '../types';
import  financeplanner  from '../assets/financeplanner.jpg';
import tutorfirst from '../assets/tutorfirst.png';
import reservemate from '../assets/reservemate.png';
import erel from '../assets/erel.png';

const projects: Project[] = [
  {
    id: 1,
    title: 'FinancePlanner',
    description: 'A modern financial planning web application designed to help users manage their finances effectively.',
    technologies: ['React', 'Tailwind CSS', 'Vercel'],
    githubUrl: 'https://github.com/JohannsenLum/FinancePlanner',
    liveUrl: 'https://finance-planner-delta.vercel.app/',
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
  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl dark:text-white font-bold mb-4 text-center">
          My <span className="text-indigo-500">Projects</span>
        </h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mt-4"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Here are some of my recent projects. Each one was built to solve a specific problem or explore a new technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-48 object-cover mx-auto"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;