import Link from "next/link";
import { Mail, Terminal } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/shared/SocialIcons";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

const footerLinks: Record<string, FooterLink[]> = {
  work: [
    { label: "Experience", href: "/experience" },
    { label: "Projects", href: "/projects" },
    { label: "Publications", href: "/publications" },
    { label: "Tech Stack", href: "/tech-stack" },
  ],
  explore: [
    { label: "AI Lab", href: "/ai-lab" },
    { label: "Blog", href: "/blog" },
    { label: "Architecture", href: "/architecture" },
    { label: "Resume", href: "/resume" },
  ],
  connect: [
    { label: "Contact", href: "/contact" },
    { label: "GitHub", href: "https://github.com/umapathiu0911", external: true },
    { label: "LinkedIn", href: "https://linkedin.com/in/umapathi-r", external: true },
    { label: "Email", href: "mailto:umapathiu0911@gmail.com", external: true },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
                <Terminal className="w-4 h-4 text-brand-400" />
              </div>
              <span className="font-semibold text-neutral-50">
                umapathi<span className="text-brand-400">.</span>dev
              </span>
            </Link>
            <p className="text-sm text-neutral-500 leading-relaxed max-w-xs">
              Full Stack Engineer & Published ML Researcher. Building data-driven products at the intersection of software and intelligence.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://github.com/umapathiu0911"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-neutral-400 hover:text-white hover:bg-white/8 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/umapathi-r"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-neutral-400 hover:text-white hover:bg-white/8 transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:umapathiu0911@gmail.com"
                aria-label="Send email"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-neutral-400 hover:text-white hover:bg-white/8 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-4">
                {group}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()} Umapathi R. Built with Next.js, TypeScript & Tailwind CSS.
          </p>
          <p className="text-xs text-neutral-600">
            Dharmapuri, Tamil Nadu · Available for opportunities
          </p>
        </div>
      </div>
    </footer>
  );
}
