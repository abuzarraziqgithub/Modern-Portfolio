import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import ScrollManager from './components/ScrollManager';
import ScrollProgress from './components/ScrollProgress';
import CommandPalette from './components/CommandPalette';
import Home from './pages/Home';
import Projects from './pages/Projects';

export default function App() {
  return (
    <div className="relative min-h-dvh">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-md focus:border focus:border-accent focus:bg-bg-elev focus:px-3 focus:py-2 focus:font-mono focus:text-sm focus:text-accent"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <ScrollManager />
      <Nav />
      <CommandPalette />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}