import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "sonner";

const BookManagement = () => {
  const [allBooks, setAllBooks] = useState([]);
  const { user } = useContext(AuthContext); // Récupérer le contexte utilisateur

  // Fonction pour récupérer les livres récents depuis le backend
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await fetch("https://bookcat.onrender.com/api/books");
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
    try {
      const response = await fetch(
        `https://bookcat.onrender.com/api/books/${bookId}`,
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
        toast.success("Livre supprimé avec succès !");
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
                        src={`https://bookcat.onrender.com/uploads/images/${book.image}`}
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
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                >
                  Supprimer
                </button>
                <dialog id="my_modal_1" className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg text-center">
                      Voulez vous supprimer ce livre ?
                    </h3>
                    <p className="py-4 text-center">
                      Appuyez sur Oui pour supprimer et sur Non pour annuler
                    </p>
                    <div className="modal-action">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button
                          className="btn "
                          onClick={() => handleDelete(book._id)}
                        >
                          Oui
                        </button>
                        <button className=" btn btn-danger ">Non</button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookManagement;
