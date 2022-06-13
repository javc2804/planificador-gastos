import { useState, useEffect } from "react";
import Header from "./components/Header";
import Filtros from "./components/Filtros";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import Modal from "./components/Modal";
import ListadoGastos from "./components/ListadoGastos";
import { generarId } from "./helpers";
function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  );
  const [isValidPresupuesto, setisValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastos, setGastos] = useState(
    localStorage.getItem("gastos")
      ? JSON.parse(localStorage.getItem("gastos"))
      : []
  );
  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro, setFiltro] = useState("");
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      console.log("Click para gasto");
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true);
      }, 100);
    }
  }, [gastoEditar]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0;
    console.log(presupuestoLS);
    if (presupuestoLS > 0) {
      setisValidPresupuesto(true);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
  }, [gastos]);

  useEffect(() => {
    if (filtro) {
      console.log("filtrando", filtro);
      const gastosFiltrados = gastos.filter(
        (gasto) => gasto.categoria === filtro
      );
      console.log(gastosFiltrados);
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro]);

  const handleNuevoGasto = () => {
    console.log("Click para gasto");
    setGastoEditar({});
    setModal(true);
    setTimeout(() => {
      setAnimarModal(true);
    }, 100);
  };

  const eliminarGasto = (id) => {
    console.log("eliminando", id);
    const listaGastos = gastos.filter((gastoState) => {
      gastoState.id !== id;
    });
    console.log(listaGastos);
    setGastos(listaGastos);
  };

  const guardarGasto = (gasto) => {
    console.log(gasto);
    if (gasto.id) {
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );
      setGastos(gastosActualizados);
      setGastoEditar({});
    } else {
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }

    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 100);
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        setGastos={setGastos}
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setisValidPresupuesto={setisValidPresupuesto}
      />
      {isValidPresupuesto ? (
        <>
          <main>
            <Filtros setFiltro={setFiltro} filtro={filtro} />
            <ListadoGastos
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
              eliminarGasto={eliminarGasto}
              setGastoEditar={setGastoEditar}
              gastos={gastos}
            />
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
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;
