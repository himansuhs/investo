import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Attach token to headers for authenticated requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Auth endpoints
export const registerUser = (formData) => API.post("/auth/register", formData);
export const loginUser = (formData) => API.post("/auth/login", formData);

// Post endpoints
export const fetchPosts = () => API.get("/posts");
export const createPost = (postData) => API.post("/posts", postData);
export const updatePost = (id, postData) => API.put(`/posts/${id}`, postData);
export const deletePost = (id) => API.delete(`/posts/${id}`);
