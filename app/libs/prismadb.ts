import { PrismaClient } from "@prisma/client";
import { decl } from "postcss";
declare global {
    var prisma: PrismaClient | undefined;
}
const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = client;
}
export default client;
