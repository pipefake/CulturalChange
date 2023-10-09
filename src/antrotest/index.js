import React, { useEffect, useState } from "react";
import axios from "axios";

function AntroTest() {
  const [symbols, setSymbols] = useState([]);
  const [roomCode, setRoomCode] = useState(""); // State to store the room code

  useEffect(() => {
    const sendSymbols = async () => {
      try {
        await addSymbol("Symbol5");
        await addSymbol("Symbol6");
        await addSymbol("Symbol7");
        await addSymbol("Symbol8");
        
        // After sending all symbols, fetch the room code and symbols
        fetchRoomCode();
        fetchSymbols();
      } catch (error) {
        console.error('Error sending symbols:', error);
      }
    };
  
    // Call the function to send symbols
    sendSymbols();
  }, []);

  const fetchRoomCode = async () => {
    try {
      const response = await axios.get("/roomCode");
      console.log("Code: ", response.data[0].code); // Log entire response
      if (response.data.length > 0 && response.data[0].code) {
        setRoomCode(response.data[0].code); // Set the room code state
      }
    } catch (error) {
      console.error("Error fetching room code:", error);
    }
  };

  const addSymbol = async (symbolName) => {
    try {
      const response = await axios.post("/roomCode", {
        huaqueroSymbols: {
          name: symbolName,
          found: false,
        },
      });
      console.log(`${symbolName} posted successfully`);
      setSymbols([...symbols, response.data]); // Update the symbols array with the newly added symbol
    } catch (error) {
      console.error(`Error posting ${symbolName}:`, error);
    }
  };

  const fetchSymbols = async () => {
    try {
      const response = await axios.get("/roomCode");
      setSymbols(response.data[0].huaqueroSymbols); // Assuming the symbols are stored in an array inside the response
    } catch (error) {
      console.error("Error fetching symbols:", error);
    }
  };

  const updateSymbol = async (symbolName) => {
    try {
      const response = await axios.patch('/roomCode', { symbolName, found: true });
      console.log(`Symbol ${symbolName} updated successfully`);
    } catch (error) {
      console.error(`Error updating symbol ${symbolName}:`, error);
    }
  };

  return (
    <div>
      <button onClick={() => updateSymbol("Symbol5")}>Symbol5</button>
      <button onClick={() => updateSymbol("Symbol6")}>Symbol6</button>
      <button onClick={() => updateSymbol("Symbol7")}>Symbol7</button>
      <button onClick={() => updateSymbol("Symbol8")}>Symbol8</button>
    </div>
  );
}
export { AntroTest };
