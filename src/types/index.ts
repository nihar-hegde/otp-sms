// types/index.ts
export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface Message {
  id: number;
  otp: string;
  content: string;
  contactId: number;
  sentAt: string;
  contact: Contact;
}
