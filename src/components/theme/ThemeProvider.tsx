"use client";

import { useEffect } from "react";

const themeScript = `
(() => {
  try {
    const stored = localStorage.getItem("catalog-theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = stored || (systemDark ? "dark" : "light");
    document.documentElement.dataset.theme = theme;
  } catch {
    document.documentElement.dataset.theme = "light";
  }
})();
`;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!document.documentElement.dataset.theme) {
      document.documentElement.dataset.theme = "light";
    }
  }, []);

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      {children}
    </>
  );
}
