import { events } from "@/lib/content";
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) return new Response("Event not found", { status: 404 });
  const escape = (s: string) =>
    s
      .replace(/\\/g, "\\\\")
      .replace(/\r?\n/g, "\\n")
      .replace(/,/g, "\\,")
      .replace(/;/g, "\\;");
  const date = (s: string) =>
    new Date(s)
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
  const text = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Central Florida Locale//Locale Live//EN",
    "BEGIN:VEVENT",
    `UID:${event.slug}@centralfloridalocale.com`,
    `DTSTAMP:${date(new Date().toISOString())}`,
    `DTSTART:${date(event.startsAt)}`,
    `DTEND:${date(event.endsAt)}`,
    `SUMMARY:${escape(event.title)}`,
    `DESCRIPTION:${escape(event.description)}`,
    ...(event.streamUrl ? [`URL:${event.streamUrl}`] : []),
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return new Response(text, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${event.slug}.ics"`,
    },
  });
}
