const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  const jwtkey = process.env.JWT_SECRET_KEY;

  return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
};

// Inscription Utilisateur
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json("Utilisateur existant");
    }
    if (!name || !email || !password) {
      return res.status(400).json("Veuillez renseigner tous les champs");
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json("Veuillez entrez une adresse email valide");
    }
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json("Veuillez entrez un mot de passe plus fort ");
    }

    user = new userModel({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = createToken(user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// Connexion d'un utilisateur
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });

    if (!user) return res.status(400).json("Email ou mot de passe invalide");

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      return res.status(400).json("Email ou mot de passe invalide");

    const token = createToken(user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// Rechercher un utilisateur
const findUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await userModel.findById(userId);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// Rechercher tous les utilisateurs
const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
// Modifier un utilisateur
const updateUser = async (req, res) => {
  const userId = req.params.userId;
  const { name, email, password } = req.body;
  try {
    const user = await userModel.findById(userId);
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.password = password || user.password;
      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
// Supprimer un utilisateur
const deleteUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await userModel.findById(userId);
    if (user) {
      await user.deleteOne();
      res.status(200).json("Utilisateur supprimé");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
  findUser,
  getUsers,
  updateUser,
  deleteUser,
};
