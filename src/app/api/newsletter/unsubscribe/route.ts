import { NextResponse } from "next/server";
import { z } from "zod";
import { doc } from "@/lib/google-sheets";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const schema = z.object({
  email: z.string().trim().email().max(254),
});

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = rateLimit(`unsubscribe:${ip}`, {
    limit: 5,
    windowMs: 60_000,
  });

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

  const email = parsed.email.toLowerCase();

  try {
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle["Newsletter Signup"];

    if (!sheet) {
      return NextResponse.json({ success: true });
    }

    const rows = await sheet.getRows();
    const matches = rows.filter(
      (row) => (row.get("Email") || "").toLowerCase() === email
    );

    for (const row of matches) {
      await row.delete();
    }

    return NextResponse.json({ success: true, removed: matches.length });
  } catch (error) {
    console.error("Error processing unsubscribe:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
