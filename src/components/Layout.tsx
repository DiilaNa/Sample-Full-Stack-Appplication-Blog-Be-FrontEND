import Header from "./Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a] text-gray-100">
      <Header />
      {/* Added top padding to account for the fixed/sticky header */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
        <Outlet />
      </main>

      {/* Subtle background glow to match the login theme */}
      <div className="fixed top-0 right-0 w-[300px] h-[300px] bg-blue-600/10 blur-[120px] -z-10"></div>
      <div className="fixed bottom-0 left-0 w-[300px] h-[300px] bg-purple-600/10 blur-[120px] -z-10"></div>
    </div>
  );
}

export default Layout;
