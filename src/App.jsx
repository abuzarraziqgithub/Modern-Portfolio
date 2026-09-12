import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Stack from './components/Stack';
import NowLearning from './components/NowLearning';
import Projects from './components/Projects';
import BeyondCode from './components/BeyondCode';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-dvh">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:border focus:border-gold focus:bg-night-3 focus:px-3 focus:py-2 focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main-content">
        <Hero />
        <About />
        <Stack />
        <NowLearning />
        <Projects />
        <BeyondCode />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}