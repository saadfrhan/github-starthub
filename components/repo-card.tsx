import { GitFork, StarIcon } from "lucide-react";
import Link from "next/link";

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
    fork: boolean;
    updated_at: string | null | undefined;
  };
  username?: string;
}) {

  return (
    <Link
      className="border hover:bg-accent hover:text-accent-foreground p-4 rounded-md max-sm:w-full space-y-1"
      href={`https://github.com/${username}/${repo.name}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <p>{repo.name}</p>
      {repo.fork && <p className="text-xs">Forked</p>}
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
      {/* updated at */}

      <div className="flex items-center gap-2">
        {repo.language && <p className="text-xs">{repo.language}</p>}
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
        <p className="text-xs">
        {/* format in this way Updated on Mar 16 */}
        {repo.updated_at &&
          `Updated on ${new Date(repo.updated_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}`}
        </p>
      </div>
    </Link>
  );
}
