import { CalendarDays, Video } from "lucide-react";
import { events } from "@/lib/content";
import { Button, SectionTitle } from "@/components/ui";
export function LiveSessions() {
  // Server-rendered request time determines upcoming versus archived sessions.
  // eslint-disable-next-line react-hooks/purity
  const now = Date.now();
  const upcoming = events.filter((e) => Date.parse(e.endsAt) >= now);
  const past = events.filter((e) => Date.parse(e.endsAt) < now);
  return (
    <>
      <SectionTitle
        eyebrow="Bring your questions"
        title="A conversation worth having."
      />
      {!upcoming.length && (
        <div className="event-empty">
          <CalendarDays size={35} strokeWidth={1} />
          <div>
            <h3>The next conversation is taking shape.</h3>
            <p>
              No live session is scheduled yet. Dates, calendar downloads and
              verified streaming links will appear here once confirmed.
            </p>
          </div>
        </div>
      )}
      {upcoming.map((e) => (
        <div className="event-empty" key={e.slug}>
          <Video size={30} />
          <div>
            <h3>{e.title}</h3>
            <p>{e.description}</p>
            <p>
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "full",
                timeStyle: "short",
                timeZone: e.timeZone,
              }).format(new Date(e.startsAt))}{" "}
              ({e.timeZone})
            </p>
            <div className="hero-actions">
              <Button href={`/api/calendar/${e.slug}`}>Add to Calendar</Button>
              {e.streamUrl && (
                <Button href={e.streamUrl}>Join the Conversation</Button>
              )}
            </div>
          </div>
        </div>
      ))}
      {past.length > 0 && (
        <section className="content-section">
          <SectionTitle title="Past conversations." />
          {past.map((e) => (
            <div className="sidebar" key={e.slug}>
              <h3>{e.title}</h3>
              <p>{e.description}</p>
              {e.archiveUrl ? (
                <Button href={e.archiveUrl}>Watch the Conversation</Button>
              ) : (
                <p>Recording not yet available.</p>
              )}
            </div>
          ))}
        </section>
      )}
    </>
  );
}
