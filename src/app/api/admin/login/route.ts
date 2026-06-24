import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";

const ADMIN_COOKIE = "admin_session";
const SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET ?? "dev-secret-change-in-production"
);

export async function POST(request: NextRequest) {
  const { password } = await request.json() as { password?: string };

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json({ error: "Admin not configured." }, { status: 503 });
  }

  if (password !== adminPassword) {
    // Constant-time-ish comparison (good enough for a personal portfolio)
    await new Promise((r) => setTimeout(r, 400));
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(SECRET);

  const res = NextResponse.json({ success: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  });

  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete(ADMIN_COOKIE);
  return res;
}
