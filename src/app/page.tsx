import { Newsletter } from "@/components/forms";
import {
  Button,
  CommunityCard,
  Eyebrow,
  FinalCTA,
  InsightCard,
  Photo,
  ProjectMethod,
  ResourceCard,
  SectionTitle,
} from "@/components/ui";
import { articles, communities, resources } from "@/lib/content";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Check,
  Compass,
  House,
  KeyRound,
  MapPinned,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export const metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <>
      <section className="home-hero">
        <Image
          className="hero-photo"
          src="/images/home.png"
          alt="Illustrative Florida-style home framed by palms at dusk"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-shade" />
        <div className="container home-hero-content">
          <p className="hero-kicker">
            <span />
            ROOTED IN CENTRAL FLORIDA
          </p>
          <h1>
            Knowledge for today.
            <br />
            Confidence for
            <br />
            your next move<span className="terracotta">.</span>
          </h1>
          <p className="hero-description">
            Real estate insights, education and strategic guidance
            <br className="desktop-break" /> to help you make informed decisions
            in Central Florida.
          </p>
          <div className="hero-buttons">
            <Button href="/work-with-me">Start Your Plan</Button>
            <Link className="hero-secondary" href="/neighborhoods">
              Explore Neighborhoods
              <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="hero-bottom">
            <span>YOUR NEXT REAL ESTATE MOVE, THOUGHTFULLY PLANNED.</span>
            <a href="#explore" aria-label="Explore the website">
              <ArrowDown size={18} />
            </a>
          </div>
        </div>
        <span className="image-caption">ILLUSTRATIVE ARCHITECTURE</span>
      </section>
      <section className="quick-paths container" id="explore">
        {[
          {
            title: "Buy a Home",
            text: "A clear path to your next chapter.",
            href: "/buy",
            icon: House,
          },
          {
            title: "Sell Your Home",
            text: "Preparation. Strategy. A better plan.",
            href: "/sell",
            icon: KeyRound,
          },
          {
            title: "Explore Neighborhoods",
            text: "Find the details that make a place.",
            href: "/neighborhoods",
            icon: MapPinned,
          },
          {
            title: "Real Estate Resources",
            text: "Practical tools. More informed decisions.",
            href: "/resources",
            icon: BookOpen,
          },
        ].map(({ title, text, href, icon: Icon }) => (
          <Link href={href} key={href}>
            <Icon size={27} strokeWidth={1.2} />
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
            <ArrowUpRight className="path-arrow" size={15} />
          </Link>
        ))}
      </section>
      <section className="section container">
        <SectionTitle
          eyebrow="Find your sense of place"
          title="Local places. Real possibilities."
          text="Get to know the communities that could shape your next chapter."
          href="/neighborhoods"
          label="Explore All Neighborhoods"
        />
        <div className="community-grid">
          {communities.map((c) => (
            <CommunityCard key={c.slug} community={c} />
          ))}
        </div>
        <p className="quiet-note">
          A starting point for your research. Community photography is
          illustrative.
        </p>
      </section>
      <ProjectMethod />
      <section className="section container">
        <SectionTitle
          eyebrow="A more informed next move"
          title="Good questions. Thoughtful insights."
          text="Practical perspectives to help you see the bigger picture—and the details."
          href="/insights"
          label="Read All Insights"
        />
        <div className="insight-grid">
          {articles.slice(0, 3).map((a) => (
            <InsightCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
      <section className="resources-section">
        <div className="container">
          <SectionTitle
            eyebrow="Less guesswork. More clarity."
            title="A few tools for the journey."
            text="Start with a guide. Leave with a little more confidence."
            href="/resources"
            label="View All Resources"
          />
          <div className="resource-grid">
            {resources.slice(0, 4).map((r, i) => (
              <ResourceCard key={r.slug} resource={r} index={i} />
            ))}
          </div>
        </div>
      </section>
      <section className="about-preview container">
        <div className="about-image">
          <Photo src="/images/interior.jpg" />
          <div className="image-label">
            <Compass size={25} strokeWidth={1} />
            <span>
              LOCAL PERSPECTIVE.
              <br />A THOUGHTFUL APPROACH.
            </span>
          </div>
        </div>
        <div className="about-copy">
          <Eyebrow>The person behind Locale</Eyebrow>
          <h2>Hi, I’m Yacell.</h2>
          <p className="large-copy">
            A better real estate experience
            <br />
            begins with a better plan.
          </p>
          <p>
            Central Florida Locale brings together real estate education, local
            perspective and project-management thinking—so you can understand
            your options and move forward with intention.
          </p>
          <p>
            My approach starts with your questions. Together, we make room for
            the details, organize the decisions and focus on what matters to
            you.
          </p>
          <div className="about-values">
            <span>
              <Check size={15} />
              Education first
            </span>
            <span>
              <Check size={15} />
              Your goals at the center
            </span>
          </div>
          <Button href="/about" secondary>
            More About My Approach
          </Button>
          <p className="signature">A little clarity changes everything.</p>
        </div>
      </section>
      <Newsletter dark />
      <FinalCTA />
    </>
  );
}
