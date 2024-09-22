import ContactList from "@/components/contact-list";

export default function ContactsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contacts</h1>
      <ContactList />
    </div>
  );
}
