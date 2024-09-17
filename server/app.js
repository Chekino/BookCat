const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const bookRoutes = require("./Routes/bookRoute");
const userRoutes = require("./Routes/userRoute");

const app = express();

// Middlewares pour la sécurité et le logging
app.use(cors({ origin: "http://localhost:5173" }));
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"], // Permet uniquement les ressources du même domaine
      imgSrc: ["'self'", "https://bookcat.vercel.app"], // Autorise les images provenant de ton serveur backend
      // Ajoute d'autres règles pour les scripts, styles si nécessaire
    },
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// routes

app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("hello from express server");
});

const PORT = 5000 || process.env.PORT;
const uri = process.env.MONGO_URI;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection failed: ", error.message);
  });
