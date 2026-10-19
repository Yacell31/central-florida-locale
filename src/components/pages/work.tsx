import { LeadForm } from "@/components/forms";
import { Eyebrow, Notice, PageHero, SectionTitle } from "@/components/ui";
import { titles } from "@/lib/page-titles";
import {
  ArrowUpRight,
  ChartNoAxesCombined,
  House,
  KeyRound,
  MapPinned,
} from "lucide-react";
import Link from "next/link";
import { Roadmap } from "./services";
export function Work({
  service,
  source,
}: {
  service?: string;
  source?: string;
}) {
  const paths = [
    {
      name: "Buy a Home",
      value: "buying",
      icon: House,
      description:
        "Define your priorities and build a path from preparation to closing.",
    },
    {
      name: "Sell Your Home",
      value: "selling",
      icon: KeyRound,
      description:
        "Plan your preparation, pricing conversation and next chapter.",
    },
    {
      name: "Invest in Real Estate",
      value: "investing",
      icon: ChartNoAxesCombined,
      description:
        "Clarify your criteria and the questions behind the numbers.",
    },
    {
      name: "Relocate to Central Florida",
      value: "relocating",
      icon: MapPinned,
      description:
        "Connect your community research with a practical moving plan.",
    },
  ];
  return (
    <>
      <PageHero
        eyebrow="Your goals come first"
        title={titles["work-with-me"]}
        text="Whether you are exploring, preparing or ready to move, start with a conversation that helps you understand your options."
      />
      <section className="section container">
        <div className="service-cards">
          {paths.map(({ name, value, icon: Icon, description }) => (
            <Link
              key={value}
              href={`/work-with-me?service=${value}#planning-form`}
              className="service-card"
            >
              <Icon size={28} strokeWidth={1.2} />
              <h3>{name}</h3>
              <p>{description}</p>
              <span className="text-link">
                Start Your{" "}
                {value === "buying"
                  ? "Homebuying"
                  : value === "selling"
                    ? "Selling"
                    : value === "investing"
                      ? "Investment"
                      : "Relocation"}{" "}
                Plan
                <ArrowUpRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="resources-section">
        <div className="container">
          <SectionTitle
            eyebrow="An organized first conversation"
            title="What happens next?"
          />
          <Roadmap
            steps={[
              [
                "Share your goals",
                "Tell me what you have in mind and what you are still figuring out.",
              ],
              [
                "Complete a short questionnaire",
                "Give the conversation a useful starting point.",
              ],
              [
                "Arrange a consultation",
                "Once scheduling is connected, choose a time that works for you.",
              ],
              [
                "Outline your next steps",
                "Discuss your roadmap and whether working together makes sense.",
              ],
            ]}
          />
        </div>
      </section>
      <section
        id="planning-form"
        className="container content-section contact-layout"
      >
        <div>
          <Eyebrow>A low-pressure next step</Eyebrow>
          <h2>
            {paths.find((p) => p.value === service)?.name ||
              "Tell me about your plans."}
          </h2>
          <p>
            You do not need to have every answer. A few details about your goals
            and timing are a good place to begin.
          </p>
          <Notice>
            Consultation scheduling and message delivery are pending
            configuration. No appointment is booked by completing this form.
          </Notice>
        </div>
        <LeadForm
          key={service || "buying"}
          kind={service || "buying"}
          source={source || "work-with-me"}
        />
      </section>
    </>
  );
}
