import { articles, communities, method, resources } from "@/lib/content";
import { ArrowRight, ArrowUpRight, Download, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { StructuredData } from "./structured-data";
export function Button({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link href={href} className={`button ${secondary ? "secondary" : ""}`}>
      {children}
      <ArrowUpRight size={16} />
    </Link>
  );
}
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow">
      <span />
      {children}
    </p>
  );
}
export function SectionTitle({
  eyebrow,
  title,
  text,
  href,
  label,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  href?: string;
  label?: string;
}) {
  return (
    <div className="section-title">
      <div>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2>{title}</h2>
        {text && <p className="section-description">{text}</p>}
      </div>
      {href && (
        <Link className="text-link" href={href}>
          {label || "Explore more"}
          <ArrowUpRight size={16} />
        </Link>
      )}
    </div>
  );
}
export function Photo({
  src,
  alt = "",
  className = "",
  priority = false,
}: {
  src: string;
  alt?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`photo ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
        priority={priority}
      />
    </div>
  );
}
export function CommunityCard({
  community: c,
}: {
  community: (typeof communities)[number];
}) {
  return (
    <Link href={`/neighborhoods/${c.slug}`} className="community-card">
      <Photo src={c.image} />
      <div className="community-card-top">
        <span>{c.note}</span>
        <ArrowUpRight size={19} />
      </div>
      <h3>{c.name}</h3>
      <p>{c.summary}</p>
    </Link>
  );
}
export function InsightCard({
  article: a,
}: {
  article: (typeof articles)[number];
}) {
  return (
    <Link href={`/insights/${a.slug}`} className="insight-card">
      <Photo src={a.image} />
      <div className="card-meta">
        <span>{a.category}</span>
        <span>{a.read}</span>
      </div>
      <h3>{a.title}</h3>
      <p>{a.description}</p>
      <span className="read-story">
        Read the story <ArrowUpRight size={15} />
      </span>
    </Link>
  );
}
export function ResourceCard({
  resource: r,
  index = 0,
}: {
  resource: (typeof resources)[number];
  index?: number;
}) {
  return (
    <Link href={`/resources/${r.slug}`} className="resource-card">
      <div className={`resource-art art-${index % 4}`}>
        <div className="paper">
          <span>CENTRAL FLORIDA LOCALE</span>
          <span className="paper-rule" />
          <strong>{r.title}</strong>
          <span className="paper-lines" />
          <small>
            A little clarity.
            <br />A better plan.
          </small>
        </div>
        <span className="resource-icon">
          <Download size={18} />
        </span>
      </div>
      <div className="card-meta">
        <span>{r.category}</span>
        <span>{r.available ? "Free guide" : "Coming soon"}</span>
      </div>
      <h3>{r.title}</h3>
      <p>{r.description}</p>
    </Link>
  );
}
export function ProjectMethod({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`method-section ${compact ? "compact" : ""}`}>
      <div className="container">
        <div className="method-intro">
          <div>
            <Eyebrow>A little structure. A lot more confidence.</Eyebrow>
            <h2>
              A real estate move is a project.
              <br />
              <em>Let’s plan it like one.</em>
            </h2>
          </div>
          <p>
            Big decisions feel different when you know what comes next. A
            thoughtful framework keeps your goals at the center, from the first
            conversation to the final handoff.
          </p>
        </div>
        <div className="method-grid">
          {method.map((s, i) => (
            <div key={s.title}>
              <span className="step-number">0{i + 1}</span>
              <div className="step-line" />
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
        <Link href="/about#approach" className="text-link">
          See how I work <ArrowUpRight size={17} />
        </Link>
      </div>
    </section>
  );
}
export function FinalCTA() {
  return (
    <section className="final-cta container">
      <div>
        <Eyebrow>Your goals. A thoughtful next step.</Eyebrow>
        <h2>
          Your next real estate move,
          <br />
          <em>thoughtfully planned.</em>
        </h2>
      </div>
      <Button href="/work-with-me">Start Your Plan</Button>
    </section>
  );
}
export function PageHero({
  eyebrow,
  title,
  text,
  image,
  children,
}: {
  eyebrow: string;
  title: string;
  text: string;
  image?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className={`page-hero ${image ? "split-hero" : ""}`}>
      <div className="container hero-inner">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1>{title}</h1>
          <p>{text}</p>
          {children && <div className="hero-actions">{children}</div>}
        </div>
        {image && <Photo src={image} priority />}
      </div>
    </section>
  );
}
export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { name: "Home", item: "https://centralfloridalocale.com/" },
            ...items.map((i) => ({
              name: i.label,
              ...(i.href
                ? { item: "https://centralfloridalocale.com" + i.href }
                : {}),
            })),
          ].map((i, index) => ({
            "@type": "ListItem",
            position: index + 1,
            ...i,
          })),
        }}
      />
      <nav aria-label="Breadcrumb" className="breadcrumbs container">
        <Link href="/">Home</Link>
        {items.map((i) => (
          <span key={i.label}>
            {" "}
            /{" "}
            {i.href ? (
              <Link href={i.href}>{i.label}</Link>
            ) : (
              <span aria-current="page">{i.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((i) => (
        <details key={i.q}>
          <summary>
            {i.q}
            <span>+</span>
          </summary>
          <p>{i.a}</p>
        </details>
      ))}
    </div>
  );
}
export function Notice({ children }: { children: React.ReactNode }) {
  return (
    <div className="notice">
      <MapPin size={19} />
      <p>{children}</p>
    </div>
  );
}
export { ArrowRight };
