import { isIndexable } from "@/lib/indexing";
import { site } from "@/lib/content";
import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(isIndexable
        ? { allow: "/", disallow: ["/api/", "/search", "/keystatic/"] }
        : { disallow: "/" }),
    },
    sitemap: site.url + "/sitemap.xml",
  };
}
