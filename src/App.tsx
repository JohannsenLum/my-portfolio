import About from './components/About';
import ContactMe from './components/Contact';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Skills from './components/Skils';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <div id = "top" />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <ContactMe />
        </main>      
          <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
