import nodemailer from "nodemailer";

// ─── Email Configuration ───────────────────────────────────────────────────
// Set these values in your .env.local file.
// SMTP_HOST      – your SMTP server (e.g. smtp.gmail.com)
// SMTP_PORT      – usually 587 (TLS) or 465 (SSL)
// SMTP_USER      – your sender email address
// SMTP_PASS      – your email password or app-specific password
// CONTACT_TO     – the inbox that receives the contact messages
// ──────────────────────────────────────────────────────────────────────────

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, message } = body;

    // ── Server-side validation ──────────────────────────────────────────
    if (!email || !message) {
      return Response.json(
        { error: "Email and message are required." },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return Response.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (message.trim().length < 10) {
      return Response.json(
        { error: "Message must be at least 10 characters." },
        { status: 400 }
      );
    }

    // ── Send email ──────────────────────────────────────────────────────
    await transporter.sendMail({
      from: `"Alex.dev Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO,
      replyTo: email,
      subject: `New message from ${email}`,
      text: `From: ${email}\n\n${message}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#f9f9fb;border-radius:12px;">
          <h2 style="color:#1a1a2e;margin-bottom:8px;">New Contact Message</h2>
          <p style="color:#666;font-size:14px;margin-bottom:24px;">Received via your portfolio contact form</p>
          <div style="background:#fff;border:1px solid #e0e0e8;border-radius:8px;padding:20px;margin-bottom:20px;">
            <p style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#888;">From</p>
            <p style="margin:0;font-weight:600;color:#1a1a2e;">${email}</p>
          </div>
          <div style="background:#fff;border:1px solid #e0e0e8;border-radius:8px;padding:20px;">
            <p style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#888;">Message</p>
            <p style="margin:0;color:#333;line-height:1.7;white-space:pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
          </div>
          <p style="margin-top:24px;font-size:12px;color:#aaa;text-align:center;">
            Reply directly to this email to respond to ${email}
          </p>
        </div>
      `,
    });

    return Response.json(
      { message: "Your message has been sent! I'll get back to you soon." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return Response.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
