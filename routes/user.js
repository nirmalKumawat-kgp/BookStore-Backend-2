const express = require("express");
const { getUser } = require("../controllers/user");
const { isAuth } = require("../middleware/auth");
const router = express.Router();

router.get("/user/", isAuth, getUser);
module.exports = router;
