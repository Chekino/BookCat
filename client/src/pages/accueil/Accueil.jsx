import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import "./accueil.css";

const Accueil = () => {
  return (
    <>
      <header className="hero ">
        <div className="hero-content text-center">
          <div className="max-w-md ">
            <h1 className="text-4xl my-8 ">
              Trouver vos meilleurs livres electroniques avec BookCat
            </h1>
            <input
              type="text"
              className="input-custom text-center"
              placeholder="Rechercher un titre, un éditeur, un auteur..."
              autoFocus
            />
            <div className="m-3 ">
              <button className="button-custom mr-2 font-medium ">
                RECHERCHER
              </button>
              <button className="button-custom mr-2 font-medium	 ">
                CATALOGUE
              </button>
            </div>
          </div>
        </div>
      </header>
      <main>
        <section className="first-section">
          <h2 className="titre-avec-petit-trait text-center text-2xl">
            Livres les plus achetés
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
            <SwiperSlide>
              <img
                src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg"
                alt=""
              />
              <p>Titre</p>
              <p>Auteur</p>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg"
                alt=""
              />
              <p>Titre</p>
              <p>Auteur</p>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg"
                alt=""
              />
              <p>Titre</p>
              <p>Auteur</p>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg"
                alt=""
              />
              <p>Titre</p>
              <p>Auteur</p>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg"
                alt=""
              />
              <p>Titre</p>
              <p>Auteur</p>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg"
                alt=""
              />
              <p>Titre</p>
              <p>Auteur</p>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg"
                alt=""
              />
              <p>Titre</p>
              <p>Auteur</p>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg"
                alt=""
              />
              <p>Titre</p>
              <p>Auteur</p>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg"
                alt=""
              />
              <p>Titre</p>
              <p>Auteur</p>
            </SwiperSlide>
          </Swiper>
        </section>
        <section>
          <h2 className="titre-avec-petit-trait text-center text-2xl my-4">
            Qui sommes-nous ?
          </h2>
          <div className="container mx-auto max-w-screen-lg px-4 text-xl ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis,
            voluptatum expedita laboriosam inventore vel dicta et fugiat porro
            quia voluptate, soluta architecto unde mollitia accusantium eveniet
            natus, nostrum similique incidunt! Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Dolore vitae, consequuntur eos,
            impedit accusantium nemo eaque natus nihil laboriosam, esse soluta
            perferendis. Commodi id quod totam fuga quia itaque accusantium.
          </div>
        </section>
        <section className="third-section">
          <h2 className="titre-avec-petit-trait text-center text-2xl mt-6">
            Comment acheté un livre ?
          </h2>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            <div className="card shadow-xl">
              <figure className="px-10 pt-10">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Etape 1</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
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
                <h2 className="card-title">Etape 1</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
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
                <h2 className="card-title">Etape 1</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Accueil;
