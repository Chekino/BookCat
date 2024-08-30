const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"], // On définit les rôles possibles
    default: "user", // Par défaut, chaque nouvel utilisateur est un 'user'
  },
});

module.exports = mongoose.model("User", userSchema);
