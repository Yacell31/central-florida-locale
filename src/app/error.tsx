"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="container section">
      <p className="eyebrow">A moment to regroup</p>
      <h1>Something needs another try.</h1>
      <p className="section-description" style={{ marginBottom: 25 }}>
        We couldn’t load this page. Please try again.
      </p>
      <button className="button" onClick={reset}>
        Try Again
      </button>
    </section>
  );
}
