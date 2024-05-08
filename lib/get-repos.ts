import { Octokit } from "@octokit/rest";
import { RequestError } from "@octokit/types";

const octokit = new Octokit();

export async function getRepos(username: string, page = 1) {
  try {
    const response = await octokit.repos.listForUser({
      username,
      per_page: 30,
      sort: "full_name",
      page,
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

        // If the first letter is a number, use '#' as the key
        const key = isNaN(Number(firstLetter)) ? firstLetter : "#";

        if (!acc[key]) {
          acc[key] = [];
        }

        acc[key].push(repo);

        return acc;
      },
      {}
    );

    const repoCount = sortedRepos.length;

    return {
      groupedRepos: Object.values(groupedRepos),
      repoCount,
    };
  } catch (error) {
    if ((error as RequestError).status === 404) {
      return { message: `User ${username} not found` };
    } else {
      throw error;
    }
  }
}

export async function getProfile(username: string) {
  try {
    const response = await octokit.users.getByUsername({
      username,
    });

    return {
      avatar: response.data.avatar_url,
      name: response.data.name,
      bio: response.data.bio,
      username: response.data.login,
      twitter_username: response.data.twitter_username,
    };
  } catch (error) {
    if ((error as RequestError).status === 404) {
      return { message: `User ${username} not found` };
    } else {
      throw error;
    }
  }
}
