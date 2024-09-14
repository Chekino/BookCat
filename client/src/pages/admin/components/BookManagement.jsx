import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";

const BookManagement = () => {
  const [allBooks, setAllBooks] = useState([]);
  const { user } = useContext(AuthContext); // Récupérer le contexte utilisateur

  // Fonction pour récupérer les livres récents depuis le backend
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/books");
        const data = await response.json();

        setAllBooks(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des livres récents",
          error
        );
      }
    };

    fetchAllBooks();
  }, []);

  // Fonction pour supprimer un livre
  const handleDelete = async (bookId) => {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer ce livre ?"
    );
    if (!confirmDelete) return;

    if (!user) {
      alert("Vous devez être connecté pour supprimer un livre.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/books/${bookId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`, // Utiliser le token de l'utilisateur connecté
          },
        }
      );

      if (response.ok) {
        setAllBooks(allBooks.filter((book) => book._id !== bookId));
        alert("Livre supprimé avec succès !");
      } else {
        const errorData = await response.json();
        console.error(
          "Erreur lors de la suppression du livre :",
          errorData.error
        );
        alert("Une erreur est survenue lors de la suppression.");
      }
    } catch (error) {
      console.error("Erreur réseau lors de la suppression du livre :", error);
      alert("Erreur réseau. Impossible de supprimer le livre.");
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Infos Livre</th>
            <th>Categorie</th>
            <th>Prix</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {allBooks.map((book) => (
            <tr key={book._id}>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={
                          book.image.startsWith("/uploads")
                            ? `http://localhost:5000${book.image}`
                            : `http://localhost:5000/uploads/${book.image}`
                        }
                        alt={book.title}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{book.title}</div>
                    <div className="text-sm opacity-50">{book.author}</div>
                  </div>
                </div>
              </td>
              <td>{book.category}</td>
              <td>{book.price} FCFA</td>
              <th>
                <button className="btn btn-ghost btn-xs">Modifier</button>
                <button
                  className="btn btn-error btn-xs"
                  onClick={() => handleDelete(book._id)}
                >
                  Supprimer
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookManagement;
