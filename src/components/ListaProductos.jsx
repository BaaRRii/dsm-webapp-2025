import PanelProducto from "./PanelProducto";
import "./ListaProductos.css"

function ListaProductos(props){

  return(
    <div className="product-list">
      {props.productos.map((producto) => {
        return <PanelProducto producto={producto} key={producto.id}></PanelProducto>
      })}
    </div>
  )
}

export default ListaProductos;