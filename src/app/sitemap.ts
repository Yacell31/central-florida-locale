import { isIndexable } from "@/lib/indexing";
import { articles, communities, resources, reports, site } from "@/lib/content";
import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexable) return [];
  const paths = [
    "",
    "buy",
    "sell",
    "neighborhoods",
    "neighborhoods/compare",
    "insights",
    "resources",
    "market",
    ...reports.map((r) => "market/" + r.slug),
    "about",
    "work-with-me",
    "contact",
    "live",
    "edit",
    ...communities
      .filter((c) => c.status === "published")
      .map((c) => "neighborhoods/" + c.slug),
    ...articles.map((a) => "insights/" + a.slug),
    ...resources.map((r) => "resources/" + r.slug),
  ];
  return paths.map((p) => ({ url: site.url + "/" + p }));
}
