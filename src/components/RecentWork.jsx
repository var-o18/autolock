import { ArrowRight, Facebook, Instagram } from 'lucide-react';
import posts from '../data/facebookPosts.json';
import { useLanguage } from '../context/LanguageContext';

const RecentWork = () => {
    const { language } = useLanguage();
    
    const title = language === 'es' ? 'Trabajos Recientes' : 'Recent Work';
    const subtitle = language === 'es' ? 'Síguenos en las redes sociales para ver nuestros últimos servicios en directo.' : 'Follow us on social media to see our latest services live.';
    const btnText = language === 'es' ? 'Ver en Facebook' : 'View on Facebook';

    return (
        <section className="section recent-work" style={{ backgroundColor: '#0a0f18', color: 'white', overflow: 'hidden' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                         SOCIAL FEED
                    </div>
                    <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1rem', background: 'linear-gradient(to right, #fff, #9ca3af)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {title}
                    </h2>
                    <p style={{ color: '#9ca3af', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto' }}>
                        {subtitle}
                    </p>
                </div>

                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', 
                    gap: '2.5rem',
                    maxWidth: '1100px',
                    margin: '0 auto'
                }}>
                    {posts.map((post) => (
                        <div key={post.id} className="fb-card" style={{ 
                            background: '#1c1e21', 
                            borderRadius: '1rem', 
                            overflow: 'hidden', 
                            border: '1px solid #3e4042',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            {/* Card Header */}
                            <div style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #3e4042', padding: '5px' }}>
                                    <img src="/images/picture-1200.png" alt="AL" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                </div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold', color: 'white' }}>Autolock</h4>
                                    <span style={{ fontSize: '0.8rem', color: '#b0b3b8' }}>{post.date}</span>
                                </div>
                            </div>

                            {/* Card Text */}
                            <div style={{ padding: '0 1rem 1rem', flexGrow: 0 }}>
                                <p style={{ color: '#e4e6eb', fontSize: '0.95rem', lineHeight: '1.5', margin: 0, display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {post.caption}
                                </p>
                            </div>

                            {/* Card Image */}
                            <a href={post.url} target="_blank" rel="noopener noreferrer" style={{ height: '350px', display: 'block', overflow: 'hidden', backgroundColor: '#000' }}>
                                <img 
                                    src={post.image} 
                                    alt="Post content" 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                                    className="fb-post-image"
                                />
                            </a>

                            {/* Card Footer */}
                            <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid #3e4042', background: '#242526' }}>
                                <a href={post.url} target="_blank" rel="noopener noreferrer" style={{ color: '#ef4444', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', fontSize: '0.9rem' }} className="fb-link">
                                    <Facebook size={16} /> {language === 'es' ? 'Ver publicación completa' : 'View full post'} <ArrowRight size={14} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '4rem', display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <a href="https://www.facebook.com/autolock/?locale=es_ES" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '3rem', boxShadow: '0 10px 20px rgba(239, 68, 68, 0.2)', display: 'inline-flex', alignItems: 'center' }}>
                        <Facebook size={20} style={{ marginRight: '0.5rem' }} /> Facebook
                    </a>
                    <a href="https://www.instagram.com/autolock.es/" target="_blank" rel="noopener noreferrer" className="btn" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '3rem', border: '2px solid #ef4444', color: '#ef4444', background: 'transparent', display: 'inline-flex', alignItems: 'center' }}>
                        <Instagram size={20} style={{ marginRight: '0.5rem' }} /> Instagram
                    </a>
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .recent-work h2 { font-size: 2.2rem !important; }
                    .fb-card { min-width: 100% !important; }
                    .recent-work .container > div:nth-child(2) { 
                        grid-template-columns: 1fr !important;
                        padding: 0 1rem;
                    }
                }
                .fb-card:hover {
                    border-color: #606770 !important;
                    transform: translateY(-5px);
                }
                .fb-card:hover .fb-post-image {
                    transform: scale(1.05) !important;
                }
                .fb-link:hover {
                    text-decoration: underline !important;
                }
            `}</style>
        </section>
    );
};

export default RecentWork;
