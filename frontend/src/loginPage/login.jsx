import React from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./login.css";

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
        navigate("/expenseTracker")
        window.localStorage.setItem("AccessToken", response.data.Access);
      } catch (e) {
        setError(e.response.data.detail);
      }
    }
    setUserError(username.length === 0);
    setPasswordError(password.length === 0);
  };
  return (
    <div className="Main">
      <div className="heading">
        <h1>Expense Tracker</h1>
      </div>
      <div className="login">
        <div className="header">
          <h1>Welcome Back</h1>
          <h4>Please enter your details.</h4>
        </div>
        <div className="loginMain">
          <div className="log-tag">
            <TextField
              id="outlined-basic"
              label="userName&email"
              variant="outlined"
              type={"text"}
              onChange={onchangeUserHandler}
            />
            {userError && <p style={{ color: "red" }}>*username is Required</p>}
          </div>
          <div className="log-tag">
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type={"password"}
              onChange={onChangePasswordHandler}
            />
            {passwordError && (
              <p style={{ color: "red" }}>*Password is Required</p>
            )}
          </div>
          <div className="btn">
            <p style={{ color: "red" }}>{error}</p>
            <Button id="Btn" variant="contained" onClick={SubmitHandler}>
              Login
            </Button>
          </div>
        </div>
        <div className="footer">
          <h4>
            Don't have a account? <Link to={"/signUp"}>SignUp</Link>
          </h4>
        </div>
      </div>
    </div>
  );
};
