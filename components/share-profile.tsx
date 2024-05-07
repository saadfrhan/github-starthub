"use client";

import { RWebShare } from "react-web-share";
import { Button } from "./ui/button";
import { CgLink } from "react-icons/cg";

export default function ShareButton({ url }: { url: string }) {
  return (
    <RWebShare
      data={{
        url,
        text: "Check out this profile!",
        title: "Profile",
      }}
      onClick={() => console.log("shared successfully!")}
    >
      <Button variant="ghost" size="sm">
        Share
      </Button>
    </RWebShare>
  );
}
