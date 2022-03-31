const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBook,
  addBook,
  addBookCategory,
  getAllBookCategory,
} = require("../controllers/books");
router.get("/getAllBooks", getAllBooks);
router.get("/getAllBookCategory", getAllBookCategory);
router.get("/:id", getBook);
router.post("/addBook", addBook);
router.post("/addBookCategory", addBookCategory);

module.exports = router;
