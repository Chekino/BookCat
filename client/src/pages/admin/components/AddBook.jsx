import { PhotoIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import React, { useContext, useState } from "react";
import FadeLoader from "react-spinners/FadeLoader";
import { AuthContext } from "../../../context/AuthContext";

export default function AddBook() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  //pour le chargement du spinner
  const [isLoading, setIsLoading] = useState(false);
  // pour le temps de chargement
  const [spinnerEndTime, setSpinnerEndTime] = useState(null);

  const { user } = useContext(AuthContext); // Récupérer le contexte utilisateur

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Configuration du délai de 3 secondes pour le spinner
    const endTime = Date.now() + 3000;
    setSpinnerEndTime(endTime);
    // Création d'un objet FormData
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    if (image) {
      formData.append("image", image);
    }

    try {
      // Envoi des données au serveur
      const response = await axios.post(
        "http://localhost:5000/api/books",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`, // Utiliser le token de l'utilisateur connecté
          },
        }
      );
      console.log("Livre ajouté :", response.data);
      // Réinitialiser le formulaire
      setTitle("");
      setAuthor("");
      setDescription("");
      setPrice(0);
      setCategory("");
      setImage(null);
    } catch (error) {
      console.error("Erreur lors de l'ajout du livre :", error);
    } finally {
      const delay = Math.max(0, endTime - Date.now());
      setTimeout(() => {
        setIsLoading(false);
      }, delay);
    }
  };

  return (
    <div>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center ">
          <FadeLoader color="#38BDF8" />
        </div>
      )}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <div className="border-b border-gray-900/10">
            <h2 className="text-base text-center font-semibold leading-7 text-gray-900">
              Ajouter un nouveau Livre
            </h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photo de couverture
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25">
                  <div className="text-center">
                    <PhotoIcon
                      aria-hidden="true"
                      className="mx-auto h-12 w-12 text-gray-300"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Télécharger le fichier</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept="image/*"
                          onChange={(e) => setImage(e.target.files[0])}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">ou glisser déposer</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF jusqu'à 10 Mo
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Titre du livre
                </label>
                <div className="mt-2">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="author"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Auteur
                </label>
                <div className="mt-2">
                  <input
                    id="author"
                    name="author"
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description du livre
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Catégorie
                </label>
                <div className="mt-2">
                  <select
                    id="category"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">Sélectionnez une catégorie</option>
                    <option>Action</option>
                    <option>Drame</option>
                    <option>Aventure</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Prix
                </label>
                <div className="mt-2">
                  <input
                    id="price"
                    name="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}
