import Link from "next/link";
import Image from "next/image";
import { CardProps } from "@/interfaces";

export const Card = ({ repositories, lastItemRef }: CardProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {repositories.map((repo, index) => {
      const isLastElement = index === repositories.length - 1;
      return (
        <div
          key={repo.id}
          ref={isLastElement ? lastItemRef : null}
          className="h-full"
        >
          <Link
            href={`/repository/${repo.full_name}`}
            key={repo.id}
            className="block h-full"
          >
            <div className="bg-white border border-gray-200 rounded-lg p-6 h-full flex flex-col">
              <div className="flex items-center mb-3">
                <Image
                  src={repo.owner.avatar_url || ""}
                  alt={repo.owner.login}
                  className="w-8 h-8 rounded-full mr-3"
                  width={32}
                  height={32}
                />
                <p className="text-gray-800 font-semibold truncate">
                  {repo.owner.login}
                </p>
              </div>
              <h2 className="text-xl font-bold text-gray-900 truncate mb-2">
                {repo.name}
              </h2>
              <p className="text-gray-600 text-sm flex-grow mb-4 line-clamp-3">
                {repo.description}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500 mt-auto pt-4 border-t border-gray-100">
                <span className="inline-flex items-center">
                  <svg
                    className="w-4 h-4 mr-1 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  {repo.stargazers_count}
                </span>
                <span className="font-medium">{repo.language}</span>
              </div>
            </div>
          </Link>
        </div>
      );
    })}
  </div>
);
