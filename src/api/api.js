// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // Spring Boot backend URL
});

export const post = async (url, data) => {
  const res = await api.post(url, data);
  return res.data;
};
