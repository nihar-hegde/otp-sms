import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;

  const [messages, total] = await Promise.all([
    prisma.message.findMany({
      include: { contact: true },
      orderBy: { sentAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.message.count(),
  ]);

  return NextResponse.json({
    messages,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
}
