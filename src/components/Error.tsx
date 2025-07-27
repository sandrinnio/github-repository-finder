"use client";

export const ErrorComponent = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => (
  <div className="text-center py-12">
    <h2 className="text-xl font-semibold text-red-600 mb-4">
      Something went wrong!
    </h2>
    <p className="text-gray-700 mb-6">{error.message}</p>
    <button
      onClick={reset}
      className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
    >
      Try again
    </button>
  </div>
);
