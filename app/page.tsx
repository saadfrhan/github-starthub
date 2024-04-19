import CharacterGrid from "@/components/character-grid";
import Search from "@/components/search";
import { getProfile, getRepos } from "@/lib/get-repos";
import Image from "next/image";
import Link from "next/link";

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

export default async function Home({
  searchParams,
}: {
  searchParams: {
    activateGrid?: string;
    search?: string;
  };
}) {
  // `any` for now
  let repos: any = await getRepos();
  const { avatar, bio, name, username } = await getProfile();

  if (searchParams.search) {
    // @ts-ignore
    repos = repos.filter((group) =>
      // @ts-ignore
      group.some((repo) => repo.toLowerCase().includes(searchParams.search))
    );
  }

  return (
    <div className="mx-auto max-w-4xl py-8  space-y-4 min-h-screen">
      <Search />
      {searchParams.activateGrid && (
        <CharacterGrid
          unavailable={alphabet.filter(
            // @ts-ignore
            (char) => !repos.some((group) => group[0][0].toLowerCase() === char)
          )}
        />
      )}
      <div className="flex flex-col gap-y-2 px-4">
        <Image
          className="w-24 h-24 rounded-full"
          src={avatar}
          alt="Profile Picture"
          width={96}
          height={96}
        />
        <div>
          <h1 className="text-2xl">{name}</h1>
          <p className="text-lg">{username}</p>
          <p className="max-w-xs">{bio}</p>
        </div>
      </div>
      <div className="space-y-4">
        {/* @ts-ignore */}
        {repos.map((group) => {
          const char = alphabet.includes(group[0][0].toLowerCase())
            ? group[0][0].toUpperCase()
            : "#";
          return (
            <section
              key={group[0][0]}
              className="grid grid-cols-[0.4fr_5fr] max-sm:flex max-sm:flex-col gap-2 items-start"
              id={char}
            >
              <Link
                href="/?activateGrid=true"
                className="text-2xl hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md flex items-center justify-center w-full max-sm:justify-start max-sm:rounded-none"
              >
                <p>{char}</p>
              </Link>
              {/* 3x3 grid */}
              <div className="grid grid-cols-3 gap-2 max-md:grid-cols-2 max-sm:grid-cols-1 w-full">
                {/* @ts-ignore */}
                {group.map((repo) => (
                  <Link
                    key={repo}
                    href={`https://github.com/${username}/${repo}`}
                    className="hover:bg-accent hover:text-accent-foreground px-5 py-3 rounded-md max-sm:w-full max-sm:rounded-none"
                    target="_blank"
                  >
                    {repo}
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
