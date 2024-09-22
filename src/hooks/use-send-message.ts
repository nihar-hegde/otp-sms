import { useMutation, useQueryClient } from "@tanstack/react-query";

async function sendMessage(contactId: number, otp: string) {
  const response = await fetch("/api/send-sms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contactId, otp }),
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  return response.json();
}

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ contactId, otp }: { contactId: number; otp: string }) =>
      sendMessage(contactId, otp),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
}
