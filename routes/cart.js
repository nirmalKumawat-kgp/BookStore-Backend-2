const express = require("express");
const { getCart } = require("../controllers/cart");
const { isAuth } = require("../middleware/auth");
const router = express.Router();

router.post("/", isAuth, getCart);

module.exports = router;
