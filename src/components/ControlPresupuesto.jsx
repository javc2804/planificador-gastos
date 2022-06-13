import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useState, useEffect } from "react";
const ControlPresupuesto = ({
  presupuesto,
  gastos,
  setPresupuesto,
  setGastos,
  setisValidPresupuesto
}) => {
  console.log(gastos);

  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );
    const totalDisponible = presupuesto - totalGastado;
    const nuevoPorcentaje = (
      ((presupuesto - totalDisponible) / presupuesto) *
      100
    ).toFixed(2);
    setGastado(totalGastado);
    setDisponible(totalDisponible);
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1500);
  }, [gastos]);

  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0);
  }, [presupuesto]);

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleResetApp = () =>{
    console.log('resetear app')
    const resultado = confirm('Deseas reiniciar presupuesto y gastos?')
    if(resultado){
      setGastos([])
      setPresupuesto(0)
      setisValidPresupuesto(false)
    }
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? "#D62626" : "#3B82F6",
            trailColor: "#F5f5f5",
            textColor: porcentaje > 100 ? "#D62626" : "#3B82F6",
          })}
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
        />
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Resetear App
        </button>
        <p>
          <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span>Disponible:</span> {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado:</span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
