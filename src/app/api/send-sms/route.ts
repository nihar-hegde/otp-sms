import prisma from "@/lib/db/prisma";
import { sendSMS } from "@/lib/sendOTP";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { contactId, otp } = await request.json();

  const contact = await prisma.contact.findUnique({ where: { id: contactId } });
  if (!contact) {
    return NextResponse.json({ error: "Contact not found" }, { status: 404 });
  }

  const content = `Hi, Your OTP is: ${otp}`;

  try {
    const response = await sendSMS(contact.phone, content);

    const message = await prisma.message.create({
      data: { contactId, otp, content },
    });

    return NextResponse.json({ message, smsResponse: response });
  } catch (error) {
    console.error("Error sending SMS:", error);
    return NextResponse.json({ error: "Failed to send SMS" }, { status: 500 });
  }
}
