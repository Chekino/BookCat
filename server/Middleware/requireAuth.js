const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Accès non autorisé, aucun token" });
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded._id;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token invalide" });
  }
};

// Middleware pour vérifier le rôle d'administrateur
const requireAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (user && user.role === "admin") {
      next();
    } else {
      res.status(403).json({ error: "Accès interdit, administrateur requis" });
    }
  } catch (error) {
    res.status(403).json({ error: "Accès interdit, administrateur requis" });
  }
};

module.exports = { requireAuth, requireAdmin };
