const multer = require("multer");
const path = require("path");

// Vérification du type de fichier
const fileFilter = (req, file, cb) => {
  // Vérifie l'extension du fichier
  const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf"];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accepte le fichier
  } else {
    cb(
      new Error(
        "Type de fichier non pris en charge. Seuls les fichiers JPEG, PNG et PDF sont acceptés."
      ),
      false
    );
  }
};

// Configuration du stockage pour Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Définir un répertoire pour les images et un pour les PDFs
    if (file.mimetype === "application/pdf") {
      cb(null, path.join(__dirname, "../uploads/pdfs")); // Répertoire pour les PDFs
    } else {
      cb(null, path.join(__dirname, "../uploads/images")); // Répertoire pour les images
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Obtenir l'extension du fichier
    const basename = path.basename(file.originalname, ext); // Nom de fichier sans extension
    cb(null, `${basename}-${Date.now()}${ext}`); // Nom de fichier unique
  },
});

// Initialisation de Multer avec le filtre de fichier et le stockage
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // Limite de taille : 10 Mo
});

module.exports = upload;
