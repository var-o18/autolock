import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'var(--black)', color: 'white', paddingTop: '4rem', paddingBottom: '2rem' }}>
            <div className="container">
                {/* ... (Existing code) ... */}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>

                    {/* Brand */}
                    <div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <img 
                                src="/images/picture-1200.png" 
                                alt="AutoLock Logo" 
                                style={{ height: '55px', width: 'auto', display: 'block' }} 
                            />
                        </div>
                        <p style={{ color: '#9CA3AF', marginBottom: '1.5rem', fontSize: '1.05rem', lineHeight: '1.6' }}>
                            Servicio líder de cerrajería de automoción en Costa Blanca. Rápido, profesional y directamente en su ubicación.
                        </p>
                        <div style={{ display: 'flex', gap: '1.2rem' }}>
                            <a 
                                href="https://www.facebook.com/autolock/?locale=es_ES" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                style={{ color: 'white', transition: 'color 0.3s ease' }}
                                onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary-red)'}
                                onMouseOut={(e) => e.currentTarget.style.color = 'white'}
                            >
                                <Facebook size={24} />
                            </a>
                            <a 
                                href="https://www.instagram.com/autolock.es/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                style={{ color: 'white', transition: 'color 0.3s ease' }}
                                onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary-red)'}
                                onMouseOut={(e) => e.currentTarget.style.color = 'white'}
                            >
                                <Instagram size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.2rem' }}>Contacto</h3>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#D1D5DB' }}>
                                <Phone size={18} className="text-primary" />
                                <a href="tel:+34685988375">+34 685 988 375</a>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#D1D5DB' }}>
                                <Phone size={18} className="text-primary" />
                                <a href="tel:+34615532459">+34 615 532 459</a>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#D1D5DB' }}>
                                <Mail size={18} className="text-primary" />
                                <a href="mailto:info@autolock.es">info@autolock.es</a>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'start', gap: '0.75rem', color: '#D1D5DB' }}>
                                <MapPin size={18} className="text-primary" style={{ marginTop: '3px' }} />
                                <span>Costa Blanca, Alicante<br />(Servicio Móvil)</span>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.2rem' }}>Enlaces Rápidos</h3>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li><a href="/about-us" style={{ color: '#D1D5DB' }}>Sobre Nosotros</a></li>
                            <li><a href="/services" style={{ color: '#D1D5DB' }}>Servicios</a></li>
                            <li><a href="/ecu-remapping" style={{ color: '#D1D5DB' }}>ECU Remapping</a></li>
                            <li><a href="/coverage" style={{ color: '#D1D5DB' }}>Áreas de Cobertura</a></li>
                            <li><a href="/contact" style={{ color: '#D1D5DB' }}>Pedir Presupuesto</a></li>
                        </ul>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid #374151', paddingTop: '2rem', textAlign: 'center', color: '#6B7280', fontSize: '0.875rem' }}>
                    <p>© {new Date().getFullYear()} Autolock. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
