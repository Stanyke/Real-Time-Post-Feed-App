import * as React from "react";
import axios from "axios";
import ACTIONS from "../actions";
import { useLocation } from "react-router-dom";
const { DATA_LOADED, SET_ALL_POSTS, SET_USER, LOGOUT_USER, SET_NEW_POST } =
  ACTIONS;

const { REACT_APP_SERVER_URL, REACT_APP_AFTER_LOGIN_REDIRECT_URL } =
  process.env;

export const AppContext = React.createContext();

function useApp() {
  const context = React.useContext(AppContext);
  const location = useLocation();

  const [appState, dispatch] = context;

  const { socket, username } = appState;

  axios.defaults.baseURL = REACT_APP_SERVER_URL;
  axios.defaults.headers.post["Content-Type"] = "application/json";

  React.useEffect(() => {
    //Only fetch all posts when user is logged in and user is in dashboard
    username &&
      location.pathname === REACT_APP_AFTER_LOGIN_REDIRECT_URL &&
      getPostsFromDb();

    socket.on("recieveNewPost", async (data) => {
      dispatch({
        type: SET_NEW_POST,
        payload: data,
      });
    });
  }, []);

  const pageLoaderhandler = (status) => {
    dispatch({
      type: DATA_LOADED,
      payload: status,
    });
  };

  const setupUser = ({ username }) => {
    dispatch({
      type: SET_USER,
      payload: username,
    });
  };

  const getPostsFromDb = async () => {
    const { data } = await axios.get(`/api/v1/posts`);
    pageLoaderhandler(true);
    dispatch({
      type: SET_ALL_POSTS,
      payload: data.data,
    });
  };

  const removeUsername = async () => {
    dispatch({
      type: LOGOUT_USER,
      payload: "",
    });
  };

  const submitPost = async (options) => {
    try {
      const { data } = await axios.post("/api/v1/posts", options);
      dispatch({
        type: SET_NEW_POST,
        payload: data.data,
      });
      socket.emit("newPost", data.data);
    } catch (err) {
      alert(err.response.data);
    }
  };

  const getPostById = async (postId, command) => {
    try {
      !command && pageLoaderhandler(false);
      const { data } = await axios.get(`/api/v1/posts/${postId}`);
      pageLoaderhandler(true);
      return data.data;
    } catch (err) {
      alert(
        "Post with such id does not exist or internet connection is not available"
      );
      window.location = REACT_APP_AFTER_LOGIN_REDIRECT_URL;
    }
  };

  const submitComment = async (options) => {
    try {
      await axios.post(`/api/v1/posts/${options.postId}/comments`, options);
      const data = await getPostById(options.postId, "dontLoad");
      socket.emit("postAndAllComments", data);
      return data;
    } catch (err) {
      alert(err.response.data);
    }
  };

  const editPostComment = async (options) => {
    try {
      const { postId, commentId, message } = options;
      await axios.patch(`/api/v1/posts/${postId}/comments/${commentId}`, {
        message,
      });
      const data = await getPostById(options.postId, "dontLoad");
      socket.emit("postAndAllComments", data);
      return data;
    } catch (err) {
      alert(err.response.data);
    }
  };

  const deletePostComment = async (options) => {
    try {
      const { postId, commentId } = options;
      await axios.delete(`/api/v1/posts/${postId}/comments/${commentId}`);
      const data = await getPostById(postId, "dontLoad");
      socket.emit("postAndAllComments", data);
      return data;
    } catch (err) {
      alert(err.response.data);
    }
  };

  return {
    appState,
    dispatch,
    setupUser,
    getPostsFromDb,
    removeUsername,
    submitPost,
    getPostById,
    submitComment,
    socket,
    editPostComment,
    deletePostComment,
  };
}

export default useApp;
