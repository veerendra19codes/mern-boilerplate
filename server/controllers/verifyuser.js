const jwt = require("jsonwebtoken");
const { User } = require("../models/user"); // Import your User model
const dotenv = require("dotenv");

dotenv.config();

const VerifyUser = async (req, res) => {
  console.log("hello: ");
  if (req.method !== "POST") {
    console.log("hello again");
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { token } = req.body;
    console.log("token: ", token);

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Verify JWT Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded: ", decoded);
    const userId = decoded.userId; // Extract user ID from token
    console.log("userId: ", userId);

    // Find user in MongoDB
    const user = await User.findById(userId).select("username email role"); // Exclude password field
    console.log("user: ", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("JWT Verification Error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { VerifyUser };
