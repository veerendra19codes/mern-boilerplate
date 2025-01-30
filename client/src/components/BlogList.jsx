import { Link } from "react-router-dom";

export default function BlogList({ blogs }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Recent Blog Posts</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={blog.image || "/placeholder.svg"} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="font-bold text-xl mb-2">{blog.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{blog.excerpt}</p>
              <Link to={`/blog/${blog.id}`} className="text-indigo-500 hover:text-indigo-600 font-semibold">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

