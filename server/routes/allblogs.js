const express = require("express");
const { allBlogsController } = require("../controllers/allblogs");
const router = express.Router();

router.get("", allBlogsController);

module.exports = router;
