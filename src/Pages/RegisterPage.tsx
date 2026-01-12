import { useState, type FormEvent } from "react";
import { registration } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Role, setRole] = useState("USER");

  const handleregister = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !FirstName ||
      !LastName ||
      !Email ||
      !Password ||
      !ConfirmPassword ||
      !Role
    ) {
      alert("Please fill all the fields");
      return;
    }
    if (Password !== ConfirmPassword) {
      alert("Password Do not match");
      return;
    }

    try {
      const obj = {
        firstname: FirstName,
        lastname: LastName,
        email: Email,
        password: Password,
        role: Role,
      };

      await registration(obj);
      alert("Registration Successful!");
      navigate("/login");
    } catch (err: any) {
      console.error(err?.response?.data);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0f172a] relative overflow-hidden">
      {/* --- Animated Background Elements --- */}
      <div className="absolute top-[-5%] right-[-5%] w-[35%] h-[35%] rounded-full bg-emerald-600/10 blur-[100px] animate-pulse"></div>
      <div
        className="absolute bottom-[-5%] left-[-5%] w-[35%] h-[35%] rounded-full bg-blue-600/10 blur-[100px] animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <Navbar />

      {/* --- Register Container --- */}
      <main className="flex-1 flex items-center justify-center p-6 py-12">
        <div className="w-full max-w-[550px] animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="bg-[#1e293b]/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
            <div className="mb-10 text-center">
              <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
                Join the{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  Community
                </span>
              </h1>
              <p className="text-gray-400 font-medium">
                Create your author profile in seconds.
              </p>
            </div>

            <form onSubmit={handleregister} className="space-y-6">
              {/* Row 1: Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest ml-1">
                    First Name
                  </label>
                  <input
                    placeholder="John"
                    type="text"
                    value={FirstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest ml-1">
                    Last Name
                  </label>
                  <input
                    placeholder="Doe"
                    type="text"
                    value={LastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Email */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-1">
                  Email Address
                </label>
                <input
                  placeholder="john@example.com"
                  type="email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              {/* Row 3: Passwords */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                    Password
                  </label>
                  <input
                    placeholder="••••••••"
                    type="password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                    Confirm
                  </label>
                  <input
                    placeholder="••••••••"
                    type="password"
                    value={ConfirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Row 4: Role Selection */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                  Select Role
                </label>
                <select
                  value={Role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-5 py-3.5 bg-gray-800 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500/50 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="USER">READER (Standard User)</option>
                  <option value="AUTHOR">AUTHOR (Content Creator)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.01] active:scale-95 shadow-xl shadow-emerald-900/20"
              >
                Create Account
              </button>
            </form>

            <div className="mt-10 text-center border-t border-white/5 pt-8">
              <p className="text-gray-400 text-sm">
                Already part of the club?
                <Link
                  to="/login"
                  className="ml-2 text-white font-bold hover:text-emerald-400 underline underline-offset-4 decoration-emerald-500/30 transition-all"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
