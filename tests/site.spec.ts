import { test, expect } from "@playwright/test";
const routes = [
  "/",
  "/buy",
  "/sell",
  "/neighborhoods",
  "/neighborhoods/kissimmee",
  "/neighborhoods/st-cloud",
  "/neighborhoods/lake-nona",
  "/neighborhoods/winter-garden",
  "/neighborhoods/compare",
  "/insights",
  "/insights/homebuying-milestones",
  "/insights/understanding-hoa-cdd",
  "/insights/prepare-to-sell",
  "/insights/compare-neighborhoods",
  "/insights/investment-first-questions",
  "/resources",
  "/resources/90-day-homebuying-planner",
  "/resources/home-selling-checklist",
  "/resources/property-decision-matrix",
  "/resources/closing-costs-guide",
  "/resources/neighborhood-comparison-guide",
  "/resources/investor-deal-analyzer",
  "/resources/relocation-planning-guide",
  "/resources/new-construction-checklist",
  "/market",
  "/market/understanding-the-market",
  "/about",
  "/work-with-me",
  "/contact",
  "/live",
  "/edit",
  "/search",
  "/privacy",
  "/terms",
  "/accessibility",
  "/disclosures",
];
test("all routes render with one primary heading and intact images", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("h1"), route).toHaveCount(1);
    for (const img of await page.locator("img").all()) {
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          img.evaluate(
            (el) =>
              (el as HTMLImageElement).complete &&
              (el as HTMLImageElement).naturalWidth > 0,
          ),
        )
        .toBeTruthy();
    }
    await expect
      .poll(
        () =>
          page
            .locator("img")
            .evaluateAll((imgs) =>
              imgs.every(
                (img) =>
                  (img as HTMLImageElement).complete &&
                  (img as HTMLImageElement).naturalWidth > 0,
              ),
            ),
        { message: route },
      )
      .toBeTruthy();
  }
  expect(errors).toEqual([]);
});
test("unknown paths and content slugs return 404", async ({ page }) => {
  for (const path of [
    "/missing",
    "/neighborhoods/missing",
    "/resources/missing",
    "/insights/missing",
    "/market/missing",
    "/about/extra",
  ]) {
    const r = await page.goto(path);
    expect(r?.status(), path).toBe(404);
    await expect(
      page.getByRole("heading", { name: "Let’s find a clearer path." }),
    ).toBeVisible();
  }
});
test("search filters and empty state reset", async ({ page }) => {
  await page.goto("/search");
  await page.getByRole("searchbox").fill("Kissimmee");
  await expect(page.getByRole("status")).toHaveText("1 result for “Kissimmee”");
  await page.getByRole("link", { name: /Osceola County Kissimmee/ }).click();
  await expect(page).toHaveURL(/neighborhoods\/kissimmee/);
  await page.goto("/insights");
  await page.getByRole("button", { name: "Selling", exact: true }).click();
  await expect(page.locator(".insight-card")).toHaveCount(1);
  await page.getByRole("searchbox").fill("unfindablequery");
  await expect(page.getByText("A different search might help.")).toBeVisible();
  await page.getByRole("button", { name: "Reset Search" }).click();
  await expect(page.locator(".insight-card")).toHaveCount(5);
});
test("comparison preserves selection and rejects identical choices", async ({
  page,
}) => {
  await page.goto("/neighborhoods/compare?a=lake-nona&b=winter-garden");
  await expect(page.locator("thead")).toContainText("Lake Nona");
  await expect(page.locator("thead")).toContainText("Winter Garden");
  await page.getByRole("combobox").nth(0).selectOption("st-cloud");
  await expect(page).toHaveURL(/a=st-cloud&b=winter-garden/);
  await page.reload();
  await expect(page.locator("thead")).toContainText("St. Cloud");
  await page.getByRole("combobox").nth(1).selectOption("st-cloud");
  await expect(
    page.getByText("Let’s look at two different places."),
  ).toBeVisible();
});
test("contact and newsletter failures are honest and preserve fields", async ({
  page,
}) => {
  await page.goto("/contact?service=selling&source=test");
  await expect(page.locator("select[name=service]")).toHaveValue("selling");
  await page.getByLabel("Full name").fill("Test Person");
  await page
    .getByLabel("Email address", { exact: true })
    .fill("test@example.com");
  await page
    .locator("textarea")
    .fill("I would like to understand my selling timeline.");
  await page.getByRole("checkbox").first().check();
  await page.getByRole("button", { name: "Send Your Message" }).click();
  await expect(page.locator(".form-error")).toContainText(
    "has not been sent or saved",
  );
  await expect(page.getByLabel("Full name")).toHaveValue("Test Person");
  await page.goto("/edit");
  await page
    .getByLabel("Email address", { exact: true })
    .fill("test@example.com");
  await page.getByRole("button", { name: "Join The Edit" }).click();
  await expect(page.locator(".form-error")).toContainText(
    "has not been saved or subscribed",
  );
});
test("resource downloads contain actual useful content", async ({
  request,
}) => {
  for (const slug of [
    "90-day-homebuying-planner",
    "home-selling-checklist",
    "property-decision-matrix",
    "closing-costs-guide",
    "neighborhood-comparison-guide",
    "relocation-planning-guide",
    "new-construction-checklist",
  ]) {
    const r = await request.get(`/downloads/${slug}.txt`);
    expect(r.status()).toBe(200);
    const text = await r.text();
    expect(text).toContain("CENTRAL FLORIDA LOCALE");
    expect(text.length).toBeGreaterThan(750);
  }
});
test("server rejects malformed requests and fake consent", async ({
  request,
}) => {
  expect(
    (
      await request.post("/api/leads", {
        data: { kind: "newsletter", email: "bad" },
      })
    ).status(),
  ).toBe(400);
  expect(
    (
      await request.post("/api/leads", {
        data: {
          kind: "contact",
          email: "test@example.com",
          name: "Test",
          details: "test",
        },
      })
    ).status(),
  ).toBe(400);
  expect(
    (
      await request.post("/api/leads", {
        headers: { origin: "https://unrelated.test" },
        data: { kind: "newsletter", email: "test@example.com" },
      })
    ).status(),
  ).toBe(403);
  expect(
    (
      await request.post("/api/leads", {
        data: {
          kind: "newsletter",
          email: "test@example.com",
          website: "spam",
        },
      })
    ).status(),
  ).toBe(400);
});
test("mobile menu focus, Escape and responsive layouts", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByRole("dialog").getByRole("link", { name: "Buy", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeFocused();
  for (const width of [375, 430, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      "/",
      "/buy",
      "/neighborhoods/compare",
      "/contact",
      "/resources/90-day-homebuying-planner",
    ]) {
      await page.goto(path);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${path} at ${width}px`,
      ).toBeTruthy();
    }
  }
});
test("homepage links, metadata and staging indexing are correct", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Central Florida Locale/);
  await expect(page.locator("link[rel=canonical]")).toHaveAttribute(
    "href",
    "https://centralfloridalocale.com",
  );
  await expect(page.locator("meta[name=robots]")).toHaveAttribute(
    "content",
    /noindex/,
  );
  const r = await request.get("/robots.txt");
  expect(await r.text()).toContain("Disallow: /");
  const hrefs = await page
    .locator("a")
    .evaluateAll((as) =>
      Array.from(
        new Set(
          as
            .map((a) => a.getAttribute("href"))
            .filter((h): h is string => Boolean(h?.startsWith("/"))),
        ),
      ),
    );
  for (const href of hrefs) {
    const r = await request.get(href);
    expect(r.status(), href).toBeLessThan(400);
  }
});
test("capture desktop and mobile homepage", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  for (const img of await page.locator("img").all())
    await img.scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: "/tmp/locale-desktop.png", fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "/tmp/locale-mobile.png", fullPage: true });
});
