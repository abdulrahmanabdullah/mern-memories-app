import axios from "axios";

const url = "http://localhost:5000/posts";

export const fetchPostAPI = () => axios.get(url);

export const addPostAPI = (post) => axios.post(url, post);

export const updatePostAPI = (id, post) => axios.patch(`${url}/${id}`, post);

export const deletePostAPI = (id) => axios.delete(`${url}/${id}`);
