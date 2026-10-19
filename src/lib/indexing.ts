export const isIndexable =
  process.env.SITE_INDEXABLE === "true" &&
  process.env.NODE_ENV === "production" &&
  process.env.VERCEL_ENV !== "preview";
