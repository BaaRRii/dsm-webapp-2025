import "./PanelProducto.css";

import { useState, useContext } from "react";
import { ContextoCarrito } from "../store/ContextoCarrito";


function PanelProducto(props) {
  const { id, nombre, descripcion, precio, stock, imagen } = props.producto;
  const { cart, addToCart, removeFromCart } = useContext(ContextoCarrito);
  
  const productoEnCarrito = cart.find((item) => item.id === id);
  const cantidadEnCarrito = productoEnCarrito ? productoEnCarrito.cantidad : 0;
  
  const [cantidad, setCantidad] = useState(cantidadEnCarrito);

  const handleAdd = () => {
    if (cantidad < stock) {
      setCantidad(cantidad + 1);
      addToCart(props.producto);
    }
  };

  const handleRemove = () => {
    if (cantidad > 0) {
      setCantidad(cantidad - 1);
      removeFromCart(id);
    }
  };

  return (
    <div className="product-container">
      <div className="product-image-container">
        {imagen ? (
          <img src={imagen} alt={nombre} className="product-image"/>
        ) : (
          <div className="no-image">Sin imagen</div>
        )}
        {stock <= 5 && stock > 0 && (
          <span className="stock-limited">¡Últimas unidades!</span>
        )}
      </div>

      <div className="product-info">

        <h3 className="product-name">{nombre}</h3>
        <p className="product-description">{descripcion}</p>

        <div className="product-footer">
          <p className="product-price">{precio}€</p>
          <span className={`availability ${stock > 0 ? "available" : "sold-out"}`}>
            {stock > 0 ? "Disponible" : "Agotado"}
          </span>
        </div>

        {stock > 0 ? (
          <div className="quantity-control">
            <button 
              className="quantity-btn" 
              disabled={cantidad === 0}
              onClick={handleRemove}
            >
              -
            </button>
            <span className="quantity-display">{cantidad}</span>
            <button 
              className="quantity-btn" 
              disabled={cantidad === stock}
              onClick={handleAdd}
            >
              +
            </button>
          </div>
        ) : (
          <div className="out-of-stock">Sin stock</div>
        )}


      </div>
    </div>
  );
}

export default PanelProducto;
