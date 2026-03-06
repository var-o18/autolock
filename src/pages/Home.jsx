import { Helmet } from 'react-helmet';
import { Phone, MessageCircle, MapPin, CheckCircle, ArrowRight, Key, Wrench, Zap, Lock, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import RecentWork from '../components/RecentWork';

const ServiceCard = ({ icon: Icon, title, desc, link, btnText }) => (
    <div className="service-card">
        <div style={{ padding: '12px', background: 'var(--bg-secondary)', width: 'fit-content', borderRadius: '12px', color: 'var(--primary-red)' }}>
            <Icon size={28} />
        </div>
        <h3>{title}</h3>
        <p>{desc}</p>
        <Link to={link} className="service-link">
            {btnText} <ArrowRight size={16} />
        </Link>
    </div>
);

const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="faq-item">
            <button className="faq-button" onClick={() => setIsOpen(!isOpen)}>
                {question}
                <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>▼</span>
            </button>
            {isOpen && <div className="faq-answer">{answer}</div>}
        </div>
    );
};

const Home = () => {
    const { t } = useLanguage();

    return (
        <>
            <Helmet>
                <title>Autolock | Cerrajería Automoción Móvil Costa Blanca</title>
                <meta name="description" content="Servicio móvil de llaves de coche, reprogramación ECU y reparación de mandos en Costa Blanca. Vamos donde estés. ¡Llama ahora!" />
            </Helmet>

            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <span style={{ color: '#ef4444', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>{t.hero.subtitle}</span>
                        <h1>{t.hero.title}</h1>
                        <p>{t.hero.desc}</p>

                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <a href="tel:+34685988375" className="btn btn-primary">
                                <Phone size={20} style={{ marginRight: '8px' }} /> {t.hero.call}
                            </a>
                            <a href="https://wa.me/34685988375" className="btn" style={{ backgroundColor: '#25D366', color: 'white' }}>
                                <MessageCircle size={20} style={{ marginRight: '8px' }} /> {t.hero.whatsapp}
                            </a>
                        </div>

                        <div className="hero-badges">
                            {t.hero.badges && t.hero.badges.map((badge, i) => (
                                <div key={i} className="badge"><CheckCircle size={18} color="#ef4444" /> {badge}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-main)' }}>{t.services.title}</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>{t.services.subtitle}</p>
                    </div>

                    <div className="grid-services">
                        <ServiceCard
                            icon={Key}
                            title={t.services.items.lostKeys.title}
                            desc={t.services.items.lostKeys.desc}
                            link="/services"
                            btnText={t.services.btn}
                        />
                        <ServiceCard
                            icon={Zap}
                            title={t.services.items.programming.title}
                            desc={t.services.items.programming.desc}
                            link="/services"
                            btnText={t.services.btn}
                        />
                        <ServiceCard
                            icon={Wrench}
                            title={t.services.items.repair.title}
                            desc={t.services.items.repair.desc}
                            link="/services"
                            btnText={t.services.btn}
                        />
                        <ServiceCard
                            icon={Lock}
                            title={t.services.items.lockout.title}
                            desc={t.services.items.lockout.desc}
                            link="/services"
                            btnText={t.services.btn}
                        />
                        <ServiceCard
                            icon={Settings}
                            title={t.services.items.ecu.title}
                            desc={t.services.items.ecu.desc}
                            link="/ecu-remapping"
                            btnText={t.services.btn}
                        />
                        <ServiceCard
                            icon={Settings}
                            title={t.services.items.tpms.title}
                            desc={t.services.items.tpms.desc}
                            link="/tpms"
                            btnText={t.services.btn}
                        />
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section className="section">
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>{t.steps.title}</h2>
                    </div>

                    <div className="steps-grid">
                        <div className="step-item">
                            <div className="step-number">1</div>
                            <h3>{t.steps.s1.title}</h3>
                            <p style={{ color: 'var(--text-muted)' }}>{t.steps.s1.desc}</p>
                        </div>
                        <div className="step-item">
                            <div className="step-number">2</div>
                            <h3>{t.steps.s2.title}</h3>
                            <p style={{ color: 'var(--text-muted)' }}>{t.steps.s2.desc}</p>
                        </div>
                        <div className="step-item">
                            <div className="step-number">3</div>
                            <h3>{t.steps.s3.title}</h3>
                            <p style={{ color: 'var(--text-muted)' }}>{t.steps.s3.desc}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recent Work / Facebook Feed */}
            <RecentWork />

            {/* Coverage & Map */}
            <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <div className="container">
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
                        gap: '4rem', 
                        alignItems: 'center' 
                    }}>
                        <div>
                            <span style={{ color: 'var(--primary-red)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>
                                {t.hero.subtitle}
                            </span>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem', marginTop: '0.5rem' }}>{t.coverage.title}</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.7' }}>
                                {t.coverage.desc}
                            </p>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2.5rem' }}>
                                {t.coverage.cities.map(city => (
                                    <span key={city} style={{ 
                                        padding: '6px 14px', 
                                        background: 'var(--bg-card)', 
                                        borderRadius: '20px', 
                                        fontSize: '0.9rem', 
                                        border: '1px solid var(--border-color)',
                                        color: 'var(--text-main)'
                                    }}>
                                        {city}
                                    </span>
                                ))}
                            </div>

                            <div style={{ 
                                padding: '1.5rem', 
                                background: 'rgba(239, 68, 68, 0.05)', 
                                borderRadius: '1rem', 
                                borderLeft: '4px solid var(--primary-red)',
                                display: 'flex',
                                gap: '1rem',
                                alignItems: 'flex-start'
                            }}>
                                <Zap size={24} color="var(--primary-red)" style={{ marginTop: '4px', flexShrink: 0 }} />
                                <p style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-main)', fontWeight: '500' }}>
                                    {t.coverage.extra}
                                </p>
                            </div>
                        </div>

                        <div style={{ 
                            height: '450px', 
                            borderRadius: '1.5rem', 
                            overflow: 'hidden', 
                            boxShadow: 'var(--shadow-xl)',
                            border: '1px solid var(--border-color)',
                            position: 'relative'
                        }}>
                            <iframe
                                src="https://maps.google.com/maps?q=Alicante,Spain&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Autolock Coverage Area"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="section" style={{ backgroundColor: 'var(--bg-card)' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '2rem', textAlign: 'center' }}>{t.faq.title}</h2>

                    <FaqItem
                        question={t.faq.q1}
                        answer={t.faq.a1}
                    />
                    <FaqItem
                        question={t.faq.q2}
                        answer={t.faq.a2}
                    />
                    <FaqItem
                        question={t.faq.q3}
                        answer={t.faq.a3}
                    />
                    <FaqItem
                        question={t.faq.q4}
                        answer={t.faq.a4}
                    />
                </div>
            </section>

            {/* CTA Final */}
            <section className="section" style={{ textAlign: 'center', backgroundColor: 'var(--primary-red)', color: 'white' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>{t.cta.title}</h2>
                    <p style={{ fontSize: '1.25rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>{t.cta.desc}</p>
                    <a href="tel:+34685988375" style={{ backgroundColor: 'white', color: 'var(--primary-red)', padding: '1rem 2rem', borderRadius: 'var(--radius-md)', fontWeight: 'bold', fontSize: '1.2rem', display: 'inline-block' }}>
                        {t.cta.btn}
                    </a>
                </div>
            </section>
        </>
    );
};

export default Home;
