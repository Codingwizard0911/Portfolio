"use client";

import { useEffect, useState } from "react";
import { Star, GitFork, Code2 } from "lucide-react";
import { GithubIcon } from "./SocialIcons";

interface Repo { name: string; stars: number; forks: number; language: string | null; html_url: string; }
interface UserStats { public_repos: number; followers: number; }

const LANG_COLOR: Record<string, string> = {
  Python: "#3776ab", JavaScript: "#f7df1e", TypeScript: "#3178c6",
  Vue: "#42b883", HTML: "#e34c26", CSS: "#264de4",
};

export default function GitHubStats({ username = "Codingwizard0911" }: { username?: string }) {
  const [user, setUser] = useState<UserStats | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers: { Accept: "application/vnd.github.v3+json" } }).then((r) => r.json()),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`, { headers: { Accept: "application/vnd.github.v3+json" } }).then((r) => r.json()),
    ])
      .then(([u, r]) => {
        if (u.message) { setError(true); return; }
        setUser(u);
        if (Array.isArray(r)) {
          setRepos(r.map((repo: Record<string, unknown>) => ({
            name: repo.name as string,
            stars: repo.stargazers_count as number,
            forks: repo.forks_count as number,
            language: repo.language as string | null,
            html_url: repo.html_url as string,
          })));
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [username]);

  if (error) return null;

  if (loading) {
    return (
      <div className="card p-5 space-y-3">
        <div className="h-3 w-24 rounded bg-white/6 animate-pulse" />
        <div className="grid grid-cols-2 gap-3">
          {[0, 1].map((i) => <div key={i} className="h-12 rounded-lg bg-white/4 animate-pulse" />)}
        </div>
        <div className="space-y-2">
          {[0, 1, 2].map((i) => <div key={i} className="h-8 rounded bg-white/4 animate-pulse" />)}
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <GithubIcon className="w-4 h-4 text-neutral-400" />
          <span className="text-xs font-semibold text-neutral-300">@{username}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-neutral-600">live</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white/3 rounded-lg px-3 py-2.5 text-center border border-white/5">
          <div className="text-xl font-bold text-gradient-brand">{user.public_repos}</div>
          <div className="text-[10px] text-neutral-600 mt-0.5">Repositories</div>
        </div>
        <div className="bg-white/3 rounded-lg px-3 py-2.5 text-center border border-white/5">
          <div className="text-xl font-bold text-gradient-brand">{user.followers}</div>
          <div className="text-[10px] text-neutral-600 mt-0.5">Followers</div>
        </div>
      </div>

      {repos.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-[10px] text-neutral-600 uppercase tracking-widest font-medium mb-2">Recent repos</p>
          {repos.map((r) => (
            <a
              key={r.name}
              href={r.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-1.5 hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-2 min-w-0">
                {r.language && (
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: LANG_COLOR[r.language] ?? "#888" }}
                  />
                )}
                <span className="text-[11px] text-neutral-400 truncate">{r.name}</span>
              </div>
              <div className="flex items-center gap-2.5 text-[10px] text-neutral-600 shrink-0 ml-2">
                <span className="flex items-center gap-0.5"><Star className="w-2.5 h-2.5" />{r.stars}</span>
                <span className="flex items-center gap-0.5"><GitFork className="w-2.5 h-2.5" />{r.forks}</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
