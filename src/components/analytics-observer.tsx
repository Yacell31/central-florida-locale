"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";
export function AnalyticsObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const parts = pathname.split("/");
    if (parts[1] === "insights" && parts[2])
      track("article_view", { contentId: parts[2] });
    if (parts[1] === "neighborhoods" && parts[2] && parts[2] !== "compare")
      track("community_view", { contentId: parts[2] });
    function click(e: MouseEvent) {
      const t = e.target;
      if (!(t instanceof Element)) return;
      const a = t.closest("a.button,a.header-cta");
      if (a) track("cta_click", { location: pathname });
    }
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, [pathname]);
  return null;
}
