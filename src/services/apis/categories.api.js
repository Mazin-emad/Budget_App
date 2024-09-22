import axiosApi from "./axiosApi";

export const getCategory = async () => {
  const { data } = await axiosApi.get("/categories/");
  return data;
};
