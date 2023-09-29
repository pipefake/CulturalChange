import "./App.css";
import { MyContextProvider } from "./SeleccionCargando/MyContext";
import { InputCodigo } from "./InputCodigo";
import { PantallaMuseo } from "./PantallaMuseo";
import { AnimacionMuseo } from "./AnimacionMuseo";
import { QrMuseo } from "./QrMuseo";
import { RolesMuseo } from "./RolesMuseo";
import { EstadoMuseo } from "./EstadoMuseo";

import { Header } from "./Header";
import { Contexto } from "./Contexto";
import { Mapa } from './Mapa';
import { Introduccion } from "./Introduccion";
import { SeleccionCargando } from "./SeleccionCargando";
import { Picker } from "./Picker";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {


  return (
    <div className="App">
      <HashRouter>
        {/* <Header rol={"Antropólogo"} /> */}
        {/* <Contexto titulo={"Descifra las palabras"} parrafo={"Solicita al intérprete las palabras claves"}></Contexto> */}

        <Routes>
          <Route path="/*" element={<p>no encontrado</p>} />
          <Route path="/" element={<InputCodigo></InputCodigo>} />
          <Route path="/introduccion" element={<Picker></Picker>} />
          <Route path="/museo" element={<PantallaMuseo></PantallaMuseo>} />{" "}
          <Route path="/introduccion" element={<Picker></Picker>} />
          <Route path="/museo" element={<PantallaMuseo></PantallaMuseo>} />
          <Route path="/animacionMuseo" element={<AnimacionMuseo />} />
          <Route path="/qrMuseo" element={<QrMuseo />} />
          <Route path="/introduccion/:slug" element={<Introduccion />} />
          <Route path="/rolesMuseo" element={<RolesMuseo />} />
          <Route path="/seleccionCargando" element={<SeleccionCargando />} />
          <Route path="/estadoMuseo" element={<EstadoMuseo />} />
          {/* Aquí está la nueva ruta */}
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
