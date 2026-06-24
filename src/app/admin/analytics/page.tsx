"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Eye, Users, Mail, Download, TrendingUp, RefreshCw,
  LogOut, BarChart2, Globe, Clock, AlertCircle, Terminal,
  ArrowUpRight, ArrowDownRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────

interface Summary {
  totalPageViews: number;
  uniqueVisitors: number;
  contactSubmissions: number;
  resumeDownloads: number;
  avgSessionDuration: string;
}

interface PageStat {
  page: string;
  label: string;
  views: number;
}

interface DailyPoint {
  date: string;
  views: number;
  contacts: number;
}

interface ContactEntry {
  id: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  created_at: string;
}

interface Referrer {
  source: string;
  count: number;
}

interface AnalyticsData {
  summary: Summary;
  topPages: PageStat[];
  dailyViews: DailyPoint[];
  recentContacts: ContactEntry[];
  referrers: Referrer[];
  _demo?: boolean;
}

// ── Components ────────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  color = "brand",
  delay = 0,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  trend?: { value: number; label: string };
  color?: "brand" | "emerald" | "violet" | "amber";
  delay?: number;
}) {
  const colors = {
    brand: "bg-brand-500/10 border-brand-500/20 text-brand-400",
    emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    violet: "bg-violet-500/10 border-violet-500/20 text-violet-400",
    amber: "bg-amber-500/10 border-amber-500/20 text-amber-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="card p-5"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn("w-9 h-9 rounded-xl border flex items-center justify-center", colors[color])}>
          <Icon className="w-4 h-4" />
        </div>
        {trend && (
          <span
            className={cn(
              "text-xs flex items-center gap-0.5 font-medium",
              trend.value >= 0 ? "text-emerald-400" : "text-rose-400"
            )}
          >
            {trend.value >= 0 ? (
              <ArrowUpRight className="w-3 h-3" />
            ) : (
              <ArrowDownRight className="w-3 h-3" />
            )}
            {Math.abs(trend.value)}%
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-neutral-50 mb-1">{value}</div>
      <div className="text-xs text-neutral-500">{label}</div>
    </motion.div>
  );
}

function MiniBarChart({ data }: { data: DailyPoint[] }) {
  const max = Math.max(...data.map((d) => d.views), 1);
  return (
    <div className="flex items-end gap-1 h-24">
      {data.map((d, i) => (
        <div key={d.date} className="flex-1 flex flex-col items-center gap-1 group">
          <div
            className="w-full rounded-t-sm bg-brand-500/20 group-hover:bg-brand-500/40 transition-colors relative"
            style={{ height: `${Math.max((d.views / max) * 88, 4)}px` }}
            title={`${d.date}: ${d.views} views`}
          >
            {d.contacts > 0 && (
              <div
                className="absolute bottom-0 left-0 right-0 rounded-t-sm bg-emerald-500/60"
                style={{ height: `${(d.contacts / Math.max(d.views, 1)) * 100}%` }}
              />
            )}
          </div>
          {i % 3 === 0 && (
            <span className="text-[9px] text-neutral-700 rotate-45 origin-left whitespace-nowrap hidden sm:block">
              {d.date}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function AdminAnalyticsPage() {
  const router = useRouter();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState<"overview" | "contacts" | "traffic">("overview");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/analytics");
      if (res.status === 401) { router.push("/admin/login"); return; }
      if (!res.ok) throw new Error("Failed to load analytics");
      setData(await res.json() as AnalyticsData);
      setLastRefresh(new Date());
    } catch {
      setError("Could not load analytics data.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => { void fetchData(); }, [fetchData]);

  async function handleLogout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-surface-0 pt-6 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
              <Terminal className="w-4 h-4 text-brand-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-neutral-50">Analytics Dashboard</h1>
              <p className="text-xs text-neutral-600">
                Last updated: {lastRefresh.toLocaleTimeString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={fetchData}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/8 text-xs text-neutral-400 hover:text-white hover:bg-white/8 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={cn("w-3.5 h-3.5", loading && "animate-spin")} />
              Refresh
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/8 text-xs text-neutral-400 hover:text-rose-400 hover:bg-rose-500/5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign out
            </button>
          </div>
        </div>

        {/* Demo banner */}
        {data?._demo && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/8 border border-amber-500/20 mb-6"
          >
            <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-amber-300">Backend not connected</p>
              <p className="text-xs text-amber-500/80 mt-0.5">
                Set <code className="font-mono bg-amber-500/10 px-1 rounded">BACKEND_URL</code> and{" "}
                <code className="font-mono bg-amber-500/10 px-1 rounded">ADMIN_PASSWORD</code> in{" "}
                <code className="font-mono bg-amber-500/10 px-1 rounded">.env.local</code> to see real data.
                Analytics will populate once your FastAPI backend is deployed.
              </p>
            </div>
          </motion.div>
        )}

        {error && (
          <div className="flex items-center gap-2 p-4 rounded-xl bg-rose-500/8 border border-rose-500/20 mb-6">
            <AlertCircle className="w-4 h-4 text-rose-400" />
            <p className="text-sm text-rose-300">{error}</p>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl bg-white/4 border border-white/6 mb-6 w-fit">
          {(["overview", "contacts", "traffic"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all",
                activeTab === tab
                  ? "bg-brand-500 text-white shadow-sm"
                  : "text-neutral-400 hover:text-neutral-200"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading && !data ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="card p-5 h-28 shimmer" />
            ))}
          </div>
        ) : data ? (
          <>
            {/* ── OVERVIEW TAB ── */}
            {activeTab === "overview" && (
              <>
                {/* Stat cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <StatCard icon={Eye} label="Total Page Views" value={data.summary.totalPageViews.toLocaleString()} color="brand" delay={0} />
                  <StatCard icon={Users} label="Unique Visitors" value={data.summary.uniqueVisitors.toLocaleString()} color="emerald" delay={0.07} />
                  <StatCard icon={Mail} label="Contact Submissions" value={data.summary.contactSubmissions} color="violet" delay={0.14} />
                  <StatCard icon={Download} label="Resume Downloads" value={data.summary.resumeDownloads} color="amber" delay={0.21} />
                </div>

                {/* Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28 }}
                  className="card p-6 mb-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <BarChart2 className="w-4 h-4 text-brand-400" />
                      <h2 className="text-sm font-semibold text-neutral-200">Daily Traffic (14 days)</h2>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-neutral-600">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-sm bg-brand-500/30" />Page views
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/50" />Contacts
                      </span>
                    </div>
                  </div>
                  <MiniBarChart data={data.dailyViews} />
                </motion.div>

                {/* Top pages + referrers */}
                <div className="grid md:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="card p-6"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Globe className="w-4 h-4 text-brand-400" />
                      <h2 className="text-sm font-semibold text-neutral-200">Top Pages</h2>
                    </div>
                    <div className="space-y-3">
                      {data.topPages.map((page, i) => {
                        const maxViews = Math.max(...data.topPages.map((p) => p.views), 1);
                        return (
                          <div key={page.page}>
                            <div className="flex items-center justify-between text-xs mb-1">
                              <div className="flex items-center gap-2">
                                <span className="text-neutral-600 font-mono w-4 text-right">{i + 1}</span>
                                <span className="text-neutral-300 font-medium">{page.label}</span>
                                <span className="text-neutral-700 font-mono">{page.page}</span>
                              </div>
                              <span className="text-neutral-400 font-medium">{page.views.toLocaleString()}</span>
                            </div>
                            <div className="h-1 bg-white/4 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(page.views / maxViews) * 100}%` }}
                                transition={{ delay: 0.4 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="h-full bg-gradient-to-r from-brand-500 to-accent-500 rounded-full"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="card p-6"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-4 h-4 text-brand-400" />
                      <h2 className="text-sm font-semibold text-neutral-200">Traffic Sources</h2>
                    </div>
                    {data.referrers.length === 0 ? (
                      <div className="flex items-center justify-center h-32 text-neutral-700 text-sm">
                        No referrer data yet
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {data.referrers.map((r) => (
                          <div key={r.source} className="flex items-center justify-between py-2 border-b border-white/4 last:border-0">
                            <span className="text-sm text-neutral-300 truncate">{r.source || "Direct"}</span>
                            <span className="text-xs text-neutral-500 ml-2 shrink-0">{r.count} visits</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </div>
              </>
            )}

            {/* ── CONTACTS TAB ── */}
            {activeTab === "contacts" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="card overflow-hidden"
              >
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/6">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-brand-400" />
                    <h2 className="text-sm font-semibold text-neutral-200">Contact Submissions</h2>
                  </div>
                  <span className="text-xs text-neutral-600">{data.summary.contactSubmissions} total</span>
                </div>
                {data.recentContacts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-neutral-700">
                    <Mail className="w-8 h-8 mb-3 opacity-40" />
                    <p className="text-sm">No contact submissions yet</p>
                    <p className="text-xs mt-1 opacity-60">They&apos;ll appear here once the backend is connected</p>
                  </div>
                ) : (
                  <div className="divide-y divide-white/4">
                    {data.recentContacts.map((c) => (
                      <div key={c.id} className="px-6 py-4 hover:bg-white/2 transition-colors">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <span className="text-sm font-semibold text-neutral-200">{c.name}</span>
                            <span className="text-xs text-neutral-500 ml-2">{c.email}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-neutral-600 shrink-0">
                            <Clock className="w-3 h-3" />
                            {new Date(c.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        {c.subject && (
                          <p className="text-xs font-medium text-neutral-400 mb-1">{c.subject}</p>
                        )}
                        <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">{c.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* ── TRAFFIC TAB ── */}
            {activeTab === "traffic" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Session stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { icon: Eye, label: "Total Views", value: data.summary.totalPageViews.toLocaleString() },
                    { icon: Users, label: "Unique Visitors", value: data.summary.uniqueVisitors.toLocaleString() },
                    { icon: Clock, label: "Avg. Session", value: data.summary.avgSessionDuration },
                    { icon: Download, label: "Resume DLs", value: data.summary.resumeDownloads },
                    { icon: Mail, label: "Contacts", value: data.summary.contactSubmissions },
                  ].map((s, i) => (
                    <div key={s.label} className="card p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <s.icon className="w-3.5 h-3.5 text-brand-400" />
                        <span className="text-xs text-neutral-500">{s.label}</span>
                      </div>
                      <p className="text-xl font-bold text-neutral-100">{s.value}</p>
                    </div>
                  ))}
                </div>

                {/* Full daily table */}
                <div className="card overflow-hidden">
                  <div className="px-6 py-4 border-b border-white/6">
                    <h2 className="text-sm font-semibold text-neutral-200">Daily Breakdown (14 days)</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/4">
                          {["Date", "Page Views", "Contacts"].map((h) => (
                            <th key={h} className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/4">
                        {[...data.dailyViews].reverse().map((row) => (
                          <tr key={row.date} className="hover:bg-white/2 transition-colors">
                            <td className="px-6 py-3 text-neutral-400">{row.date}</td>
                            <td className="px-6 py-3 text-neutral-200 font-medium">{row.views}</td>
                            <td className="px-6 py-3">
                              {row.contacts > 0 ? (
                                <span className="text-emerald-400 font-medium">{row.contacts}</span>
                              ) : (
                                <span className="text-neutral-700">—</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}
