import { NextResponse } from "next/server";
import { doc } from "@/lib/google-sheets";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // 1. Add to Google Sheet
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle["Contact Form"];
    if (!sheet) {
      console.error("Sheet 'Contact Form' not found");
      // Start a background process to create it? Or just fail?
      // For now, let's log and proceed (email might still work).
    } else {
      await sheet.addRow({
        Date: new Date().toISOString(),
        Name: name,
        Email: email,
        Message: message,
      });
    }

    // 2. Send Email
    await sendEmail({
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p> <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
