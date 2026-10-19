import {
  Button,
  FinalCTA,
  PageHero,
  ProjectMethod,
  SectionTitle,
} from "@/components/ui";
export function About() {
  return (
    <>
      <PageHero
        eyebrow="The person behind Locale"
        title="Hi, I’m Yacell."
        text="I believe a better real estate experience begins with a better plan. Central Florida Locale is a place to ask questions, understand your options and approach your next move with intention."
        image="/images/interior.jpg"
      >
        <Button href="/work-with-me">Let’s Start With Your Goals</Button>
      </PageHero>
      <section className="container section">
        <SectionTitle
          eyebrow="A thoughtful approach"
          title="More understanding. Less guesswork."
        />
        <div className="info-grid">
          {[
            [
              "Education First",
              "Clear explanations, practical resources and room for questions—so you understand the decision in front of you.",
            ],
            [
              "Strategic Guidance",
              "Goals, timelines, milestones and tradeoffs organized into an approach that reflects your priorities.",
            ],
            [
              "Local Perspective",
              "A framework for investigating communities and the property-specific details that matter to your plans.",
            ],
          ].map(([t, d]) => (
            <div key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
        <div className="prose">
          <h3>A better experience starts with being heard.</h3>
          <p>
            Technology and organization can make information easier to use. But
            the starting point is your situation: what you want to achieve, what
            you are unsure about and what a good next step would look like for
            you.
          </p>
          <p>
            This site brings education and project-management thinking together.
            It is designed to leave you more informed, whether you are ready to
            move now or simply beginning to explore.
          </p>
        </div>
      </section>
      <div id="approach">
        <ProjectMethod />
      </div>
      <FinalCTA />
    </>
  );
}
