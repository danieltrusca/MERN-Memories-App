import * as api from "../../api";

import {
  FETCH_ALL_POSTS,
  FETCH_POSTS_BY_SEARCH,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  LIKE_POST,
  START_LOADING,
  END_LOADING,
} from "./types";

// Action creators
export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPosts(page);

    // console.log(data);

    dispatch({
      type: FETCH_ALL_POSTS,
      payload: data,
    });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    dispatch({
      type: FETCH_POSTS_BY_SEARCH,
      payload: data,
    });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (newPost) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
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

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({
      type: LIKE_POST,
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};
