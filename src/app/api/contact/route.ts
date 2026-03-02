import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// ── Échappement HTML – protège contre l'injection dans le template email ──
function escapeHtml(raw: unknown): string {
  return String(raw ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

// ── Validation email ──
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// ── Rate limiting in-memory (best-effort, resets par instance serverless) ──
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX    = 5;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 heure

function isRateLimited(ip: string): boolean {
  const now   = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  // ── Rate limiting ──
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim()
           ?? req.headers.get("x-real-ip")
           ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Trop de demandes. Veuillez réessayer dans une heure." },
      { status: 429 },
    );
  }

  // ── Parse body ──
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const { name, email, phone, company, service, message } = body;

  // ── Champs requis ──
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
  }

  // ── Format email ──
  if (!EMAIL_REGEX.test(String(email))) {
    return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 });
  }

  // ── Limites de longueur ──
  if (String(name).length > 100)     return NextResponse.json({ error: "Nom trop long."     }, { status: 400 });
  if (String(email).length > 254)    return NextResponse.json({ error: "Email trop long."   }, { status: 400 });
  if (String(message).length > 5000) return NextResponse.json({ error: "Message trop long." }, { status: 400 });

  // ── Échappement de toutes les données utilisateur ──
  const safeName    = escapeHtml(name);
  const safeEmail   = escapeHtml(email);
  const safePhone   = escapeHtml(phone);
  const safeCompany = escapeHtml(company);
  const safeService = escapeHtml(service);
  const safeMessage = escapeHtml(message);

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from:    "Smart Cube Services <noreply@smartcube.ma>",
    to:      "cubesmartservices@gmail.com",
    replyTo: String(email),
    subject: `Nouveau contact – ${safeService || "Site web"} | ${safeName}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;background:#1C1C1C;color:#fff;padding:32px;border-radius:12px;">
        <h2 style="color:#F47920;margin-top:0">Nouveau message de contact</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#9B9EA3;width:130px">Nom</td><td style="padding:8px 0">${safeName}</td></tr>
          <tr><td style="padding:8px 0;color:#9B9EA3">Email</td><td style="padding:8px 0"><a href="mailto:${safeEmail}" style="color:#F47920">${safeEmail}</a></td></tr>
          ${safePhone   ? `<tr><td style="padding:8px 0;color:#9B9EA3">Téléphone</td><td style="padding:8px 0">${safePhone}</td></tr>`   : ""}
          ${safeCompany ? `<tr><td style="padding:8px 0;color:#9B9EA3">Société</td><td style="padding:8px 0">${safeCompany}</td></tr>`   : ""}
          ${safeService ? `<tr><td style="padding:8px 0;color:#9B9EA3">Service</td><td style="padding:8px 0">${safeService}</td></tr>`   : ""}
        </table>
        <hr style="border:none;border-top:1px solid #333;margin:20px 0" />
        <p style="color:#9B9EA3;margin-bottom:8px">Message :</p>
        <p style="white-space:pre-wrap;line-height:1.6">${safeMessage}</p>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
