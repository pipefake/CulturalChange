import React from "react";
import axios from "axios";

function PruebaPrueba() {
  const handleRoleUpdate = async (selectedRole) => {
    try {
      const userId = localStorage.getItem("userId");
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
