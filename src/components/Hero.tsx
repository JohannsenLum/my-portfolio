import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useTheme } from '../contexts/ThemeContext';
import profileImage from '../assets/profile.jpg'; 
import { Typewriter } from 'react-simple-typewriter'; // Importing Typewriter component

const Hero: React.FC = () => {
  const { theme } = useTheme(); // Using theme from context

  return (
    <section
      id="home"
      className={`min-h-screen flex items-center justify-center px-6 transition-colors duration-500 
        ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'}`}
    >
      <div className="flex flex-col-reverse md:flex-row items-center justify-between text-center max-w-7xl mx-auto">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left mb-6 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hi, I'm <span className="text-indigo-600 dark:text-indigo-400">Johannsen</span>
          </h1>

          <p className="text-lg md:text-xl mb-6">
            I'm a{' '}
            <span className="text-3xl text-indigo-600 dark:text-indigo-400 font-semibold">
                <Typewriter
                words={['CS Student', 'Developer', 'Problem Solver', 'Passionate Innovator']}
                loop={0} // Infinite loop
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={100}
                delaySpeed={1500}
                />
            </span>
            </p>

          <p className="text-lg md:text-xl mb-6">
          Turning ideas into code and code into solutions.
          </p>

          <div className="mb-6 space-x-4"> {/* Add spacing between the buttons */}
            <a
                href="#projects"
                className="inline-block px-6 py-3 bg-indigo-400 text-white rounded-lg hover:bg-indigo-600 transition duration-300 w-[200px] md:w-auto text-center"
            >
                View Projects
            </a>
            <a
                href="#contact"
                className="inline-block px-6 py-3 bg-white text-indigo-400 border-2 border-indigo-400 rounded-lg hover:bg-indigo-100 transition duration-300 w-[200px] md:w-auto text-center"
            >
                Contact Me
            </a>
            </div>

          <div className="flex justify-center md:justify-start space-x-6 mb-6">
            <a href="https://github.com/JohannsenLum" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon
                icon={faGithub}
                className="w-6 h-6 text-gray-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              />
            </a>
            <a href="https://linkedin.com/in/johannsenlum" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon
                icon={faLinkedin}
                className="w-6 h-6 text-gray-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              />
            </a>
            <a href="https://instagram.com/lumboyboy" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon
                icon={faInstagram}
                className="w-6 h-6 text-gray-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              />
            </a>
          </div>
        </div>

        {/* Profile Image */}
        <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
          <img
            src={profileImage}
            alt="Profile"
            className={`mx-auto w-64 h-64 md:w-96 md:h-96 rounded-full object-cover border-4 
              ${theme === 'light' ? 'border-indigo-300' : 'border-white'}`}
          />
        </div>
      </div>

      <a
  href="#about"
  className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-indigo-500 hover:text-indigo-700 transition duration-300"
>
  <svg
    className="w-6 h-6 animate-bounce"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
</a>
    </section>
    
  );
};

export default Hero;
