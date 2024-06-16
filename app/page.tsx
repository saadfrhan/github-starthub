import Close from "@/components/close";
import PaginateButtons from "@/components/paginate-buttons";
import ProfileCard from "@/components/profile-card";
import RepoCard from "@/components/repo-card";
import UsernameInput from "@/components/username-input";
import { getProfile, getRepos } from "@/lib/get-repos";
import { Metadata } from "next";

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

interface SearchParams {
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
      group.some((repo) =>
        repo.name.toLowerCase().includes(searchParams.search!)
      )
    );
  }

  return (
    <div className="mx-auto flex max-md:flex-col max-w-7xl py-5 space-y-5 md:py-12 min-h-screen">
      <Close />
      <ProfileCard
        avatar={avatar}
        name={name}
        username={username}
        bio={bio}
        twitter_username={twitter_username}
      />
      <div className="space-y-4">
      <section className="space-y-2 px-3" id="repos">
        {repos &&
          repos.map((group, index) => {
            const char = alphabet.includes(group[0].name[0].toLowerCase())
              ? group[0].name[0].toUpperCase()
              : "#";
            return (
              <section
                key={index}
                className="grid grid-cols-[0.4fr_5fr] max-sm:flex max-sm:flex-col gap-2 items-start"
                id={char}
              >
                <div className="text-2xl px-4 py-2 flex items-center justify-center w-full max-sm:justify-start">
                  <p>{char}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 max-md:grid-cols-2 max-sm:grid-cols-1 w-full">
                  {group.map((repo, index) => (
                    <RepoCard key={index} repo={repo} username={username} />
                  ))}
                </div>
              </section>
            );
          })}
      </section>
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
    </div>
  );
}
