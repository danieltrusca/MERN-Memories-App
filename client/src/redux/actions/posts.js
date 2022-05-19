import * as api from "../../api";

import { FETCH_ALL_POSTS } from "./types";

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
