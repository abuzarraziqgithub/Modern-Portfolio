import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import ScrollManager from './components/ScrollManager';
import ScrollProgress from './components/ScrollProgress';
import Home from './pages/Home';

export default function App() {
  return (
    <div className="relative min-h-dvh">
      <ScrollProgress />
      <ScrollManager />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}