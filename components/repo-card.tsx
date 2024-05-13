import { GitFork, StarIcon } from "lucide-react";
import Link from "next/link";

// a library is needed that provides colors for languages
const language_dot_colors: {
  [key: string]: string;
} = {
  Dockerfile: "#384d54",
  JavaScript: "#f1e05a",
  TypeScript: "#2b7489",
  Kotlin: "#A97BFF",
  Svelte: "#ff3e00",
  HTML: "#e34c26",
  Go: "#00ADD8",
  Python: "#3572A5",
  C: "#555555",
  "C++": "#f34b7d",
};

export default function RepoCard({
  repo,
  username,
}: {
  repo: {
    name: string;
    description: string | null;
    language: string | null | undefined;
    stargazers_count: number | undefined;
    forks_count: number | undefined;
  };
  username?: string;
}) {
  return (
    <Link
      className="border hover:bg-accent hover:text-accent-foreground p-4 rounded-md max-sm:w-full flex flex-col justify-start space-y-1"
      href={`https://github.com/${username}/${repo.name}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <p>{repo.name}</p>
      {repo.description && (
        <p
          className="text-xs max-w-xs"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {repo.description}
        </p>
      )}
      <div className="flex items-center gap-2">
        {repo.language && (
          <div className="flex items-center gap-1 text-xs">
            <div
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: language_dot_colors[repo.language] || "#000",
              }}
            ></div>
            <p>{repo.language}</p>
          </div>
        )}
        <Link
          className="flex gap-1 items-center hover:text-primary duration-100"
          href={`https://github.com/${username}/${repo.name}/stargazers`}
        >
          <StarIcon className="w-3 h-3" />
          <p className="text-xs">
            {repo.stargazers_count
              ? new Intl.NumberFormat().format(repo.stargazers_count)
              : 0}
          </p>
        </Link>
        <Link
          className="flex gap-1 items-center hover:text-primary duration-100"
          href={`https://github.com/${username}/${repo.name}/forks`}
        >
          <GitFork className="w-3 h-3" />
          <p className="text-xs">
            {repo.forks_count
              ? new Intl.NumberFormat().format(repo.forks_count)
              : 0}
          </p>
        </Link>
      </div>
    </Link>
  );
}
