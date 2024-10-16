// import axios from "axios"; ==> replaced with firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// feel free to use my config or create your own
const firebaseConfig = {
  apiKey: "AIzaSyCoAUKj83j0LxMjkCnrmfyIwoli5mq8NHo",
  authDomain: "mazin-budget.firebaseapp.com",
  projectId: "mazin-budget",
  storageBucket: "mazin-budget.appspot.com",
  messagingSenderId: "656611005444",
  appId: "1:656611005444:web:d44ee98361b2a561285151",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// replaced with firebase
/** const API_URL = "http://localhost:5000";
const axiosApi = axios.create({
  baseURL: API_URL,
});
export default axiosApi; **/
