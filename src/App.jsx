import { useState } from "react";
import Header from "./components/Header";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import Modal from './components/Modal'
function App() {
  const [presupuesto, setPresupuesto] = useState(0);
  const [isValidPresupuesto, setisValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const handleNuevoGasto = () =>{
    console.log("Click para gasto")
    setModal(true)
  }

  return (
    <div>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setisValidPresupuesto={setisValidPresupuesto}
      />
      {isValidPresupuesto ? (
        <div className="nuevo-gasto">
          <img src={IconoNuevoGasto} alt="" onClick={handleNuevoGasto} />
        </div>
      ) : null}
      {modal && <Modal setModal={setModal} />}
    </div>
  );
}

export default App;
