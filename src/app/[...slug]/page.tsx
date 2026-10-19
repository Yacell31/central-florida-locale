import { MarketReport } from "@/components/pages/market-report";
import { LiveSessions } from "@/components/live-sessions";
import { Comparison, Explorer } from "@/components/explore";
import { LeadForm, Newsletter } from "@/components/forms";
import { About } from "@/components/pages/about";
import { Article } from "@/components/pages/article";
import { Community } from "@/components/pages/community";
import { legal } from "@/components/pages/legal";
import { Resource } from "@/components/pages/resource";
import { ServiceHub } from "@/components/pages/services";
import { Work } from "@/components/pages/work";
import {
  Button,
  Eyebrow,
  FinalCTA,
  InsightCard,
  Notice,
  PageHero,
  Photo,
  SectionTitle,
} from "@/components/ui";
import { articles, communities, resources, reports } from "@/lib/content";
import { titles, descriptions } from "@/lib/page-titles";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
type Props = {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<Record<string, string | undefined>>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug = [] } = await params;
  const path = slug.join("/");
  let title: string | undefined = titles[path];
  let description =
    descriptions[path] ||
    "Education, local perspective and a thoughtfully planned next step in Central Florida.";
  if (slug[0] === "neighborhoods" && slug.length === 2)
    title =
      slug[1] === "compare"
        ? "Compare Central Florida Communities"
        : communities.find((c) => c.slug === slug[1])?.name +
          " Community Guide";
  if (slug[0] === "insights" && slug.length === 2) {
    const a = articles.find((a) => a.slug === slug[1]);
    title = a?.title;
    description = a?.description || description;
  }
  if (slug[0] === "resources" && slug.length === 2) {
    const r = resources.find((r) => r.slug === slug[1]);
    title = r?.title;
    description = r?.description || description;
  }
  if (slug[0] === "market" && slug.length === 2) {
    const report = reports.find((r) => r.slug === slug[1]);
    title = report?.title;
    description = report?.description || description;
  }
  return {
    title: title || "Page Not Found",
    description,
    alternates: { canonical: "/" + path },
    ...(["search", "privacy", "terms", "disclosures"].includes(path)
      ? { robots: { index: false, follow: true } }
      : {}),
  };
}
export const dynamicParams = false;
export function generateStaticParams() {
  return [
    ...Object.keys(titles).map((p) => ({ slug: [p] })),
    { slug: ["neighborhoods", "compare"] },
    ...reports.map((r) => ({ slug: ["market", r.slug] })),
    ...communities.map((c) => ({ slug: ["neighborhoods", c.slug] })),
    ...articles.map((a) => ({ slug: ["insights", a.slug] })),
    ...resources.map((r) => ({ slug: ["resources", r.slug] })),
  ];
}
export default async function ContentPage({ params, searchParams }: Props) {
  const { slug = [] } = await params;
  const q = await searchParams;
  const [path, detail] = slug;
  if (slug.length > 2) notFound();
  if (detail) {
    if (path === "neighborhoods")
      return detail === "compare" ? (
        <>
          <PageHero
            eyebrow="Perspective, side by side"
            title="Which community fits your goals?"
            text="Compare the questions and tradeoffs that matter to you. There is no universal winner—just a better-informed next step."
          />
          <section className="container content-section">
            <Comparison />
          </section>
          <FinalCTA />
        </>
      ) : (
        <Community slug={detail} />
      );
    if (path === "insights") return <Article slug={detail} />;
    if (path === "resources") return <Resource slug={detail} />;
    if (path === "market") return <MarketReport slug={detail} />;
    notFound();
  }
  if (path === "buy" || path === "sell")
    return <ServiceHub sell={path === "sell"} />;
  if (
    path === "neighborhoods" ||
    path === "insights" ||
    path === "resources" ||
    path === "search"
  )
    return (
      <>
        <PageHero
          eyebrow={
            path === "neighborhoods"
              ? "Find your sense of place"
              : path === "insights"
                ? "A more informed perspective"
                : path === "resources"
                  ? "Less guesswork. More clarity."
                  : "Explore Central Florida Locale"
          }
          title={titles[path]}
          text={
            path === "neighborhoods"
              ? "In-depth research frameworks to help you understand each community, compare your options and find the right fit for your goals."
              : path === "insights"
                ? "Educational guides, practical questions and thoughtful perspectives for your next real estate decision."
                : path === "resources"
                  ? "Free planning tools to help you organize the questions, decisions and details of your next move."
                  : "Search neighborhoods, educational insights and practical planning resources."
          }
        />
        <section className="container section">
          <Explorer
            type={
              path === "neighborhoods"
                ? "communities"
                : path === "insights"
                  ? "articles"
                  : path === "resources"
                    ? "resources"
                    : "all"
            }
          />
        </section>
        <Newsletter />
      </>
    );
  if (path === "about") return <About />;
  if (path === "work-with-me")
    return <Work service={q.service} source={q.source} />;
  if (path === "contact")
    return (
      <>
        <PageHero
          eyebrow="A useful first conversation"
          title={titles.contact}
          text="Have a question, a decision ahead or a plan taking shape? Start with what is on your mind."
        />
        <section className="container content-section contact-layout">
          <div>
            <Eyebrow>Good questions welcome</Eyebrow>
            <h2>Clarity starts with a conversation.</h2>
            <p>
              Buying, selling, investing or relocating—tell me what you would
              like to understand, and what a useful next step would look like.
            </p>
            <div className="contact-note">
              <h3>Prefer a planning conversation?</h3>
              <p>
                Choose the path that fits your goals and start with a short
                questionnaire.
              </p>
              <div style={{ marginTop: 20 }}>
                <Button href="/work-with-me" secondary>
                  Plan a Consultation
                </Button>
              </div>
            </div>
            <Notice>
              A verified business contact and message-delivery service are
              pending configuration. This form will not show success until
              delivery is connected.
            </Notice>
          </div>
          <LeadForm
            kind="contact"
            defaultService={q.service}
            source={q.source || "contact"}
          />
        </section>
      </>
    );
  if (path === "market")
    return (
      <>
        <PageHero
          eyebrow="Context for your decisions"
          title={titles.market}
          text="Understand the measures behind the headlines—and what to ask before applying them to your own plans."
        />
        <section className="container content-section">
          <Notice>
            Verified current market data is not connected. No figures below are
            estimates or sample statistics.
          </Notice>
          <div className="metric-grid">
            {[
              "Median Sale Price",
              "Days on Market",
              "Sale-to-List Ratio",
              "Months of Inventory",
            ].map((t) => (
              <div key={t}>
                <strong>—</strong>
                <span>{t}</span>
                <p className="quiet-note">Awaiting verified data</p>
              </div>
            ))}
          </div>
          <div className="info-grid">
            {[
              [
                "For buyers",
                "Use broad trends as context, then investigate the condition, costs and terms of a specific property.",
              ],
              [
                "For sellers",
                "Compare relevant properties and current competition. A broad median is not a valuation of your home.",
              ],
              [
                "For your neighborhood",
                "Check geography, property type and reporting period before comparing one report with another.",
              ],
            ].map(([t, d]) => (
              <div key={t}>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
          <Button href="/market/understanding-the-market">
            Learn to Read a Market Report
          </Button>
        </section>
        <FinalCTA />
      </>
    );
  if (path === "live")
    return (
      <>
        <PageHero
          eyebrow="Real questions. Practical guidance."
          title="Locale Live"
          text="Live conversations about buying, selling, investing and planning your next move in Central Florida."
          image="/images/interior.jpg"
        >
          <span className="text-link">#AskMeAnythingRealEstate</span>
        </PageHero>
        <section className="container content-section">
          <LiveSessions />
          <div style={{ marginTop: 30 }}>
            <Button href="/contact?source=locale-live">
              Suggest a Question
            </Button>
          </div>
        </section>
        <section className="resources-section">
          <div className="container">
            <SectionTitle title="A little reading while you wait." />
            <div className="insight-grid">
              {articles.slice(0, 3).map((a) => (
                <InsightCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
        <Newsletter />
      </>
    );
  if (path === "edit")
    return (
      <>
        <PageHero
          eyebrow="Your thoughtful local read"
          title="The Central Florida Edit"
          text="Curated real estate insights, neighborhood updates and practical tips—delivered to your inbox."
        />
        <section className="container content-section two-column">
          <div className="newsletter-preview">
            <div className="newsletter-paper">
              <p>CENTRAL FLORIDA LOCALE · PREVIEW</p>
              <h3>
                The Central
                <br />
                Florida Edit.
              </h3>
              <Photo src="/images/home.png" />
              <p>A little local perspective. A clearer next step.</p>
            </div>
          </div>
          <div>
            <Eyebrow>A little knowledge goes a long way</Eyebrow>
            <h2>A thoughtful inbox starts here.</h2>
            <div className="prose" style={{ marginBlock: 25 }}>
              <p>
                Market context without the noise. Questions worth asking. Useful
                tools you can come back to.
              </p>
              <ul>
                {[
                  "Market updates with context",
                  "Neighborhood research and insights",
                  "Practical buying and selling guidance",
                  "Upcoming conversations and events",
                  "Resources for your next chapter",
                ].map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <LeadForm kind="newsletter" source="edit-landing" />
            <p className="quiet-note">
              Subscription delivery is pending provider configuration.
            </p>
          </div>
        </section>
      </>
    );
  if (legal[path]) {
    const l = legal[path];
    return (
      <>
        <PageHero
          eyebrow="A clear and considered experience"
          title={titles[path]}
          text={l.intro}
        />
        <section className="container content-section prose">
          <div className="legal-banner">
            Draft for owner review · Complete before public launch
          </div>
          {l.sections.map(([t, d]) => (
            <section key={t}>
              <h2>{t}</h2>
              <p>{d}</p>
            </section>
          ))}
        </section>
      </>
    );
  }
  notFound();
}
