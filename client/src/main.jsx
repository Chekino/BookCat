import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./pages/error/ErrorPages.jsx";
import Layout from "./layout/Layout.jsx";
import Catalogue from "./pages/catalogue/Catalogue.jsx";
import Accueil from "./pages/accueil/Accueil.jsx";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import Dashboard from "./pages/admin/dashboard/Dashboard.jsx";
import BookManagement from "./pages/admin/components/BookManagement.jsx";
import AddBook from "./pages/admin/components/AddBook.jsx";
import UserManagement from "./pages/admin/components/UserManagement.jsx";
import AdminDashboard from "./pages/admin/components/AdminDashboard.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Accueil />,
      },
      {
        path: "catalogue",
        element: <Catalogue />,
      },
      {
        path: "authentification",
        children: [
          { path: "", element: <Login /> },
          { path: "register", element: <Register /> },
        ],
      },
      {
        element: <PrivateRoute />, // Protection des routes admin
        children: [
          {
            path: "dashboard",
            element: <Dashboard />, // Le Dashboard avec la sidebar
            children: [
              { path: "", element: <AdminDashboard /> }, // Sous-route admin par défaut
              { path: "book-management", element: <BookManagement /> },
              { path: "add-book", element: <AddBook /> },
              { path: "user-management", element: <UserManagement /> }, // Rendre ici
            ],
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </AuthContextProvider>
  </StrictMode>
);
