import { PrismaClient } from "@prisma/client";
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// if (!globalThis.prisma) {
//   globalThis.prisma = new PrismaClient();
// }
// export const client = globalThis.prisma;
export const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = client;
