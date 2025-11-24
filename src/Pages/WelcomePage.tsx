import { Link } from "react-router-dom";

export default function WelcomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black-100">
            <h1 className="text-3xl font-bold mb-6">Welcome to Smart Blog</h1>

            <div className="flex gap-4">
                <Link to="/login" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Login
                </Link>

                <Link
                to="/register"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                Register
                </Link>
            </div>
        </div>
    );
}

