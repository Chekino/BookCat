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
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>
);
