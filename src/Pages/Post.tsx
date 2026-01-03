import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { createPost, getAllPost } from "../services/Post"

export default function Post() {
    const [post, setPost] = useState([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [tags, setTags] = useState("")
    const [image, setImage] = useState<File | null>(null)
    const [preview, setPreview] = useState("")

const fetchData = async (pageNumber = 1) => {
    try {
    const data = await getAllPost(pageNumber, 2)
    setPost(data?.data)
    setTotalPage(data?.totalPages)
    setPage(pageNumber)
    } catch (err) {
        console.error(err)
    }
}

    useEffect(() => {
        fetchData()
    }, [])

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
        setImage(file)
        setPreview(URL.createObjectURL(file))
    }
}

const handleSavePost = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("content", content)
      formData.append("tags", tags)
      if (image) formData.append("image", image)
      
        await createPost(formData)

      await fetchData(1)
      // Reset form after successful submission
      setTitle("")
      setContent("")
      setTags("")
      setImage(null)
      setPreview("")
      setShowForm(false) // Close the form after successful submission
    } catch (err) {
      console.error(err)
    }
  }

  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Add New Post Button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">All Posts</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Post
        </button>
      </div>
      
      {/* Post Creation Form - Conditional Rendering */}
      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Create New Post</h2>
          <form onSubmit={handleSavePost} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                className="w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>
            {preview && (
              <div className="mt-2">
                <img src={preview} className="max-w-xs h-48 object-cover rounded-lg" alt="Preview" />
              </div>
            )}
            <div className="flex gap-3">
              <button 
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
              >
                Save Post
              </button>
              <button 
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* All Posts Section */}
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Latest Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {post.map((p: any, index) => (
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
            fetchData(page - 1)
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
            fetchData(page + 1)
          }}
          disabled={page === totalPage}
          className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition duration-300"
        >
          Next
        </button>
      </div>
    </div>
  )
}