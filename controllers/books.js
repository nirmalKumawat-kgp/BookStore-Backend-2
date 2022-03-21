const { Book } = require("../models");
const ErrorResponse = require("../utils/errorResponse");
exports.getAllBooks = async (req, res, next) => {
  let books = await Book.findAll();
  res.json(books);
};

exports.getBook = async (req, res, next) => {
  let params = req.params;
  const book = await Book.findByPk(params.id);
  res.json(book);
};

exports.addBook = async (req, res, next) => {
  const { name, author, originalPrice, discountPrice } = req.body;
  if (!name || !author || !originalPrice) {
    return next(
      new ErrorResponse("Please Provide all the required details", 400)
    );
  }
  let book = await Book.findOne({ where: { name: name } });
  if (book) {
    return next(new ErrorResponse("Book Already Exists", 401));
  }
  book = await Book.create({ name, author, originalPrice, discountPrice });
  await book.save();

  res.json(book);
};
