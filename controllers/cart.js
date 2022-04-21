const { Cart, CartItem } = require("../models");
const { Book } = require("../models");
const ErrorResponse = require("../utils/errorResponse");
exports.getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ where: { UserId: req.user.id } });
    if (cart) {
      let cartitem = await CartItem.findAll({ where: { CartId: cart.id } });
      console.log(
        "🚀 ~ file: cart.js ~ line 9 ~ exports.getCart= ~ cartitem",
        cartitem
      );
      res.status(200).json({ success: true, data: cartitem });
    }
  } catch (error) {
    next(new ErrorResponse(error.message, 400));
  }
};
exports.addCartItem = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ where: { UserId: req.user.id } });
    if (cart) {
      let book = await Book.findByPk(req.body.BookId);

      // await cart.addBook(book, { through: { quantity: 2 } });
      let cartitem = await CartItem.findOne({
        where: { CartId: cart.id, BookId: req.body.BookId },
      });
      if (cartitem) {
        return next(new ErrorResponse("Already Added to Cart", 200));
      }
      cartitem = await CartItem.create({
        BookId: req.body.BookId,
        CartId: cart.id,
        quantity: 1,
      });
      await cartitem.save();
      console.log(
        "🚀 ~ file: cart.js ~ line 44 ~ exports.addCartItem= ~ cartitem",
        cartitem
      );
    }
  } catch (error) {
    next(new ErrorResponse(error.message, 400));
  }
};
exports.removeCartItem = (req, res, next) => {};
