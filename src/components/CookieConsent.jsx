import { useState, useEffect } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const CookieConsent = () => {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);
    const [expanded, setExpanded] = useState({ technically: false, analytical: false, thirdParty: false });
    const [settings, setSettings] = useState({
        technically: true, // Always true
        analytical: false,
        thirdParty: false
    });

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleSave = (newSettings) => {
        localStorage.setItem('cookie-consent', JSON.stringify(newSettings || settings));
        setIsVisible(false);
        // Here you would typically initialize analytics/third-party scripts based on settings
        if (newSettings?.thirdParty || settings.thirdParty) {
            // Enable Google Maps etc. (usually they are already there but this confirms consent)
        }
        window.location.reload(); // Reload to apply changes if scripts depend on it
    };

    const handleAcceptAll = () => {
        const allIn = { technically: true, analytical: true, thirdParty: true };
        setSettings(allIn);
        handleSave(allIn);
    };

    const handleReject = () => {
        const minItems = { technically: true, analytical: false, thirdParty: false };
        setSettings(minItems);
        handleSave(minItems);
    };

    const toggleExpand = (key) => {
        setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
    };

    if (!isVisible) return null;

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
    };

    const modalStyle = {
        backgroundColor: 'var(--bg-body)',
        color: 'var(--text-main)',
        maxWidth: '900px',
        width: '100%',
        borderRadius: '8px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
        position: 'relative',
        maxHeight: '90vh',
        overflowY: 'auto'
    };

    const sectionStyle = {
        borderBottom: '1px solid var(--border-color)',
        padding: '1rem 0'
    };

    const flexRow = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer'
    };

    const switchStyle = (active, disabled) => ({
        width: '40px',
        height: '20px',
        backgroundColor: active ? '#ef4444' : '#ccc',
        borderRadius: '10px',
        position: 'relative',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background-color 0.3s',
        opacity: disabled ? 0.6 : 1
    });

    const knobStyle = (active) => ({
        width: '16px',
        height: '16px',
        backgroundColor: 'white',
        borderRadius: '50%',
        position: 'absolute',
        top: '2px',
        left: active ? '22px' : '2px',
        transition: 'left 0.3s'
    });

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <button 
                    onClick={() => setIsVisible(false)} 
                    style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                >
                    <X size={24} />
                </button>

                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{t.cookies.title}</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.95rem', lineHeight: '1.5' }}>
                    {t.cookies.intro}
                </p>

                {/* Technically Necessary */}
                <div style={sectionStyle}>
                    <div style={flexRow} onClick={() => toggleExpand('technically')}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={switchStyle(true, true)}>
                                <div style={knobStyle(true)}></div>
                            </div>
                            <span style={{ fontWeight: '600' }}>{t.cookies.technically.title}</span>
                        </div>
                        {expanded.technically ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                    {expanded.technically && (
                        <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                            {t.cookies.technically.desc}
                        </p>
                    )}
                </div>

                {/* Analytical */}
                <div style={sectionStyle}>
                    <div style={flexRow} onClick={() => toggleExpand('analytical')}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div 
                                style={switchStyle(settings.analytical, false)}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSettings(prev => ({ ...prev, analytical: !prev.analytical }));
                                }}
                            >
                                <div style={knobStyle(settings.analytical)}></div>
                            </div>
                            <span style={{ fontWeight: '600' }}>{t.cookies.analytical.title}</span>
                        </div>
                        {expanded.analytical ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                    {expanded.analytical && (
                        <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                            {t.cookies.analytical.desc}
                        </p>
                    )}
                </div>

                {/* Third Party */}
                <div style={sectionStyle}>
                    <div style={flexRow} onClick={() => toggleExpand('thirdParty')}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div 
                                style={switchStyle(settings.thirdParty, false)}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSettings(prev => ({ ...prev, thirdParty: !prev.thirdParty }));
                                }}
                            >
                                <div style={knobStyle(settings.thirdParty)}></div>
                            </div>
                            <span style={{ fontWeight: '600' }}>{t.cookies.thirdParty.title}</span>
                        </div>
                        {expanded.thirdParty ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                    {expanded.thirdParty && (
                        <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                            {t.cookies.thirdParty.desc}
                        </p>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
                    <button 
                        onClick={handleReject}
                        style={{ flex: 1, padding: '0.8rem', backgroundColor: '#444', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        {t.cookies.btnReject}
                    </button>
                    <button 
                        onClick={handleAcceptAll}
                        style={{ flex: 1, padding: '0.8rem', backgroundColor: '#444', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        {t.cookies.btnAccept}
                    </button>
                    <button 
                        onClick={() => handleSave()}
                        style={{ flex: 1, padding: '0.8rem', backgroundColor: '#444', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        {t.cookies.btnSave}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
