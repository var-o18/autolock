import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Método no permitido" });

  const { nombre, apellido, email, telefono, mensaje, botcheck, fecha, hora_desde, hora_hasta, asunto } = req.body;

  // 1. Validar que tenemos las credenciales configuradas
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("ERROR: Faltan las variables de entorno EMAIL_USER o EMAIL_PASS en Vercel.");
    return res.status(500).json({ 
      success: false, 
      error: "Error de configuración en el servidor (faltan credenciales)." 
    });
  }

  // 2. HONEYPOT ANTI-SPAM
  if (botcheck) {
    return res.status(200).json({ success: true, message: "OK" });
  }

  // 2. VALIDACIÓN DE CAMPOS
  if (!nombre || !email || (!mensaje && !asunto)) {
    return res.status(400).json({ success: false, message: "Faltan campos obligatorios" });
  }

  // 3. CONFIGURACIÓN TRANSPORTE ARSYS (SMTP)
  const transporter = nodemailer.createTransport({
    host: "smtp.arsys.es",
    port: 587,
    secure: false, // false para puerto 587 (usa STARTTLS)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false // Evita fallos por certificados en servidores cloud
    }
  });

  try {
    // Verificar conexión antes de enviar (para diagnóstico)
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error("Fallo de verificación SMTP:", verifyError);
      return res.status(500).json({ 
        success: false, 
        error: "No se pudo conectar con el servidor de Arsys. Revisa usuario/contraseña.",
        details: verifyError.message 
      });
    }

    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers.host;
    const logoUrl = `${protocol}://${host}/images/picture-1200.png`;
    const currentYear = new Date().getFullYear();
    // ... rest of the code remains high quality

    const baseTemplate = (title, bodyContent) => `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&display=swap');
          body { font-family: 'Outfit', Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 0; }
          .wrapper { width: 100%; background-color: #f8fafc; padding: 40px 0; }
          .main-card { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
          .header { background: #18181b; padding: 30px; text-align: center; border-bottom: 4px solid #ef4444; }
          .header img { max-width: 180px; height: auto; }
          .content { padding: 40px; color: #334155; }
          .title { font-size: 22px; font-weight: 800; color: #0f172a; margin-bottom: 25px; text-align: center; }
          .info-grid { background-color: #f1f5f9; border-radius: 12px; padding: 20px; margin-bottom: 25px; }
          .label { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 700; margin-bottom: 4px; }
          .value { font-size: 15px; color: #0f172a; font-weight: 600; margin-bottom: 12px; }
          .message-box { background: white; border: 1px solid #e2e8f0; padding: 15px; border-radius: 12px; color: #475569; white-space: pre-wrap; margin-top: 5px; }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; }
          .btn { display: inline-block; background: #ef4444; color: #ffffff !important; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 700; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="main-card">
            <div class="header"><img src="${logoUrl}" alt="Autolock"></div>
            <div class="content"><div class="title">${title}</div>${bodyContent}</div>
            <div class="footer">&copy; ${currentYear} Autolock. Servicios de Cerrajería Automotriz.</div>
          </div>
        </div>
      </body>
      </html>
    `;

    // EMAIL PARA EL ADMIN
    const adminHtml = baseTemplate(
      asunto ? `📞 Llamada Solicitada` : "🚀 Nueva Solicitud Web",
      `
      <div class="info-grid">
        <div class="label">Cliente</div><div class="value">${nombre} ${apellido || ''}</div>
        <div class="label">Email</div><div class="value">${email}</div>
        <div class="label">Teléfono</div><div class="value">${telefono || 'No indicado'}</div>
        ${fecha ? `<div class="label">Preferencia</div><div class="value">${fecha} (${hora_desde} - ${hora_hasta})</div>` : ''}
        ${asunto ? `<div class="label">Asunto</div><div class="value">${asunto}</div>` : ''}
      </div>
      <div class="label">Mensaje:</div>
      <div class="message-box">${mensaje || '(Sin mensaje)'}</div>
      `
    );

    // EMAIL PARA EL CLIENTE
    const userHtml = baseTemplate(
      `¡Gracias por contactarnos, ${nombre}!`,
      `
      <p style="text-align: center; font-size: 16px;">Hemos recibido tu consulta correctamente. Nuestro equipo revisará los detalles y te responderá a <strong>${email}</strong> lo antes posible.</p>
      <div style="text-align: center; margin-top: 30px;">
        <a href="https://${host}" class="btn">Volver a Autolock</a>
      </div>
      `
    );

    // 1. Enviar a ti (ADMIN)
    await transporter.sendMail({
      from: `"Web Autolock" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || "info@autolock.es", // Ahora por defecto llegará a info@autolock.es
      subject: `🚨 [CONTACTO] ${nombre} - ${asunto || 'Nuevo mensaje'}`,
      html: adminHtml,
      replyTo: email
    });

    // 2. Enviar al CLIENTE (DINÁMICO)
    let userSent = false;
    try {
      await transporter.sendMail({
        from: `"Autolock" <${process.env.EMAIL_USER}>`,
        to: email, 
        subject: "Confirmación de recepción - Autolock",
        html: userHtml
      });
      userSent = true;
    } catch (e) {
      console.warn("Fallo al enviar confirmación al cliente:", e);
    }

    res.status(200).json({ success: true, userSent });

  } catch (error) {
    console.error("Error en el servidor de correo:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
