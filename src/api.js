// src/api.js
import axios from "axios";

const API_URL = "http://localhost:3001/api"; // Replace with your backend URL

export const signup = (userData) =>
  axios.post(`${API_URL}/users/signup`, userData);
export const login = (userData) =>
  axios.post(`${API_URL}/users/login`, userData);
export const getAllUsers = (token) =>
  axios.get(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getUserById = (id, token) =>
  axios.get(`${API_URL}/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const updateUser = (id, userData, token) =>
  axios.put(`${API_URL}/users/${id}`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const deleteUser = (id, token) =>
  axios.delete(`${API_URL}/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
