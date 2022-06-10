import { useState } from "react";
import Header from "./components/Header";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import Modal from "./components/Modal";
import ListadoGastos from "./components/ListadoGastos";
import { generarId } from "./helpers";
function App() {
  const [presupuesto, setPresupuesto] = useState(0);
  const [isValidPresupuesto, setisValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastos, setGastos] = useState([]);

  const handleNuevoGasto = () => {
    console.log("Click para gasto");
    setModal(true);
    setTimeout(() => {
      setAnimarModal(true);
    }, 100);
  };

  const guardarGasto = (gasto) => {
    gasto.id = generarId();
    gasto.fecha = Date.now();
    setGastos([...gastos, gasto]);
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 100);
  };

  return (
    <div className={modal ? 'fijar':''}>
      <Header
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setisValidPresupuesto={setisValidPresupuesto}
      />
      {isValidPresupuesto ? (
        <>
          <main>
            <ListadoGastos gastos={gastos} />
          </main>
          <div className="nuevo-gasto">
            <img src={IconoNuevoGasto} alt="" onClick={handleNuevoGasto} />
          </div>
        </>
      ) : null}
      {modal && (
        <Modal
          guardarGasto={guardarGasto}
          setModal={setModal}
          setAnimarModal={setAnimarModal}
          animarModal={animarModal}
        />
      )}
    </div>
  );
}

export default App;
