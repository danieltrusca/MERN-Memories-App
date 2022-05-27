import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

// const url = 'http://localhost:5000/api/posts';
// const url_auth = 'http://localhost:5000/api/auth';

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`posts/${id}`);

export const likePost = (id) => API.patch(`posts/${id}/likePost`);

export const signin = (formData) => API.post("/auth/signin", formData);
export const signup = (formData) => API.post("/auth/signup", formData);
