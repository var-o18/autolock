import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const Services = () => {
    const { t } = useLanguage();

    return (
        <div className="container section">
            <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--text-main)', borderBottom: '2px solid var(--primary-red)', paddingBottom: '0.5rem', display: 'inline-block' }}>
                {t.servicesPage.title}
            </h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginTop: '2rem' }}>
                {t.servicesPage.list.map((s, i) => (
                    <div key={i} style={{ paddingBottom: '2rem', borderBottom: i < t.servicesPage.list.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>{s.title}</h3>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.7', maxWidth: '900px' }}>
                            {s.desc}
                        </p>
                    </div>
                ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <p style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{t.tpms.cta}</p>
                <Link to="/contact" className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>Contact Form</Link>
            </div>
        </div>
    );
};

export default Services;

