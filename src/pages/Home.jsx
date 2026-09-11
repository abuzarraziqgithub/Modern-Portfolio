import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import About from '../components/About';

export default function Home() {
  return (
    <main className="pb-24">
      <Hero />
      <Marquee />
      <About />
    </main>
  );
}