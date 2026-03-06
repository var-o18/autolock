import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const ECURemap = () => {
    const { t } = useLanguage();

    return (
        <div className="container section">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', marginBottom: '4rem' }}>
                <div style={{ flex: '1 1 400px' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>{t.ecuPage.title}</h1>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '2rem' }}>
                        {t.ecuPage.intro}
                    </p>

                    <h3 style={{ color: 'var(--primary-red)', marginBottom: '1.5rem', textTransform: 'uppercase' }}>{t.ecuPage.listTitle}</h3>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {t.ecuPage.services.map((item, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '600' }}>
                                <Check size={20} className="text-primary" /> {item}
                            </li>
                        ))}
                    </ul>

                    <div style={{ marginTop: '3rem' }}>
                        <p style={{ fontSize: '0.9rem', color: '#9CA3AF', marginBottom: '2rem', fontStyle: 'italic' }}>
                            {t.ecuPage.disclaimer}
                        </p>
                        <Link to="/contact" className="btn btn-primary">
                            {t.cta.btn}
                        </Link>
                    </div>
                </div>

                <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ position: 'relative' }}>
                        <img 
                            src="/images/IMG_0251.jfif" 
                            alt="ECU Programming Work" 
                            style={{ width: '100%', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }} 
                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                        <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem' }}>
                            ECU Bench Work
                        </div>
                    </div>
                    
                    <div style={{ position: 'relative' }}>
                        <img 
                            src="/images/picture-200 (3).jfif" 
                            alt="ECU Connection Details" 
                            style={{ width: '100%', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }} 
                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                        <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem' }}>
                            Advanced Pinout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ECURemap;
