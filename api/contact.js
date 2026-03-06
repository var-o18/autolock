import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).send("🚀 API Activa. Usa el formulario de la web.");
  }

  if (req.method !== "POST") return res.status(405).json({ message: "Método no permitido" });

  const { nombre, apellido, email, telefono, mensaje, botcheck, fecha, hora_desde, hora_hasta, asunto } = req.body;

  const emailUser = process.env.EMAIL_USER || process.env.EMAIL_USE;
  const emailPass = process.env.EMAIL_PASS;
  const emailTo = process.env.EMAIL_TO || "info@autolock.es";

  if (!emailUser || !emailPass) {
    return res.status(500).json({ success: false, error: "Faltan credenciales en Vercel." });
  }

  // 3. Configuración Arsys (SMTP) - Puerto 465 (SSL) es el estándar seguro para Arsys
  const transporter = nodemailer.createTransport({
    host: "smtp.arsys.es",
    port: 465,
    secure: true, 
    auth: {
      user: emailUser,
      pass: emailPass,
    },
    tls: {
      // Configuraciones para máxima compatibilidad con servidores antiguos y modernos
      rejectUnauthorized: false
    }
  });

  try {
    const host = req.headers.host;
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const logoUrl = `${protocol}://${host}/images/picture-1200.png`;

    const baseTemplate = (title, bodyContent) => `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; }
          .card { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
          .header { background: #18181b; padding: 30px; text-align: center; border-bottom: 4px solid #ef4444; }
          .header img { max-width: 180px; }
          .content { padding: 30px; color: #334155; }
          .info { background: #f1f5f9; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .footer { text-align: center; padding: 20px; color: #94a3b8; font-size: 12px; }
          .btn { display: inline-block; background: #ef4444; color: #fff !important; padding: 10px 20px; text-decoration: none; border-radius: 6px; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header"><img src="${logoUrl}" alt="Autolock"></div>
          <div class="content">
            <h2 style="text-align: center;">${title}</h2>
            ${bodyContent}
          </div>
          <div class="footer">&copy; Autolock</div>
        </div>
      </body>
      </html>
    `;

    const adminHtml = baseTemplate("🚀 Nuevo Mensaje", `
      <div class="info">
        <p><strong>Cliente:</strong> ${nombre} ${apellido || ''}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono || 'N/A'}</p>
        ${fecha ? `<p><strong>Preferencia:</strong> ${fecha} (${hora_desde}-${hora_hasta})</p>` : ''}
      </div>
      <p><strong>Mensaje:</strong></p>
      <div style="background: white; padding: 15px; border: 1px solid #ddd; border-radius: 4px;">${mensaje || '(Sin mensaje)'}</div>
    `);

    const userHtml = baseTemplate("¡Hola, " + nombre + "!", `
      <p>Hemos recibido tu consulta correctamente. Te responderemos muy pronto a esta dirección.</p>
      <div style="text-align: center;"><a href="${protocol}://${host}" class="btn">Volver a la Web</a></div>
    `);

    // Enviar a Oficina
    await transporter.sendMail({
      from: `"Web Autolock" <${emailUser}>`,
      to: emailTo,
      subject: `🚨 [WEB] Mensaje de ${nombre}`,
      html: adminHtml,
      replyTo: email
    });

    // Enviar a Cliente
    try {
      await transporter.sendMail({
        from: `"Autolock" <${emailUser}>`,
        to: email,
        subject: "Hemos recibido tu mensaje - Autolock",
        html: userHtml
      });
    } catch (e) { console.warn("Fallo cliente:", e); }

    res.status(200).json({ success: true });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
