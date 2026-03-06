import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import FloatingActions from './components/FloatingActions';
import { LanguageProvider } from './context/LanguageContext';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ScrollToTop from './components/ScrollToTop';

import ECURemap from './pages/ECURemap';
import TPMS from './pages/TPMS';
import About from './pages/About';
import CookieConsent from './components/CookieConsent';

const PageWrapper = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
    >
        {children}
    </motion.div>
);

const AnimatedRoutes = () => {
    const location = useLocation();
    
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
                <Route path="/tpms" element={<PageWrapper><TPMS /></PageWrapper>} />
                <Route path="/ecu-remapping" element={<PageWrapper><ECURemap /></PageWrapper>} />
                <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
                <Route path="/about-us" element={<PageWrapper><About /></PageWrapper>} />
                {/* Fallbacks */}
                <Route path="/coverage" element={<div className="container section"><h1>Coverage Plan</h1></div>} />
                <Route path="/faq" element={<div className="container section"><h1>FAQ</h1></div>} />
                <Route path="/gallery" element={<div className="container section"><h1>Gallery</h1></div>} />
            </Routes>
        </AnimatePresence>
    );
};

function App() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <LanguageProvider>
            <Router>
                <ScrollToTop />
                <div className="app-layout">
                    <Navbar theme={theme} toggleTheme={toggleTheme} />
                    <main style={{ minHeight: '80vh' }}>
                        <AnimatedRoutes />
                    </main>
                    <Footer />
                    <FloatingActions />
                    <CookieConsent />
                </div>
            </Router>
        </LanguageProvider>
    );
}

export default App;
