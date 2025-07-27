import Link from "next/link";
import { TableProps } from "@/interfaces";

export const Table = ({ repositories, lastItemRef }: TableProps) => (
  <div className="overflow-x-auto bg-white rounded-lg border">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Name
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Owner
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Stars
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Language
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Description
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {repositories.map((repo, index) => {
          const isLastElement = index === repositories.length - 1;
          return (
            <tr
              key={repo.id}
              ref={isLastElement ? lastItemRef : null}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <Link
                  href={`/repository/${repo.full_name}`}
                  className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
                >
                  {repo.name}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {repo.owner.login}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {repo.stargazers_count}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {repo.language}
              </td>
              <td
                className="px-6 py-4 text-sm text-gray-500 truncate"
                style={{ maxWidth: "300px" }}
              >
                {repo.description}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);
