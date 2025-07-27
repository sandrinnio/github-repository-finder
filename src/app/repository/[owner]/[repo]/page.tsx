import Link from "next/link";
import Image from "next/image";
import { StatCard, BackButton } from "@/components";
import { getRepository } from "./actions";
import { PageProps } from "@/interfaces";

export default async function RepositoryDetailPage({ params }: PageProps) {
  const { owner, repo } = await params;
  const repository = await getRepository(owner, repo);

  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <div className="p-6 md:p-8">
        <div className="flex items-start md:items-center flex-col md:flex-row mb-6">
          <Image
            src={repository.owner.avatar_url}
            alt={`${repository.owner.login}'s avatar`}
            className="w-20 h-20 rounded-full mr-6"
            width={80}
            height={80}
          />
          <div className="mt-4 md:mt-0">
            <h1 className="text-3xl font-bold text-gray-900">
              {repository.name}
            </h1>
            <p className="text-gray-600 text-lg">by {repository.owner.login}</p>
          </div>
        </div>
        <p className="text-gray-700 my-4 text-lg">{repository.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon={
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.533 4.695a1 1 0 00.95.69h4.905c.969 0 1.371 1.24.588 1.81l-3.968 2.88a1 1 0 00-.364 1.118l1.533 4.695c.3.921-.755 1.688-1.54 1.118l-3.968-2.88a1 1 0 00-1.175 0l-3.968 2.88c-.784.57-1.838-.197-1.539-1.118l1.533-4.695a1 1 0 00-.364-1.118L2.02 10.122c-.783-.57-.38-1.81.588-1.81h4.905a1 1 0 00.95-.69L9.049 2.927z"
                />
              </svg>
            }
            label="Stars"
            value={repository.stargazers_count}
          />
          <StatCard
            icon={
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            }
            label="Forks"
            value={repository.forks_count}
          />
          <StatCard
            icon={
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
            label="Open Issues"
            value={repository.open_issues_count}
          />
          <StatCard
            icon={
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l-4 4-4-4 4-4"
                />
              </svg>
            }
            label="Language"
            value={repository.language || "N/A"}
          />
        </div>

        <div className="flex justify-center space-x-4 border-t border-gray-200 pt-6">
          <Link
            href={repository.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 transition-colors"
          >
            View on GitHub
          </Link>
          <BackButton />
        </div>
      </div>
    </div>
  );
}
