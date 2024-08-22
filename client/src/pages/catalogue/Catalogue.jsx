import "./catalogue.css";

const Catalogue = () => {
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
          <div className="book">
            <div className="bg-base-100 w-52 shadow-xl">
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <p className="text-xl">Le retour de l'enfant soldat</p>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Catalogue;
