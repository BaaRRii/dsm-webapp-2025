import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC_A5eEcpqEtM4GDgneiGcmGp5IBwO1vjU",
  authDomain: "dsm-webapp-2025.firebaseapp.com",
  databaseURL: "https://dsm-webapp-2025-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dsm-webapp-2025",
  storageBucket: "dsm-webapp-2025.firebasestorage.app",
  messagingSenderId: "856662678826",
  appId: "1:856662678826:web:5dd57c819b58ceb2c5d253"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const getProducts = () => {
  return new Promise((resolve, reject) => {
    const productosRef = ref(db, 'productos');
    onValue(productosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productos = Object.values(data);
        resolve(productos);
      } else {
        reject("No hay productos");
      }
    }, {onlyOnce:false});
  })
};
