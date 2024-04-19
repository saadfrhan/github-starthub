import { Octokit } from "@octokit/rest";

const octokit = new Octokit();

export async function getRepos() {
  const response = await octokit.repos.listForUser({
    username: process.env.NEXT_PUBLIC_GITHUB_USERNAME!,
  });

  const repos = response.data.map((repo) => repo.name);

  const sortedRepos = repos.sort((a, b) => a.localeCompare(b));

  const groupedRepos = sortedRepos.reduce(
    (
      acc: {
        [key: string]: string[];
      },
      repo
    ) => {
      const firstLetter = repo[0].toUpperCase();

      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }

      acc[firstLetter].push(repo);

      return acc;
    },
    {}
  );

  return Object.values(groupedRepos);
}

export async function getProfile() {
  const response = await octokit.users.getByUsername({
    username: process.env.NEXT_PUBLIC_GITHUB_USERNAME!,
  });

  return {
    avatar: response.data.avatar_url,
    name: response.data.name,
    bio: response.data.bio,
    username: response.data.login,
  };
}
