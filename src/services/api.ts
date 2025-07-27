import { GitHubRepo } from "@/interfaces";

export const fetchRepositoriesAPI = async (
  searchQuery: string,
  sortOrder: string,
  ignoreKeyword: string,
  page: number
): Promise<{ items: GitHubRepo[] }> => {
  const params = new URLSearchParams({
    q: searchQuery,
    page: page.toString(),
  });

  if (sortOrder) {
    params.append("sort", sortOrder);
  }

  if (ignoreKeyword) {
    params.append("ignore", ignoreKeyword);
  }

  const response = await fetch(`/api/search?${params.toString()}`, {
    cache: "force-cache",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch repositories");
  }

  return response.json();
};
