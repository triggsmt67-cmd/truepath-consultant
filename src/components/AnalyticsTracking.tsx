"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getContentGroup, trackEvent } from "@/lib/analytics";

export default function AnalyticsTracking() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    const group = getContentGroup(pathname);
    if (group === "Money pages") trackEvent("money_page_view");
    if (group === "Blog posts") trackEvent("blog_post_view");
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("a[href]");
      const href = link?.getAttribute("href") || "";
      const name = /^tel:/i.test(href) ? "phone_click" : /^mailto:/i.test(href) ? "email_click" : null;
      if (!name || !link) return;
      const link_position = link.closest("footer") ? "footer" : link.closest("header, nav") ? "header" : "content";
      trackEvent(name, { link_position });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
