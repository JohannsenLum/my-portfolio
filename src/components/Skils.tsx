import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Skill } from '../types'; // Import Skill type
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faLaptopCode, faDatabase, faTools } from '@fortawesome/free-solid-svg-icons';
import {
  faJs, faJava, faPython, faHtml5, faCss3Alt, faReact, faNodeJs, faGitAlt,
  faAws, faDocker, faBootstrap
} from '@fortawesome/free-brands-svg-icons';

const skills = [
    { name: 'JavaScript', icon: faJs, level: 90, category: 'programming' },
    { name: 'Java', icon: faJava, level: 85, category: 'programming' },
    { name: 'Python', icon: faPython, level: 85, category: 'programming' },
    { name: 'HTML/CSS', icon: faHtml5, level: 90, category: 'programming' },
  
    { name: 'React', icon: faReact, level: 85, category: 'frameworks' },
    { name: 'Node.js', icon: faNodeJs, level: 80, category: 'frameworks' },
    { name: 'Bootstrap', icon: faBootstrap, level: 75, category: 'frameworks' },
  
    { name: 'MongoDB', icon: faDatabase, level: 80, category: 'databases' },
    { name: 'Supabase', icon: faDatabase, level: 75, category: 'databases' },
    { name: 'PostgreSQL', icon: faDatabase, level: 80, category: 'databases' },
  
    { name: 'Git', icon: faGitAlt, level: 90, category: 'tools' },
    { name: 'AWS', icon: faAws, level: 70, category: 'tools' },
    { name: 'Docker', icon: faDocker, level: 75, category: 'tools' },
  ];
  

const Skills: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Tab selection state
  const [selectedTab, setSelectedTab] = useState('programming');

  // Function to filter skills by category
  const filterSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  return (
    <section
      id="skills"
      className={`py-20 px-6 transition-colors duration-500 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
    >
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl dark:text-white font-bold mb-4 text-center">
          My <span className="text-indigo-500">Skills</span>
        </h2>
        <p className={`text-xl mb-12 text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Technologies I work with
        </p>

        {/* Navigation bar */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setSelectedTab('programming')}
            className={`px-4 py-2 mx-2 rounded-md flex items-center ${selectedTab === 'programming' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            <FontAwesomeIcon icon={faCode} className="mr-2" /> Programming
          </button>
          <button
            onClick={() => setSelectedTab('frameworks')}
            className={`px-4 py-2 mx-2 rounded-md flex items-center ${selectedTab === 'frameworks' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            <FontAwesomeIcon icon={faLaptopCode} className="mr-2" /> Frameworks
          </button>
          <button
            onClick={() => setSelectedTab('databases')}
            className={`px-4 py-2 mx-2 rounded-md flex items-center ${selectedTab === 'databases' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            <FontAwesomeIcon icon={faDatabase} className="mr-2" /> Databases
          </button>
          <button
            onClick={() => setSelectedTab('tools')}
            className={`px-4 py-2 mx-2 rounded-md flex items-center ${selectedTab === 'tools' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            <FontAwesomeIcon icon={faTools} className="mr-2" /> Tools
          </button>
        </div>

        {/* Display skills based on selected tab */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filterSkillsByCategory(selectedTab).map((skill, index) => (
            <div
              key={index}
              className={`skill-badge p-6 rounded-lg text-center transition duration-300 ${isDark ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
            <FontAwesomeIcon icon={skill.icon} className={`text-4xl mb-3 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
              <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
              <div className="w-full bg-gray-300 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
