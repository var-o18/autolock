import { Resend } from "resend";

const resend = new Resend('re_P4CPthFK_ArKTcJR3EEyT5k3pzoJj8tTu');

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Método no permitido" });

  const { nombre, apellido, email, telefono, mensaje, botcheck, fecha, hora_desde, hora_hasta, asunto } = req.body;

  // 1. HONEYPOT ANTI-SPAM
  if (botcheck) {
    console.warn("Spam detectado (Honeypot). Ignorando.", botcheck);
    return res.status(200).json({ success: true, message: "OK" });
  }

  // 2. VALIDACIÓN DE CAMPOS MÍNIMOS
  // Para el formulario de llamada, el mensaje puede ser opcional, pero nombre/email/tel son clave.
  if (!nombre || !email || (!mensaje && !asunto)) {
    return res.status(400).json({ success: false, message: "Faltan campos obligatorios" });
  }

  try {
    // Usamos el host dinámico o una URL fija si ya tienes producción
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers.host;
    const logoUrl = `${protocol}://${host}/images/picture-1200.png`;
    const currentYear = new Date().getFullYear();

    // Plantilla Premium de Autolock
    const baseTemplate = (title, bodyContent, isUser = false) => `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&display=swap');
          
          body { 
            font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
            background-color: #f8fafc; 
            margin: 0; 
            padding: 0;
            -webkit-font-smoothing: antialiased;
          }
          .wrapper {
            width: 100%;
            table-layout: fixed;
            background-color: #f8fafc;
            padding-bottom: 60px;
            padding-top: 40px;
          }
          .main-card {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
          }
          .header {
            background: linear-gradient(135deg, #18181b 0%, #09090b 100%);
            padding: 40px 20px;
            text-align: center;
            border-bottom: 4px solid #ef4444;
          }
          .header img {
            max-width: 220px;
            height: auto;
            filter: drop-shadow(0 4px 6px rgba(0,0,0,0.2));
          }
          .content {
            padding: 40px 35px;
            color: #334155;
          }
          .title {
            font-size: 28px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 30px;
            text-align: center;
            letter-spacing: -0.025em;
          }
          .info-grid {
            background-color: #f1f5f9;
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 30px;
          }
          .field {
            margin-bottom: 16px;
          }
          .field:last-child {
            margin-bottom: 0;
          }
          .label {
            font-size: 12px;
            text-transform: uppercase;
            color: #64748b;
            font-weight: 700;
            letter-spacing: 0.05em;
            margin-bottom: 4px;
          }
          .value {
            font-size: 16px;
            color: #0f172a;
            font-weight: 600;
          }
          .message-container {
            margin-top: 30px;
          }
          .message-box {
            background-color: #ffffff;
            border: 1px solid #e2e8f0;
            padding: 20px;
            border-radius: 12px;
            font-size: 15px;
            line-height: 1.6;
            color: #475569;
            white-space: pre-wrap;
            box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.02);
          }
          .footer {
            padding: 30px;
            text-align: center;
            font-size: 14px;
            color: #94a3b8;
            background-color: #fdfdfd;
            border-top: 1px solid #f1f5f9;
          }
          .btn {
            display: inline-block;
            background-color: #ef4444;
            color: #ffffff !important;
            padding: 16px 32px;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 700;
            font-size: 16px;
            margin-top: 20px;
            box-shadow: 0 10px 15px -3px rgba(239, 68, 68, 0.3);
          }
          .social-links {
            margin-top: 20px;
            display: flex;
            justify-content: center;
            gap: 15px;
          }
          .accent-text {
            color: #ef4444;
            font-weight: 700;
          }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="main-card">
            <div class="header">
              <img src="${logoUrl}" alt="Autolock Premium Services">
            </div>
            <div class="content">
              <div class="title">${title}</div>
              ${bodyContent}
            </div>
            <div class="footer">
              <p>&copy; ${currentYear} <strong>Autolock</strong>. Todos los derechos reservados.</p>
              <p style="font-size: 12px; margin-top: 10px;">Cerrajería de automoción avanzada y servicios de seguridad.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // 1. Correo para el ADMIN (Notificación de Leads)
    const adminHtml = baseTemplate(
      asunto ? `📞 Solicitud de Llamada: ${asunto}` : "🚀 Nueva Solicitud de Contacto",
      `
      <div class="info-grid">
        <div class="field">
          <div class="label">Cliente</div>
          <div class="value">${nombre} ${apellido || ''}</div>
        </div>
        <div class="field">
          <div class="label">Correo Electrónico</div>
          <div class="value"><a href="mailto:${email}" style="color: #ef4444; text-decoration: none;">${email}</a></div>
        </div>
        <div class="field">
          <div class="label">Teléfono de contacto</div>
          <div class="value">${telefono || 'No especificado'}</div>
        </div>
        ${fecha ? `
        <div class="field">
          <div class="label">Preferencia de Llamada</div>
          <div class="value">${fecha} ${hora_desde ? `(entre ${hora_desde} y ${hora_hasta})` : ''}</div>
        </div>` : ''}
      </div>
      
      <div class="message-container">
        <div class="label">Detalle de la consulta:</div>
        <div class="message-box">${mensaje || '(Sin mensaje adicional)'}</div>
      </div>
      
      <div style="text-align: center; margin-top: 40px;">
        <a href="mailto:${email}" class="btn">Responder ahora</a>
      </div>
      `
    );

    // 2. Correo para el USUARIO (Confirmación Dinámica)
    const userHtml = baseTemplate(
      `¡Hola, ${nombre}! 👋`,
      `
      <p style="font-size: 16px; text-align: center; line-height: 1.6; margin-bottom: 25px;">
        Gracias por confiar en <span class="accent-text">Autolock</span>. Hemos recibido tu mensaje correctamente y nuestro equipo técnico ya está trabajando en tu consulta.
      </p>
      
      <div class="info-grid">
        <p style="margin: 0; font-size: 14px; color: #64748b; text-align: center;">
          Nos pondremos en contacto contigo a la mayor brevedad posible a través de tu correo <strong>${email}</strong> o teléfono.
        </p>
      </div>

      <div class="message-container">
        <div class="label">Resumen de tu mensaje:</div>
        <div class="message-box">${mensaje}</div>
      </div>
      
      <div style="text-align: center; margin-top: 40px;">
        <p style="font-size: 14px; color: #94a3b8; margin-bottom: 20px;">¿Necesitas algo urgente?</p>
        <a href="https://${host}" class="btn" style="background-color: #18181b;">Visitar nuestra web</a>
      </div>
      `,
      true
    );

    // ENVÍO A ADMIN
    const adminMail = await resend.emails.send({
      from: 'Autolock Leads <onboarding@resend.dev>',
      to: 'oficina.djvaro@gmail.com',
      subject: `🚨 [WEB] Solicitud de ${nombre} ${apellido || ''}`,
      html: adminHtml,
      reply_to: email, // Permite responder directamente al cliente
    });

    // ENVÍO AL CLIENTE (DINÁMICO)
    let clientMail = null;
    let clientError = null;
    
    try {
      // NOTA IMPORTANTE: Resend bloquea envíos a destinatarios externos si el domino no está verificado.
      // Solo permitirá enviar a 'oficina.djvaro@gmail.com' hasta que añadas tu dominio.
      const { data, error } = await resend.emails.send({
        from: 'Autolock <onboarding@resend.dev>', // <--- Cambiar por "info@tu-dominio.es" tras verificar
        to: [email], 
        subject: `Confirmación de contacto - Autolock`,
        html: userHtml,
      });
      
      if (error) {
        clientError = error.message;
        console.warn("Resend devolvió un error para el cliente:", error);
      } else {
        clientMail = data;
      }
    } catch (e) {
      clientError = e.message;
      console.warn("Excepción al enviar email al cliente:", e);
    }

    res.status(200).json({ 
      success: true, 
      admin: adminMail, 
      user: clientMail,
      userError: clientError // Esto te dirá por qué no llega al cliente
    });
  } catch (error) {
    console.error("Error crítico en el servicio de contacto:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
