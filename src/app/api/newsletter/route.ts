import { NextResponse } from "next/server";
import { z } from "zod";
import { doc } from "@/lib/google-sheets";
import { sendEmail } from "@/lib/email";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { escapeHtml } from "@/lib/html";

const schema = z.object({
  email: z.string().trim().email().max(254),
  website: z.string().max(200).optional().default(""),
});

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = rateLimit(`newsletter:${ip}`, { limit: 3, windowMs: 60_000 });

  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  let parsed: z.infer<typeof schema>;

  try {
    parsed = schema.parse(await request.json());
  } catch {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (parsed.website) {
    return NextResponse.json({ success: true });
  }

  const email = parsed.email.toLowerCase();

  try {
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle["Newsletter Signup"];

    if (!sheet) {
      console.error("Sheet 'Newsletter Signup' not found");
      return NextResponse.json(
        { error: "Subscriptions are temporarily unavailable." },
        { status: 503 }
      );
    }

    const rows = await sheet.getRows();
    const existing = rows.find(
      (row) => (row.get("Email") || "").toLowerCase() === email
    );

    // Idempotent: re-subscribing is fine and must not spam the inbox.
    if (existing) {
      return NextResponse.json({ success: true, existing: true });
    }

    await sheet.addRow({
      Date: new Date().toISOString(),
      Email: email,
    });

    await sendEmail({
      subject: `New newsletter signup: ${email}`,
      text: `New subscriber: ${email}`,
      html: `<p>New subscriber: <strong>${escapeHtml(email)}</strong></p>`,
      headers: {
        "List-Unsubscribe": `<mailto:seifzellaban@gmail.com?subject=Unsubscribe%20${encodeURIComponent(
          email
        )}>`,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing newsletter signup:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
