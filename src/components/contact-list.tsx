// src/components/contact-list.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useContacts } from "@/hooks/use-contacts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ContactList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useContacts(page);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        An error occurred: {error.message}
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.contacts.map((contact) => (
          <Card key={contact.id}>
            <CardContent className="p-4">
              <Link href={`/contacts/${contact.id}`}>
                <h3 className="text-lg font-semibold hover:text-blue-600 transition-colors">
                  {contact.firstName} {contact.lastName}
                </h3>
              </Link>
              <p className="text-sm text-gray-500">{contact.phone}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-6 flex justify-between">
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
