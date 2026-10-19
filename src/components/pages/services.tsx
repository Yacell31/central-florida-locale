import {
  Button,
  FAQ,
  FinalCTA,
  PageHero,
  ResourceCard,
  SectionTitle,
} from "@/components/ui";
import { resources } from "@/lib/content";
import { titles } from "@/lib/page-titles";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
const buyerSteps = [
  [
    "Understand the Process",
    "Know the phases, the people involved and the decisions ahead.",
  ],
  [
    "Get Financially Prepared",
    "Work with a lender to understand your options and total budget.",
  ],
  [
    "Define Your Search",
    "Clarify your priorities, timeline and property requirements.",
  ],
  [
    "Explore Neighborhoods",
    "Research locations through the lens of your everyday needs.",
  ],
  [
    "Evaluate Properties",
    "Compare condition, costs and tradeoffs against your priorities.",
  ],
  [
    "Make an Offer",
    "Review terms, contingencies and negotiation options with your team.",
  ],
  [
    "Due Diligence",
    "Track inspections, documents and the dates in your actual contract.",
  ],
  [
    "Close With Confidence",
    "Coordinate the final review, closing and a thoughtful handoff.",
  ],
];
const sellerSteps = [
  [
    "Market Analysis & Pricing",
    "Review relevant comparable properties and current conditions.",
  ],
  [
    "Property Preparation",
    "Prioritize repairs, presentation and the work that supports your goals.",
  ],
  [
    "Strategic Marketing Plan",
    "Coordinate photography, messaging and an intentional launch.",
  ],
  [
    "Showings & Feedback",
    "Plan access, collect feedback and review how the market responds.",
  ],
  [
    "Offers & Negotiation",
    "Compare the full terms, not just the headline price.",
  ],
  [
    "Contract-to-Close",
    "Coordinate due diligence, documents and contractual deadlines.",
  ],
  [
    "Ongoing Communication",
    "Keep decisions, changes and next steps visible throughout.",
  ],
];
export function Roadmap({ steps }: { steps: string[][] }) {
  return (
    <div className="roadmap">
      {steps.map(([title, text], i) => (
        <div key={title}>
          <span>0{i + 1}</span>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      ))}
    </div>
  );
}
export function ServiceHub({ sell = false }: { sell?: boolean }) {
  return (
    <>
      <PageHero
        eyebrow={sell ? "Sell with a strategy" : "Buy with a clear plan"}
        title={titles[sell ? "sell" : "buy"]}
        text={
          sell
            ? "Preparation, thoughtful pricing and an organized strategy help you understand your property’s market opportunity."
            : "From your first questions to the closing table, make room for education, preparation and decisions that reflect your goals."
        }
        image={sell ? "/images/interior.jpg" : "/images/home.png"}
      >
        <Button href={`/work-with-me?service=${sell ? "selling" : "buying"}`}>
          {sell ? "Plan Your Home Sale" : "Start Your Homebuying Plan"}
        </Button>
      </PageHero>
      <section className="content-section container">
        <SectionTitle
          eyebrow="Know what comes next"
          title={
            sell
              ? "A thoughtful path from preparation to closing."
              : "Your homebuying roadmap."
          }
        />
        <Roadmap steps={sell ? sellerSteps : buyerSteps} />
      </section>
      <section className="resources-section">
        <div className="container">
          <SectionTitle
            eyebrow="Your priorities, in focus"
            title={
              sell
                ? "Prepare with intention."
                : "A plan that fits your starting point."
            }
          />
          <div className="info-grid">
            {(sell
              ? [
                  [
                    "Understand your home’s value",
                    "A comparative market analysis reviews relevant sales, property differences and market conditions. It is an informed pricing tool, not a guaranteed sale price.",
                  ],
                  [
                    "Choose your preparation wisely",
                    "Begin with condition, maintenance and presentation. Gather estimates and discuss priorities before committing to major improvements.",
                  ],
                  [
                    "Build a realistic timeline",
                    "Plan backward from your goals. Allow room for preparation, showings, negotiation and the steps required by your actual contract.",
                  ],
                ]
              : [
                  [
                    "Buying your first home",
                    "Build a foundation in financing, ownership costs and the purchase process. Your questions belong at the beginning—not after a commitment.",
                  ],
                  [
                    "Relocating to Central Florida",
                    "Coordinate neighborhood research with work, housing and moving logistics. Verify the details that matter to your own routine.",
                  ],
                  [
                    "Considering new construction",
                    "Review builder terms, selections, timelines and inspection options. Ask what is included, what can change and who represents your interests.",
                  ],
                ]
            ).map(([title, text]) => (
              <div key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
                <Link
                  className="text-link"
                  href={`/contact?service=${sell ? "selling" : "buying"}&source=${encodeURIComponent(title)}`}
                >
                  Let’s talk through it
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionTitle
          eyebrow="Practical tools"
          title={
            sell
              ? "A little preparation goes a long way."
              : "Bring a little structure to your search."
          }
        />
        <div className="resource-grid">
          {resources
            .filter((r) =>
              sell
                ? r.category === "Selling" ||
                  r.slug === "relocation-planning-guide"
                : r.category === "Buying",
            )
            .slice(0, 4)
            .map((r, i) => (
              <ResourceCard resource={r} index={i} key={r.slug} />
            ))}
        </div>
      </section>
      <section className="container content-section">
        <SectionTitle
          eyebrow="Good questions welcome"
          title="A little more clarity."
        />
        <FAQ
          items={
            sell
              ? [
                  {
                    q: "Is a home value estimate the same as an appraisal?",
                    a: "No. An online estimate, comparative market analysis and formal appraisal use different methods and serve different purposes. Discuss the appropriate approach with a qualified professional.",
                  },
                  {
                    q: "Should I renovate before selling?",
                    a: "It depends on the property, its condition, your budget and your goals. Review specific improvements and costs before committing; no renovation guarantees a return.",
                  },
                  {
                    q: "How long will selling take?",
                    a: "Timing varies with preparation, local conditions, property characteristics and contract terms. Build a flexible timeline rather than relying on a universal estimate.",
                  },
                ]
              : [
                  {
                    q: "Should I talk to a lender before touring?",
                    a: "An early financing conversation can help you understand your budget and the documents you need. Ask a qualified lender about your specific circumstances; preapproval is not a guarantee of final financing.",
                  },
                  {
                    q: "How much should I budget beyond the price?",
                    a: "Ask your lender and closing team for itemized estimates of closing costs, prepaid items and reserves. Also plan for insurance, maintenance, moving and any association or district obligations.",
                  },
                  {
                    q: "How do I choose a neighborhood?",
                    a: "Start with your priorities and investigate specific addresses. Compare housing options, ownership costs and the routes and amenities relevant to you. Use official sources to verify school assignments and local rules.",
                  },
                ]
          }
        />
      </section>
      <FinalCTA />
    </>
  );
}
