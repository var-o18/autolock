import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { Key, Lock, Zap, Wrench, ShieldCheck, Clock } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, desc, image }) => (
    <div className="service-item-card" style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex',
        flexDirection: 'column'
    }}>
        <div style={{ 
            width: '100%', 
            height: '240px', 
            overflow: 'hidden', 
            backgroundColor: 'rgba(255,255,255,0.03)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {image ? (
                <img 
                    src={image} 
                    alt={title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
            ) : (
                <Icon size={64} style={{ opacity: 0.1, color: 'var(--primary-red)' }} />
            )}
        </div>
        <div style={{ padding: '2rem' }}>
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                marginBottom: '1rem' 
            }}>
                <div style={{ 
                    padding: '10px', 
                    borderRadius: '10px', 
                    background: 'rgba(239, 68, 68, 0.1)', 
                    color: 'var(--primary-red)' 
                }}>
                    <Icon size={24} />
                </div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', margin: 0 }}>{title}</h3>
            </div>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                {desc}
            </p>
        </div>
    </div>
);

const Services = () => {
    const { t } = useLanguage();

    // Mapping icons and images to the translation list
    const servicesIcons = [Key, Wrench, Zap, Lock, Lock];
    const servicesImages = [
        "/images/front-side.jpg", // Lost keys (Renamed to front-side.jpg)
        "/images/service-key.jpg", // Repair
        "/images/service-reprogramming.jpg", // Reprogramming
        "/images/service-locksmith.jpg", // Locked inside
        "/images/service-lock-repair.jpg" // Lock repair
    ];

    return (
        <div className="container section">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ 
                    fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', 
                    marginBottom: '1rem', 
                    color: 'var(--text-main)', 
                    fontWeight: '800' 
                }}>
                    {t.servicesPage.title}
                </h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>
                    {t.services.subtitle}
                </p>
            </div>

            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                gap: '2.5rem' 
            }}>
                {t.servicesPage.list.map((s, i) => (
                    <ServiceCard 
                        key={i}
                        icon={servicesIcons[i] || ShieldCheck}
                        title={s.title}
                        desc={s.desc}
                        image={servicesImages[i]}
                    />
                ))}
            </div>

            <div style={{ 
                marginTop: '5rem', 
                padding: '4rem 2rem', 
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(20, 20, 20, 0) 100%)', 
                borderRadius: 'var(--radius-xl)',
                textAlign: 'center',
                border: '1px solid rgba(239, 68, 68, 0.2)'
            }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontWeight: '800' }}>{t.cta.title}</h2>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                    Estamos equipados con las mejores herramientas para ofrecer un servicio impecable.
                </p>
                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a href="tel:+34685988375" className="btn btn-primary" style={{ padding: '1rem 2,5rem', fontSize: '1.1rem' }}>
                        {t.nav.call}
                    </a>
                    <Link to="/contact" className="btn" style={{ 
                        padding: '1rem 2.5rem', 
                        fontSize: '1.1rem', 
                        background: 'transparent', 
                        border: '2px solid var(--text-main)' 
                    }}>
                        {t.contact.title}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Services;

