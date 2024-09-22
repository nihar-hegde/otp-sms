"use client";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContact } from "@/hooks/use-contact";
import { useSendMessage } from "@/hooks/use-send-message";
import { toast } from "@/hooks/use-toast";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export default function ContactInfo({ id }: { id: string }) {
  const [message, setMessage] = useState("");
  const { data: contact, isLoading, error } = useContact(id);
  const sendMessageMutation = useSendMessage();

  useEffect(() => {
    const otp = generateOTP();
    setMessage(`Hi, Your OTP is: ${otp}`);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;
  if (!contact) return <div>Contact not found</div>;

  const handleSendMessage = async () => {
    try {
      const otp = message.split(": ")[1]; // Extract OTP from the message
      await sendMessageMutation.mutateAsync({ contactId: contact.id, otp });
      toast({
        title: "Message sent successfully",
        description: `OTP sent to ${contact.firstName} ${contact.lastName}`,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error sending message",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">
        {contact.firstName} {contact.lastName}
      </h2>
      <p className="mb-4">Phone: {contact.phone}</p>
      <div className="flex flex-col space-y-2">
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message with OTP"
          className="w-full"
        />
        <Button
          onClick={handleSendMessage}
          disabled={sendMessageMutation.isPending}
        >
          {sendMessageMutation.isPending ? "Sending..." : "Send Message"}
        </Button>
      </div>
    </div>
  );
}
