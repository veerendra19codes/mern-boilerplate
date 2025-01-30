const { User } = require("../models/user");

const getProfileTourist = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      name: user.username,
      email: user.email,
      // You might want to add more fields here, like bio or profile image
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getProfileTourist };
