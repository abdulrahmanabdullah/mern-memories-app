import axios from "axios";

const url = "http://localhost:5000/posts";

export const fetchPostAPI = () => axios.get(url);

export const addPostAPI = (post) => axios.post(url, post);
