"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, Spinner, Table } from "@/components";
import { Filters, GitHubRepo } from "@/interfaces";
import { useDebounce } from "@/hooks/useDebounce";
import { fetchRepositoriesAPI } from "@/services/api";

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<Filters>({
    query: searchParams.get("q") || "",
    sort: searchParams.get("sort") || "desc",
    ignore: searchParams.get("ignore") || "",
  });

  const [viewMode, setViewMode] = useState<"table" | "card">("card");
  const [repositories, setRepositories] = useState<GitHubRepo[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const debouncedFilters = useDebounce(filters, 500);

  const observer = useRef<IntersectionObserver | null>(null);

  const fetchRepositories = useCallback(
    async (filters: Filters, page: number) => {
      if (!filters.query) {
        setRepositories([]);
        return;
      }

      setLoading(true);

      try {
        const data = await fetchRepositoriesAPI(
          filters.query,
          filters.sort,
          filters.ignore,
          page
        );

        setRepositories((prev) =>
          page === 1 ? data.items : [...prev, ...data.items]
        );
        setHasMore(data.items.length > 0);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const lastItemRef = useCallback(
    (node: HTMLDivElement | HTMLTableRowElement) => {
      if (loading) {
        return;
      }

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const params = new URLSearchParams();

    if (debouncedFilters.query) {
      params.set("q", debouncedFilters.query);
    }

    if (debouncedFilters.sort) {
      params.set("sort", debouncedFilters.sort);
    }

    if (debouncedFilters.ignore) {
      params.set("ignore", debouncedFilters.ignore);
    }

    setPage(1);
    setRepositories([]);

    router.push(`/?${params.toString()}`);
  }, [debouncedFilters, router]);

  useEffect(() => {
    fetchRepositories(debouncedFilters, page);
  }, [debouncedFilters, page, fetchRepositories]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="bg-white p-4 rounded-lg border mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            id="query"
            name="query"
            type="text"
            value={filters.query}
            onChange={handleFilterChange}
            placeholder="Search for repositories..."
            className="flex-grow p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="ignore"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Ignore Keyword
            </label>
            <input
              id="ignore"
              name="ignore"
              type="text"
              value={filters.ignore}
              onChange={handleFilterChange}
              placeholder="e.g., 'fork'"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="sort"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Sort by
            </label>
            <select
              id="sort"
              name="sort"
              value={filters.sort}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-white"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <div className="inline-flex rounded-md">
          <button
            onClick={() => setViewMode("card")}
            className={`px-4 py-2 text-sm font-medium border ${
              viewMode === "card"
                ? "bg-gray-200 text-gray-800 border-gray-300"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Card
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`px-4 py-2 text-sm font-medium border-t border-b border-r ${
              viewMode === "table"
                ? "bg-gray-200 text-gray-800 border-gray-300"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Table
          </button>
        </div>
      </div>

      {repositories.length > 0 &&
        (viewMode === "card" ? (
          <Card lastItemRef={lastItemRef} repositories={repositories} />
        ) : (
          <Table lastItemRef={lastItemRef} repositories={repositories} />
        ))}

      {loading && <Spinner />}

      {repositories.length === 0 && !loading && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-700">
            {filters.query
              ? "No repositories found"
              : "Search for repositories to get started"}
          </h3>
        </div>
      )}
    </>
  );
}
