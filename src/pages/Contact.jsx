import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone, Clock, Calendar } from 'lucide-react';

const Contact = () => {
    const { t } = useLanguage();

    const inputStyle = {
        padding: '0.75rem',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border-color)',
        width: '100%',
        backgroundColor: 'var(--bg-card)',
        color: 'var(--text-main)'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '0.5rem',
        fontWeight: '500',
        color: 'var(--text-main)'
    };

    return (
        <div className="container section">

            {/* Main Header */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary-red)' }}>{t.contact.form1.title}</h1>
                <p style={{ color: 'var(--text-muted)' }}>{t.contact.form1.desc}</p>
            </div>

            {/* General Form */}
            <div style={{ maxWidth: '800px', margin: '0 auto 4rem', padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label style={labelStyle}>{t.contact.form1.firstName}</label>
                            <input type="text" style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>{t.contact.form1.lastName}</label>
                            <input type="text" style={inputStyle} />
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>{t.contact.form1.email}</label>
                        <input type="email" style={inputStyle} />
                    </div>

                    <div>
                        <label style={labelStyle}>{t.contact.form1.phone}</label>
                        <input type="tel" style={inputStyle} />
                    </div>

                    <div>
                        <label style={labelStyle}>{t.contact.form1.message}</label>
                        <textarea rows="5" style={inputStyle}></textarea>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                        <button className="btn btn-primary">{t.contact.form1.submit}</button>
                    </div>
                </form>
            </div>

            {/* Separator */}
            <hr style={{ border: '0', borderTop: '1px solid var(--border-color)', margin: '4rem 0' }} />

            {/* Callback Services */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary-red)' }}>{t.contact.form2.title}</h2>
                <p style={{ color: 'var(--text-muted)' }}>{t.contact.form2.desc}</p>
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label style={labelStyle}>{t.contact.form1.firstName}</label>
                            <input type="text" style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>{t.contact.form1.lastName}</label>
                            <input type="text" style={inputStyle} />
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>{t.contact.form1.phone} *</label>
                        <input type="tel" style={inputStyle} required />
                    </div>

                    <div>
                        <label style={labelStyle}>{t.contact.form2.date}</label>
                        <input type="date" style={inputStyle} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label style={labelStyle}>{t.contact.form2.timeFrom}</label>
                            <input type="time" style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>{t.contact.form2.timeTo}</label>
                            <input type="time" style={inputStyle} />
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>{t.contact.form1.email} *</label>
                        <input type="email" style={inputStyle} />
                    </div>

                    <div>
                        <label style={labelStyle}>{t.contact.form2.subject}</label>
                        <input type="text" style={inputStyle} />
                    </div>

                    <div>
                        <label style={labelStyle}>{t.contact.form1.message}</label>
                        <textarea rows="5" style={inputStyle}></textarea>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                        <button className="btn btn-primary">{t.contact.form2.submit}</button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default Contact;

