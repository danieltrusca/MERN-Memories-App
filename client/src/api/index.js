import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:5000/api" });

const API = axios.create({ baseURL: "https://mern-memories-dan.herokuapp.com/api" });



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
export const fetchPost = (id) => API.get(`/posts/post/${id}`);
export const fetchPostsBySearch = ({ search, tags }) =>
  API.get(`/posts/search?searchQuery=${search || "none"}&tags=${tags}`);
export const fetchPostsByCreator = (name) =>
  API.get(`/posts/creator?name=${name}`);

export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`posts/${id}`);

export const likePost = (id) => API.patch(`posts/${id}/likePost`);
export const comment = (value, id) =>
  API.post(`posts/${id}/commentPost`, { value });

export const signin = (formData) => API.post("/auth/signin", formData);
export const signup = (formData) => API.post("/auth/signup", formData);
