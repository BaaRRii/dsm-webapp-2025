import Header from './components/Header'
import { getProducts } from './utils/firebaseService';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CarritoProvider } from './store/ContextoCarrito';
import ListaProductos from './components/ListaProductos';
import Carrito from './components/Carrito';

import './App.css'

function App() {

  const [productos, setProductos] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProductos(data);
        console.log(data)
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <CarritoProvider>
        <Header></Header>
        <Routes>
          <Route path="/" element={<ListaProductos productos={productos} />} />
          <Route path="/catalogo" element={<ListaProductos productos={productos} />} />
          <Route path="/carrito" element={<Carrito/>} />
        </Routes>
      </CarritoProvider>
    </>
  )
}

export default App
