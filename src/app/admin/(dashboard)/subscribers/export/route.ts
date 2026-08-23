import { prisma } from "@/lib/prisma";

export async function GET() {
  const subscribers = await prisma.subscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  const rows = [
    ["email", "source", "created_at"],
    ...subscribers.map((s) => [
      s.email,
      s.source,
      s.createdAt.toISOString(),
    ]),
  ];
  const csv = rows.map((r) => r.map(csvEscape).join(",")).join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="raio-subscribers.csv"`,
    },
  });
}

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
