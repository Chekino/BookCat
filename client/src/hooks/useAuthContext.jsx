import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext doit être utilisé dans un AuthContextProvider");
  }
  return context;
};

export default useAuthContext;
