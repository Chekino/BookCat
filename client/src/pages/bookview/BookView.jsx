"use client";

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StarIcon } from "@heroicons/react/20/solid";
import FadeLoader from "react-spinners/FadeLoader";
import BarLoader from "react-spinners/BarLoader";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "sonner";

export default function Bookview() {
  const { id } = useParams(); // Récupère l'ID du livre depuis l'URL
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // État pour le loader
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const truncateTitle = (title, maxLength) => {
    return title.length > maxLength
      ? `${title.substring(0, maxLength)}...`
      : title;
  };

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/books/${id}`);
        const data = await response.json();
        setBook(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleDownload = async () => {
    try {
      if (!user.token) {
        throw new Error("Vous devez vous connecter pour télécharger");
      } // Vérifie que le token est bien récupéré

      setLoading(true); // Affiche le loader

      // Simule un délai avant le téléchargement
      setTimeout(async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/books/${id}/download`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${book.title}.pdf`; // Nom du fichier PDF
            document.body.appendChild(a);
            a.click();
            a.remove();
            setLoading(false); // Cacher le loader après le téléchargement
          } else {
            console.error(
              "Erreur lors du téléchargement",
              await response.text()
            );
            setLoading(false); // Cacher le loader même en cas d'erreur
          }
        } catch (error) {
          toast.error("Erreur lors du téléchargement");
          setLoading(false); // Cacher le loader en cas d'erreur
        }
      }, 10000); // Délai de 10 secondes
    } catch (error) {
      toast.error("Veuillez d'abord vous connecter !");
    }
  };
  if (!book) {
    return <FadeLoader color="#38BDF8" className="mx-auto my-10" />; // Tu peux personnaliser ce message ou ajouter un spinner
  }
  return (
    <div className="bg-white container mx-auto px-4">
      <div className="pt-6 pb-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li>
              <a
                onClick={() => navigate("/")}
                className="mr-2 text-sm font-medium text-gray-900"
              >
                Acceuil
              </a>
            </li>
            /
            <li>
              <a
                onClick={() => navigate("/catalogue")}
                className="mr-2 text-sm font-medium text-gray-900"
              >
                Catalogue
              </a>
            </li>
            /
            <li className="text-sm">
              <a
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600 "
              >
                {truncateTitle(book.title, 20)}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="">
            <img
              src={`http://localhost:5000/uploads/images/${book.image}`}
              alt={book.title}
              className=" object-cover object-center "
            />
          </div>

          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            {/* Description and details */}
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl p-2 italic">
                "{book.title}" <p>Par {book.author} </p>
              </h1>
              <p className="card-title">Description</p>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{book.description}</p>
              </div>
            </div>
            {/* Reviews */}
            <div className="mt-6">
              <div className="flex items-center">
                <p className="text-3xl tracking-tight text-gray-900">
                  {book.price} FCFA
                </p>
              </div>
            </div>
            {loading ? (
              <BarLoader color="#38BDF8" className="mx-auto" /> // Affiche le loader
            ) : (
              <button
                className="mt-5 flex w-full items-center justify-center  button-custom"
                onClick={handleDownload}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m-6 3.75 3 3m0 0 3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
                  />
                </svg>
                Telecharger l'Ebook
              </button>
            )}
          </div>
        </div>

        {/* Product info */}
      </div>
    </div>
  );
}
