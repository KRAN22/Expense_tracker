import React from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import "./login.css";
import { Link } from "react-router-dom";

export const LoginForm = () => {
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
          <div className="tag">
            <TextField id="outlined-basic" label="Title" variant="outlined" type={"text"} />
          </div>
          <div className="tag">
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type={"password"}
            />
          </div>
          <div className="btn">
            <Button id="Btn" variant="contained">
              Login
            </Button>
          </div>
        </div>
        <div className="footer">
          <h4>
            Don't have a account? <Link>SignUp</Link>
          </h4>
        </div>
      </div>
    </div>
  );
};
