// src/components/message-list.tsx
"use client";

import { useState } from "react";
import { useMessages } from "@/hooks/use-messages";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function MessageList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useMessages(page);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
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
      <div className="space-y-4">
        {data?.messages.map((message) => (
          <Card key={message.id}>
            <CardContent className="p-4">
              <h3 className="font-semibold">
                To: {message.contact.firstName} {message.contact.lastName}
              </h3>
              <p className="text-sm">OTP: {message.otp}</p>
              <p className="text-xs text-gray-500">
                Sent at: {new Date(message.sentAt).toLocaleString()}
              </p>
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
