import articleData from "../../content/articles.json";
import communityData from "../../content/communities.json";
import eventData from "../../content/events.json";
import reportData from "../../content/market-reports.json";
import resourceData from "../../content/resources.json";
import {
  articleSchema,
  communitySchema,
  eventSchema,
  reportSchema,
  resourceSchema,
} from "./schemas";
export type { Community, ContentStatus } from "./schemas";
// Invalid content fails at build/start rather than silently reaching a page.
export const communities = communitySchema
  .array()
  .parse(communityData)
  .filter((c) => c.status === "published");
export const articles = articleSchema
  .array()
  .parse(articleData)
  .filter((a) => a.status === "published");
export const resources = resourceSchema
  .array()
  .parse(resourceData)
  .filter((r) => r.status === "published");
export const reports = reportSchema
  .array()
  .parse(reportData)
  .filter((r) => r.status === "published");
export const events = eventSchema
  .array()
  .parse(eventData)
  .filter((e) => e.status === "published");
export const categories = [
  "Buying",
  "Selling",
  "Neighborhoods",
  "Investing",
  "Market Updates",
];
export const method = [
  { title: "Define", text: "Your goals, budget, location and priorities." },
  { title: "Plan", text: "Your timeline, financing, milestones and team." },
  { title: "Execute", text: "Search, evaluate, negotiate and coordinate." },
  {
    title: "Monitor",
    text: "Deadlines, inspections, risks and contingencies.",
  },
  { title: "Complete", text: "Closing, handoff and the next chapter." },
];
export const navigation = [
  ["Buy", "/buy"],
  ["Sell", "/sell"],
  ["Neighborhoods", "/neighborhoods"],
  ["Resources", "/resources"],
  ["Insights", "/insights"],
  ["About", "/about"],
];
export const site = {
  name: "Central Florida Locale",
  url: "https://centralfloridalocale.com",
  tagline: "Knowledge for today. Confidence for your next move.",
  agent: "Yacell",
  brokerage: null,
  license: null,
  email: null,
  scheduler: null,
};
