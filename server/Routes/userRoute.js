const express = require("express");
const {
  registerUser,
  loginUser,
  findUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../Controllers/userController");

const { requireAuth, requireAdmin } = require("../Middleware/requireAuth");

const router = express.Router();
// Routes d'authentification
router.post("/register", registerUser);
router.post("/login", loginUser);

// Routes protégées par authentification

router.get("/:userId", requireAuth, findUser);

// Routes réservées aux administrateurs
router.get("/", requireAuth, requireAdmin, getUsers);
router.put("/:userId", requireAuth, requireAdmin, updateUser);
router.delete("/:userId", requireAuth, requireAdmin, deleteUser);

module.exports = router;
