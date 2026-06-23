import { NextRequest, NextResponse } from "next/server";

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

    const { name, email, message } = body;

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

    // Forward to FastAPI backend if configured, otherwise log
    const backendUrl = process.env.BACKEND_URL;
    if (backendUrl) {
      const backendRes = await fetch(`${backendUrl}/api/v1/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!backendRes.ok) {
        throw new Error("Backend submission failed");
      }
    } else {
      // Development fallback — log to console
      console.log("[Contact form submission]", { name, email, subject: body.subject, messageLength: message.length });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[Contact API error]", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
