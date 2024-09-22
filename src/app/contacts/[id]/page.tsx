import ContactInfo from "@/components/contact-info";

export default function ContactPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Information</h1>
      <ContactInfo id={params.id} />
    </div>
  );
}
