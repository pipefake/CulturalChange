import React, { useEffect } from 'react';
import axios from 'axios';

function SymbolsPage() {

  useEffect(() => {
    const symbolNames = ['Symbol1', 'Symbol2', 'Symbol3', 'Symbol4'];

    symbolNames.forEach(async (name) => {
      try {
        await axios.post('/roomCode', { name, found: false });
        console.log(`${name} posted successfully`);
      } catch (error) {
        console.error(`Error posting ${name}:`, error);
      }
    });
  }, []);

  const updateSymbol = async (symbolName) => {
    try {
      await axios.patch('/roomCode', { symbolName });
      console.log(`${symbolName} updated successfully`);
    } catch (error) {
      console.error(`Error updating ${symbolName}:`, error);
    }
  };

  return (
    <div>
      <button onClick={() => updateSymbol('Symbol1')}>Symbol1</button>
      <button onClick={() => updateSymbol('Symbol2')}>Symbol2</button>
      <button onClick={() => updateSymbol('Symbol3')}>Symbol3</button>
      <button onClick={() => updateSymbol('Symbol4')}>Symbol4</button>
    </div>
  );
}

export { SymbolsPage } ;
