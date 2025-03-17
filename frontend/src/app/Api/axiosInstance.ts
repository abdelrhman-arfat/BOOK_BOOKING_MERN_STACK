import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL 
export const app = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  validateStatus: (status) => status >= 200 && status < 600,
});
