import React, { useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import axios from "axios";

export const SignUp = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onClickHandler = async () => {
    const baseURL = "http://127.0.0.1:8000/api/user/signIn";
    const body = { username, email, password };
    try {
      const response = await axios.post(baseURL, body);
      if (response) {
        window.location.reload();
      }
    } catch (e) {
      console.log(e.response.date);
    }
  };

  return (
    <Grid sx={{ height: "100vh" }} container xs={12}>
      <Grid item xs={12} sm={8} md={8} sx={{ background: "#e3e3e3" }}></Grid>
      <Grid
        item
        container
        xs={12}
        sm={4}
        md={4}
        p={7}
        sx={{ background: "white" }}
      >
        <Grid item xs={12} margin="auto">
          <Typography variant="h4" sx={{ margin: "0" }}>
            Sign Up
          </Typography>
          <Typography variant="h6">Let's Create your account</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="username"
            variant="outlined"
            type={"text"}
            onChange={onChangeUsername}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="email"
            variant="outlined"
            type={"email"}
            onChange={onChangeEmail}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="password"
            autoComplete="off"
            variant="outlined"
            type={"password"}
            onChange={onChangePassword}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            id="btn"
            variant="contained"
            fullWidth
            onClick={onClickHandler}
          >
            SignUP
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography>
            Already have an account?{" "}
            <Link to={"/"} style={{ textDecoration: "none" }}>
              Login
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
