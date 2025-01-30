const express = require("express");
const { getProfileTourist } = require("../controllers/getprofileTourist");
const router = express.Router();

router.get("/tourist", getProfileTourist);

module.exports = router;
