"use server";

import { GitHubRepo } from "@/interfaces";
import { GITHUB_API_URL } from "@/constants";

export async function getRepository(
  owner: string,
  repo: string
): Promise<GitHubRepo> {
  const response = await fetch(`${GITHUB_API_URL}/repos/${owner}/${repo}`, {
    cache: "force-cache",
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch repository details");
  }
  return response.json();
}
