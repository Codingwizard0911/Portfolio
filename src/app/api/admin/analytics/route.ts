import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET ?? "dev-secret-change-in-production"
);

async function verifyAdmin(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get("admin_session")?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, SECRET);
    return true;
  } catch {
    return false;
  }
}

// Fetch real analytics from the FastAPI backend, or return synthetic demo data
export async function GET(request: NextRequest) {
  if (!(await verifyAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const backendUrl = process.env.BACKEND_URL;

  if (backendUrl) {
    try {
      const res = await fetch(`${backendUrl}/api/v1/admin/analytics`, {
        headers: { "X-Admin-Secret": process.env.ADMIN_JWT_SECRET ?? "" },
        next: { revalidate: 60 },
      });
      if (res.ok) return NextResponse.json(await res.json());
    } catch {
      // Fall through to demo data
    }
  }

  // Demo / offline data — replaced by real data once backend is wired
  const now = Date.now();
  const day = 86_400_000;

  return NextResponse.json({
    summary: {
      totalPageViews: 0,
      uniqueVisitors: 0,
      contactSubmissions: 0,
      resumeDownloads: 0,
      avgSessionDuration: "—",
    },
    topPages: [
      { page: "/", views: 0, label: "Home" },
      { page: "/projects", views: 0, label: "Projects" },
      { page: "/about", views: 0, label: "About" },
      { page: "/tech-stack", views: 0, label: "Tech Stack" },
      { page: "/publications", views: 0, label: "Publications" },
      { page: "/resume", views: 0, label: "Resume" },
      { page: "/contact", views: 0, label: "Contact" },
    ],
    dailyViews: Array.from({ length: 14 }, (_, i) => ({
      date: new Date(now - (13 - i) * day).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      views: 0,
      contacts: 0,
    })),
    recentContacts: [],
    referrers: [],
    _demo: true,
  });
}
