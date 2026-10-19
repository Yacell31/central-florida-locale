import { isIndexable } from "@/lib/indexing";
import { AnalyticsObserver } from "@/components/analytics-observer";
import { Header, Logo } from "@/components/navigation";
import { navigation, site } from "@/lib/content";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Central Florida Locale | Knowledge for your next move",
    template: "%s | Central Florida Locale",
  },
  description:
    "Real estate insights, education and strategic guidance to help you make informed decisions in Central Florida.",
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/home.png",
        width: 1536,
        height: 1024,
        alt: "Illustrative Florida-style residential architecture",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  robots: isIndexable
    ? { index: true, follow: true }
    : { index: false, follow: false },
};
const sans = localFont({
  src: [
    { path: "./fonts/sans-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/sans-semibold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});
const serif = localFont({
  src: [
    { path: "./fonts/serif-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/serif-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <AnalyticsObserver />
        <main id="main">{children}</main>
        <footer>
          <div className="container footer-main">
            <div className="footer-brand">
              <Logo />
              <p>
                Knowledge for today.
                <br />
                Confidence for your next move.
              </p>
              <span>Central Florida, thoughtfully explored.</span>
            </div>
            <div>
              <p className="footer-label">EXPLORE</p>
              {navigation.slice(0, 4).map(([n, h]) => (
                <Link href={h} key={h}>
                  {n}
                </Link>
              ))}
            </div>
            <div>
              <p className="footer-label">GET TO KNOW LOCALE</p>
              <Link href="/about">My Approach</Link>
              <Link href="/insights">Insights</Link>
              <Link href="/live">Locale Live</Link>
              <Link href="/contact">Get in Touch</Link>
            </div>
            <div className="footer-note">
              <p className="footer-label">A NOTE FOR YOUR NEXT CHAPTER</p>
              <h3>
                A little knowledge
                <br />
                goes a long way.
              </h3>
              <Link className="text-link" href="/edit">
                Discover The Edit ↗
              </Link>
            </div>
          </div>
          <div className="container footer-legal">
            <span>© {new Date().getFullYear()} Central Florida Locale</span>
            <div>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/accessibility">Accessibility</Link>
              <Link href="/disclosures">Real Estate Disclosures</Link>
            </div>
          </div>
          <p className="container disclosure-note">
            Development preview. Brokerage and license disclosures are pending
            owner confirmation. Architectural imagery is illustrative and does
            not represent active listings or verified community views.
          </p>
        </footer>
      </body>
    </html>
  );
}
