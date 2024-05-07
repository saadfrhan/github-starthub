"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import { Button } from "./ui/button";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export default function PaginateButtons({
  activePage,
  disable,
}: {
  activePage: number;
  disable: {
    previous: boolean;
    next: boolean;
  };
}) {
  const searchParams = useSearchParams();

  const current = useMemo(
    () => new URLSearchParams(Array.from(searchParams.entries())),
    [searchParams]
  );

  const { push, refresh } = useRouter();
  return (
    <div className="flex w-full justify-between">
      <Button
        disabled={activePage === 1 || disable.previous}
        onClick={() => {
          current.set("activePage", (activePage - 1).toString());
          refresh();
          push(`/?${current.toString()}`);
        }}
        size="icon"
      >
        <IoIosArrowBack className="w-4 h-4" />
      </Button>
      <Button
        disabled={disable.next}
        onClick={() => {
          current.set("activePage", (activePage + 1).toString());
          refresh();
          push(`/?${current.toString()}`);
        }}
        size="icon"
      >
        <IoIosArrowForward className="w-4 h-4" />
      </Button>
    </div>
  );
}
