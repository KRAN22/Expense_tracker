import React from "react";
import { Grid, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export const SignUp = () => {
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
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="email"
            variant="outlined"
            type={"email"}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="password"
            autoComplete="off"
            variant="outlined"
            type={"password"}
          />
        </Grid>
        <Grid item xs={12}>
          <Button id="btn" variant="contained" fullWidth>
            Login
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
