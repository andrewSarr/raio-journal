import { PrismaClient } from "@/generated/prisma/client";

// Standard Next.js singleton so dev-mode hot reload doesn't exhaust
// connections by re-instantiating a client on every module reload.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
