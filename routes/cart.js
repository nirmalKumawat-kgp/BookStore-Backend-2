const express = require("express");
const { getCart, addCartItem } = require("../controllers/cart");
const { isAuth } = require("../middleware/auth");
const router = express.Router();

router.get("/", isAuth, getCart);
router.post("/addItem", isAuth, addCartItem);
module.exports = router;
