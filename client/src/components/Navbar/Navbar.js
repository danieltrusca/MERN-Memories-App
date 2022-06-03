import React from "react";
import { LOGOUT } from "../../redux/actions/types";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
// import memories from "../../images/memories.png";

import memoriesLogo from "../../images/memories-Logo.png";
import memoriesText from "../../images/memories-Text.png";
// import jwt_decode from "jwt-decode";

import useStyles from "./styles";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  // const location = useLocation();
  const history = useHistory();
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const user  = useSelector((state) => state.auth.authData);

  // console.log("user: " + user);

  // useEffect(() => {
  //   const token = user?.token;

  //   if (token) {
  //     const decodedToken = jwt_decode(token);

  //     if (decodedToken.exp * 1000 < new Date().getTime()) logout();
  //   }

  //   // setUser(JSON.parse(localStorage.getItem("profile")));
  //   // console.log("user: " + user);
  // }, [location, logout]);

  const logout = () => {
    dispatch({ type: LOGOUT });

    history.push("/");

    // setUser(null);
  };

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img
          component={Link}
          to="/"
          src={memoriesText}
          alt="icon"
          height="45px"
        />
        <img
          className={classes.image}
          src={memoriesLogo}
          alt="icon"
          height="40px"
        />
      </Link>

      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
