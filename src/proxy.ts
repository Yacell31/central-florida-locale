import { articles, communities, resources, reports } from "@/lib/content";
import { titles } from "@/lib/page-titles";
import { NextResponse, type NextRequest } from "next/server";
const pages = new Set([
  "/",
  ...Object.keys(titles).map((t) => "/" + t),
  "/neighborhoods/compare",
  ...reports.map((r) => "/market/" + r.slug),
  ...communities.map((c) => "/neighborhoods/" + c.slug),
  ...articles.map((a) => "/insights/" + a.slug),
  ...resources.map((r) => "/resources/" + r.slug),
]);
export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (
    pages.has(path) ||
    path.startsWith("/api/") ||
    path.startsWith("/downloads/") ||
    path.startsWith("/images/") ||
    path === "/robots.txt" ||
    path === "/sitemap.xml" ||
    path === "/favicon.ico" ||
    path === "/icon.svg" ||
    path.startsWith("/licenses/")
  )
    return NextResponse.next();
  return NextResponse.rewrite(new URL("/_not-found", request.url), {
    status: 404,
  });
}
export const config = { matcher: ["/((?!_next/|_not-found).*)"] };
