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
import { FeedbackPositivo } from "./Ganan";
import { FeedbackNegativo } from "./Pierden";
import { AntroTest } from "./antrotest";
import { Induccion } from "./induccion";
import { FraseMuseo } from "./FraseMuseo";
import { RevisarCelular } from "./RevisarCelular";
import { IntentaloDenuevo } from "./IntentaloDenuevo";
import { GananMuseo } from "./GananMuseo";
import { TestTimeOut } from "./testTimeOut";
import { TestFinalizada } from "./TestFinalizada/index.js";
import { MuseoTabla } from "./MuseoTabla";
import { TablaMuseoMejorT } from "./TabaMuseoMejorT";
import { Huaquero } from "./Huaquero";
import { TematicaMuseo } from "./TematicaMuseo";
import { TematicaMuseo2 } from "./TematicaMuseo2";

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
            <Route path="/testTimeOut" element={<TestTimeOut />} />
            <Route path="/introduccion" element={<Picker />} />
            <Route path="/PruebaPrueba" element={<PruebaPrueba />} />
            <Route path="/museo" element={<PantallaMuseo />} />
            <Route path="/induccion" element={<Induccion />} />
            <Route path="/animacionMuseo" element={<AnimacionMuseo />} />
            <Route path="/qrMuseo" element={<QrMuseo />} />
            <Route path="/introduccion/:slug" element={<Introduccion />} />
            <Route path="/rolesMuseo" element={<RolesMuseo />} />
            <Route path="/TestFinalizada" element={<TestFinalizada />} />
            <Route path="/seleccionCargando" element={<SeleccionCargando />} />
            <Route path="/juego/guia" element={<Mapa historia={3} />} />
            <Route
              path="/juego/interprete"
              element={<Minijuego historia={2}></Minijuego>}
            />
            <Route path="/symbolsPage" element={<SymbolsPage />} />

            <Route path="/pierden" element={<FeedbackNegativo />} />
            <Route path="/ganan" element={<FeedbackPositivo />} />

            <Route
              path="/juego/antropologo"
              element={<Bloqueo historia={1}></Bloqueo>}
            />
            <Route path="/juego/huaquero" element={<Huaquero historia={1} />} />
            <Route path="/estadoMuseo" element={<EstadoMuseo />} />

            <Route path="/revisarCelular" element={<RevisarCelular />} />

            <Route path="/fraseMuseo" element={<FraseMuseo historia={3} />} />
            <Route path="/intentaloDenuevo" element={<IntentaloDenuevo />} />
            <Route path="/gananMuseo" element={<GananMuseo historia={5} />} />
            <Route path="/museoTabla" element={<MuseoTabla />} />
            <Route path="/museoTablaMejorT" element={<TablaMuseoMejorT />} />
            <Route path="/tematicaMuseo" element={<TematicaMuseo />} />
            <Route path="/tematicaMuseo2" element={<TematicaMuseo2 />} />
          </Routes>
        </MyContextProvider>
      </HashRouter>
    </div>
  );
}

export default App;
