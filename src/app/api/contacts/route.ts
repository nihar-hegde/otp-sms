import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const contacts = await prisma.contact.findMany({
    orderBy: { lastName: "asc" },
  });
  return NextResponse.json(contacts);
}

export async function POST(request: Request) {
  const data = await request.json();
  const contact = await prisma.contact.create({ data });
  return NextResponse.json(contact);
}
