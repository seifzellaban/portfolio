import { NextResponse } from "next/server";
import { doc } from "@/lib/google-sheets";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // 1. Add to Google Sheet
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle["Newsletter Signup"];
    if (!sheet) {
      console.error("Sheet 'Newsletter Signup' not found");
    } else {
      await sheet.addRow({
        Date: new Date().toISOString(),
        Email: email,
      });
    }

    // 2. Send Email Notification to Admin
    await sendEmail({
      subject: `New Newsletter Signup: ${email}`,
      text: `New subscriber: ${email}`,
      html: `<p>New subscriber: <strong>${email}</strong></p>`,
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
