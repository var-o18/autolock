import { Phone, MessageCircle, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import './FloatingActions.css';

const FloatingActions = () => {
    return (
        <>
            {/* WhatsApp Floating Button (Desktop & Mobile) */}
            <a
                href="https://wa.me/34685988375"
                className="whatsapp-float"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
            >
                <MessageCircle size={32} />
            </a>

            {/* Mobile Sticky Bar */}
            <div className="mobile-sticky-bar">
                <a href="tel:+34685988375" className="sticky-btn call-btn">
                    <Phone size={20} />
                    <span>Llamar</span>
                </a>
                <Link to="/contact" className="sticky-btn quote-btn">
                    <FileText size={20} />
                    <span>Contacto</span>
                </Link>
            </div>
        </>
    );
};

export default FloatingActions;
