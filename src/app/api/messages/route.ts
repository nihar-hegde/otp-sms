import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const messages = await prisma.message.findMany({
    include: { contact: true },
    orderBy: { sentAt: "desc" },
  });
  return NextResponse.json(messages);
}
