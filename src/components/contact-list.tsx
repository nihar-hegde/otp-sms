"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useContacts } from "@/hooks/use-contacts";

export default function ContactList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useContacts(page);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <ul className="space-y-2">
        {data?.contacts.map((contact) => (
          <li key={contact.id} className=" shadow rounded-lg p-4">
            <Link href={`/contacts/${contact.id}`}>
              <span className="text-blue-600 hover:underline">
                {contact.firstName} {contact.lastName}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-between">
        <Button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => setPage((p) => p + 1)}
          disabled={page === data?.meta.totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
