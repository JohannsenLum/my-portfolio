import { MotionConfig } from 'motion/react';
import About from './components/About';
import ContactMe from './components/Contact';
import Experience from './components/Experience';
import BugSquash from './components/BugSquash';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Skills from './components/Skils';
import Splash from './components/Splash';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      {/*
        reducedMotion="user" makes MotionConfig auto-detect the OS-level
        prefers-reduced-motion setting and instantly resolve every
        motion.* animation in the tree to its end state. This is what
        lets the shared fadeUp/stagger/revealOnce variants stay simple —
        the reduced-motion handling lives here, once, instead of being
        repeated in every section.
      */}
      <MotionConfig reducedMotion="user">
        {/*
          Splash is mounted first so its fixed overlay paints above
          everything else, but it never gates rendering: the page below
          mounts and lays out on the same frame, the overlay just sits
          on top of it until it dismisses itself.
        */}
        <Splash />
        <div className="min-h-screen">
          <div id = "top" />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Experience />
            <Skills />
            <Projects />
            <BugSquash />
            <ContactMe />
          </main>
            <Footer />
        </div>
      </MotionConfig>
    </ThemeProvider>
  );
};

export default App;
