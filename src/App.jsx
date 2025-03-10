import Header from './components/Header'
import { getProducts } from './utils/firebaseService';
import { useState, useEffect } from 'react';
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
      <h1>APP</h1>
    </>
  )
}

export default App
