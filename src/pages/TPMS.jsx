import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const TPMS = () => {
    const { t } = useLanguage();

    return (
        <div className="container section">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '900', fontStyle: 'italic', marginBottom: '1rem', color: '#111827', lineHeight: 1.1 }}>{t.tpms.title}</h1>
                <h3 style={{ color: 'var(--primary-red)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '2rem', fontSize: 'clamp(1rem, 3vw, 1.5rem)' }}>{t.tpms.subtitle}</h3>

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
                    <img src="/images/TPMS WARNING BIG.png" alt="TPMS Warning" style={{ maxWidth: '100%', height: 'auto', borderRadius: '1rem' }} />
                </div>

                <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', color: 'var(--text-muted)' }}>
                    {t.tpms.intro}
                </p>
            </div>

            {/* Force flex wrap for responsive layout and ensure images don't overflow */}
            <div className="flex-responsive-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'flex-start', margin: '4rem 0' }}>
                <div style={{ flex: '1 1 300px', minWidth: '280px' }}>
                    <img src="/images/picture-2600.jfif" alt="Dashboard Light" style={{ width: '100%', borderRadius: '0.5rem' }} />
                </div>
                <div style={{ flex: '1 1 300px', minWidth: '280px' }}>
                    <h2 style={{ marginBottom: '1rem', color: '#111827' }}>{t.tpms.section1.title}</h2>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>{t.tpms.section1.text}</p>
                </div>
            </div>

            <div className="flex-responsive-row-reverse" style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'flex-start', margin: '4rem 0' }}>
                <div style={{ flex: '1 1 300px', minWidth: '280px' }}>
                    <h2 style={{ marginBottom: '1rem', color: '#111827' }}>{t.tpms.section2.title}</h2>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>{t.tpms.section2.text}</p>
                </div>
                <div style={{ flex: '1 1 300px', minWidth: '280px' }}>
                    {/* Placeholder for dash warning image 2 */}
                    <div style={{ width: '100%', height: '250px', backgroundColor: '#e5e7eb', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: '#9ca3af' }}>Dashboard Warning Detail</span>
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                <p style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{t.tpms.cta}</p>
                <Link to="/contact" className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>Contact Form</Link>
            </div>
        </div>
    );
};

export default TPMS;
