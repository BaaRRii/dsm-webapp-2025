import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, push } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

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
const auth = getAuth(app);

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
    }, { onlyOnce: false });
  })
};

export const getPedidos = (userId) => {
  return new Promise((resolve, reject) => {
    const pedidosRef = ref(db, `pedidos/${userId}`);
    onValue(
      pedidosRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          resolve(Object.entries(data).map(([id, order]) => ({ id, ...order })));
        } else {
          resolve([]);
        }
      }, 
      (error) => {
        reject(error);
      });
  })
};

export const saveOrder = (userId, orderData) => {
  const ordersRef = ref(db, `pedidos/${userId}`);
  return push(ordersRef, orderData);
}

export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => {
  return signOut(auth);
};
