import { useQuery } from "@tanstack/react-query";
import { Contact } from "@/types";

async function fetchContact(id: string) {
  const response = await fetch(`/api/contacts/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export function useContact(id: string) {
  return useQuery<Contact>({
    queryKey: ["contact", id],
    queryFn: () => fetchContact(id),
  });
}
