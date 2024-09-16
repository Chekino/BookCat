import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import "./accueil.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import diversity from "../../assets/diversity.jpg";
import accesible from "../../assets/accesible.jpg";
import abordable from "../../assets/abordable.png";
import BeatLoader from "react-spinners/BeatLoader";

const Accueil = () => {
  const [searchBook, setSearchBook] = useState("");
  const [suggestions, setSuggestions] = useState([]); // État pour les suggestions de livres
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // État pour gérer les erreurs
  const [recentBooks, setRecentBooks] = useState([]);

  const navigate = useNavigate();

  // Fonction de debounce pour limiter le nombre d'appels réseau
  const searchBooks = (query) => {
    setLoading(true); // Activer le loader avant d'envoyer la requête
    fetch(`http://localhost:5000/api/books/search?query=${query}`)
      .then((response) => response.json())
      .then((data) => {
        // Temporisation de 2 secondes avant de désactiver le loader et afficher les résultats
        setTimeout(() => {
          setSuggestions(data); // Mettre à jour les suggestions avec les résultats
          setLoading(false); // Désactiver le loader après 2 secondes
        }, 2000); // Durée du loader (2 secondes ici)
      })
      .catch((err) => {
        setError("Erreur lors de la recherche"); // Gérer les erreurs
        setLoading(false); // Désactiver le loader en cas d'erreur
      });
  };

  // useEffect pour déclencher la recherche à chaque changement dans l'input
  useEffect(() => {
    if (searchBook.length > 0) {
      searchBooks(searchBook); // Rechercher à chaque changement dans l'input
    } else {
      setSuggestions([]); // Réinitialiser les suggestions si l'input est vide
    }
  }, [searchBook]);

  // Fonction pour récupérer les livres récents depuis le backend
  useEffect(() => {
    const fetchRecentBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/books/recents");
        const data = await response.json();

        setRecentBooks(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des livres récents",
          error
        );
      }
    };

    fetchRecentBooks();
  }, []);
  return (
    <>
      <header className="hero ">
        <div className="hero-content text-center">
          <div className="max-w-md ">
            <h1 className="text-4xl my-8 ">
              Trouver vos meilleurs livres electroniques avec BookCat
            </h1>
            <form>
              <input
                type="text"
                className="input-custom text-center"
                value={searchBook}
                onChange={(e) => setSearchBook(e.target.value)}
                placeholder="Rechercher un titre, un éditeur, un auteur... "
                autoFocus
              />

              {/* Loader pendant la recherche */}
              {loading && (
                <BeatLoader
                  color="#38BDF8"
                  size={20}
                  speedMultiplier={0.5}
                  className="mt-4"
                />
              )}

              {/* Affiche les suggestions ou un message si aucun livre n'est trouvé */}
              <div className="mt-6">
                {error && <p>{error}</p>}

                {/* Si des suggestions existent, on les affiche dans une liste */}
                {!loading && suggestions.length > 0 ? (
                  <ul className="suggestions-list">
                    {suggestions.slice(0, 4).map((book) => (
                      <li
                        onClick={() => navigate(`/book/${book._id}`)}
                        key={book._id}
                        className="suggestion-item flex items-center border-b py-2 cursor-pointer"
                      >
                        {/* Image du livre */}
                        <img
                          src={`http://localhost:5000/uploads/${book.image}`}
                          alt={book.title}
                          className="book-image w-16 h-16 object-cover mr-4"
                        />
                        {/* Informations du livre */}
                        <div className="book-info">
                          <h3 className="book-title text-lg font-semibold">
                            {book.title}
                          </h3>
                          <p className="book-author text-sm text-gray-500">
                            par {book.author}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  !loading &&
                  searchBook.trim() !== "" && <p>Aucun livre trouvé</p> // Affiche le message uniquement si une recherche a été effectuée
                )}
              </div>

              <div className="m-3 ">
                <button
                  className="button-custom mr-2 font-medium"
                  onClick={() => navigate("/catalogue")}
                >
                  CATALOGUE
                </button>
              </div>
            </form>
          </div>
        </div>
      </header>
      <main>
        <section className="first-section">
          <h2 className="titre-avec-petit-trait text-center text-2xl">
            Livres les plus recents
          </h2>
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper "
          >
            {recentBooks.map((book) => (
              <SwiperSlide
                onClick={() => navigate(`/book/${book._id}`)}
                key={book._id}
                className="cursor-pointer"
              >
                <img
                  src={`http://localhost:5000/uploads/${book.image}`}
                  alt={book.title}
                  className="rounded-lg"
                />
                <p>{book.title}</p>
                <p>{book.author}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
        <section>
          <h2 className="titre-avec-petit-trait text-center text-2xl my-4">
            Qui sommes-nous ?
          </h2>
          <div className="container mx-auto max-w-screen-lg px-4 text-xl ">
            Chez BookCat, nous croyons que la lecture doit être accessible à
            tous, où que vous soyez et à tout moment. Fondée en 2024 par un
            passionné de livres et de technologie, notre plateforme est dédiée à
            offrir une large sélection d’eBooks couvrant tous les genres, des
            romans aux ouvrages spécialisés. <br />
            Notre mission est simple : permettre à chaque lecteur de trouver
            l’eBook qui lui correspond. À travers notre catalogue diversifié et
            en constante évolution, nous mettons un point d’honneur à proposer
            des livres numériques de qualité, faciles à télécharger et à lire
            sur tous vos appareils. Rejoignez-nous dans notre aventure et
            explorez une nouvelle manière de lire, à portée de clic.
          </div>
          <div
            className="flex justify-center mt-4"
            onClick={() => navigate("authentification/register")}
          >
            <button className="button-custom flex">
              Rejoignez-nous dès maintenant{" "}
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
                  d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </button>
          </div>
        </section>

        <section className="third-section">
          <h2 className="titre-avec-petit-trait text-center text-2xl mt-6 mb-4">
            Pourquoi choisir BookCat ?
          </h2>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            <div className="card shadow-xl bg-base-100">
              <figure className="px-10 pt-10">
                <img src={diversity} alt="Shoes" className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Diversité</h2>
                <p>
                  Nous offrons une vaste collection d'eBooks couvrant tous les
                  genres et styles.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 w-96 shadow-xl">
              <figure className="px-10 pt-10">
                <img src={accesible} alt="Shoes" className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Accesibilité</h2>
                <p>
                  Nos livres sont accessibles depuis tous vos appareils, où que
                  vous soyez.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 w-96 shadow-xl">
              <figure className="px-10 pt-10">
                <img src={abordable} alt="Shoes" className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Coût Abordable</h2>
                <p>
                  Que vous soyez un lecteur passionné ou un novice à la
                  recherche de nouvelles découvertes, vous trouverez des livres
                  captivants à des tarifs réduits qui respectent votre budget.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Accueil;
