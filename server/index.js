const express = require("express");

const authRoutes = require("./routes/auth");
const verifyuserRoutes = require("./routes/verifyuser");
const allBlogsRoutes = require("./routes/allblogs");
const getBlogTouristRoutes = require("./routes/getblogtourist");
const getProfileTouristRoutes = require("./routes/getprofiletourist");

const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { VerifyUser } = require("./controllers/verifyuser");
const { verifyUserMiddleware } = require("./middleware");

const { NewBlog } = require("./controllers/newblog");

const auth = require("./middleware/auth");
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoutes);
app.use("/api/verify", verifyuserRoutes);
app.use("/api/allblogs", auth, allBlogsRoutes);
app.use("/api/newblog", auth, NewBlog);
app.use("/api/getprofile", auth, getProfileTouristRoutes);
app.use("/api/getblog", auth, getBlogTouristRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log("error in connecting to db: ", err));

app.listen(3001, () => {
  console.log("server listening at port 3001");
});
