"use client";

import { toast } from "sonner";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UsernameInput({ message }: { message?: string }) {
  const { push } = useRouter();

  useEffect(() => {
    if (message) {
      toast.error(message);
      push("/");
    }
  }, [message, push]);

  return (
    <div className="min-h-screen flex px-4 flex-col justify-center items-center text-left">
      <div className="max-w-4xl mx-auto space-y-4">
        <p>
          View a GitHub user&apos;s profile by entering their username below.
        </p>
        <Input
          type="text"
          placeholder="Enter a username then press enter"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              push(`/?username=${e.currentTarget.value}`);
            }
          }}
        />
        <p>Try my username: &apos;saadfrhan&apos;</p>
      </div>
    </div>
  );
}
