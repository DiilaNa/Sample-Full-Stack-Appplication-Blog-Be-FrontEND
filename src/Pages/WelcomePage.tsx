import { Link } from "react-router-dom";

export default function WelcomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
            <div className="text-center max-w-2xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Welcome to <span className="text-blue-600">Smart Blog</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-md mx-auto">
                        Share your thoughts, connect with readers, and explore 
                    </p>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-md mx-auto border border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Get Started</h2>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            to="/login" 
                            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex-1 text-center"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="px-8 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium rounded-lg hover:from-green-600 hover:to-teal-600 transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex-1 text-center"
                        >
                            Register
                        </Link>
                    </div>
                </div>
                
                <div className="mt-8 text-gray-500 text-sm">
                    <p>Join our community of writers and readers today</p>
                </div>
            </div>
        </div>
    );
}

