import { NextResponse } from "next/server";
const allowedKinds = new Set([
  "contact",
  "buying",
  "selling",
  "investing",
  "relocating",
  "newsletter",
]);
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  let sameOrigin = true;
  try {
    sameOrigin =
      !origin || new URL(origin).host === request.headers.get("host");
  } catch {
    sameOrigin = false;
  }
  if (!sameOrigin)
    return NextResponse.json(
      {
        message:
          "This submission could not be verified. Please use the form on this website.",
      },
      { status: 403 },
    );
  if (Number(request.headers.get("content-length") || 0) > 20000)
    return NextResponse.json(
      { message: "The message is too long." },
      { status: 413 },
    );
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Please send a valid form." },
      { status: 400 },
    );
  }
  if (!data || typeof data !== "object" || Array.isArray(data))
    return NextResponse.json(
      { message: "Please check the form." },
      { status: 400 },
    );
  const get = (key: string, max: number) =>
    typeof data[key] === "string"
      ? (data[key] as string).trim().slice(0, max + 1)
      : "";
  const kind = get("kind", 30),
    email = get("email", 254),
    name = get("name", 100),
    details = get("details", 3000);
  if (get("website", 200))
    return NextResponse.json(
      { message: "This submission could not be verified." },
      { status: 400 },
    );
  if (
    !allowedKinds.has(kind) ||
    !/^\S+@\S+\.\S+$/.test(email) ||
    email.length > 254
  )
    return NextResponse.json(
      { message: "Please provide a valid email address and inquiry type." },
      { status: 400 },
    );
  if (
    kind !== "newsletter" &&
    (!name ||
      name.length > 100 ||
      !details ||
      details.length > 3000 ||
      data.consent !== "on")
  )
    return NextResponse.json(
      { message: "Please include your name, message and inquiry consent." },
      { status: 400 },
    );
  const endpoint = process.env.LEAD_WEBHOOK_URL;
  if (!endpoint)
    return NextResponse.json(
      {
        message:
          kind === "newsletter"
            ? "Newsletter subscriptions are not connected yet. Your email has not been saved or subscribed. Please check back once The Edit launches."
            : "Message delivery is not connected yet. Your inquiry has not been sent or saved. Please keep a copy and return once contact delivery is available.",
      },
      { status: 503 },
    );
  try {
    const url = new URL(endpoint);
    if (url.protocol !== "https:")
      throw new Error("Invalid provider configuration");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.LEAD_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({
        kind,
        email,
        name,
        details,
        phone: get("phone", 30),
        service: get("service", 30),
        timeline: get("timeline", 100),
        area: get("area", 150),
        source: get("source", 300),
        consent: data.consent === "on",
        marketing: kind === "newsletter" || data.marketing === "on",
      }),
      signal: AbortSignal.timeout(10000),
      redirect: "error",
    });
    if (!response.ok) throw new Error("Delivery rejected");
    return NextResponse.json({
      message:
        kind === "newsletter"
          ? "Your subscription request was accepted by our delivery provider."
          : "Your inquiry was accepted for delivery. A consultation has not yet been scheduled.",
    });
  } catch {
    return NextResponse.json(
      {
        message:
          "Your request could not be delivered. Your form is still here—please try again later.",
      },
      { status: 502 },
    );
  }
}
