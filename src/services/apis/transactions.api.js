// import axiosApi from "./axiosApi"; // for testing with json-server
import { db } from "./axiosApi";
import {
  collection,
  addDoc,
  getDocs,
  query,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const transCol = collection(db, "transactions");

export const getTransactions = async () => {
  const q = query(transCol);
  const res = await getDocs(q);
  const data = res.docs.map((doc) => {
    doc.data();
    return { ...doc.data(), id: doc.id };
  });
  return data;
};

export const postTransactions = async (body) => {
  const data = await addDoc(transCol, body);
  return data;
};

export const deleteTransactions = async (id) => {
  const docRef = doc(transCol, id);
  const data = await deleteDoc(docRef, id);
  return data;
};

export const updateTransactions = async (id, body) => {
  const docRef = doc(transCol, id);
  const data = await updateDoc(docRef, body);
  return data;
};

// replaced with firebase
// export const getTransactions = async () => {
//   const { data } = await axiosApi.get("/transactions");
//   return data;
// };

// export const deleteTransactions = async (id) => {
//   const { data } = await axiosApi.delete("/transactions/" + id);
//   return data;
// };
// export const updateTransactions = async (id, body) => {
//   const { data } = await axiosApi.put("/transactions/" + id, body);
//   return data;
// };

// export const postTransactions = async (body) => {
//   const { data } = await axiosApi.post("/transactions", body);
//   return data;
// };
