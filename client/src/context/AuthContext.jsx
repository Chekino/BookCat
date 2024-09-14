import { createContext, useReducer, useEffect, useState } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload, isAdmin: action.payload.role === "admin" };
    case "LOGOUT":
      return { user: null, isAdmin: false };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAdmin: false,
  });

  const [loading, setLoading] = useState(true); // Ajoute l'état de chargement

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }

    setLoading(false); // Arrête le chargement après avoir récupéré les données de l'utilisateur
  }, []);
  console.log("AuthContext state", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
