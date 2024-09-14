// upload.js
const multer = require("multer");
const path = require("path");

// Configuration de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Obtenez l'extension du fichier
    const basename = path.basename(file.originalname, ext); // Nom du fichier sans extension
    cb(null, `${basename}-${Date.now()}${ext}`); // Nom de fichier unique
  },
});

const upload = multer({ storage });

module.exports = upload;
