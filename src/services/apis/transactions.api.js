import axiosApi from "./axiosApi";

export const getTransactions = async () => {
  const { data } = await axiosApi.get("/transactions");
  return data;
};

export const deleteTransactions = async (id) => {
  const { data } = await axiosApi.delete("/transactions/" + id);
  return data;
};
export const updateTransactions = async (id, body) => {
  const { data } = await axiosApi.put("/transactions/" + id);
  return data;
};

export const postTransactions = async (body) => {
  const { data } = await axiosApi.post("/transactions", body);
  return data;
};
