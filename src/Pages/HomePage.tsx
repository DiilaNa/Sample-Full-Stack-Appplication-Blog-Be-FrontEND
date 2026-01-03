import { useEffect, useState } from "react";
import { getAllPost } from "../services/Post";
import { useAuth } from "../context/authContext";

export default function HomePage() {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    
    const fetchData = async (pageNumber = 1) => {
        try {
            const data = await getAllPost(pageNumber, 6); // Load 6 posts per page
            setPosts(data?.data);
            setTotalPage(data?.totalPages);
            setPage(pageNumber);
        } catch (err) {
            console.error(err);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);
    
    return ( 
        <div className="p-6 max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.email}</h1>
                <p className="text-gray-600 mt-2">Discover the latest posts from our community</p>
            </div>
            
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Latest Posts</h2>
            
            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {posts.map((p: any, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
                    >
                        <div className="p-5">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{p?.title}</h3>
                            <p className="text-gray-600 mb-4 line-clamp-3">{p?.content}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {p?.tags?.split(',').map((tag: string, i: number) => (
                                    <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                        {tag.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="h-48 overflow-hidden">
                            <img 
                                src={p?.imageURL} 
                                className="w-full h-full object-cover" 
                                alt={p?.title}
                            />
                        </div>
                        <div className="p-4 bg-gray-50 text-sm text-gray-500">
                            <span>By: {p?.author?.email || 'Anonymous'}</span>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-between items-center mt-8">
                <button
                    onClick={() => {
                        fetchData(page - 1);
                    }}
                    disabled={page === 1}
                    className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition duration-300"
                >
                    Previous
                </button>
                <div className="text-sm text-gray-600">
                    Page {page} of {totalPage}
                </div>
                <button
                    onClick={() => {
                        fetchData(page + 1);
                    }}
                    disabled={page === totalPage}
                    className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition duration-300"
                >
                    Next
                </button>
            </div>
        </div>
    );
}