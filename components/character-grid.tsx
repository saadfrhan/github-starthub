import React from "react";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CharacterGrid({
  unavailable,
}: {
  unavailable: string[];
}) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-background bg-opacity-100 z-50">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg w-xl">
        <div className="grid grid-cols-4 gap-2 mt-4">
          <a
            className={buttonVariants({
              variant: "ghost",
              size: "icon",
              className: "border-foreground",
            })}
            href="/#"
          >
            #
          </a>
          {Array.from({ length: 26 }, (_, i) =>
            String.fromCharCode(65 + i)
          ).map((char) => {
            return (
              <Link
                key={char}
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon",
                  className: cn(
                    "border-foreground",
                    unavailable.includes(char.toLowerCase()) &&
                      "cursor-default pointer-events-none bg-muted text-muted-foreground"
                  ),
                })}
                href={`/#${char}`}
              >
                {char}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
