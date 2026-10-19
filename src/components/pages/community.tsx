import {
  Breadcrumbs,
  Button,
  CommunityCard,
  Eyebrow,
  FinalCTA,
  InsightCard,
  Notice,
  PageHero,
  SectionTitle,
} from "@/components/ui";
import { articles, communities } from "@/lib/content";
import { notFound } from "next/navigation";
export function Community({ slug }: { slug: string }) {
  const c = communities.find((c) => c.slug === slug);
  if (!c) notFound();
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Neighborhoods", href: "/neighborhoods" },
          { label: c.name },
        ]}
      />
      <PageHero
        eyebrow={`${c.type} guide · ${c.note}`}
        title={`${c.name}, thoughtfully explored.`}
        text={
          c.summary +
          " A starting point for asking better questions about your next move."
        }
        image={c.image}
      >
        <Button
          href={`/neighborhoods/compare?a=${c.slug}&b=${c.slug === "st-cloud" ? "kissimmee" : "st-cloud"}`}
        >
          Compare This Community
        </Button>
      </PageHero>
      <section className="container content-section two-column">
        <div className="prose">
          <h2>See beyond the community name.</h2>
          <p>
            A location is more than a label on a map. Use this guide as a
            framework for researching {c.name}, then verify the details of any
            property you are considering.
          </p>
          <Notice>
            This is an introductory research guide. Local school, fee, amenity
            and market details await verified source material. Photography is
            illustrative.
          </Notice>
          <h3>Homes & real estate</h3>
          <p>
            {c.propertyTypes} Record the home’s condition, age, layout and
            maintenance needs alongside its asking price.
          </p>
          <h3>HOA & CDD considerations</h3>
          <p>
            Charges and restrictions can vary by property and subdivision.
            Request current association documents, assessment details and the
            relevant district information. Do not assume that an entire city or
            district shares the same fees.
          </p>
          <h3>Location & getting around</h3>
          <p>
            Test routes from the exact property to the destinations that matter
            to you. Check travel at relevant times, and verify planned road or
            infrastructure projects with the appropriate public agency.
          </p>
          <h3>Schools & amenities</h3>
          <p>
            Verify school assignments directly with the district for the
            specific address. Check eligibility, opening hours and costs for
            amenities rather than assuming they are included with a home.
          </p>
          <h3>Things to consider</h3>
          <p>{c.considerations}</p>
          <h3>What would make this a fit for you?</h3>
          <p>
            List the housing characteristics, access requirements and ownership
            costs that support your goals. Keep unanswered questions visible.
            The best next step is specific research, not a universal
            neighborhood ranking.
          </p>
          <Button href={`/contact?service=neighborhood&source=${c.slug}`}>
            Ask About {c.name}
          </Button>
        </div>
        <aside className="sidebar">
          <Eyebrow>Your research notes</Eyebrow>
          <h3>A clearer picture, one detail at a time.</h3>
          <dl>
            <dt>Area</dt>
            <dd>{c.note}</dd>
            <dt>Place type</dt>
            <dd>{c.type}</dd>
            <dt>Current market figures</dt>
            <dd>Not yet available from a verified source.</dd>
            <dt>Schools & fees</dt>
            <dd>Verify for the exact address.</dd>
            <dt>Available homes</dt>
            <dd>No live listing feed is connected.</dd>
          </dl>
          <div style={{ marginTop: 25 }}>
            <Button href={`/contact?service=buying&source=${c.slug}`}>
              Discuss Your Search
            </Button>
          </div>
        </aside>
      </section>
      <section className="container section">
        <SectionTitle
          eyebrow="Keep exploring"
          title="More places. A wider perspective."
        />
        <div className="community-grid">
          {communities
            .filter((x) => x.slug !== c.slug)
            .map((x) => (
              <CommunityCard key={x.slug} community={x} />
            ))}
        </div>
      </section>
      <section className="resources-section">
        <div className="container">
          <SectionTitle title="Make your research more useful." />
          <div className="insight-grid">
            {articles
              .filter((a) => ["Buying", "Neighborhoods"].includes(a.category))
              .slice(0, 3)
              .map((a) => (
                <InsightCard key={a.slug} article={a} />
              ))}
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
