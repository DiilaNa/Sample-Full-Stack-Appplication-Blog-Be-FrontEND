import { useEffect, useState } from "react";
import { getAllPost } from "../services/Post";
import { useAuth } from "../context/authContext";

interface Post {
  imageURL?: string;
  title?: string;
  content?: string;
  tags?: string;
  author?: {
    email?: string;
  };
}

export default function HomePage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchData = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const data = await getAllPost(pageNumber, 6);
      setPosts(data?.data || []);
      setTotalPage(data?.totalPages || 1);
      setPage(pageNumber);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Hero Welcome Section */}
      <div className="mb-10 md:mb-16 border-l-4 border-blue-500 pl-4 md:pl-8 py-2">
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Welcome back,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            {user?.email?.split("@")[0]}
          </span>
        </h1>
        <p className="text-gray-400 mt-3 text-base md:text-xl max-w-2xl leading-relaxed">
          Discover the latest stories, technical insights, and creative thoughts
          from our global community.
        </p>
      </div>

      <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
        <h2 className="text-lg md:text-2xl font-bold text-white flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </span>
          Latest Feed
        </h2>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-[400px] w-full bg-white/5 animate-pulse rounded-3xl"
            ></div>
          ))}
        </div>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((p, index) => (
            <article
              key={index}
              className="group bg-[#1e293b]/30 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden hover:border-blue-500/40 transition-all duration-500 flex flex-col hover:shadow-[0_20px_50px_rgba(37,99,235,0.15)]"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={
                    p?.imageURL ||
                    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80"
                  }
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  alt={p?.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <span className="px-3 py-1 bg-blue-500/20 backdrop-blur-md border border-blue-500/30 text-blue-300 text-[10px] font-bold rounded-full uppercase tracking-widest">
                    Feature
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">
                  {p?.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                  {p?.content}
                </p>

                {/* --- FIXED TAG LOGIC --- */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {p?.tags && typeof p.tags === "string" ? (
                    p.tags
                      .split(",")
                      .filter((tag) => tag.trim() !== "")
                      .map((tag, i) => (
                        <span
                          key={i}
                          className="bg-white/5 text-gray-500 text-[9px] font-bold px-3 py-1 rounded-full border border-white/5 uppercase tracking-tighter"
                        >
                          {tag.trim()}
                        </span>
                      ))
                  ) : (
                    <span className="text-[9px] text-gray-600 italic">
                      #general
                    </span>
                  )}
                </div>
              </div>

              <div className="px-6 py-5 bg-white/5 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white ring-2 ring-white/10">
                    {p?.author?.email?.charAt(0).toUpperCase() || "A"}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] text-gray-400 font-medium truncate max-w-[100px]">
                      {p?.author?.email?.split("@")[0]}
                    </span>
                  </div>
                </div>
                <button className="text-[11px] font-black text-blue-400 uppercase tracking-widest hover:text-white transition-colors">
                  View Post →
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-6 bg-[#1e293b]/20 border border-dashed border-white/10 rounded-[3rem] text-center">
          <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-10 h-10 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M14 2v4a2 2 0 002 2h4"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            No posts found yet
          </h3>
          <p className="text-gray-400 max-w-sm mb-8">
            The community is quiet right now. Why not be the first to share your
            thoughts?
          </p>
        </div>
      )}

      {!loading && posts.length > 0 && totalPage > 1 && (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-16 mb-12">
          <button
            onClick={() => fetchData(page - 1)}
            disabled={page === 1}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/5 text-white text-sm font-bold disabled:opacity-10 disabled:cursor-not-allowed hover:bg-white/10 transition-all border border-white/10"
          >
            <span>←</span> Previous
          </button>
          <div className="px-6 py-3 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400 font-mono text-sm font-bold">
            {page} / {totalPage}
          </div>
          <button
            onClick={() => fetchData(page + 1)}
            disabled={page === totalPage}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/5 text-white text-sm font-bold disabled:opacity-10 disabled:cursor-not-allowed hover:bg-white/10 transition-all border border-white/10"
          >
            Next <span>→</span>
          </button>
        </div>
      )}
    </div>
  );
}
