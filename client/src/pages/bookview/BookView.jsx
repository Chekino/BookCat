"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StarIcon } from "@heroicons/react/20/solid";
import FadeLoader from "react-spinners/FadeLoader";
import { useNavigate } from "react-router-dom";

export default function Bookview() {
  const { id } = useParams(); // Récupère l'ID du livre depuis l'URL
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {book.title}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="">
            <img
              src={`http://localhost:5000/uploads/${book.image}`}
              alt={book.title}
              className=" object-cover object-center "
            />
          </div>

          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            {/* Description and details */}
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl p-2  ">
                {book.title}
              </h1>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{book.description}</p>
              </div>
            </div>
            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8"></div>
                <p className="text-3xl tracking-tight text-gray-900">
                  {book.price} FCFA
                </p>
              </div>
            </div>
            <form className="mb-4 ">
              <button
                type="submit"
                className="mt-5 flex w-full items-center justify-center  button-custom"
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
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                Ajouter au Panier
              </button>
            </form>
          </div>
        </div>

        {/* Product info */}
      </div>
    </div>
  );
}
