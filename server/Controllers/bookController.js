const Book = require("../Models/bookModel");
const mongoose = require("mongoose");

// Recuperer tout les livres
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({}).sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Recuperer un seul livre avec l'id
const getBook = async (req, res) => {
  const { id } = req.params;

  // Vérifier si l'ID est valide
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Aucun livre trouvé !" });
  }

  try {
    const book = await Book.findById(id);

    // Vérifier si le livre existe
    if (!book) {
      return res.status(404).json({ error: "Aucun livre trouvé !" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//récupérer les livres récents
const getRecentBooks = async (req, res) => {
  try {
    // Trier par date de création décroissante et limiter à 5 livres récents
    const recentBooks = await Book.find().sort({ createdAt: -1 }).limit(8);
    res.status(200).json(recentBooks);
    console.log(recentBooks);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des livres récents",
      error,
    });
  }
};

// Creer un livre
const createBook = async (req, res) => {
  const { title, author, description, price, category, publishedDate } =
    req.body;
  const image = req.file ? req.file.filename : null;

  // add document to db
  try {
    const book = await Book.create({
      title,
      author,
      description,
      price,
      image,
      category,
      publishedDate,
    });
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Modifier un livre
const updateBook = async (req, res) => {
  const { id } = req.params; // Récupérer l'ID du livre à mettre à jour

  // Vérifier si l'ID est valide
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "ID du livre invalide !" });
  }

  try {
    // Mettre à jour le livre avec les nouvelles données
    const book = await Book.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    // Vérifier si le livre existe
    if (!book) {
      return res
        .status(404)
        .json({ error: "Aucun livre trouvé avec cet ID !" });
    }

    res.status(200).json(book); // Retourner le livre mis à jour
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un livre
const deleteBook = async (req, res) => {
  const { id } = req.params; // Récupérer l'id du livre à supprimer

  // Vérifier si l'ID est valide
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "ID du livre invalide !" });
  }

  try {
    const book = await Book.findByIdAndDelete(id);

    // Vérifier si le livre existe
    if (!book) {
      return res
        .status(404)
        .json({ error: "Aucun livre trouvé avec cet ID !" });
    }

    res.status(200).json({ message: "Livre supprimé avec succès !" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Rechercher un livre
const searchBook = async (req, res) => {
  const { query } = req.query;
  try {
    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: "i" } }, // Recherche insensible à la casse
        { author: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  getRecentBooks,
  searchBook,
};
