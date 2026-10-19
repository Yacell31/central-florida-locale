import { Button, Eyebrow } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="container section">
      <Eyebrow>A small detour</Eyebrow>
      <h1>Let’s find a clearer path.</h1>
      <p className="section-description" style={{ marginBottom: 30 }}>
        This page doesn’t exist, or its address has changed.
      </p>
      <Button href="/">Back to Locale</Button>
    </section>
  );
}
