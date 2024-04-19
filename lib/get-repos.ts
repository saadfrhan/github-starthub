// get all repositories from github by alphabetical order, then split each same letter repositories into a group and return them as array of arrays

import { Octokit } from "@octokit/rest";

const octokit = new Octokit();

export async function getRepos() {
  const response = await octokit.repos.listForUser({
    username: "saadfrhan",
  });

  const repos = response.data.map((repo) => repo.name);

  const sortedRepos = repos.sort((a, b) => a.localeCompare(b));

  const groupedRepos = sortedRepos.reduce((acc, repo) => {
    const firstLetter = repo[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(repo);
    return acc;
  }, {});

  return Object.values(groupedRepos);
}

// get profile picture, fullname and bio from github

export async function getProfile() {
  const response = await octokit.users.getByUsername({
    username: "saadfrhan",
  });

  return {
    avatar: response.data.avatar_url,
    name: response.data.name,
    bio: response.data.bio,
    username: response.data.login,
  };
}
