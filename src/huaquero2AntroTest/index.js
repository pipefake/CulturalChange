import React, { useEffect, useState } from "react";
import axios from "axios";

function SymbolsPage() {
  const [symbols, setSymbols] = useState([]);
  const [roomCode, setRoomCode] = useState(""); // State to store the room code

  useEffect(() => {
    const sendSymbols = async () => {
      try {
        await addSymbol("Symbol1");
        await addSymbol("Symbol2");
        await addSymbol("Symbol3");
        await addSymbol("Symbol4");
        await addSymbol("simbolo1");
        await addSymbol("simbolo2");
        await addSymbol("simbolo3");
        await addSymbol("simbolo4");
        
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

  // const updateSymbol = async (roomCode, symbolName) => {
  //   console.log("Sending the symbol: ", symbols)
  //   console.log("Sending the roomCode: ", roomCode)
  //   try {
  //     await axios.patch('/updateSymbol', {
  //       roomCode: roomCode, // Replace with the actual room code
  //       symbolName: symbolName,
  //     });
  //     console.log(`${symbolName} updated successfully`);

  //     // Update the symbols array to reflect the updated 'found' state
  //     setSymbols((prevSymbols) =>
  //       prevSymbols.map((symbol) =>
  //         symbol.name === symbolName ? { ...symbol, found: true } : symbol
  //       )
  //     );
  //   } catch (error) {
  //     console.error(`Error updating ${symbolName}:`, error);
  //   }
  // };

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
      <button onClick={() => updateSymbol("Symbol1")}>Symbol1</button>
      <button onClick={() => updateSymbol("Symbol2")}>Symbol2</button>
      <button onClick={() => updateSymbol("Symbol3")}>Symbol3</button>
      <button onClick={() => updateSymbol("Symbol4")}>Symbol4</button>
    </div>
  );
}

export { SymbolsPage };
