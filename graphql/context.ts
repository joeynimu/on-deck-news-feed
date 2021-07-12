import { PrismaClient } from "@prisma/client";

declare const global: NodeJS.Global & { prisma?: PrismaClient };

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export interface ContextInterface {
  prisma: PrismaClient;
}

export const context: ContextInterface = {
  prisma: prisma,
};
