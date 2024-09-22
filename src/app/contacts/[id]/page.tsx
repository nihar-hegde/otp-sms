// src/app/contacts/[id]/page.tsx
import ContactInfo from "@/components/contact-info";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ContactPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contact Information</h1>
        <Link href="/contacts">
          <Button variant="outline">Back to Contacts</Button>
        </Link>
      </div>
      <ContactInfo id={params.id} />
    </div>
  );
}
