import { useState } from "react";
import { Link } from "react-router-dom";
import { useRegister } from "../../hooks/useRegister";

const Register = () => {
  const [fullname, SetFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, isLoading, error } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await register(fullname, email, password);
  };
  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col">
        <p>Bienvenue sur la page d'Inscription !</p>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nom complet</span>
              </label>
              <input
                type="text"
                placeholder="nom"
                value={fullname}
                onChange={(e) => SetFullName(e.target.value)}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Adresse Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Mot de passe</span>
              </label>
              <input
                type="password"
                placeholder="mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Mot de passe oublié?
                </a>
              </label>
            </div>
            <div className="form-control mt-4">
              <button className="btn btn-primary" disabled={isLoading}>
                S'inscrire
              </button>
              {error && <div className="text-red-500">{error}</div>}
            </div>
            <div className="form-control text-center mb-3 ">
              <Link to="/authentification">
                <button className="btn btn-white ">Connexion </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
