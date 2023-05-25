import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9090",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Credentials": "true",
  },
  withCredentials: true,
});

export default api;
