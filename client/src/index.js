import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App";

import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_AUTH_ID}>
      <App />
    </GoogleOAuthProvider>
  </Provider>,
  document.getElementById("root")
);
