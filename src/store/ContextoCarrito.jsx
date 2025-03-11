import { createContext, useState } from 'react';

export const ContextoCarrito = createContext();

export const CarritoProvider = ({ children }) => {

  const [cart, setCart] = useState([]);

  const addToCart = (producto) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === producto.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      } else {
        return [...prevCart, { ...producto, cantidad: 1 }];
      }
    });
  };

  const removeFromCart = (productoId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productoId ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  return (
    <ContextoCarrito.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </ContextoCarrito.Provider>
  );
};