const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now().toString() + file.originalname.toString());
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});
const {
  getAllBooks,
  getBook,
  addBook,
  addBookCategory,
  getAllBookCategory,
  updateBook,
  deleteBook,
} = require("../controllers/books");

router.get("/getAllBooks", getAllBooks);

router.get("/getAllBookCategory", getAllBookCategory);

router.post("/addBook", upload.single("bookImage"), addBook);

router.post("/addBookCategory", addBookCategory);

router.put("/update/:id", upload.single("bookImage"), updateBook);

router.delete("/delete/:id", deleteBook);

router.get("/:id", getBook);

module.exports = router;
