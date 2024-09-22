import { useQuery } from "@tanstack/react-query";
import { Contact } from "@/types";

async function fetchContacts(page: number = 1, limit: number = 10) {
  const response = await fetch(`/api/contacts?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export function useContacts(page: number = 1, limit: number = 10) {
  return useQuery<{
    contacts: Contact[];
    meta: { total: number; totalPages: number };
  }>({
    queryKey: ["contacts", page, limit],
    queryFn: () => fetchContacts(page, limit),
  });
}
