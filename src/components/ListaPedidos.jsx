import { useEffect, useState, useContext } from "react";
import { getPedidos } from "../utils/firebaseService";
import { AuthContext } from "../store/AuthContext";

import "./ListaPedidos.css";

function ListaPedidos() {
  const { user } = useContext(AuthContext);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPedidos(user.uid);
        setPedidos(data);
        console.log(data);
      } catch (error) {
        console.error("Error al obtener pedidos:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="lista-pedidos">
      {pedidos.length === 0 ? (
        <p>No tienes pedidos realizados.</p>
      ) : (
        <>
          {pedidos.map((pedido) => (
            <div key={pedido.id} className="pedido-item">
              <h3>
                Pedido realizado el: {new Date(pedido.fecha).toLocaleString()}
              </h3>
              <div className="pedido-usuario">
                <h4>Datos del Usuario:</h4>
                <p>
                  <strong>Nombre:</strong> {pedido.usuario.nombre}
                </p>
                <p>
                  <strong>Apellido:</strong> {pedido.usuario.apellido}
                </p>
                <p>
                  <strong>Dirección:</strong> {pedido.usuario.direccion}
                </p>
              </div>
              <div className="pedido-productos">
                <h4>Productos:</h4>
                <ul>
                  {pedido.productos.map((producto, index) => (
                    <div key={index} className="producto-item">
                      <p>
                        <strong>Nombre:</strong> {producto.nombre}
                      </p>
                      <p>
                        <strong>Descripción:</strong> {producto.descripcion}
                      </p>
                      <p>
                        <strong>Cantidad:</strong> {producto.cantidad}
                      </p>
                      <p>
                        <strong>Precio:</strong> {producto.precio}€
                      </p>
                    </div>
                  ))}
                </ul>
              </div>
              <p>
                <strong>Total:</strong> {pedido.total}€
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default ListaPedidos;
