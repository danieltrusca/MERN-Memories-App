import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import {AUTH} from "../../redux/actions/types";
// import { GoogleLogin } from "react-google-login";
import { GoogleLogin } from "@react-oauth/google";
// import { useGoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import Input from "./Input";
// import Icon from "./Icon";

import useStyles from "./styles";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();
  const history=useHistory();
  const classes = useStyles();

  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  // "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ4NmYxNjQ4MjAwNWEyY2RhZjI2ZDkyMTQwMThkMDI5Y2E0NmZiNTYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2NTMzMDY4NTAsImF1ZCI6IjkzNTEzMjc5ODI2Ny11OHBtNmJlcTV2ZWM5dWZ2cTd1ODdsMWlwZmZidW9jbS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExNDM4NDQzNTM1MTAyMTU3MTI4MiIsImVtYWlsIjoiZGFuaS50cnVzY2FAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF6cCI6IjkzNTEzMjc5ODI2Ny11OHBtNmJlcTV2ZWM5dWZ2cTd1ODdsMWlwZmZidW9jbS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsIm5hbWUiOiJ0cnVzY2EgZGFuIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBVFhBSnczSU1KdnN5TWVIT01YME9QSmVoMTlkREhiMksxTFl5SUNTdEc4PXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6InRydXNjYSIsImZhbWlseV9uYW1lIjoiZGFuIiwiaWF0IjoxNjUzMzA3MTUwLCJleHAiOjE2NTMzMTA3NTAsImp0aSI6ImI2ZjM2YWNmNTgwYTMyMDQ1Nzg2OGI2NzY4YzJjMjYxMTA3NGJiMzcifQ.C12FAtHEKkY8CbJr35cvJphG-GadqPtDo-y2LecWNYgGF-0oDmrjzoev8-7aLI4vnCgYYFvMTC0ZtKjWXEvEfyKGAa5tWWghIIA7L1Aj3lwa4wBm5rlFGscaxw7u9ipdtBDa2mZctt0utHuvVCKsNNR63fmlWuCwBs0oUXU2JP-iICfvOxbD8XK-ilADn6IPQFmmWQWI4tDsAYy6fc-suydhRWew61P0xzWaXTHtFr6pZAnBr7w2tOqaSVBuYnua1iz7Y7y-8HoOlaH-W6P29n81VHW6RJeFu60nijYy3GOw31wNXBTjp-6w5ERLebd7zZK8fJJcU6qD6kk48XkY9g"

  // const login = useGoogleLogin({
  //   onSuccess: (credentialResponse) => console.log(credentialResponse),
  // });

  // const login = useGoogleLogin({
  //   onSuccess:  (res) => {
  //     console.log("auth.js-googlesuccess-res", res);
  //     var decoded = jwt_decode(res.access_token);
  //     // await fetch(
  //     //   `https://oauth2.googleapis.com/tokeninfo?id_token=${res.access_token}`
  //     // )
  //     //   .then((res) => res.json())
  //     //   .then((response) => {
  //     //     console.log("user Info=", response);
  //     //   })
  //     //   .catch((error) => console.log(error));
  //     // const responsePayload = decodeJwtResponse(res.access_token);
  //     console.log(decoded);
  //   },
  // });

  const googleSuccess = async (res) => {
    
    // console.log("auth.js-googlesuccess-res", res);
    var decoded = jwt_decode(res.credential);
    // console.log("user Info=", decoded);
    const token=res.credential;
    const result=decoded;

    try {
      dispatch({
        type: AUTH,
        data: {result, token}
      });
      history.push('/');
    } catch(error) {
      console.log(error);
    }
  };
  const googleError = (error) => {
    console.log("google signin failed-error", error);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>

          {/* <Button
            className={classes.googleButton}
            color="primary"
            fullWidth
            startIcon={<Icon />}
            variant="contained"
            onClick={() => login()}
          >
            Google Sign In
          </Button> */}

          <div className={classes.googleButton}>
            <GoogleLogin
              theme="filled_blue"
              size='large'
              width='250'
              logo_alignment= "left"
              onSuccess={googleSuccess}
              onFailure={googleError}
            />
          </div>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
