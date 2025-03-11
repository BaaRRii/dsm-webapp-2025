import Header from './components/Header'
import { getProducts } from './utils/firebaseService';
import { useState, useEffect } from 'react';

import ListaProductos from './components/ListaProductos';
import { CarritoProvider } from './store/ContextoCarrito';

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
        <ListaProductos productos={productos}></ListaProductos>
      </CarritoProvider>
    </>
  )
}

export default App
