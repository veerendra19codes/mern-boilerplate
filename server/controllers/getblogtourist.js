const { Blog } = require("../models/blog");

const getBlogTourist = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.userId })
      .select("title content image createdAt")
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getBlogTourist };
