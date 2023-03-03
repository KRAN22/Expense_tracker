import React from "react";
import image from "../image/image1.png";
import { Link, Outlet } from "react-router-dom";
import { Divider, Grid } from "@mui/material";
import "./main.css";

export const ExpenseTracker = () => {
  return (
    <Grid sx={{ height: "100vh" }} container xs={12}>
      <Grid container item xs={2} sx={{ background: "lightgreen" }}>
        <Grid container item xs={12} direction="column">
          <Grid item xs={3} direction="column" margin={"auto"}>
            <div className="ex-image">
              <img src={image} alt="people" />
              <h5>Hello,kranthi</h5>
            </div>
            <Divider color="white" />
          </Grid>
          <Grid item xs={9} p={1} sx={{ margin: "auto" }}>
            <div className="ex-categories">
              <Link to={"/expenseTracker/category"}>Category</Link>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={10} sx={{ background: "lightblue" }}>
        <Outlet />
      </Grid>
    </Grid>
  );
};
