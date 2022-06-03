import { createStore, compose, applyMiddleware } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";

const initialState = { auth: { authData: JSON.parse(localStorage.getItem("profile"))} };

const middleWare = [thunk];

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleWare),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
