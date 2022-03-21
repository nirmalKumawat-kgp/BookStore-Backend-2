const { Cart, CartItem } = require("../models");
exports.getCart = async (req, res, next) => {
  let cart = await Cart.findOne({ where: { UserId: req.user.id } });
  if (!cart) {
    res.status(200).json({
      success: false,
      data: "Cart Is Empty",
    });
  }
  if (cart) {
    let cartItems = await CartItem.findAll({ where: { CartId: cart.id } });
    console.log(cartItems);
  }
};
