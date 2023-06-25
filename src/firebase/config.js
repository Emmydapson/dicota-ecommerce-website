import { initializeApp } from "firebase/app";
import { getAuth  } from "firebase/auth";
import { getFirestore  } from "firebase/firestore";
import { getStorage } from "firebase/storage";

 export const firebaseConfig = {
  apiKey: "AIzaSyCEhGLu6CmQLelvQV_DbXx0DQJRGeXrQLg",
  authDomain: "dicota-ecommerce-app.firebaseapp.com",
  projectId: "dicota-ecommerce-app",
  storageBucket: "dicota-ecommerce-app.appspot.com",
  messagingSenderId: "926839189190",
  appId: "1:926839189190:web:e22292fd73b9abb129f1c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app