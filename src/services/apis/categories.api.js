// import axiosApi from "./axiosApi"; ==> replaced with firebase
import { db } from "./axiosApi";
import { collection, getDocs, query } from "firebase/firestore";

const categoryCol = collection(db, "category");
const q = query(categoryCol);

export const getCategory = async () => {
  const res = await getDocs(q);
  const data = res.docs.map((doc) => doc.data());
  // const { data } = await axiosApi.get("/categories/"); ==> replaced with firebase
  return data;
};
