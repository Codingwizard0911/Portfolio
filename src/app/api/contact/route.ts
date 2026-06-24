import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactPayload;
    const { name, email, message, subject } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    if (message.length > 5000) {
      return NextResponse.json({ error: "Message too long." }, { status: 400 });
    }

    const resendKey = process.env.RESEND_API_KEY;

    if (resendKey) {
      const resend = new Resend(resendKey);
      const subjectLine = subject?.trim()
        ? `Portfolio contact: ${subject.trim()}`
        : `Portfolio contact from ${name}`;

      await resend.emails.send({
        from: "Portfolio <onboarding@resend.dev>",
        to: "umapathiu0911@gmail.com",
        replyTo: email,
        subject: subjectLine,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0a0a0a;color:#e5e5e5;border-radius:12px">
            <h2 style="margin:0 0 4px;color:#fff;font-size:20px">New message from your portfolio</h2>
            <p style="margin:0 0 24px;font-size:13px;color:#666">${new Date().toUTCString()}</p>

            <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
              <tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#888;font-size:13px;width:80px">Name</td>
                  <td style="padding:10px 0;border-bottom:1px solid #222;font-size:14px;color:#e5e5e5">${name}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#888;font-size:13px">Email</td>
                  <td style="padding:10px 0;border-bottom:1px solid #222;font-size:14px"><a href="mailto:${email}" style="color:#6366f1">${email}</a></td></tr>
              ${subject ? `<tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#888;font-size:13px">Subject</td>
                  <td style="padding:10px 0;border-bottom:1px solid #222;font-size:14px;color:#e5e5e5">${subject}</td></tr>` : ""}
            </table>

            <div style="background:#111;border-radius:8px;padding:16px;border-left:3px solid #6366f1">
              <p style="margin:0;font-size:14px;color:#ccc;line-height:1.7;white-space:pre-wrap">${message}</p>
            </div>

            <p style="margin:20px 0 0;font-size:12px;color:#444">
              Reply directly to this email — it will go to ${email}
            </p>
          </div>
        `,
      });
    } else {
      // Fallback: log to console (local dev without Resend key)
      console.log("[Contact form submission]", { name, email, subject, messageLength: message.length });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[Contact API error]", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
