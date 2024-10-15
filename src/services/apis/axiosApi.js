import axios from "axios";

const API_URL = "https://my-json-server.typicode.com/Mazin-emad/budget-server";

const axiosApi = axios.create({
  baseURL: API_URL,
});

export default axiosApi;
