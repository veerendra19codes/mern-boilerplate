const express = require("express");
const { getBlogTourist } = require("../controllers/getblogtourist");
const router = express.Router();

router.get("/tourist", getBlogTourist);

module.exports = router;
