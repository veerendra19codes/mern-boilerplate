const express = require("express");
const { VerifyUser } = require("../controllers/verifyuser");
const router = express.Router();

router.post("/user", VerifyUser);

module.exports = router;
