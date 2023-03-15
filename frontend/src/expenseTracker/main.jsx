import React from "react";
import image from "../image/image1.png";
import { Link, Outlet } from "react-router-dom";
import { Box, Button, Divider, Grid } from "@mui/material";
import "./main.css";

export const ExpenseTracker = () => {
  const clear = () => {
    window.localStorage.clear();
  };
  return (
    <Grid sx={{ height: "100vh" }} container xs={12}>
      <Grid container item xs={2} sx={{ background: "white" }}>
        <Grid container item xs={12} direction="column">
          <Grid container item xs={3} direction="column" margin={"auto"}>
            <Box className="ex-image">
              <img src={image} alt="people" />
              <h5>Hello,kranthi</h5>
            </Box>
            <Divider color="white" />
          </Grid>
          <Grid item xs={8} p={1} sx={{ margin: "auto" }}>
            <Button>
              <Link
                to={"/expenseTracker/category"}
                style={{ textDecoration: "none" }}
              >
                Category
              </Link>
            </Button>
            <Button>
              <Link
                to={"/expenseTracker/transaction"}
                style={{ textDecoration: "none" }}
              >
                Transaction
              </Link>
            </Button>
            <Button>
              <Link
                to={"/expenseTracker/summary"}
                style={{ textDecoration: "none" }}
              >
                Summary
              </Link>
            </Button>
          </Grid>
          <Grid item xs={1} sx={{ margin: "Auto" }}>
            <Button onClick={clear} variant="contained">
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "White",
                  fontWeight: "Bold",
                }}
              >
                LogOut
              </Link>
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={10} sx={{ background: "lightgray" }}>
        <Outlet />
      </Grid>
    </Grid>
  );
};
