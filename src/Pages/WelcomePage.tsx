import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 overflow-x-hidden">
      <Navbar />
      <header className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105 blur-[2px]"
          >
            <source src="/SmartBlog.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            Write your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Future.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join Smart Blog—a premium space for thinkers, creators, and
            storytellers. Share your thoughts with a global community.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/register"
              className="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-105"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto px-10 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-full border border-white/30 hover:bg-white/20 transition-all duration-300"
            >
              Existing Member
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            ></path>
          </svg>
        </div>
      </header>

      <section id="about" className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">
                Our Mission
              </span>
              <h2 className="text-4xl font-bold mt-4 mb-6">Why Smart Blog?</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                We believe that everyone has a story worth telling. Our platform
                is designed to strip away the noise and focus on what matters
                most: **Your Voice.**{" "}
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                With modern editing tools and a clean, distraction-free reading
                experience, we're building the home for the next generation of
                online writers.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-8 bg-blue-50 rounded-3xl">
                <h3 className="text-3xl font-bold text-blue-600 mb-2">10k+</h3>
                <p className="text-gray-500 font-medium">Active Writers</p>
              </div>
              <div className="p-8 bg-cyan-50 rounded-3xl">
                <h3 className="text-3xl font-bold text-cyan-600 mb-2">50k+</h3>
                <p className="text-gray-500 font-medium">Daily Readers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-950 text-gray-400 py-12 px-6 border-t border-gray-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="text-xl font-bold text-white mb-2">SMART BLOG</div>
            <p className="text-sm">Inspiring the world, one post at a time.</p>
          </div>
          <div className="flex gap-8 text-sm">
            <a href="#" className="hover:text-white transition">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms
            </a>
            <a href="#" className="hover:text-white transition">
              Contact
            </a>
          </div>
          <div className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Smart Blog Inc. All rights
            reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
