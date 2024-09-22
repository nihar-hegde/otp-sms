// src/components/contact-info.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContact } from "@/hooks/use-contact";
import { useSendMessage } from "@/hooks/use-send-message";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export default function ContactInfo({ id }: { id: string }) {
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");
  const { data: contact, isLoading, error } = useContact(id);
  const sendMessageMutation = useSendMessage();

  useEffect(() => {
    const newOtp = generateOTP();
    setOtp(newOtp);
    setMessage(`Hi, Your OTP is: ${newOtp}`);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;
  if (!contact) return <div>Contact not found</div>;

  const handleSendMessage = async () => {
    try {
      await sendMessageMutation.mutateAsync({ contactId: contact.id, otp });
      toast({
        title: "Message sent successfully",
        description: `OTP sent to ${contact.firstName} ${contact.lastName}`,
      });
      // Generate a new OTP for the next message
      const newOtp = generateOTP();
      setOtp(newOtp);
      setMessage(`Hi, Your OTP is: ${newOtp}`);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error sending message",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {contact.firstName} {contact.lastName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Phone: {contact.phone}</p>
        <div className="flex flex-col space-y-4">
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
      </CardContent>
    </Card>
  );
}
