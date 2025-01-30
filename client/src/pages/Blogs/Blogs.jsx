import React, { useState, useEffect } from "react"
import axios from "axios"
import CreateBlogModal from "./CreateBlogModal.jsx"

const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const token = localStorage.getItem("usertoken");

  const fetchBlogs = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/allblogs`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
      })
      setBlogs(response.data)
    } catch (err) {
      setError("Failed to fetch blogs. Please try again later.")
      console.error("Error fetching blogs:", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, []) //This was the line that needed to be updated to include the dependency array

  const handleBlogCreated = () => {
    fetchBlogs()
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blogs</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create New Blog
        </button>
      </div>

      {isLoading ? (
        <p>Loading blogs...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="border rounded-lg overflow-hidden shadow-lg">
              {blog.image && (
                <img src={blog.image || "/placeholder.svg"} alt={blog.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-600 mb-4">{blog.content.substring(0, 100)}...</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>By {blog.author.username}</span>
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateBlogModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onBlogCreated={handleBlogCreated} />
    </div>
  )
}

export default Blogs

