import "./accueil.css";

const Accueil = () => {
  return (
    <div className="hero ">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold">
            Trouver vos meilleurs livres electroniques avec BookCat
          </h1>
          <input type="text" />
          <button className="btn btn-primary my-3">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Accueil;
