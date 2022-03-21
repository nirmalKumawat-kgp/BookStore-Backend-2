const express = require("express");
const router = express.Router();
const { getAllBooks, getBook, addBook } = require("../controllers/books");
router.get("/getAllBooks", getAllBooks);
router.get("/:id", getBook);
router.post("/addBook", addBook);
module.exports = router;
