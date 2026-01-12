import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { createPost, getAllPost } from "../services/Post";

export default function Post() {
  const [post, setPost] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showForm]);

  const fetchData = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const data = await getAllPost(pageNumber, 6);
      setPost(data?.data || []);
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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSavePost = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("tags", tags);
      if (image) formData.append("image", image);

      await createPost(formData);
      await fetchData(1);

      setTitle("");
      setContent("");
      setTags("");
      setImage(null);
      setPreview("");
      setShowForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Reduced Header Sizes to match Home Page Sectioning */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 border-l-4 border-purple-500 pl-6 py-1">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            My Workspace
          </h1>
          <p className="text-gray-400 mt-1 text-base">
            Manage and publish your personal stories.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="group relative flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-sm font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-xl shadow-purple-900/20 active:scale-95"
        >
          <span>+</span>
          New Post
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[100] overflow-y-auto px-4 py-6">
          <div
            className="fixed inset-0 bg-[#0f172a]/90 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setShowForm(false)}
          ></div>

          <div className="flex min-h-full items-center justify-center">
            <div className="relative w-full max-w-xl bg-[#1e293b] border border-white/10 rounded-[2rem] shadow-2xl p-6 md:p-10 animate-in zoom-in-95 duration-300 z-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Draft a Story
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white transition"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSavePost} className="space-y-5">
                <div className="group">
                  <label className="block text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-1.5 ml-1">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Story name..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-2 focus:ring-purple-500/50 outline-none transition-all text-sm"
                  />
                </div>

                <div className="group">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">
                    Content
                  </label>
                  <textarea
                    required
                    placeholder="Start writing..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-2 focus:ring-purple-500/50 outline-none transition-all text-sm"
                  />
                </div>

                <div className="group">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">
                    Tags
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. react, logic"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-2 focus:ring-purple-500/50 outline-none transition-all text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:bg-white/5 transition-all">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">
                      {image ? "Change Image" : "Upload Image"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  {preview ? (
                    <div className="h-28 rounded-xl overflow-hidden border border-white/10">
                      <img
                        src={preview}
                        className="w-full h-full object-cover"
                        alt="Preview"
                      />
                    </div>
                  ) : (
                    <div className="h-28 rounded-xl bg-white/5 flex items-center justify-center text-[10px] text-gray-700 italic">
                      No Preview
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-purple-900/30"
                  >
                    Publish
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 bg-white/5 text-white text-sm font-bold py-3.5 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
                  >
                    Discard
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* --- GRID SECTION - Matches Home Page Gap and Sizing --- */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-80 bg-white/5 animate-pulse rounded-[2rem]"
            ></div>
          ))}
        </div>
      ) : post.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {post.map((p: any, index) => (
            <article
              key={index}
              className="group bg-[#1e293b]/40 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 flex flex-col"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={
                    p?.imageURL ||
                    "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80"
                  }
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={p?.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent opacity-60"></div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-purple-400 transition-colors">
                  {p?.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3 italic">
                  "{p?.content}"
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {p?.tags?.split(",").map((tag: string, i: number) => (
                    <span
                      key={i}
                      className="bg-purple-500/10 text-purple-400 text-[10px] px-2.5 py-1 rounded-md border border-purple-500/20 font-bold uppercase tracking-widest"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
              <div className="px-6 py-4 bg-white/5 border-t border-white/5 flex justify-between items-center">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                  Draft
                </span>
                <button className="text-xs text-purple-400 font-bold hover:text-white transition-all underline underline-offset-4 decoration-purple-500/30 hover:decoration-purple-500">
                  Manage →
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* Empty State Matches Home Page Style */
        <div className="flex flex-col items-center justify-center py-20 px-6 bg-[#1e293b]/20 border border-dashed border-white/10 rounded-[3rem] text-center">
          <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mb-6 ring-1 ring-purple-500/30">
            <span className="text-3xl">🖋️</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">
            Your journal is empty
          </h3>
          <p className="text-gray-400 max-w-sm mb-8 text-base">
            Every great blog starts with a first draft. Start yours today.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="px-10 py-3.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold rounded-xl transition-all shadow-xl shadow-purple-900/40"
          >
            Create Your First Post
          </button>
        </div>
      )}

      {/* Pagination - Simplified Sizes */}
      {post.length > 0 && totalPage > 1 && (
        <div className="flex justify-center items-center gap-4 mt-16 mb-8">
          <button
            onClick={() => fetchData(page - 1)}
            disabled={page === 1}
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 text-white font-bold disabled:opacity-10 hover:bg-white/10 transition-all border border-white/10"
          >
            ←
          </button>
          <div className="px-5 py-2.5 font-mono text-xs text-purple-400 bg-purple-500/10 rounded-xl border border-purple-500/20 font-bold">
            {page} / {totalPage}
          </div>
          <button
            onClick={() => fetchData(page + 1)}
            disabled={page === totalPage}
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 text-white font-bold disabled:opacity-10 hover:bg-white/10 transition-all border border-white/10"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
