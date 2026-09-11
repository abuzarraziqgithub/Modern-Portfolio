import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import About from '../components/About';
import GithubGraph from '../components/GithubGraph';
import ExperienceTimeline from '../components/ExperienceTimeline';
import ProjectsPreview from '../components/ProjectsPreview';

export default function Home() {
  return (
    <main className="pb-24">
      <Hero />
      <Marquee />
      <About />
      <GithubGraph />
      <ExperienceTimeline />
      <ProjectsPreview />
    </main>
  );
}