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