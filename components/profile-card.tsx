import React from "react";
import { BsTwitterX } from "react-icons/bs";
import ShareButton from "./share-profile";
import Link from "next/link";
import Image from "next/image";

export default function ProfileCard({
  avatar,
  name,
  username,
  bio,
  twitter_username,
}: {
  avatar?: string;
  name?: string | null;
  username?: string;
  bio?: string | null;
  twitter_username?: string | null;
}) {
  return (
    <div className="flex flex-col gap-y-2 px-4">
      {avatar && (
        <Image
          className="w-24 h-24 rounded-full"
          src={avatar}
          alt={name ?? `${username}'s avatar`}
          quality={100}
          priority={true}
          width={96}
          height={96}
        />
      )}
      <div>
        <h1 className="text-2xl">{name}</h1>
        <p className="text-lg">{username}</p>
        <p className="max-w-xs">{bio}</p>
        <div className="flex w-full justify-between items-center">
          {twitter_username && (
            <div className="flex gap-2 py-2 items-center">
              <Link
                href={`https://twitter.com/${twitter_username}`}
                className="flex items-center gap-2 justify-center"
                target="_blank"
              >
                <BsTwitterX />
                <p className="underline">@{twitter_username}</p>
              </Link>
            </div>
          )}
          <ShareButton url={`https://github.com/${username}`} />
        </div>
      </div>
    </div>
  );
}
