import { Link } from 'react-router-dom';
import { Menu, X, Phone, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import './Navbar.css';
import { useLanguage } from '../context/LanguageContext';

const Navbar = ({ theme, toggleTheme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { t, language, setLanguage } = useLanguage();

    return (
        <nav className="navbar">
            <div className="container flex-between">
                <Link to="/" className="logo-link">
                    <img src="/images/picture-1200.png" alt="AutoLock" className="navbar-logo" />
                </Link>

                {/* Desktop Menu */}
                <div className="desktop-menu">
                    <Link to="/">{t.nav.home}</Link>
                    <Link to="/about-us">{t.nav.about}</Link>
                    <Link to="/services">{t.nav.services}</Link>
                    <Link to="/tpms">{t.nav.tpms}</Link>
                    <Link to="/ecu-remapping">{t.nav.ecu}</Link>
                    <Link to="/contact">{t.nav.contact}</Link>

                    <button onClick={toggleTheme} className="icon-btn" aria-label="Toggle Theme">
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>

                    <button onClick={() => setLanguage(language === 'es' ? 'en' : 'es')} className="icon-btn" aria-label="Toggle Language">
                        <img
                            src={language === 'es' ? '/images/rund__ES.png' : '/images/rund__GB.png'}
                            alt="Language"
                            style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                    </button>

                    <a href="tel:+34685988375" className="btn btn-primary">
                        <Phone size={18} style={{ marginRight: '8px' }} /> {t.nav.call}
                    </a>
                </div>

                {/* Mobile Toggle & Controls */}
                <div className="mobile-controls" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button onClick={() => setLanguage(language === 'es' ? 'en' : 'es')} className="mobile-lang-btn">
                        <img
                            src={language === 'es' ? '/images/rund__ES.png' : '/images/rund__GB.png'}
                            alt="Language"
                            style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                    </button>
                    <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="mobile-menu">
                    <Link to="/" onClick={() => setIsOpen(false)}>{t.nav.home}</Link>
                    <Link to="/about-us" onClick={() => setIsOpen(false)}>{t.nav.about}</Link>
                    <Link to="/services" onClick={() => setIsOpen(false)}>{t.nav.services}</Link>
                    <Link to="/tpms" onClick={() => setIsOpen(false)}>{t.nav.tpms}</Link>
                    <Link to="/ecu-remapping" onClick={() => setIsOpen(false)}>{t.nav.ecu}</Link>
                    <Link to="/contact" onClick={() => setIsOpen(false)}>{t.nav.contact}</Link>
                    <button onClick={toggleTheme} className="mobile-theme-btn">
                        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
