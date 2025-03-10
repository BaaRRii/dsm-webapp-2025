import Header from './components/Header'
import { getProducts } from './utils/firebaseService';
import { useState, useEffect } from 'react';

import ListaProductos from './components/ListaProductos';

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
      <Header></Header>
      <ListaProductos productos={productos}></ListaProductos>
    </>
  )
}

export default App
