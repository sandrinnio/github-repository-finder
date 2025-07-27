import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
      <h1 className="text-9xl font-bold text-gray-800 dark:text-gray-200">
        404
      </h1>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">
          Page not found
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
      </div>
      <Link
        href="/"
        className="mt-6 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Go back home
      </Link>
    </div>
  );
}
