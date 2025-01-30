const express = require("express");
const { NewBlog } = require("../controllers/newblog");
const router = express.Router();

router.post("/", allBlogsController);

module.exports = router;
