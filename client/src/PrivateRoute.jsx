import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Unauthorized from "./pages/error/Unauthorized";

const PrivateRoute = () => {
  const { user, isAdmin, loading } = useContext(AuthContext);

  if (loading) {
    // Si l'utilisateur n'est pas connecté, rediriger vers la page de login
    return <div>Chargement...</div>;
  }

  if (!user) {
    // Si l'utilisateur n'est pas connecté, rediriger vers la page de login
    return <Navigate to="/authentification" />;
  }

  if (!isAdmin) {
    // Si l'utilisateur n'est pas admin, rediriger vers une page d'erreur ou Accueil
    return <Unauthorized />;
  }

  // Si tout est bon, rendre les composants enfants (Outlet rend les sous-routes)
  return <Outlet />;
};

export default PrivateRoute;
