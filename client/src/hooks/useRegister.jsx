import { useState } from "react";
import useAuthContext from "./useAuthContext";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const register = async (name, email, password) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(
      "https://bookcat.onrender.com/api/users/register/",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.message || "Une erreur est survenue");
      return null;
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);

      return json;
    }
  };

  return { register, isLoading, error };
};
