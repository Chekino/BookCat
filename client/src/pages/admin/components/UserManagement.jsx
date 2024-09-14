import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";

const UserManagement = () => {
  const [allUsers, setAllUsers] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        // Ajoutez un log pour vérifier la valeur de `user`
        console.log("AuthContext user:", user);

        if (!user || !user.token) {
          throw new Error("User or token is not available");
        }

        const response = await fetch("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setAllUsers(data);
        } else {
          throw new Error("Data is not an array");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs :",
          error
        );
      }
    };

    // Vérifiez que `user` est défini avant d'effectuer la demande
    if (user && user.token) {
      fetchAllUsers();
    } else {
      console.error("User or token is not available");
    }
  }, [user]);

  return (
    <div className="overflow-x-auto">
      <table className="table table-xs">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Fonction</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.length > 0 &&
            allUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
