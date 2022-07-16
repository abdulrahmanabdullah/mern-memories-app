import axios from "axios";

const API = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5000",
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
export const fetchPostsAPI = (page) =>
  API.get(`/posts?page=${page}`, { withCredentials: true });
export const fetchPostAPI = (id) => API.get(`/post/${id}`);
export const fetchPostBySearchAPI = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const addPostAPI = (post) => API.post("/posts", post);
export const updatePostAPI = (id, post) => API.patch(`posts/${id}`, post);
export const likePostAPI = (id) => API.patch(`posts/likepost/${id}`);
export const deletePostAPI = (id) => API.delete(`posts/${id}`);
export const postCommentAPI = (id, value) =>
  API.post(`/posts/${id}/comment`, value);

//Authentication endpoints
export const registerAPI = (data) => API.post("/user/register", data);
export const loginAPI = (data) => API.post("/user/login", data);
export const fetchUserAPI = () => API.get("/", { withCredentials: true });
export const logoutAPI = () => API.post("/logout", { withCredentials: true });
