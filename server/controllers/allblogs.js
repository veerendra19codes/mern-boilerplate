const { Blog } = require("../models/blog");

const allBlogsController = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 }) // Sort by creation date, newest first
      .populate("author", "username"); // Populate the author field with just the username

    res.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res
      .status(500)
      .json({ message: "Error fetching blogs", error: error.message });
  }
};

module.exports = { allBlogsController };
