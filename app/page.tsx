import CharacterGrid from "@/components/character-grid";
import PaginateButtons from "@/components/paginate-buttons";
import Search from "@/components/search";
import ShareButton from "@/components/share-profile";
import UsernameInput from "@/components/username-input";
import { getProfile, getRepos } from "@/lib/get-repos";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BsTwitter } from "react-icons/bs";

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

interface SearchParams {
  activateGrid?: string;
  search?: string;
  username?: string;
  activePage?: number;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const _username = searchParams.username;
  if (!_username) {
    return {
      title: "Explore Repositories",
      description: "Explore repositories from GitHub",
    };
  }

  const { name, username, avatar, bio } = await getProfile(_username);
  const openGraph = avatar ? { images: [avatar] } : {};
  return {
    title: `${name} (${username})`,
    description: bio ?? `Explore repositories from ${name} (${username})`,
    openGraph,
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const _username = searchParams.username;
  if (!_username) {
    return <UsernameInput />;
  }
  let { groupedRepos: repos, repoCount } = await getRepos(
    _username,
    searchParams.activePage
  );
  const { avatar, bio, name, username, twitter_username, message } =
    await getProfile(_username);

  if (message && typeof repos === "undefined") {
    return <UsernameInput message={message} />;
  }

  if (searchParams.search && repos) {
    repos = repos.filter((group) =>
      group.some((repo) => repo.toLowerCase().includes(searchParams.search!))
    );
  }

  if (searchParams.activateGrid && repos) {
    return (
      <CharacterGrid
        unavailable={alphabet.filter(
          (char) => !repos.some((group) => group[0][0].toLowerCase() === char)
        )}
      />
    );
  }

  return (
    <div className="mx-auto max-w-4xl py-5 space-y-5 md:py-12 min-h-screen">
      <div className="flex flex-col gap-y-2 px-4">
        {avatar && (
          <Image
            className="w-24 h-24 rounded-full"
            src={avatar}
            alt={username}
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
                  <BsTwitter />
                  <p className="underline">@{twitter_username}</p>
                </Link>
              </div>
            )}
            <ShareButton url={`https://github.com/${username}`} />
          </div>
        </div>
      </div>
      <div className="px-4">
        <Search />
      </div>
      <div className="space-y-4 px-3">
        {repos &&
          repos.map((group) => {
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
                  href={`/?username=${username}&activateGrid=true`}
                  className="text-2xl hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md flex items-center justify-center w-full max-sm:justify-start max-sm:rounded-none"
                >
                  <p>{char}</p>
                </Link>
                <div className="grid grid-cols-3 gap-2 max-md:grid-cols-2 max-sm:grid-cols-1 w-full">
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
      {repoCount && (
        <PaginateButtons
          activePage={Number(searchParams.activePage) || 1}
          disable={{
            previous: searchParams.activePage === 1,
            next: repoCount < 30,
          }}
        />
      )}
    </div>
  );
}
