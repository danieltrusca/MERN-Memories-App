import * as api from "../../api";

import { FETCH_ALL_POSTS, CREATE_POST, UPDATE_POST } from "./types";

// Action creators
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    dispatch({
      type: FETCH_ALL_POSTS,
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (newPost) => async (dispatch) => {
  try {
    const { data } = await api.createPost(newPost);

    dispatch({
      type: CREATE_POST,
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, updatedPost) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, updatedPost);

    dispatch({
      type: UPDATE_POST,
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};
