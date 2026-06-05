import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const { SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_PORT } = process.env;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !adminEmail) {
      return NextResponse.json({
        success: true,
        fallback: true,
        message: "SMTP not configured — use mailto fallback",
      });
    }

    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: false,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const text =
      body.message ||
      `Order from ${body.name}\nPhone: ${body.phone}\nAddress: ${body.address}`;

    await transporter.sendMail({
      from: SMTP_USER,
      to: adminEmail,
      subject: `New Toy Order — ${body.name}`,
      text,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Order email error:", error);
    return NextResponse.json(
      { error: "Failed to send email", fallback: true },
      { status: 500 }
    );
  }
}
