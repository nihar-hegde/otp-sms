import { useQuery } from "@tanstack/react-query";
import { Message } from "@/types";

async function fetchMessages(page: number = 1, limit: number = 10) {
  const response = await fetch(`/api/messages?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export function useMessages(page: number = 1, limit: number = 10) {
  return useQuery<{
    messages: Message[];
    meta: { total: number; totalPages: number };
  }>({
    queryKey: ["messages", page, limit],
    queryFn: () => fetchMessages(page, limit),
  });
}
