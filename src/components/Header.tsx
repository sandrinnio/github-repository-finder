import Link from "next/link";

export const Header = () => (
  <header className="bg-white text-gray-800 shadow-sm border-b">
    <div className="container mx-auto px-4 py-4">
      <Link
        href="/"
        className="text-2xl font-bold hover:text-blue-600 transition-colors"
      >
        GitHub Repository Search
      </Link>
    </div>
  </header>
);
