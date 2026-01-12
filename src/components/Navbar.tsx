import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
      <nav className="sticky top-0 w-full z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/5 shrink-0">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-black tracking-tighter text-white group"
          >
            SMART
            <span className="text-blue-500 group-hover:text-purple-400 transition-colors">
              BLOG
            </span>
          </Link>
          <Link
            to="/"
            className="text-sm font-semibold text-gray-400 hover:text-white transition-all flex items-center gap-2"
          >
            <span>←</span>{" "}
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
