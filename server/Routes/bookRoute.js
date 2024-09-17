const express = require("express");
const {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  getRecentBooks,
  searchBook,
  downloadPDF,
} = require("../Controllers/bookController");

const { requireAuth, requireAdmin } = require("../Middleware/requireAuth");
// Assurez-vous d'importer votre configuration Multer
const upload = require("../Middleware/multer-conf");

const router = express.Router();

//SEARCH book
router.get("/search", searchBook);
//GET recent books
router.get("/recents", getRecentBooks);
//GET all books
router.get("/", getAllBooks);
// GET a single book
router.get("/:id", getBook);

// DOWNLOAD a book
router.get("/:id/download", requireAuth, downloadPDF);

// Routes réservées aux administrateurs
//POST a new book
router.post(
  "/",
  requireAuth,
  requireAdmin,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  createBook
);
//DELETE a book
router.delete("/:id", requireAuth, requireAdmin, deleteBook);
//UPDATE a book
router.patch(
  "/:id",
  requireAuth,
  requireAdmin,

  updateBook
);

module.exports = router;
