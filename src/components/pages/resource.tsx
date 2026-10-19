import { ResourceDownload } from "@/components/resource-download";
import { Newsletter } from "@/components/forms";
import {
  Breadcrumbs,
  Eyebrow,
  FinalCTA,
  Notice,
  ResourceCard,
} from "@/components/ui";
import { resources } from "@/lib/content";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
export function Resource({ slug }: { slug: string }) {
  const r = resources.find((r) => r.slug === slug);
  if (!r) notFound();
  return (
    <>
      <Breadcrumbs
        items={[{ label: "Resources", href: "/resources" }, { label: r.title }]}
      />
      <section className="container content-section two-column">
        <div className="resource-detail-art">
          <ResourceCard resource={r} />
        </div>
        <div>
          <Eyebrow>A little clarity. A better plan.</Eyebrow>
          <h1 style={{ fontSize: "clamp(38px,4vw,57px)" }}>{r.title}</h1>
          <p className="section-description" style={{ marginTop: 23 }}>
            {r.description}
          </p>
          <div className="prose" style={{ marginBlock: 30 }}>
            <h3>A practical starting point.</h3>
            <p>
              {r.available
                ? "Use this original planning worksheet to organize your priorities, identify open questions and prepare for a useful conversation. Print it or save a copy and work at your own pace."
                : "This tool is still in development. We will not substitute an unfinished calculator for an investment decision."}
            </p>
            {r.available && (
              <ul>
                <li>Clear prompts to guide your thinking.</li>
                <li>Space for your own priorities and follow-up questions.</li>
                <li>A simple structure you can adapt to your timeline.</li>
              </ul>
            )}
          </div>
          {r.available ? (
            <>
              <ResourceDownload slug={r.slug} />
              <p className="download-note">
                Plain-text, printable worksheet · No signup required
              </p>
              <Notice>
                The optional email delivery and CRM connection are not
                configured yet. Your worksheet is available directly; no email
                address is collected for this download.
              </Notice>
            </>
          ) : (
            <Notice>Coming soon. No download is available yet.</Notice>
          )}
          <Link
            className="text-link"
            href={`/contact?service=${r.category === "Selling" ? "selling" : "buying"}&source=${r.slug}`}
          >
            Have a question about your next step?
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
      <Newsletter />
      <FinalCTA />
    </>
  );
}
