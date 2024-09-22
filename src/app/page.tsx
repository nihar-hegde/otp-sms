import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-neutral-950 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">OTP SMS App</h1>
        <div className="flex flex-col space-y-4">
          <Link href="/contacts" className="w-full">
            <Button variant="default" className="w-full">
              Manage Contacts
            </Button>
          </Link>
          <Link href="/messages" className="w-full">
            <Button variant="secondary" className="w-full">
              View Sent Messages
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
