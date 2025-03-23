import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { saveOrder } from "../utils/firebaseService";
import { AuthContext } from "../store/AuthContext";
import { ContextoCarrito } from "../store/ContextoCarrito";

import "./Checkout.css";

function Checkout() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    direccion: "",
  });

  const [mostrarAgradecimiento, setMostrarAgradecimiento] = useState(false);

  const handleCerrarModal = () => {
    setMostrarAgradecimiento(false);
    navigate("/");
  }

  const { cart, clearCart } = useContext(ContextoCarrito); 
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pedido = {
      usuario: formData,
      productos: cart,
      total: cart.reduce((suma, item) => suma + item.precio * item.cantidad, 0),
      fecha: new Date().toISOString(),
    };

    try {
      await saveOrder(user.uid, pedido);
      clearCart();
      setFormData({ nombre: "", apellido: "", direccion: "" });
      setMostrarAgradecimiento(true);
    } catch (error) {
      console.error("Error al guardar el pedido:", error);
      alert("Hubo un error al realizar el pedido. Inténtalo de nuevo.");
    }
  };

  return (
    <>
      {mostrarAgradecimiento && (
        <div className="modal-overlay">
          <div className="modal-confirmacion">
            <span>
              ¡Gracias por tu pedido! Se ha registrado en la base de datos.
            </span>
            <br></br>
            <br></br>
            <button className="btn-cerrar" onClick={handleCerrarModal}>
              Realizar un nuevo pedido
            </button>
          </div>
        </div>
      )}

    <div className="checkout-container">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="direccion">Dirección:</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn-submit">
          Realizar Pedido
        </button>
      </form>
    </div>
    </>
  );
}

export default Checkout;