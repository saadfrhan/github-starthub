import { Octokit } from "@octokit/rest";
import { RequestError } from "@octokit/types";

const octokit = new Octokit();

export async function getRepos(username: string, page = 1, search?: string) {
  try {
    const response = await octokit.repos.listForUser({
      username,
      per_page: 30,
      sort: "full_name",
      page,
    });


    // more info, star gazers, fork count, description, langugage
    const repos = response.data.map((repo) => {
      return {
        name: repo.name,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        description: repo.description,
        language: repo.language,
        fork: repo.fork,
        updated_at: repo.updated_at,
      };
    });

    const sortedRepos = repos.sort((a, b) => a.name.localeCompare(b.name));

    const groupedRepos = sortedRepos.reduce(
      (
        acc: Record<
          string,
          {
            name: string;
            stargazers_count: number | undefined;
            forks_count: number | undefined;
            description: string | null;
            language: string | null | undefined;
            fork: boolean;
            updated_at: string | null | undefined;
          }[]
        >,
        repo
      ) => {
        const firstLetter = repo.name[0].toLowerCase();

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
