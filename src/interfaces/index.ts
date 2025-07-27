export interface Filters {
  query: string;
  sort: string;
  ignore: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string;
}

export interface CardProps {
  repositories: GitHubRepo[];
  lastItemRef?: (node: HTMLDivElement) => void;
}

export interface TableProps {
  repositories: GitHubRepo[];
  lastItemRef?: (node: HTMLTableRowElement) => void;
}

export type PageProps = {
  params: Promise<{ owner: string; repo: string }>;
};
