const { Cart, CartItem } = require("../models");
exports.getCart = async (req, res, next) => {
  let cart = await Cart.findOne({ where: { UserId: req.user.id } });
};
