import axios from "axios";

const api = axios.create({
  baseURL: "https://cuong-services.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
