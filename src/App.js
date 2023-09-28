import "./App.css";
import { MyContextProvider } from "./SeleccionCargando/MyContext";
import { InputCodigo } from "./InputCodigo";
import { PantallaMuseo } from "./PantallaMuseo";
import { AnimacionMuseo } from "./AnimacionMuseo";
import { QrMuseo } from "./QrMuseo";
import { RolesMuseo } from "./RolesMuseo";
import { Header } from "./Header";
import { Contexto } from "./Contexto";
import { Mapa } from './Mapa';
import { Minijuego } from './Traductor/Minijuego.js';
import { Introduccion } from "./Introduccion";
import { SeleccionCargando } from "./SeleccionCargando";
import { Picker } from "./Picker";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Traductor } from './Traductor';

function App() {


  return (
    <div className="App">
      <HashRouter>
        {/* Envuelve toda la aplicación con MyContextProvider */}
        <MyContextProvider>
          {/* Tu contenido de la aplicación */}
          <Routes>
            <Route path="/*" element={<p>no encontrado</p>} />
            <Route path="/" element={<InputCodigo />} />
            <Route path="/introduccion" element={<Picker />} />
            <Route path="/museo" element={<PantallaMuseo />} />
            <Route path="/animacionMuseo" element={<AnimacionMuseo />} />
            <Route path="/qrMuseo" element={<QrMuseo />} />
            <Route path="/introduccion/:slug" element={<Introduccion />} />
            <Route path="/rolesMuseo" element={<RolesMuseo />} />
            <Route path="/seleccionCargando" element={<SeleccionCargando />} />
            <Route path="/juego/guia" element={<Mapa historia={2} />} />
            <Route path="/juego/interprete/parejas" element={<Minijuego></Minijuego>} />
            <Route path="/juego/interprete/traduccion" element={<Traductor></Traductor>} />
          </Routes>
        </MyContextProvider>
      </HashRouter>
    </div>
  );
}

export default App;
