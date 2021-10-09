import ACTIONS from "../actions";
const { SET_USER, LOGOUT_USER, DATA_LOADED, SET_ALL_POSTS, SET_NEW_POST } = ACTIONS;

export default function appReducer(state, action) {
  switch (action.type) {
    case SET_USER:
      localStorage.setItem("username", action.payload);
      return {
        ...state,
        username: action.payload,
      };
    case LOGOUT_USER:
      localStorage.setItem("username", action.payload);
      return {
        ...state,
        username: action.payload,
      };
    case DATA_LOADED:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_ALL_POSTS:
      let obj = {};
      action.payload.forEach((data) => {
        obj[data._id] = data;
      });
      const updatedPosts = {
        ...obj,
      };
      return { ...state, posts: updatedPosts };
    case SET_NEW_POST:
      let newPostObj = {};
      newPostObj[action.payload._id] = action.payload;
      return {...state, posts: {...state.posts, ...newPostObj}  };
    default:
      return state;
  }
}
