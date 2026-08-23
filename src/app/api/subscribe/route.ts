import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDictionary } from "@/lib/i18n";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: {
    email?: string;
    source?: string;
    company?: string;
    locale?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const dict = getDictionary(body.locale === "fr" ? "fr" : "en");

  // Honeypot — a hidden field real users never fill, bots often do.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: dict.subscribeErrorInvalidEmail },
      { status: 400 },
    );
  }

  const source = (body.source ?? "blog").slice(0, 40);

  try {
    await prisma.subscriber.upsert({
      where: { email },
      update: {},
      create: { email, source },
    });
  } catch {
    return NextResponse.json(
      { error: dict.subscribeErrorGeneric },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
