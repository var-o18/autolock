import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Método no permitido" });

  const { nombre, apellido, email, telefono, mensaje, botcheck } = req.body;

  // 1. HONEYPOT ANTI-SPAM: Si 'botcheck' fue rellenado, asumimos que es un bot
  if (botcheck) {
    console.warn("Spam detectado (Honeypot). Ignorando.", botcheck);
    // Fingimos 200 OK para engañar al bot sin enviar correo
    return res.status(200).json({ success: true, message: "OK" });
  }

  // 2. VALIDACIÓN DE CAMPOS MÍNIMOS EN BACKEND
  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ success: false, message: "Faltan campos obligatorios" });
  }

  try {
    const data = await resend.emails.send({
      // Resend usa onboarding@resend.dev por defecto para pruebas. 
      // Después cambiarlo a 'tu-dominio <info@tu-dominio.com>'
      from: 'onboarding@resend.dev', 
      to: 'alvaroforte13@gmail.com', // <-- CAMBIAR POR TU CORREO PERSONAL / EMPRESA
      subject: `Nuevo mensaje de ${nombre} desde la Web`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${nombre} ${apellido || ''}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono || 'No indicado'}</p>
        <br/>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>
      `,
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error al enviar email:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}