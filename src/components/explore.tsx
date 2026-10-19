"use client";
import { track } from "@/lib/analytics";
import { articles, categories, communities, resources } from "@/lib/content";
import { ArrowUpRight, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button, CommunityCard, InsightCard, ResourceCard } from "./ui";
export function Explorer({
  type,
}: {
  type: "communities" | "articles" | "resources" | "all";
}) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("All");
  const filters =
    type === "communities"
      ? ["All", "City", "District"]
      : type === "all"
        ? ["All", "Neighborhoods", "Insights", "Resources"]
        : [
            "All",
            ...categories.filter(
              (c) => type === "articles" || !["Market Updates"].includes(c),
            ),
          ];
  const match = (text: string, category: string) =>
    text.toLowerCase().includes(q.trim().toLowerCase()) &&
    (filter === "All" || filter === category);
  const cs =
    type === "communities" || type === "all"
      ? communities.filter((c) =>
          match(
            c.name + " " + c.summary + " " + c.note,
            type === "all" ? "Neighborhoods" : c.type,
          ),
        )
      : [];
  const as =
    type === "articles" || type === "all"
      ? articles.filter((a) =>
          match(
            a.title + " " + a.description,
            type === "all" ? "Insights" : a.category,
          ),
        )
      : [];
  const rs =
    type === "resources" || type === "all"
      ? resources.filter((r) =>
          match(
            r.title + " " + r.description,
            type === "all" ? "Resources" : r.category,
          ),
        )
      : [];
  const count = cs.length + as.length + rs.length;
  return (
    <>
      <div className="toolbar">
        <label className="search-field">
          <span className="sr-only">
            Search {type === "all" ? "the site" : type}
          </span>
          <input
            type="search"
            placeholder={
              type === "communities"
                ? "Find your community…"
                : type === "all"
                  ? "What would you like to learn?"
                  : "Search the library…"
            }
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <Search size={17} />
        </label>
        <div className="filter-chips" aria-label="Filter results">
          {filters.map((f) => (
            <button
              key={f}
              className={filter === f ? "active" : ""}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <p className="result-count" role="status">
        {count} {count === 1 ? "result" : "results"}
        {q && ` for “${q}”`}
      </p>
      {cs.length > 0 && (
        <div className="community-grid">
          {cs.map((c) => (
            <CommunityCard key={c.slug} community={c} />
          ))}
        </div>
      )}
      {as.length > 0 && (
        <div className="insight-grid" style={{ marginTop: cs.length ? 40 : 0 }}>
          {as.map((a) => (
            <InsightCard key={a.slug} article={a} />
          ))}
        </div>
      )}
      {rs.length > 0 && (
        <div
          className="resource-grid"
          style={{ marginTop: as.length || cs.length ? 40 : 0 }}
        >
          {rs.map((r, i) => (
            <ResourceCard key={r.slug} resource={r} index={i} />
          ))}
        </div>
      )}
      {count === 0 && (
        <div className="empty-state">
          <h3>A different search might help.</h3>
          <p>Try a community name, a topic or a shorter phrase.</p>
          <button
            className="button secondary"
            onClick={() => {
              setQ("");
              setFilter("All");
            }}
          >
            Reset Search
          </button>
        </div>
      )}
      {type === "communities" && (
        <>
          <p className="quiet-note">
            Community imagery is illustrative, not a verified view of these
            places.
          </p>
          <div className="comparison-cta">
            <div>
              <h3>Two places on your mind?</h3>
              <p>A thoughtful comparison starts with your priorities.</p>
            </div>
            <Button href="/neighborhoods/compare">Compare Communities</Button>
          </div>
        </>
      )}
    </>
  );
}
export function Comparison() {
  const initial = () => {
    if (typeof window === "undefined") return ["kissimmee", "st-cloud"];
    const p = new URLSearchParams(window.location.search);
    return [p.get("a") || "kissimmee", p.get("b") || "st-cloud"];
  };
  const [selection, setSelection] = useState(initial);
  const a = communities.find((c) => c.slug === selection[0]) || communities[0],
    b = communities.find((c) => c.slug === selection[1]) || communities[1];
  function change(i: number, value: string) {
    const next = [...selection];
    next[i] = value;
    setSelection(next);
    track("community_comparison", { contentId: next.join("-vs-") });
    window.history.replaceState(null, "", `?a=${next[0]}&b=${next[1]}`);
  }
  return (
    <>
      <div className="compare-selects">
        {[0, 1].map((i) => (
          <label
            key={i}
            style={i === 1 ? { gridColumn: 3, gridRow: 1 } : undefined}
          >
            Choose a community
            <select
              value={i === 0 ? a.slug : b.slug}
              onChange={(e) => change(i, e.target.value)}
            >
              {communities.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
        ))}
        <span style={{ gridColumn: 2, gridRow: 1 }}>vs.</span>
      </div>
      {a.slug === b.slug ? (
        <div className="empty-state">
          <h3>Let’s look at two different places.</h3>
          <p>
            Choose a different community in either menu to see the comparison.
          </p>
        </div>
      ) : (
        <>
          <p className="quiet-note">
            Swipe horizontally on small screens to explore every column.
          </p>
          <div
            className="table-scroll"
            role="region"
            aria-label="Community comparison"
            tabIndex={0}
          >
            <table className="comparison-table">
              <thead>
                <tr>
                  <th scope="col">Your considerations</th>
                  <th scope="col">{a.name}</th>
                  <th scope="col">{b.name}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Area", a.note, b.note],
                  ["Area type", a.type, b.type],
                  ["Homes to explore", a.propertyTypes, b.propertyTypes],
                  ["Things to investigate", a.considerations, b.considerations],
                  [
                    "Price positioning",
                    "Verified current figures not yet available.",
                    "Verified current figures not yet available.",
                  ],
                  [
                    "HOA / CDD",
                    "Property-specific. Review current governing and assessment documents.",
                    "Property-specific. Review current governing and assessment documents.",
                  ],
                  [
                    "Commute",
                    "Test your actual route at the times you need to travel.",
                    "Test your actual route at the times you need to travel.",
                  ],
                  [
                    "Schools",
                    "Verify current zoning with the school district for each address.",
                    "Verify current zoning with the school district for each address.",
                  ],
                ].map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, i) =>
                      i === 0 ? (
                        <th
                          key={i}
                          scope="row"
                          style={{
                            fontFamily: "inherit",
                            fontSize: 12,
                            background: "transparent",
                          }}
                        >
                          {cell}
                        </th>
                      ) : (
                        <td key={i}>{cell}</td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="comparison-cta">
            <div>
              <h3>The right fit depends on your plan.</h3>
              <p>
                Bring your questions, priorities and shortlist to the
                conversation.
              </p>
            </div>
            <Button
              href={`/contact?service=neighborhood&source=${a.slug}-vs-${b.slug}`}
            >
              Ask About These Areas
            </Button>
          </div>
          <p className="quiet-note">
            <Link href={`/neighborhoods/${a.slug}`}>
              Explore {a.name}{" "}
              <ArrowUpRight size={12} style={{ display: "inline" }} />
            </Link>{" "}
            ·{" "}
            <Link href={`/neighborhoods/${b.slug}`}>
              Explore {b.name}{" "}
              <ArrowUpRight size={12} style={{ display: "inline" }} />
            </Link>
          </p>
        </>
      )}
    </>
  );
}
