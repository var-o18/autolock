import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import FloatingActions from './components/FloatingActions';
import { LanguageProvider } from './context/LanguageContext';
import { useState, useEffect } from 'react';

import ECURemap from './pages/ECURemap';
import TPMS from './pages/TPMS';
import About from './pages/About';

// Preliminary placeholders for pages not yet implemented
const Coverage = () => <div className="container section"><h1>Coverage Plan</h1></div>;
const FAQ = () => <div className="container section"><h1>FAQ</h1></div>;
const Gallery = () => <div className="container section"><h1>Gallery</h1></div>;

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
                <div className="app-layout">
                    <Navbar theme={theme} toggleTheme={toggleTheme} />
                    <main style={{ minHeight: '80vh' }}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/tpms" element={<TPMS />} />
                            <Route path="/ecu-remapping" element={<ECURemap />} />
                            <Route path="/coverage" element={<Coverage />} />
                            {/* <Route path="/reviews" element={<Reviews />} /> Removed reviews route */}
                            <Route path="/faq" element={<FAQ />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/gallery" element={<Gallery />} />
                            <Route path="/about-us" element={<About />} />
                        </Routes>
                    </main>
                    <Footer />
                    <FloatingActions />
                </div>
            </Router>
        </LanguageProvider>
    );
}

export default App;
