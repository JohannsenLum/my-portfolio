import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="#top" className="text-2xl font-bold text-indigo-500 dark:text-indigo-400">Lum Yi Ren Johannsen</a>
          </div>
          <div className="flex items-center space-x-4">
          <a href="#home" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium">Home</a>
            <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium">About</a>
            <a href="#skills" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium">Skills</a>
            <a href="#projects" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium">Projects</a>
            <button onClick={toggleTheme}>
            <FontAwesomeIcon
              icon={theme === 'light' ? faMoon : faSun}
              className="w-6 h-6 text-gray-800 dark:text-yellow-400 transform transition-transform duration-300 hover:scale-110 hover:rotate-12"
            />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;