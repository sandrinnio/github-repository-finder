import { NextRequest, NextResponse } from "next/server";
import { GitHubRepo } from "@/interfaces";
import { GITHUB_API_URL } from "@/constants";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const sort = searchParams.get("sort");
  const ignore = searchParams.get("ignore");
  const page = searchParams.get("page");

  console.log(`Incoming search request: ${request.url}`);

  if (!query) {
    return NextResponse.json(
      { message: 'Query parameter "q" is required' },
      { status: 400 }
    );
  }

  try {
    let url = `${GITHUB_API_URL}/search/repositories?q=${query}`;
    if (page) {
      url += `&page=${page}`;
    }

    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { message: `GitHub API error: ${error.message}` },
        { status: response.status }
      );
    }

    const data: { items: GitHubRepo[] } = await response.json();

    if (ignore) {
      data.items = data.items.filter(
        (item: GitHubRepo) =>
          !item.name.toLowerCase().includes(ignore.toLowerCase())
      );
    }

    if (sort) {
      data.items.sort((a, b) => {
        if (sort === "asc") {
          return a.name.localeCompare(b.name);
        }
        return b.name.localeCompare(a.name);
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: `Internal Server Error: ${error.message}` },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
