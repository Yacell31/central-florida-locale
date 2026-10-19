import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("key pages have no detectable WCAG A/AA violations", async ({ page }) => {
  for (const path of [
    "/",
    "/contact",
    "/neighborhoods/compare",
    "/resources/90-day-homebuying-planner",
    "/insights/homebuying-milestones",
  ]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
      path,
    ).toEqual([]);
  }
});
