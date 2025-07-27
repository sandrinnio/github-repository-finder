/**
 * @jest-environment node
 */

import { NextRequest } from "next/server";
import { GitHubRepo } from "@/interfaces";
import { GET } from "@/app/api/search/route";
import { GITHUB_API_URL } from "@/constants";

global.fetch = jest.fn();

const mockFetch = global.fetch as jest.Mock;

describe("API Route: /api/search", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return a 400 if the query parameter is missing", async () => {
    const request = new NextRequest("http://localhost/api/search");
    const response = await GET(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.message).toBe('Query parameter "q" is required');
  });

  it("should return a list of repositories", async () => {
    const mockRepos: GitHubRepo[] = [
      {
        id: 1,
        name: "test-repo",
        full_name: "test/test-repo",
        owner: { login: "test", avatar_url: "" },
        description: "A test repository",
        stargazers_count: 10,
        forks_count: 2,
        open_issues_count: 1,
        language: "TypeScript",
        html_url: "",
      },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ items: mockRepos }),
    });

    const request = new NextRequest("http://localhost/api/search?q=test");
    const response = await GET(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.items).toEqual(mockRepos);
  });

  it("should filter repositories based on the ignore parameter", async () => {
    const mockRepos: GitHubRepo[] = [
      {
        id: 1,
        name: "test-repo",
        full_name: "test/test-repo",
        owner: { login: "test", avatar_url: "" },
        description: "A test repository",
        stargazers_count: 10,
        forks_count: 2,
        open_issues_count: 1,
        language: "TypeScript",
        html_url: "",
      },
      {
        id: 2,
        name: "ignore-this",
        full_name: "test/ignore-this",
        owner: { login: "test", avatar_url: "" },
        description: "Another test repository",
        stargazers_count: 5,
        forks_count: 1,
        open_issues_count: 0,
        language: "JavaScript",
        html_url: "",
      },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ items: mockRepos }),
    });

    const request = new NextRequest(
      "http://localhost/api/search?q=test&ignore=ignore"
    );
    const response = await GET(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.items.length).toBe(1);
    expect(body.items[0].name).toBe("test-repo");
  });

  it("should sort repositories by name", async () => {
    const mockRepos: GitHubRepo[] = [
      {
        id: 1,
        name: "b-repo",
        full_name: "test/b-repo",
        owner: { login: "test", avatar_url: "" },
        description: "A test repository",
        stargazers_count: 10,
        forks_count: 2,
        open_issues_count: 1,
        language: "TypeScript",
        html_url: "",
      },
      {
        id: 2,
        name: "a-repo",
        full_name: "test/a-repo",
        owner: { login: "test", avatar_url: "" },
        description: "Another test repository",
        stargazers_count: 5,
        forks_count: 1,
        open_issues_count: 0,
        language: "JavaScript",
        html_url: "",
      },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ items: mockRepos }),
    });

    const request = new NextRequest(
      "http://localhost/api/search?q=test&sort=asd"
    );
    await GET(request);

    expect(mockFetch).toHaveBeenCalledWith(
      `${GITHUB_API_URL}/search/repositories?q=test`,
      expect.any(Object)
    );
  });
});
