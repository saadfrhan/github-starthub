"use client";

import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

export default function UsernameInput() {
  const { push } = useRouter();
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
      </div>
    </div>
  );
}
