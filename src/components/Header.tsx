import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0f172a]/80 backdrop-blur-lg border-b border-white/5 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link
            to="/home"
            className="text-xl font-black tracking-tighter text-white"
          >
            SMART<span className="text-blue-500">BLOG</span>
          </Link>

          <nav className="hidden md:flex space-x-6">
            <Link
              to="/home"
              className="text-sm font-medium text-gray-400 hover:text-white transition"
            >
              Home
            </Link>
            <Link
              to="/post"
              className="text-sm font-medium text-gray-400 hover:text-white transition"
            >
              Create Post
            </Link>
            {(user.roles?.includes("ADMIN") ||
              user.roles?.includes("AUTHOR")) && (
              <Link
                to="/my-post"
                className="text-sm font-medium text-gray-400 hover:text-white transition"
              >
                My Posts
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center space-x-6">
          <div className="hidden sm:flex flex-col items-end mr-2">
            <span className="text-xs font-bold text-white tracking-wide">
              {user?.email?.split("@")[0]}
            </span>
            <span className="text-[10px] text-blue-400 font-mono uppercase">
              {user?.roles?.[0] || "User"}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="px-5 py-2 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 text-white text-xs font-bold rounded-full transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
