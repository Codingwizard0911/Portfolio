"use client";

import { useState } from "react";
import { Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/shared/SocialIcons";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeader from "@/components/shared/SectionHeader";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "umapathiu0911@gmail.com",
    href: "mailto:umapathiu0911@gmail.com",
    description: "Best for opportunities and serious enquiries",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "linkedin.com/in/umapathi-r",
    href: "https://linkedin.com/in/umapathi-r",
    description: "Connect professionally",
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    value: "github.com/umapathiu0911",
    href: "https://github.com/umapathiu0911",
    description: "See the code behind the work",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="pt-24 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <AnimatedSection className="mb-16">
          <SectionHeader
            label="Contact"
            title="Let's work together"
            description="Open to full-time roles in Full Stack, Backend, AI/ML, and Data Engineering. I respond to every message."
          />
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: info */}
          <AnimatedSection delay={0.1} className="lg:col-span-2">
            <div className="space-y-4">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="card p-5 flex items-start gap-4 block group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center shrink-0 group-hover:bg-brand-500/15 transition-colors">
                    <link.icon className="w-4.5 h-4.5 text-brand-400" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500 mb-0.5">{link.label}</div>
                    <div className="text-sm font-medium text-neutral-200 group-hover:text-brand-300 transition-colors">
                      {link.value}
                    </div>
                    <div className="text-xs text-neutral-600 mt-0.5">{link.description}</div>
                  </div>
                </a>
              ))}

              <div className="card p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-neutral-400" />
                </div>
                <div>
                  <div className="text-xs text-neutral-500 mb-0.5">Location</div>
                  <div className="text-sm font-medium text-neutral-200">
                    Dharmapuri, Tamil Nadu
                  </div>
                  <div className="text-xs text-emerald-500 mt-0.5">Open to remote globally</div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: form */}
          <AnimatedSection delay={0.15} className="lg:col-span-3">
            {status === "success" ? (
              <div className="card p-10 text-center h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-100 mb-2">Message sent!</h3>
                <p className="text-sm text-neutral-400">
                  Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-neutral-400 font-medium block mb-2">
                      Name <span className="text-brand-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full bg-white/4 border border-white/8 rounded-lg px-4 py-2.5 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-brand-500/50 focus:bg-white/6 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-400 font-medium block mb-2">
                      Email <span className="text-brand-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@company.com"
                      className="w-full bg-white/4 border border-white/8 rounded-lg px-4 py-2.5 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-brand-500/50 focus:bg-white/6 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-neutral-400 font-medium block mb-2">Subject</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Job opportunity, collaboration, etc."
                    className="w-full bg-white/4 border border-white/8 rounded-lg px-4 py-2.5 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-brand-500/50 focus:bg-white/6 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs text-neutral-400 font-medium block mb-2">
                    Message <span className="text-brand-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about the role, project, or what you have in mind..."
                    className="w-full bg-white/4 border border-white/8 rounded-lg px-4 py-2.5 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-brand-500/50 focus:bg-white/6 transition-colors resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-xs text-rose-400">
                    Something went wrong. Please email me directly at umapathiu0911@gmail.com
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send message
                    </>
                  )}
                </button>
              </form>
            )}
          </AnimatedSection>
        </div>

      </div>
    </div>
  );
}
