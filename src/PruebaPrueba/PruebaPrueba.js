import axios from "axios";
import React, { useState, useEffect } from "react";

function PruebaPrueba() {
  const [userData, setUserData] = useState({
    _id: "",
    name: "",
    identification: "",
    email: "",
    rol: "",
    finalizadaTarea: "false",
    tipoUsuario: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserData(); // asssuming this function fetches user data
        if (data) {
          setUserData(data);
          console.log('User data set:', data);
        } else {
          console.error('No user data received');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData(); // invoke the function to fetch and set user data
  }, []); // empty dependency array to run only once after component mount

  const userId = localStorage.getItem("userId"); // ID from local storage
  const getUserData = async () => {
    try {
      const response = await axios.get("/users"); // Adjusted the endpoint
      const users = response.data;
      const user = users.find((u) => u._id === userId); // Assuming each user object has an _id field
      if (user) {
        return user;
      } else {
        console.error("User not found");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const updateRol = async (newRol) => {
    console.log(userData._id);
    console.log('UserData before axios call:', userData);
    if (userData) {
      try {
        const response = await axios.patch(
          "http://localhost:3500/users",
          {
            _id: userId,
            name: userData.name,
            identification: userData.identification,
            email: userData.email,
            rol: newRol,
            finalizadaTarea: true,
            tipoUsuario: userData.tipoUsuario
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("User updated:", response.data);
        localStorage.clear();
        // localStorage.clear();
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  return (
    <>
      <button onClick={() => updateRol("Guía")}>Guía</button>
      <button onClick={() => updateRol("Huaquero")}>Huaquero</button>
      <button onClick={() => updateRol("Intérprete")}>Intérprete</button>
      <button onClick={() => updateRol("Antropólogo")}>Antropólogo</button>
    </>
  );
}

export { PruebaPrueba };
