import { NextResponse } from "next/server";
import { z } from "zod";
import { doc } from "@/lib/google-sheets";
import { sendEmail } from "@/lib/email";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { escapeHtml, stripNewlines } from "@/lib/html";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(10).max(5_000),
  projectType: z.string().trim().max(60).optional().default(""),
  // Honeypot — real browsers never fill this.
  website: z.string().max(200).optional().default(""),
});

const projectTypes = [
  "Website",
  "Web app",
  "UI/UX design",
  "AI / automation",
  "Other",
];

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = rateLimit(`contact:${ip}`, { limit: 5, windowMs: 60_000 });

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
      { error: "Please check the form fields and try again." },
      { status: 400 }
    );
  }

  // Silently accept honeypot submissions so bots don't learn.
  if (parsed.website) {
    return NextResponse.json({ success: true });
  }

  const { name, email, message } = parsed;
  const projectType = projectTypes.includes(parsed.projectType)
    ? parsed.projectType
    : "Not specified";
  const safeName = stripNewlines(name);

  try {
    // 1. Persist to Google Sheets
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle["Contact Form"];

    if (sheet) {
      const headers = sheet.headerValues;
      if (!headers.includes("Type")) {
        await sheet.setHeaderRow([...headers, "Type"]);
      }

      await sheet.addRow({
        Date: new Date().toISOString(),
        Name: name,
        Email: email,
        Type: projectType,
        Message: message,
      });
    } else {
      console.error("Sheet 'Contact Form' not found");
    }

    // 2. Notify by email
    await sendEmail({
      subject: `New project inquiry from ${safeName}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\nProject type: ${projectType}\n\n${message}`,
      html: `
        <h3>New project inquiry</h3>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Project type:</strong> ${escapeHtml(projectType)}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap">${escapeHtml(message)}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
