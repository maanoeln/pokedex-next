"use client";

import { ReactNode, useEffect } from "react";

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    document.documentElement.setAttribute("data-theme", saved || "dark");
  }, []);

  return <>{children}</>;
}
