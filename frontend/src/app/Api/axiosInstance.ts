import axios from "axios";


const API_URL = "http://localhost:3003/api/";

export const app = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  validateStatus: (status) => status >= 200 && status < 600,
});

