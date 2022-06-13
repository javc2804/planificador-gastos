import NuevoPresupuesto from "./NuevoPresupuesto";
import ControlPresupuesto from "./ControlPresupuesto";
const Header = ({
  presupuesto,
  setPresupuesto,
  isValidPresupuesto,
  setisValidPresupuesto,
  gastos,
  setGastos
}) => {
  return (
    <header>
      <h1>Planificador de gastos</h1>
      {isValidPresupuesto ? (
        <ControlPresupuesto setisValidPresupuesto={setisValidPresupuesto} setGastos={setGastos} gastos={gastos} setPresupuesto={setPresupuesto} presupuesto={presupuesto} />
      ) : (
        <NuevoPresupuesto
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setisValidPresupuesto={setisValidPresupuesto}
        />
      )}
    </header>
  );
};

export default Header;
