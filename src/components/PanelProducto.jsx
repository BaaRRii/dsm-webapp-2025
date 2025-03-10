import "./PanelProducto.css";

import { useState } from "react";

function PanelProducto(props) {
  const { nombre, descripcion, precio, stock, imagen } = props.producto;
  const [cantidad, setCantidad] = useState(0);

  return (
    <div className="product-container">
      <div className="product-image">
        {imagen ? (
          <img src={imagen} alt={nombre} />
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

        {/* TODO: añadir funcionalidad de añadir y quitar del carrito */}

        {stock > 0 ? (
          <div className="quantity-control">
            <button 
              className="quantity-btn" 
              disabled={cantidad === 0}
            >
              -
            </button>
            <span className="quantity-display">{cantidad}</span>
            <button 
              className="quantity-btn" 
              disabled={cantidad === stock}
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
