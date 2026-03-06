import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone, Clock, Calendar } from 'lucide-react';

const Contact = () => {
    const { t } = useLanguage();
    const [status1, setStatus1] = useState('');
    const [status2, setStatus2] = useState('');

    const handleSubmit = async (e, formId) => {
        e.preventDefault();
        const setStatus = formId === 1 ? setStatus1 : setStatus2;
        setStatus(t.contact?.sending || 'Enviando...');
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            
            if (response.ok) {
                setStatus('¡Enviado con éxito! Te contactaremos pronto.');
                e.target.reset();
                setTimeout(() => setStatus(''), 5000);
            } else {
                const errData = await response.json();
                setStatus(`Error: ${errData.error || 'No se pudo enviar'}`);
            }
        } catch (error) {
            setStatus('Error de conexión. Revisa tu internet.');
        }
    };

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
            <div style={{ maxWidth: '800px', margin: '0 auto 4rem', padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)' }}>
                <form onSubmit={(e) => handleSubmit(e, 1)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <input type="hidden" name="formType" value="Contacto General" />
                    <input type="text" name="botcheck" style={{ display: 'none' }} />

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label style={labelStyle}>{t.contact.form1.firstName} *</label>
                            <input type="text" name="nombre" required style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>{t.contact.form1.lastName}</label>
                            <input type="text" name="apellido" style={inputStyle} />
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>{t.contact.form1.email} *</label>
                        <input type="email" name="email" required style={inputStyle} />
                    </div>

                    <div>
                        <label style={labelStyle}>{t.contact.form1.phone}</label>
                        <input type="tel" name="telefono" style={inputStyle} />
                    </div>

                    <div>
                        <label style={labelStyle}>{t.contact.form1.message} *</label>
                        <textarea name="mensaje" rows="5" required style={inputStyle}></textarea>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                        <button type="submit" className="btn btn-primary">{t.contact.form1.submit}</button>
                    </div>
                    {status1 && (
                        <div style={{ padding: '1rem', backgroundColor: status1.includes('éxito') ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)', border: '1px solid currentColor', borderRadius: 'var(--radius-sm)', textAlign: 'center', marginTop: '1rem', color: status1.includes('éxito') ? '#22c55e' : '#ef4444' }}>
                            {status1}
                        </div>
                    )}
                </form>
            </div>

            {/* Separator */}
            <hr style={{ border: '0', borderTop: '1px solid var(--border-color)', margin: '4rem 0' }} />

            {/* Callback Services */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary-red)' }}>{t.contact.form2.title}</h2>
                <p style={{ color: 'var(--text-muted)' }}>{t.contact.form2.desc}</p>
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)' }}>
                <form onSubmit={(e) => handleSubmit(e, 2)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <input type="hidden" name="formType" value="Solicitud de Llamada" />
                    <input type="text" name="botcheck" style={{ display: 'none' }} />
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label style={labelStyle}>{t.contact.form1.firstName} *</label>
                            <input type="text" name="nombre" required style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>{t.contact.form1.lastName}</label>
                            <input type="text" name="apellido" style={inputStyle} />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label style={labelStyle}>{t.contact.form1.phone} *</label>
                            <input type="tel" name="telefono" style={inputStyle} required />
                        </div>
                        <div>
                            <label style={labelStyle}>{t.contact.form1.email} *</label>
                            <input type="email" name="email" style={inputStyle} required />
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>{t.contact.form2.date}</label>
                        <input type="date" name="fecha" style={inputStyle} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label style={labelStyle}>{t.contact.form2.timeFrom}</label>
                            <input type="time" name="hora_desde" style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>{t.contact.form2.timeTo}</label>
                            <input type="time" name="hora_hasta" style={inputStyle} />
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>{t.contact.form2.subject}</label>
                        <input type="text" name="asunto" style={inputStyle} />
                    </div>

                    <div>
                        <label style={labelStyle}>{t.contact.form1.message}</label>
                        <textarea name="mensaje" rows="3" style={inputStyle} placeholder="Opcional"></textarea>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                        <button type="submit" className="btn btn-primary">{t.contact.form2.submit}</button>
                    </div>
                    {status2 && (
                        <div style={{ padding: '1rem', backgroundColor: status2.includes('éxito') ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)', border: '1px solid currentColor', borderRadius: 'var(--radius-sm)', textAlign: 'center', marginTop: '1rem', color: status2.includes('éxito') ? '#22c55e' : '#ef4444' }}>
                            {status2}
                        </div>
                    )}
                </form>
            </div>

        </div>
    );
};

export default Contact;

