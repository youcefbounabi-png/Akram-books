import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import SmoothScroll from './components/SmoothScroll';
import FloatingCTA from './components/FloatingCTA';
import type { CTAContext } from './components/FloatingCTA';
import HomePage from './pages/HomePage';
import NutritionPage from './pages/NutritionPage';
import TrainingPage from './pages/TrainingPage';
import OrderFormPage from './pages/OrderFormPage';

function AnimatedRoutes({ setProtocol }: { setProtocol: (p: CTAContext) => void }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/nutrition" element={<NutritionPage />} />
        <Route path="/training" element={<TrainingPage onProtocolSelect={setProtocol} />} />
        <Route path="/order" element={<OrderFormPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [trainingProtocol, setTrainingProtocol] = useState<CTAContext>(null);

  return (
    <LanguageProvider>
      <SmoothScroll>
        <Router>
          <div className="min-h-screen bg-brand-dark flex flex-col font-sans text-white overflow-x-hidden selection:bg-brand-red selection:text-white">
            <CustomCursor />
            <Header />
            <main className="flex-1 relative z-10">
              <AnimatedRoutes setProtocol={setTrainingProtocol} />
            </main>
            <FloatingCTA trainingProtocol={trainingProtocol} />
            <Footer />
          </div>
        </Router>
      </SmoothScroll>
    </LanguageProvider>
  );
}
