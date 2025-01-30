const { User } = require("../models/user");
const { Blog } = require("../models/blog");

const NewBlog = async (req, res) => {
  try {
    const { title, image, content } = req.body;
    console.log("userId: ", req.userId);
    const userId = req.userId;
    // Assuming your auth middleware attaches the user to the request

    // Validate input
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create new blog
    const newBlog = await Blog.create({
      title,
      content,
      image,
      author: userId,
    });

    console.log("newBlog: ", newBlog);
    res.status(201).json(newBlog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res
      .status(500)
      .json({ message: "Error creating blog", error: error.message });
  }
};

module.exports = { NewBlog };
