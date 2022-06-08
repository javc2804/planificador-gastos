import CerrarBtm from "../img/cerrar.svg";
const Modal = ({ setModal }) => {
  const ocultarModal = () => {
    console.log("oculta");
    setModal(false);
    setTimeout(() => {
      console.log("animando modal");
    }, 3000);
  };
  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarBtm} alt="Cerrar modal" onClick={ocultarModal} />
      </div>
      <form className="formulario">
        <legend>Nuevo Gasto</legend>
      </form>
    </div>
  );
};

export default Modal;
