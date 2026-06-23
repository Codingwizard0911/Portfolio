import type { Metadata } from "next";
import { Building2, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeader from "@/components/shared/SectionHeader";
import TechBadge from "@/components/shared/TechBadge";
import { experience } from "@/lib/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Professional experience of Umapathi R — Full Stack Developer at Vaken Technologies, building scalable applications with REST APIs and AWS.",
};

export default function ExperiencePage() {
  return (
    <div className="pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <AnimatedSection className="mb-16">
          <SectionHeader
            label="Experience"
            title="Professional history"
            description="Where I've worked and what I've shipped."
          />
        </AnimatedSection>

        {/* Leadership highlight */}
        <AnimatedSection delay={0.05} className="mb-6">
          <div className="text-xs text-neutral-500 uppercase tracking-widest font-medium mb-4">
            Industry Experience
          </div>
        </AnimatedSection>

        {experience.map((job, i) => (
          <AnimatedSection key={job.id} delay={0.1 + i * 0.1} className="mb-12">
            <div className="card p-8">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className="w-4 h-4 text-brand-400" />
                    <h2 className="text-xl font-bold text-neutral-50">{job.company}</h2>
                    {job.endDate === "Present" && (
                      <span className="badge-brand">Current</span>
                    )}
                  </div>
                  <h3 className="text-base font-medium text-brand-300 mb-2">{job.role}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {job.startDate} – {job.endDate}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/8 capitalize">
                      {job.type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="mb-6">
                <p className="text-xs text-neutral-500 uppercase tracking-wider font-medium mb-3">
                  Key Contributions
                </p>
                <div className="space-y-2">
                  {job.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-400 mt-0.5 shrink-0" />
                      <span className="text-sm text-neutral-200">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Responsibilities */}
              <div className="mb-6">
                <p className="text-xs text-neutral-500 uppercase tracking-wider font-medium mb-3">
                  Responsibilities
                </p>
                <ul className="space-y-2.5">
                  {job.description.map((desc, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-neutral-600 mt-2 shrink-0" />
                      <span className="text-sm text-neutral-400 leading-relaxed">{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div>
                <p className="text-xs text-neutral-500 uppercase tracking-wider font-medium mb-3">
                  Technologies Used
                </p>
                <div className="flex flex-wrap gap-2">
                  {job.technologies.map((tech) => (
                    <TechBadge key={tech} name={tech} variant="brand" />
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}

        {/* Leadership */}
        <AnimatedSection delay={0.2} className="mb-6">
          <div className="text-xs text-neutral-500 uppercase tracking-widest font-medium mb-4">
            Leadership & Activities
          </div>
        </AnimatedSection>

        {[
          {
            title: "Head of Department Events",
            org: "National Level Technical Symposium",
            location: "R P Sarathy Institute of Technology",
            date: "February 2025",
            points: [
              "Coordinated technical events for a national-level symposium",
              "Managed and led student volunteer teams across departments",
              "Organized event scheduling and logistics end-to-end",
            ],
          },
          {
            title: "Department Coordinator",
            org: "Intra College Sports Day",
            location: "R P Sarathy Institute of Technology",
            date: "December 2023 – January 2024",
            points: [
              "Managed event scheduling and logistics for inter-department sports day",
              "Coordinated team formation, registration, and competition brackets",
            ],
          },
        ].map((item, i) => (
          <AnimatedSection key={i} delay={0.25 + i * 0.1} className="mb-4">
            <div className="card p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-neutral-100">{item.title}</h3>
                  <p className="text-xs text-neutral-400 mt-0.5">{item.org} · {item.location}</p>
                </div>
                <span className="text-xs text-neutral-600 shrink-0">{item.date}</span>
              </div>
              <ul className="space-y-1.5">
                {item.points.map((p, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-neutral-600 mt-2 shrink-0" />
                    <span className="text-xs text-neutral-500">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        ))}

        {/* Certifications */}
        <AnimatedSection delay={0.4} className="mt-12">
          <div className="text-xs text-neutral-500 uppercase tracking-widest font-medium mb-4">
            Certifications
          </div>
          <div className="card p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-100">
                Data Science and Machine Learning
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">Coding Ninjas</p>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}
