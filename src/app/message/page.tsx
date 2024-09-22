import MessageList from "@/components/message-list";

export default function MessagesPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sent Messages</h1>
      <MessageList />
    </div>
  );
}
