import { notFound } from "next/navigation";
import { reports } from "@/lib/content";
import { PageHero, Notice, Button, Breadcrumbs } from "@/components/ui";
export function MarketReport({ slug }: { slug: string }) {
  const report = reports.find((r) => r.slug === slug);
  if (!report) notFound();
  const metrics = report.metrics;
  return (
    <>
      <Breadcrumbs
        items={[{ label: "Market", href: "/market" }, { label: report.title }]}
      />
      <PageHero
        eyebrow="Context for your decisions"
        title={report.title}
        text={report.description}
      />
      <section className="container content-section">
        {metrics && (
          <>
            <p className="eyebrow">
              {metrics.geography} · {metrics.period}
            </p>
            <div className="metric-grid">
              {[
                [
                  "Median Sale Price",
                  metrics.medianSalePrice === null
                    ? "—"
                    : new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0,
                      }).format(metrics.medianSalePrice),
                ],
                ["Days on Market", metrics.daysOnMarket ?? "—"],
                [
                  "Sale-to-List Ratio",
                  metrics.saleToListRatio === null
                    ? "—"
                    : metrics.saleToListRatio + "%",
                ],
                ["Months of Inventory", metrics.monthsOfInventory ?? "—"],
              ].map(([label, value]) => (
                <div key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </>
        )}
        <div className="prose">
          {report.sections.map((s) => (
            <section key={s.title}>
              <h2>{s.title}</h2>
              <p>{s.body}</p>
            </section>
          ))}
          {!metrics && (
            <Notice>
              No live market statistics are supplied in this educational report.
            </Notice>
          )}
          {report.sources.length > 0 && (
            <>
              <h3>Sources</h3>
              <ul>
                {report.sources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      rel="noopener noreferrer"
                      style={{ textDecoration: "underline" }}
                    >
                      {source.label}
                    </a>
                    {source.accessedAt && ` · Accessed ${source.accessedAt}`}
                  </li>
                ))}
              </ul>
            </>
          )}
          <Button href={`/contact?source=${report.slug}`}>
            Ask a Market Question
          </Button>
        </div>
      </section>
    </>
  );
}
