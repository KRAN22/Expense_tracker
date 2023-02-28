import React from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import "./signup.css";
import {Link} from "react-router-dom"

export const SignUp = () => {
  return (
    <div className="main">
      <div className="image">
        <img alt="expenseTracker" src="https://blog.sheetgo.com/wp-content/uploads/2020/08/finance-processes-blog-images-05.png" />
      </div>
      <div className="signup">
        <div className="header">
          <h1>Sign Up</h1>
          <h4>Let's Create your account</h4>
        </div>
        <div className="signupMain">
          <div className="tag">
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              type={"text"}
            />
          </div>
          <div className="tag">
            <TextField
              id="outlined-basic"
              label="email"
              variant="outlined"
              type={"email"}
            />
          </div>
          <div className="tag">
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type={"password"}
            />
          </div>
          <div>
            <Button id="btn" variant="contained">
              Login
            </Button>
          </div>
        </div>
        <div className="footer">
        <h5>
          Already have an account? <Link to={"/"}>Login</Link>
        </h5>
        </div>
      </div>
    </div>
  );
};
