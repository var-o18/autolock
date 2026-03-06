import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const About = () => {
    const { t } = useLanguage();

    return (
        <div className="container section">
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: '2rem', color: 'var(--primary-red)', fontWeight: '800', textTransform: 'uppercase' }}>
                {t.about.title}
            </h1>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem' }}>
                <div style={{ flex: '1 1 300px', minWidth: '280px' }}>
                    <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>{t.about.p1}</p>
                    <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>{t.about.p2}</p>
                    <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>{t.about.p3}</p>
                    <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>{t.about.p4}</p>

                    <div style={{ marginTop: '2rem' }}>
                        <Link to="/contact" className="btn btn-primary">{t.cta.btn}</Link>
                    </div>
                </div>

                <div style={{ flex: '1 1 300px', minWidth: '280px', display: 'flex', alignItems: 'center' }}>
                    <div style={{ position: 'relative', width: '100%' }}>
                        <img 
                            src="/images/front-side.jpg" 
                            alt="Furgoneta Taller Autolock" 
                            style={{ 
                                width: '100%', 
                                height: 'auto', 
                                borderRadius: 'var(--radius-md)', 
                                boxShadow: 'var(--shadow-xl)',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }} 
                        />
                        
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default About;
