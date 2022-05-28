import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});
//Posts endpoints
export const fetchPostAPI = () => API.get("/posts");

export const addPostAPI = (post) => API.post("/posts", post);

export const updatePostAPI = (id, post) => API.patch(`posts/${id}`, post);

export const deletePostAPI = (id) => API.delete(`posts/${id}`);

//Authentication endpoints
export const signUpAPI = (data) => API.post("/user/signup", data);
