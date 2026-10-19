import { Newsletter } from "@/components/forms";
import { StructuredData } from "@/components/structured-data";
import {
  Breadcrumbs,
  Button,
  Eyebrow,
  InsightCard,
  ResourceCard,
  Notice,
  Photo,
  SectionTitle,
} from "@/components/ui";
import { articles, resources, communities } from "@/lib/content";
import { notFound } from "next/navigation";
export function Article({ slug }: { slug: string }) {
  const a = articles.find((a) => a.slug === slug);
  if (!a) notFound();
  return (
    <>
      <Breadcrumbs
        items={[{ label: "Insights", href: "/insights" }, { label: a.title }]}
      />
      <article className="container">
        <StructuredData
          data={{
            "@context": "https://schema.org",
            "@type": "Article",
            headline: a.title,
            description: a.description,
            author: { "@type": "Organization", name: a.author },
            image: "https://centralfloridalocale.com" + a.image,
            mainEntityOfPage:
              "https://centralfloridalocale.com/insights/" + a.slug,
            ...(a.publishedAt ? { datePublished: a.publishedAt } : {}),
            ...(a.updatedAt ? { dateModified: a.updatedAt } : {}),
          }}
        />
        <header className="article-top">
          <Eyebrow>
            {a.category} · {a.read}
          </Eyebrow>
          <h1>{a.title}</h1>
          <p>{a.description}</p>
          <div className="article-meta">
            By {a.author} ·{" "}
            {a.publishedAt ? `Published ${a.publishedAt}` : "Educational guide"}
            {a.updatedAt ? ` · Updated ${a.updatedAt}` : ""}
          </div>
        </header>
        <Photo className="article-hero" src={a.image} />
        <div className="article-layout">
          <aside className="toc">
            <p>IN THIS GUIDE</p>
            {a.sections.map((s, i) => (
              <a href={`#section-${i}`} key={s.title}>
                {s.title}
              </a>
            ))}
          </aside>
          <div className="article-body">
            {a.sections.map((s, i) => (
              <section key={s.title} id={`section-${i}`}>
                <h2>{s.title}</h2>
                <p>{s.body}</p>
              </section>
            ))}
            <Notice>
              General educational information, not individualized legal, tax,
              financial or lending advice. Verify current requirements with
              qualified professionals.
            </Notice>
            <div className="sidebar">
              <h3>Turn what you’ve learned into a plan.</h3>
              <p>
                Our free resources help you organize the questions and decisions
                ahead.
              </p>
              <Button
                href={
                  a.category === "Selling"
                    ? "/resources/home-selling-checklist"
                    : "/resources/90-day-homebuying-planner"
                }
              >
                Find Your Next Step
              </Button>
            </div>
          </div>
        </div>
      </article>
      <section className="section container">
        <SectionTitle title="Keep the questions coming." />
        <div className="insight-grid">
          {articles
            .filter((x) => x.slug !== a.slug)
            .slice(0, 3)
            .map((x) => (
              <InsightCard key={x.slug} article={x} />
            ))}
        </div>
      </section>
      <section className="container content-section">
        <SectionTitle title="Put your perspective into practice." />
        <div className="resource-grid">
          {resources
            .filter((r) => a.relatedResources.includes(r.slug))
            .map((r, i) => (
              <ResourceCard resource={r} index={i} key={r.slug} />
            ))}
        </div>
        <p className="quiet-note">
          Explore related communities:{" "}
          {communities
            .filter((c) => a.relatedCommunities.includes(c.slug))
            .map((c) => (
              <a
                key={c.slug}
                href={`/neighborhoods/${c.slug}`}
                style={{ textDecoration: "underline", marginRight: 15 }}
              >
                {c.name}
              </a>
            ))}
        </p>
      </section>
      <Newsletter />
    </>
  );
}
