import "./App.css";
import { MyContextProvider } from "./SeleccionCargando/MyContext";
import { InputCodigo } from "./InputCodigo";
import { PantallaMuseo } from "./PantallaMuseo";
import { AnimacionMuseo } from "./AnimacionMuseo";
import { QrMuseo } from "./QrMuseo";
import { RolesMuseo } from "./RolesMuseo";
import { EstadoMuseo } from "./EstadoMuseo";
import { PruebaPrueba } from "./PruebaPrueba/PruebaPrueba";
import { Header } from "./Header";
import { Contexto } from "./Contexto";
import { Mapa } from "./Mapa";
import { Minijuego } from "./Traductor/Minijuego.js";
import { Introduccion } from "./Introduccion";
import { SeleccionCargando } from "./SeleccionCargando";
import { Picker } from "./Picker";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Traductor } from "./Traductor";
import { Bloqueo } from "./Bloqueo";
import { JuegoHuaquero } from "./JuegoHuaquero";
import { SymbolsPage } from "./huaquero2AntroTest";
import { FeedbackNegativo } from "./Pierde";
import { AntroTest } from "./antrotest";
import { Induccion } from "./induccion";
import { FraseMuseo } from "./FraseMuseo";
import { RevisarCelular } from "./RevisarCelular";
import { IntentaloDenuevo } from "./IntentaloDenuevo";
import { GananMuseo } from "./GananMuseo";


function App() {
  return (
    <div className="App">
      <HashRouter>
        {/* Envuelve toda la aplicación con MyContextProvider */}
        <MyContextProvider>
          {/* <Header rol={"Antropólogo"} /> */}
          {/* <Contexto titulo={"Descifra las palabras"} parrafo={"Solicita al intérprete las palabras claves"}></Contexto> */}
          {/* Tu contenido de la aplicación */}
          <Routes>
            <Route path="/*" element={<p>no encontrado</p>} />
            <Route path="/" element={<InputCodigo />} />
            <Route path="/introduccion" element={<Picker />} />
            <Route path="/PruebaPrueba" element={<PruebaPrueba />} />
            <Route path="/museo" element={<PantallaMuseo />} />
            <Route path="/induccion" element={<Induccion />} />
            <Route path="/animacionMuseo" element={<AnimacionMuseo />} />
            <Route path="/qrMuseo" element={<QrMuseo />} />
            <Route path="/introduccion/:slug" element={<Introduccion />} />
            <Route path="/rolesMuseo" element={<RolesMuseo />} />
            <Route path="/seleccionCargando" element={<SeleccionCargando />} />
            <Route path="/juego/guia" element={<Mapa historia={4} />} />
            <Route
              path="/juego/interprete"
              element={<Minijuego historia={1}></Minijuego>}
            />
            <Route path="/symbolsPage" element={<SymbolsPage />} />
            <Route path="/pierde" element={<FeedbackNegativo />} />
            <Route
              path="/juego/antropologo"
              element={<Bloqueo historia={1}></Bloqueo>}
            />
                <Route path="/juego/Huaquero" element={<JuegoHuaquero />} />

            <Route path="/museo" element={<PantallaMuseo></PantallaMuseo>} />

            <Route path="/estadoMuseo" element={<EstadoMuseo />} />

            <Route path="/revisarCelular" element={<RevisarCelular />} />
            
            <Route path="/fraseMuseo" element={<FraseMuseo historia={3} />} />
            <Route path="/intentaloDenuevo" element={<IntentaloDenuevo />} />
            <Route path="/gananMuseo" element={<GananMuseo historia={5} />} />

          </Routes>
        </MyContextProvider>
      </HashRouter>
    </div>
  );
}

export default App;