import "./PanelProducto.css";

function PanelProducto(props) {
  const { nombre, descripcion, precio, stock, imagen } = props.producto;

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

        <button className={`add-to-cart ${stock > 0 ? "" : "disabled"}`}>
          {stock > 0 ? "Añadir al carrito" : "Sin stock"}
        </button>
      </div>
    </div>
  );
}

export default PanelProducto;
