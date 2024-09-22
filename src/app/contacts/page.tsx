// src/app/contacts/page.tsx
import ContactList from "@/components/contact-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ContactsPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
      <ContactList />
    </div>
  );
}
