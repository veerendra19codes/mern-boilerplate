const jwt = require("jsonwebtoken");
const { User } = require("./models/user"); // Import your User model
const dotenv = require("dotenv");

dotenv.config();

const verifyUserMiddleware = async (req, res, next) => {
  console.log("hello: ");
  if (req.method !== "POST") {
    console.log("hello again");
    req.userId = null;
    next();
  }

  try {
    const { token } = req.body;
    console.log("token: ", token);

    if (!token) {
      req.userId = null;
      next();
    }

    // Verify JWT Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded: ", decoded);
    const userId = decoded.userId; // Extract user ID from token
    console.log("userId: ", userId);

    // Find user in MongoDB
    const user = await User.findById(userId).select("-password"); // Exclude password field
    console.log("user: ", user);
    if (!user) {
      req.userId = null;
      next();
    }

    req.userId = user.userId;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    req.userId = null;
    next();
  }
};

module.exports = { verifyUserMiddleware };
