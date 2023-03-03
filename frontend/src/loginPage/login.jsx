import React from "react";
import Button from "@mui/material/Button";
import { Grid, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userError, setUserError] = useState();
  const [passwordError, setPasswordError] = useState();

  const navigate = useNavigate();

  const onchangeUserHandler = (e) => {
    setError();
    setUserError();
    setUsername(e.target.value);
  };
  const onChangePasswordHandler = (e) => {
    setError();
    setPasswordError();
    setPassword(e.target.value);
  };
  const SubmitHandler = async () => {
    if ((username.length > 0) & (password.length > 0)) {
      const baseURL = "http://127.0.0.1:8000/api/auth/Login";
      const body = { username, password };
      try {
        const response = await axios.post(baseURL, body);
        navigate("/expenseTracker");
        window.localStorage.setItem("AccessToken", response.data.Access);
      } catch (e) {
        setError(e.response.data.detail);
      }
    }
    setUserError(username.length === 0);
    setPasswordError(password.length === 0);
  };
  return (
    <Grid sx={{ height: "100vh" }} container xs={12}>
      <Grid item container xs={12} sm={8} md={8} sx={{ background: "#e3e3e3" }}>
        <Grid direction="column" m="auto" p={2} item>
          <Typography variant="h2" fontSize={"80px"}>
            Expense Tracker
          </Typography>
        </Grid>
      </Grid>
      <Grid item container p={2} xs={12} sm={4} md={4}>
        <Grid item container xs={8} margin="auto" rowSpacing={2}>
          <h1>Welcome Back</h1>
          <Box mt={2} mb={2}>
            <h4>Please enter your details.</h4>
          </Box>
          <Grid item xs={12}>
            <TextField
              fullWidth
              sx={{ background: "white" }}
              label="username"
              autoComplete="off"
              variant="outlined"
              required
              type={"text"}
              error={userError}
              onChange={onchangeUserHandler}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              fullWidth
              sx={{ background: "white" }}
              label="password"
              required
              error={passwordError}
              autoComplete="off"
              variant="outlined"
              type={"password"}
              onChange={onChangePasswordHandler}
            />
          </Grid>
          <Grid item xs={12}>
            <p style={{ color: "red" }}>{error}</p>
            <Button
              fullWidth
              id="Btn"
              variant="contained"
              onClick={SubmitHandler}
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={12} mt={2} sx={{ textAlign: "center" }}>
            <Typography variant="p">
              Don't have a account? <Link to={"/signUp"}>SignUp</Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
