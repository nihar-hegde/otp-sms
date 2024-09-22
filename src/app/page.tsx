import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">OTP SMS App</h1>
      <div className="flex space-x-4">
        <Link href="/contacts">
          <Button variant="default">Contacts</Button>
        </Link>
        <Link href="/messages">
          <Button variant="secondary">Sent Messages</Button>
        </Link>
      </div>
    </div>
  );
}
