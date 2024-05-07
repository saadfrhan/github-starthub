"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Input } from "./ui/input";

function Search() {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 768
  );

  const current = useMemo(
    () => new URLSearchParams(Array.from(searchParams.entries())),
    [searchParams]
  );

  useEffect(() => {
    typeof window !== "undefined" &&
      window.addEventListener("resize", () => {
        setIsMobile(window.innerWidth <= 768);
      });
  }, []);

  useEffect(() => {
    if (isMobile) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.ctrlKey && typeof window === "undefined") {
        return;
      }

      if (event.key === "Enter") {
        current.set("search", search);
        push(`/?${current.toString()}`);
      } else if (event.key === "Backspace") {
        setSearch(search.slice(0, -1));
        current.set("search", search.slice(0, -1));
        push(`/?${current.toString()}`);
      } else if (event.key.length === 1) {
        setSearch(search + event.key);
        current.set("search", search + event.key);
        push(`/?${current.toString()}`);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [push, search, searchParams, isMobile, current]);

  return isMobile ? (
    <Input
      type="text"
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        current.set("search", e.target.value);
        push(`/?${current.toString()}`);
      }}
      placeholder="Search..."
    />
  ) : null;
}

export default Search;
