import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Background from './components/Background';
import ScrollProgress from './components/ScrollProgress';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollManager from './components/ScrollManager';
import Home from './pages/Home';

const Contact = lazy(() => import('./pages/Contact'));

export default function App() {
  return (
    <div className="relative min-h-dvh">
      <Background />
      <ScrollProgress />
      <ScrollManager />
      <Header />
      <Suspense
        fallback={
          <div className="grid min-h-[50vh] place-items-center text-muted">Loading…</div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}
