import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { XIcon } from "lucide-react";

export default function Close() {
  return (
    <Link href="/" className="absolute top-4 left-4">
      <XIcon className="w-4 h-4" />
    </Link>
  );
}
