import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
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
