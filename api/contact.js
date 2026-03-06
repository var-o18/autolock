import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // Si entran por el navegador (GET), les damos un mensaje amigable en lugar de un error 405
  if (req.method === "GET") {
    return res.status(200).send("🚀 API de Autolock activa. El formulario debe enviarse por POST.");
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  const { nombre, apellido, email, telefono, mensaje, botcheck, fecha, hora_desde, hora_hasta, asunto } = req.body;

  // 1. Validar variables de entorno (Soportamos EMAIL_USE por el typo en Vercel)
  const emailUser = process.env.EMAIL_USER || process.env.EMAIL_USE;
  const emailPass = process.env.EMAIL_PASS;
  const emailTo = process.env.EMAIL_TO || "info@autolock.es";

  if (!emailUser || !emailPass) {
    console.error("Faltan variables de entorno EMAIL_USER/EMAIL_USE o EMAIL_PASS");
    return res.status(500).json({ success: false, error: "Servidor no configurado (faltan claves)." });
  }

  // 2. Filtro Anti-Spam (Honeypot)
  if (botcheck) return res.status(200).json({ success: true, message: "OK" });

  // 3. Configuración Arsys (SMTP) - Probamos puerto 465 (SSL) que es el estándar de Arsys
  const transporter = nodemailer.createTransport({
    host: "smtp.arsys.es",
    port: 465,
    secure: true, // true para puerto 465
    auth: {
      user: emailUser,
      pass: emailPass,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  try {
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers.host;
    const logoUrl = `${protocol}://${host}/images/picture-1200.png`;
    const currentYear = new Date().getFullYear();

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
          .message-box { background: white; border: 1px solid #e2e8f0; padding: 15px; border-radius: 12px; color: #475569; white-space: pre-wrap; }
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

    // EMAIL PARA TI (ADMIN)
    const adminHtml = baseTemplate(
      asunto ? `📞 Llamada Solicitada` : "🚀 Nueva Solicitud Web",
      `
      <div class="info-grid">
        <div class="label">Cliente</div><div class="value">${nombre} ${apellido || ''}</div>
        <div class="label">Email</div><div class="value">${email}</div>
        <div class="label">Teléfono</div><div class="value">${telefono || 'No indicado'}</div>
        ${fecha ? `<div class="label">Preferencia</div><div class="value">${fecha} (${hora_desde} - ${hora_hasta})</div>` : ''}
      </div>
      <div class="label">Mensaje:</div>
      <div class="message-box">${mensaje || '(Sin mensaje)'}</div>
      `
    );

    // EMAIL PARA EL CLIENTE
    const userHtml = baseTemplate(
      `¡Gracias por contactarnos, ${nombre}!`,
      `
      <p style="text-align: center; font-size: 16px;">Hemos recibido tu consulta. Nos pondremos en contacto contigo en breve a través de <strong>${email}</strong>.</p>
      <div style="text-align: center; margin-top: 30px;"><a href="https://${host}" class="btn">Volver a la Web</a></div>
      `
    );

    // 1. Enviar a ADMIN
    await transporter.sendMail({
      from: `"Web Autolock" <${emailUser}>`,
      to: emailTo,
      subject: `🚨 [WEB] Solicitud de ${nombre}`,
      html: adminHtml,
      replyTo: email
    });

    // 2. Enviar a CLIENTE
    let userSent = false;
    try {
      await transporter.sendMail({
        from: `"Autolock" <${emailUser}>`,
        to: email, 
        subject: "Confirmación - Autolock",
        html: userHtml
      });
      userSent = true;
    } catch (e) {
      console.warn("Error enviando al cliente:", e);
    }

    res.status(200).json({ success: true, userSent });

  } catch (error) {
    console.error("Error SMTP:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
