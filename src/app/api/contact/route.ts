import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, phone, company, service, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Smart Cube Services <noreply@smartcubeservices.ma>",
    to:   "cubesmartservices@gmail.com",
    replyTo: email,
    subject: `Nouveau contact – ${service || "Site web"} | ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;background:#1C1C1C;color:#fff;padding:32px;border-radius:12px;">
        <h2 style="color:#F47920;margin-top:0">Nouveau message de contact</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#9B9EA3;width:130px">Nom</td><td style="padding:8px 0">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#9B9EA3">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#F47920">${email}</a></td></tr>
          ${phone   ? `<tr><td style="padding:8px 0;color:#9B9EA3">Téléphone</td><td style="padding:8px 0">${phone}</td></tr>` : ""}
          ${company ? `<tr><td style="padding:8px 0;color:#9B9EA3">Société</td><td style="padding:8px 0">${company}</td></tr>` : ""}
          ${service ? `<tr><td style="padding:8px 0;color:#9B9EA3">Service</td><td style="padding:8px 0">${service}</td></tr>` : ""}
        </table>
        <hr style="border:none;border-top:1px solid #333;margin:20px 0" />
        <p style="color:#9B9EA3;margin-bottom:8px">Message :</p>
        <p style="white-space:pre-wrap;line-height:1.6">${message}</p>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
