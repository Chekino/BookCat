import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import "./accueil.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import diversity from "../../assets/diversity.jpg";
import accesible from "../../assets/accesible.jpg";

const Accueil = () => {
  const [searchBook, setSearchBook] = useState("");
  const [books, setBooks] = useState([]);
  const [recentBooks, setRecentBooks] = useState([]);
  const navigate = useNavigate();

  // Fonction pour effectuer une recherche de livre
  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/books/search?q=${searchBook}`
      );
      if (response.ok) {
        const result = await response.json();
        setBooks(result); // Mettre à jour les résultats
      } else {
        console.log("Erreur lors de la recherche");
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

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
                placeholder="Rechercher un titre, un éditeur, un auteur..."
                autoFocus
              />
              <div className="mt-6">
                {books.length > 0 ? (
                  <select className="form-select mt-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    {books.map((book) => (
                      <option key={book._id} value={book._id}>
                        {book.title} - {book.author}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p>Aucun livre trouvé</p>
                )}
              </div>
              <div className="m-3 ">
                <button
                  className="button-custom mr-2 font-medium "
                  onClick={handleSearch}
                >
                  RECHERCHER
                </button>
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
              >
                <img
                  src={`http://localhost:5000/uploads/${book.image}`}
                  alt={book.title}
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
            l’eBook qui lui correspond, tout en soutenant les auteurs, qu'ils
            soient débutants ou confirmés, en leur offrant un espace pour
            partager leurs œuvres avec le monde entier. À travers notre
            catalogue diversifié et en constante évolution, nous mettons un
            point d’honneur à proposer des livres numériques de qualité, faciles
            à télécharger et à lire sur tous vos appareils. Rejoignez-nous dans
            notre aventure et explorez une nouvelle manière de lire, à portée de
            clic.
          </div>
        </section>

        <section className="third-section">
          <h2 className="titre-avec-petit-trait text-center text-2xl mt-6">
            Pourquoi choisir BookCat ?
          </h2>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            <div className="card shadow-xl">
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
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                  className="rounded-xl"
                />
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
