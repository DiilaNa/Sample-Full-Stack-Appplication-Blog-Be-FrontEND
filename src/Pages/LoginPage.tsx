import { useState, type FormEvent } from "react";
import { getMyDetails, login } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Navbar from "../components/Navbar";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !Password) {
      alert("..All fields required");
      return;
    }
    try {
      const res = await login(email, Password);
      if (!res.data.accessToken) {
        alert("Login Failed");
        return;
      }
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);

      const detail = await getMyDetails();
      setUser(detail.data);
      navigate("/home");
    } catch (err) {
      console.log("ERROR", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0f172a] relative overflow-hidden">
      {/* --- Animated Background Elements --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse"></div>
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <Navbar />

      {/* --- Login Container --- */}
      <main className="flex-1 flex items-center justify-center p-6 py-12 overflow-y-auto">
        <div className="w-full max-w-[440px] animate-in fade-in zoom-in duration-700">
          <div className="bg-[#1e293b]/50 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
            {/* Header */}
            <div className="mb-10 text-left">
              <h1 className="text-4xl font-bold text-white mb-3">
                Welcome{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Back
                </span>
              </h1>
              <p className="text-gray-400 font-medium">
                Please enter your details to sign in.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="group">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1 group-focus-within:text-blue-400 transition-colors">
                  Email Address
                </label>
                <input
                  placeholder="e.g. alex@smartblog.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:bg-white/[0.08] outline-none transition-all duration-300"
                />
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1 group-focus-within:text-purple-400 transition-colors">
                  Password
                </label>
                <input
                  placeholder="••••••••"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 focus:bg-white/[0.08] outline-none transition-all duration-300"
                  type="password"
                />
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  className="text-xs font-semibold text-gray-500 hover:text-white transition"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.01] active:scale-95 shadow-xl shadow-blue-900/20"
              >
                Sign In
              </button>
            </form>

            <div className="mt-10 text-center">
              <p className="text-gray-400 text-sm">
                Don't have an account yet?
                <Link
                  to="/register"
                  className="ml-2 text-white font-bold hover:text-blue-400 underline underline-offset-4 decoration-blue-500/30 transition-all"
                >
                  Create one free
                </Link>
              </p>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-8 flex justify-center gap-6 text-[10px] uppercase tracking-[0.2em] text-gray-600 font-bold">
            <span className="hover:text-gray-400 cursor-pointer transition">
              Privacy Policy
            </span>
            <span className="w-1 h-1 bg-gray-800 rounded-full my-auto"></span>
            <span className="hover:text-gray-400 cursor-pointer transition">
              Terms of Service
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
