import { Link } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login(email, password);

      // Si la réponse est positive, on affiche le toast et on redirige
      if (response) {
        toast.success("Connexion réussie !");
        navigate("/");
      } else {
        toast.error("Échec de la connexion.");
      }
    } catch (err) {
      // En cas d'erreur, afficher un message
      toast.error("Erreur lors de la connexion. Veuillez réessayer.");
      console.error("Erreur lors de la connexion:", err);
    }
  };
  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col">
        <p>Veuillez vous connecter !</p>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <button className="button-custom" disabled={isLoading}>
                Se connecter
              </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="form-control text-center mb-3 ">
              <Link to="/authentification/register">
                <button className="btn btn-white ">Inscription </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
