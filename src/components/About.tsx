import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import aboutImage from '../assets/about.jpg'; // Replace with your image path
import resumePDF from '../assets/resume.pdf'; // Replace with your resume path
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import image1 from '../assets/about.jpg';
import image2 from '../assets/about2.jpg';
import image3 from '../assets/about3.jpg';
import image4 from '../assets/about4.jpg';
import image5 from '../assets/about5.jpg';

const About: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
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
    
    return (
      <section
        id="about"
        className={`py-20 px-6 transition-colors duration-500 ${
          isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
        }`}
      >
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            About <span className="text-indigo-500">Me</span>
          </h2>
  
          <div className="flex flex-col lg:flex-row items-center">
            {/* Profile Image */}
            <div className="mt-8 w-full lg:w-1/3 flex flex-col items-center">
              <div className="relative w-full h-[28rem] flex items-center justify-center mb-4 overflow-x-visible">
                {images.map((img, i) => {
                  const index = (currentImageIndex + i) % images.length;
                  return (
                    <img
                      key={index}
                      src={images[index]}
                      alt={`Stacked ${index}`}
                      className="absolute w-[28rem] h-[28rem] object-cover rounded-xl border-4 border-white shadow-lg transition-all duration-500"
                      style={{
                        left: `${i * 15}px`,
                        zIndex: images.length - i,
                        opacity: i === 0 ? 1 : 0.8 - i * 0.1,
                        transform: `scale(${1 - i * 0.03})`,
                      }}
                    />
                  );
                })}
              </div>
              <div className="flex gap-4 justify-center w-full mt-4">
                <button
                  onClick={handlePrev}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition"
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition"
                >
                  Next
                </button>
              </div>
            </div>

  
            {/* Text Content */}
            <div className="lg:w-2/3 lg:pl-12">
              <h3 className="text-2xl font-semibold mb-4">Who I Am</h3>
              <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                I'm a passionate Year 3 Computer Science student at the National University of Singapore (NUS), driven by a deep interest in software development and problem solving.
                I love to think, innovate, and build meaningful technology that solves real-world problems.
              </p>
  
              <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                My academic focus lies in Software Engineering, Data Structures & Algorithms, and Artificial Intelligence.
                I'm always excited to explore new tools and technologies that enhance the way we build software.
              </p>

              <p className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Outside of academics, I enjoy keeping myself active through swimming, calisthenics, and bouldering. These activities help me maintain a balanced lifestyle and sharpen my mental resilience.
              </p>

              {/* Details Grid */}
              <div className="flex flex-wrap gap-4">
                <div className={`px-4 py-2 rounded-lg shadow ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                  <span className="font-medium">Education:</span> BComp in Computer Science, NUS
                </div>
                <div className={`px-4 py-2 rounded-lg shadow ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                  <span className="font-medium">Graduation:</span> Expected 2027
                </div>
                <div className={`px-4 py-2 rounded-lg shadow ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                  <span className="font-medium">Focus Areas:</span> Software Engineering, Artificial Intelligence
                </div>
              </div>

              {/* Resume Button */}
              <div className="mt-8"> 
                <a
                  href={resumePDF}
                  download="resume.pdf"
                  className={`inline-block px-6 py-3 text-lg font-semibold text-white bg-indigo-500 rounded-lg shadow hover:bg-indigo-600 transition duration-300`}
                    > 
                <FontAwesomeIcon icon={faDownload} className="inline-block mr-2" />
                    Download Resume
                </a>
                </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default About;