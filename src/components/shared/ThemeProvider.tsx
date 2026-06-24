"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

export type Theme = "dark" | "light";
export type Accent = "blue" | "purple" | "green" | "orange";

interface ThemeCtx {
  theme: Theme;
  accent: Accent;
  setTheme: (t: Theme) => void;
  setAccent: (a: Accent) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeCtx>({
  theme: "dark",
  accent: "blue",
  setTheme: () => {},
  setAccent: () => {},
  toggleTheme: () => {},
});

export function useTheme() { return useContext(ThemeContext); }

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [accent, setAccentState] = useState<Accent>("blue");

  // Sync from localStorage after first paint — never blocks render
  useEffect(() => {
    const t = (localStorage.getItem("pf-theme") as Theme) || "dark";
    const a = (localStorage.getItem("pf-accent") as Accent) || "blue";
    if (t !== "dark") {
      setThemeState(t);
      document.documentElement.setAttribute("data-theme", t);
    }
    if (a !== "blue") {
      setAccentState(a);
      document.documentElement.setAttribute("data-accent", a);
    }
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("pf-theme", t);
  }, []);

  const setAccent = useCallback((a: Accent) => {
    setAccentState(a);
    document.documentElement.setAttribute("data-accent", a);
    localStorage.setItem("pf-accent", a);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, accent, setTheme, setAccent, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
