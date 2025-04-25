import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCSKbDAhyDBoEDwK6Q1RTrRrR65ORfJSnw",
  authDomain: "compcare-a46da.firebaseapp.com",
  databaseURL: "https://compcare-a46da-default-rtdb.firebaseio.com",
  projectId: "compcare-a46da",
  storageBucket: "compcare-a46da.firebasestorage.app",
  messagingSenderId: "265610399335",
  appId: "1:265610399335:web:4e0679308af60c731d0ec2",
  measurementId: "G-PP6QFTNWCJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
