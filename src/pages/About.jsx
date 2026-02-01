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

                <div style={{ flex: '1 1 300px', minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <img src="/images/bvan watermark.png" alt="Van Interior" style={{ width: '100%', height: 'auto', borderRadius: '0.5rem', boxShadow: 'var(--shadow-md)' }} />
                    <img src="/images/front side.jpg" alt="Van Exterior" style={{ width: '100%', height: 'auto', borderRadius: '0.5rem', boxShadow: 'var(--shadow-md)' }} />
                </div>
            </div>
        </div>
    );
};

export default About;
