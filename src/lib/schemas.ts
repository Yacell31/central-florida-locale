import { z } from "zod";
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const text = z.string().min(1);
const base = {
  slug,
  status: z.enum(["draft", "published"]),
  sources: z.array(
    z.object({
      label: text,
      url: z.url(),
      accessedAt: z.iso.date().nullable(),
    }),
  ),
  verifiedAt: z.iso.date().nullable(),
};
export const communitySchema = z.object({
  ...base,
  name: text,
  type: z.enum(["City", "District", "Community"]),
  summary: text,
  note: text,
  image: text,
  propertyTypes: text,
  considerations: text,
});
export const articleSchema = z.object({
  ...base,
  title: text,
  category: z.enum([
    "Buying",
    "Selling",
    "Neighborhoods",
    "Investing",
    "Market Updates",
  ]),
  description: text,
  image: text,
  read: text,
  author: text,
  publishedAt: z.iso.date().nullable(),
  updatedAt: z.iso.date().nullable(),
  relatedCommunities: z.array(slug),
  relatedResources: z.array(slug),
  sections: z.array(z.object({ title: text, body: text })).min(1),
});
export const resourceSchema = z.object({
  ...base,
  title: text,
  category: text,
  description: text,
  available: z.boolean(),
});
export const reportSchema = z.object({
  ...base,
  title: text,
  description: text,
  sections: z.array(z.object({ title: text, body: text })).min(1),
  metrics: z
    .object({
      medianSalePrice: z.number().nonnegative().nullable(),
      daysOnMarket: z.number().nonnegative().nullable(),
      saleToListRatio: z.number().nonnegative().nullable(),
      monthsOfInventory: z.number().nonnegative().nullable(),
      period: text,
      geography: text,
    })
    .nullable(),
});
export const eventSchema = z.object({
  ...base,
  title: text,
  description: text,
  startsAt: z.iso.datetime(),
  endsAt: z.iso.datetime(),
  timeZone: text,
  streamUrl: z.url().nullable(),
  archiveUrl: z.url().nullable(),
});
export type Community = z.infer<typeof communitySchema>;
export type ContentStatus = "draft" | "published";
