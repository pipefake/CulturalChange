import "./App.css";
<<<<<<< HEAD
import { MyContextProvider } from "./SeleccionCargando/MyContext";
=======



>>>>>>> fcb1023a4cdd2b9f82fd69da336ea4086c45a5b6
import { InputCodigo } from "./InputCodigo";
import { PantallaMuseo } from "./PantallaMuseo";
import { AnimacionMuseo } from "./AnimacionMuseo";
import { QrMuseo } from "./QrMuseo";
import { RolesMuseo } from "./RolesMuseo";
import { Header } from "./Header";
import { Contexto } from "./Contexto";
import { Introduccion } from "./Introduccion";
import { SeleccionCargando } from "./SeleccionCargando";
<<<<<<< HEAD
=======
import { MyContextProvider } from "./SeleccionCargando/MyContext";
import { HashRouter, Routes, Route } from "react-router-dom";
>>>>>>> fcb1023a4cdd2b9f82fd69da336ea4086c45a5b6
import { Picker } from "./Picker";
import { HashRouter, Routes, Route } from "react-router-dom";

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
          </Routes>
        </MyContextProvider>
      </HashRouter>
    </div>
  );
}

export default App;
