import React, { useEffect } from "react";
import { Container } from "@material-ui/core";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "./redux/actions/types";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import CreatorOrTag from "./components/CreatorOrTag/CreatorOrTag";
import jwt_decode from "jwt-decode";

const App = () => {
  // const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authData);

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = jwt_decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch({ type: LOGOUT });
      }
    }
  }, [user, dispatch]);
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" component={PostDetails} />
          <Route
            path={["/creators/:name", "/tags/:name"]}
            component={CreatorOrTag}
          />
          <Route
            path="/auth"
            exact
            component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
          />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
