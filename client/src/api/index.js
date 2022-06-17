import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({ baseURL: "http://localhost:5000" });
const UAPI = axios.create({ baseURL: "http://localhost:5000" });

UAPI.interceptors.request.use((req) => {
  // if (Cookies.get("acessToken")) {
  //   req.headers.Authorization = `Bearer ${Cookies.get("accessToken")}`;
  // }
  req.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMjA3MjMxMjQ3ODc0NDg4NjE5MyIsImVtYWlsIjoibmZzMDU2QGdtYWlsLmNvbSIsInZlcmlmaWVkX2VtYWlsIjp0cnVlLCJuYW1lIjoiQWJkdWxyYWhtYW4gQWxraHVkaGFyeWkiLCJnaXZlbl9uYW1lIjoiQWJkdWxyYWhtYW4iLCJmYW1pbHlfbmFtZSI6IkFsa2h1ZGhhcnlpIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdnTlJISGVTSE93dXZvRnZncjRJSW15Y3RCX05SNXZlaktqVl9nczZnPXM5Ni1jIiwibG9jYWxlIjoiYXIiLCJpYXQiOjE2NTUwNDg1MTYsImV4cCI6MTY1NTA1MjExNn0.hmD8rxIRDK8pL8hNzn2gPwzDzXnw-9kX575v96c7Ths`;
  return req;
});
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
export const likePostAPI = (id) => API.patch(`posts/likepost/${id}`);

export const deletePostAPI = (id) => API.delete(`posts/${id}`);

//Authentication endpoints
export const registerAPI = (data) => API.post("/user/register", data);
export const loginAPI = (data) => API.post("/user/login", data);

export const userAPI = () => UAPI.get("/users");
