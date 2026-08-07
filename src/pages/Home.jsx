import Hero from '../components/Hero';
import Ticker from '../components/Ticker';
import Highlights from '../components/Highlights';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import ContactCTA from '../components/ContactCTA';

export default function Home() {
  return (
    <main className="pb-[72px] pt-[28px]">
      <Hero />
      <Ticker />
      <Highlights />
      <About />
      <Skills />
      <Projects />
      <ContactCTA />
    </main>
  );
}
