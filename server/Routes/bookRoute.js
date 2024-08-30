const express = require("express");
const {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require("../Controllers/bookController");

const { requireAuth, requireAdmin } = require("../Middleware/requireAuth");

const router = express.Router();

//GET all books
router.get("/", getAllBooks);
// GET a single book
router.get("/:id", getBook);
//POST a new book
router.post("/", requireAuth, requireAdmin, createBook);
//DELETE a book
router.delete("/:id", requireAuth, requireAdmin, deleteBook);
//UPDATE a book
router.patch("/:id", requireAuth, requireAdmin, updateBook);

module.exports = router;
