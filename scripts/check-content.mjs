import fs from "node:fs";
import path from "node:path";
import {
  communitySchema,
  articleSchema,
  resourceSchema,
  reportSchema,
  eventSchema,
} from "../src/lib/schemas.ts";
const schemas = {
  communities: communitySchema,
  articles: articleSchema,
  resources: resourceSchema,
  "market-reports": reportSchema,
  events: eventSchema,
};
const root = process.cwd();
const slugs = new Map();
for (const collection of [
  "communities",
  "articles",
  "resources",
  "market-reports",
  "events",
]) {
  const records = JSON.parse(
    fs.readFileSync(path.join(root, "content", collection + ".json"), "utf8"),
  );
  const found = new Set();
  for (const record of records) {
    schemas[collection].parse(record);
    if (found.has(record.slug))
      throw new Error("Duplicate slug: " + record.slug);
    found.add(record.slug);
    if (record.image && !fs.existsSync(path.join(root, "public", record.image)))
      throw new Error("Missing image: " + record.image);
    if (
      collection === "resources" &&
      record.available &&
      !fs.existsSync(path.join(root, "public/downloads", record.slug + ".txt"))
    )
      throw new Error("Missing download: " + record.slug);
  }
  slugs.set(collection, found);
  console.log(`${collection}: ${records.length} valid entries`);
}
const articles = JSON.parse(fs.readFileSync("content/articles.json", "utf8"));
for (const a of articles) {
  for (const s of a.relatedCommunities)
    if (!slugs.get("communities").has(s))
      throw new Error("Broken community relation: " + s);
  for (const s of a.relatedResources)
    if (!slugs.get("resources").has(s))
      throw new Error("Broken resource relation: " + s);
}
