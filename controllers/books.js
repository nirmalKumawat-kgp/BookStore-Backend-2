const { Book, BookCategory } = require("../models");
const ErrorResponse = require("../utils/errorResponse");

//get all the books
exports.getAllBooks = async (req, res, next) => {
  let books = await Book.findAll();
  res.json(books);
};

//get all the book category
exports.getAllBookCategory = async (req, res, next) => {
  try {
    let bookCategories = await BookCategory.findAll();
    res.json(bookCategories);
  } catch (error) {
    next(error);
  }
};

// get a book with its id
exports.getBook = async (req, res, next) => {
  let params = req.params;

  const book = await Book.findByPk(params.id);
  if (!book) {
    return next(new ErrorResponse("No Book Found", 404));
  }
  res.status(200).json({
    success: true,
    data: book,
  });
};

// add a book to the database
exports.addBook = async (req, res, next) => {
  const {
    name,
    author,
    originalPrice,
    discountPrice,
    BookCategoryId,
    quantity,
  } = req.body;

  if (!name || !author || !originalPrice) {
    return next(
      new ErrorResponse("Please Provide all the required details", 400)
    );
  }
  let book = await Book.findOne({ where: { name: name } });
  if (book) {
    return next(new ErrorResponse("Book Already Exists", 401));
  }

  book = await Book.create({
    name,
    author,
    originalPrice,
    discountPrice,
    BookCategoryId,
    quantity,
    bookImage: req.file.path,
  });

  await book.save();

  res.json({ success: true, data: book });
};

//add new book category
exports.addBookCategory = async (req, res, next) => {
  let { name } = req.body;
  name = name.toLowerCase();
  if (!name) {
    return next(new ErrorResponse("Please Provide the name of Category", 400));
  }
  let bookCategory = await BookCategory.findOne({
    where: { name: name },
  });
  if (bookCategory) {
    next(new ErrorResponse("This Category Already Exists"));
  }

  bookCategory = await BookCategory.create({ name });
  await bookCategory.save();
  res.json(bookCategory);
};

//Update Queries
exports.updateBook = async (req, res, next) => {
  const id = req.params.id;
  const { ...updatedValues } = req.body;

  try {
    const book = await Book.findByPk(id);
    if (!book) {
      next(new ErrorResponse("No Book Was Found", 404));
    }
    await book.update(updatedValues);
    res.status(202).json({ success: true, data: book });
  } catch (error) {
    next(error);
  }
};
exports.deleteBook = async (req, res, next) => {
  const id = req.params.id;
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return next(new ErrorResponse("Book does not exist", 404));
    }
    await book.destroy();

    res.status(200).json({ success: true, data: "Book Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};
