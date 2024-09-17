import { useEffect, useState } from "react";
import "./catalogue.css";
import { useNavigate } from "react-router-dom";

const Catalogue = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/books/");
        const data = await response.json();

        setData(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des livres récents",
          error
        );
      }
    };

    fetchAllBooks();
  }, []);

  return (
    <>
      <header className="header-image "></header>
      <main>
        <h2 className="titre-avec-petit-trait text-center text-2xl my-4">
          Notre catalogue avec tout les meilleurs e-book disponible
        </h2>
        <p className="text-center text-xl">
          Nouveautés, coup de coeur et plaisirs vous attendent dans notre
          librabrie spécialement pensé pour vous.{" "}
        </p>
        <section className="catalogue container mx-auto">
          <div className="flex flex-wrap gap-8 p-4 justify-center">
            {data.map((book) => (
              <div
                key={book._id}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => navigate(`/book/${book._id}`)}
              >
                <div className="relative group">
                  <img
                    src={`http://localhost:5000/uploads/images/${book.image}`}
                    alt={book.title}
                    className="w-40 h-auto mb-2 transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-50"></div>
                </div>
                <div className="text-center">
                  <p className="font-semibold">{book.author} </p>
                  <p className="truncate w-40">{book.title} </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Catalogue;
