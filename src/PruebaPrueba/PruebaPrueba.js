import axios from "axios";
import React, { useState, useEffect } from "react";


function PruebaPrueba() {

  const [userData, setUserData] = useState({});
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          console.error('User ID not found in local storage');
          return;
        }

        const response = await axios.get(`/api/users/${userId}`);
        
        if (response.data) {
          console.log('User data fetched:', response.data);
          setUserData(response.data);
        } else {
          console.error('User not found:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching user:', error.response?.data || error.message);
      }
    };

    fetchUserData();
  }, []);


  const handleRoleUpdate = async (selectedRole) => {
    try {
      if (!userId) throw new Error("User ID not found");

      const response = await axios.patch("/users", {
        _id: "6517b00b1c488e8df81f9ebe",
        rol: selectedRole
      });
      console.log("Role updated:", response.data);
      localStorage.removeItem("userId");
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
    <>
      <button onClick={() => handleRoleUpdate("Guía")}>Guía</button>
      <button onClick={() => handleRoleUpdate("Huaquero")}>Huaquero</button>
      <button onClick={() => handleRoleUpdate("Intérprete")}>Intérprete</button>
      <button onClick={() => handleRoleUpdate("Antropólogo")}>
        Antropólogo
      </button>
    </>
  );
}

export { PruebaPrueba };
