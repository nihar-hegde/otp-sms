"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMessages } from "@/hooks/use-messages";

export default function MessageList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useMessages(page);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <ul className="space-y-4">
        {data?.messages.map((message) => (
          <li key={message.id} className=" shadow rounded-lg p-4">
            <p className="font-bold">
              To: {message.contact.firstName} {message.contact.lastName}
            </p>
            <p>OTP: {message.otp}</p>
            <p className="text-sm text-gray-500">
              Sent at: {new Date(message.sentAt).toLocaleString()}
            </p>
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
