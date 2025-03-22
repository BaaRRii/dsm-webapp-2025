import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContextoCarrito } from "../store/ContextoCarrito";
import "./Carrito.css";

function Carrito() {
  const { cart, removeFromCart, addToCart } = useContext(ContextoCarrito);
  const navigate = useNavigate();

  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  const handleFinalizarPedido = () => {
    setMostrarConfirmacion(true);
  };

  const handleCerrarModal = () => {
    setMostrarConfirmacion(false);
    navigate("/checkout");
  }

  const total = cart.reduce((suma, item) => {
    return suma + item.precio * item.cantidad;
  }, 0);

  const carritoVacio = cart.length === 0;

  return (
    <div className="carrito-container">
      <h2 className="carrito-title">Tu Carrito</h2>

      {carritoVacio ? (
        <div className="carrito-vacio">
          <p>No hay productos en tu carrito</p>
        </div>
      ) : (
        <>
          <div className="carrito-items">
            {cart.map((item) => (
              <div key={item.id} className="carrito-item">
                <div className="item-imagen">
                  {item.imagen ? (
                    <img src={item.imagen} alt={item.nombre} />
                  ) : (
                    <div className="no-imagen">Sin imagen</div>
                  )}
                </div>

                <div className="item-detalles">
                  <h3 className="item-nombre">{item.nombre}</h3>
                  <p className="item-descripcion">{item.descripcion}</p>

                  <div className="item-info-precio">
                    <div className="item-precio">
                      <span className="precio-unitario">
                        {item.precio}€ / unidad
                      </span>
                      <span className="precio-total">
                        {(item.precio * item.cantidad).toFixed(2)}€
                      </span>
                    </div>

                    <div className="item-cantidad">
                      <button
                        className="cantidad-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        -
                      </button>
                      <span className="cantidad-display">{item.cantidad}</span>
                      <button
                        className="cantidad-btn"
                        onClick={() => addToCart(item)}
                        disabled={item.cantidad >= item.stock}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="carrito-resumen">
            <div className="carrito-total">
              <span className="total-label">Total:</span>
              <span className="total-valor">{total.toFixed(2)}€</span>
            </div>
            <button className="btn-finalizar" onClick={handleFinalizarPedido}>Realizar pedido</button>
          </div>
        </>
      )}

      {mostrarConfirmacion && (
        <div className="modal-overlay">
          <div className="modal-confirmacion">
            <h2>Confirmación de Pedido</h2>
            <div className="detalles-pedido">
              {cart.map((item) => (
                <div key={item.id} className="detalle-item">
                  <span>{item.nombre}</span>
                  <span>{item.cantidad} x {item.precio}€</span>
                </div>
              ))}
            </div>
            <div className="total-pedido">
              <span className="total-label">Total: </span>
              <span className="total-valor">{total.toFixed(2)}€</span>
            </div>
            <button className="btn-cerrar" onClick={handleCerrarModal}>
              Continuar
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Carrito;
