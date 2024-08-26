const express = require("express");
const {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require("../Controllers/bookController");

const router = express.Router();

//GET all books
router.get("/", getAllBooks);
// GET a single book
router.get("/:id", getBook);
//POST a new book
router.post("/", createBook);
//DELETE a book
router.delete("/:id", deleteBook);
//UPDATE a book
router.patch("/:id", updateBook);

module.exports = router;
