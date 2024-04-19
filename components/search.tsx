"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function Search() {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    function handleKeyDown(event: KeyboardEvent) {
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
  }, [push, search, searchParams]);

  return null;
}

export default Search;
